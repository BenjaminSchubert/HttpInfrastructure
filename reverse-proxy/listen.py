#!/usr/bin/env python3
import os

from collections import OrderedDict

from docker import Client


def safe_get(dic, key):
    return dic[key][next(iter(dic[key]))] if len(dic[key]) else None


def update_conf(static, dynamic):
    with open("/etc/httpd/conf.d/proxy.hosts", "w") as f:
        if dynamic is not None:
            f.write("""ProxyPass "/api/" "http://{}:8000/"\nProxyPassReverse "/api/" "http://{}:8000/"\n\n """.format(
                dynamic, dynamic
            ))

        if static is not None:
            f.write("""ProxyPass "/" "http://{}/"\nProxyPassReverse "/" "http://{}/" """.format(static, static))

    os.system("apachectl -k graceful")


def main():
    cli = Client(base_url="unix://var/run/docker.sock")
    hosts = {"static": OrderedDict(), "dynamic": OrderedDict()}

    for container in cli.containers():
        data = container["Image"].split("/")

        if len(data) != 2:
            continue

        host, name = data

        if host == "tellendil":
            if name in ["static", "dynamic"]:
                hosts[name][container["Id"]] = container["NetworkSettings"]["Networks"]["bridge"]["IPAddress"]

    update_conf(safe_get(hosts, "static"), safe_get(hosts, "dynamic"))

    for event in cli.events(decode=True):
        data = event.get("from", "").split("/")

        if len(data) != 2:
            continue

        host, name = data

        if event["Action"] == "die" and host == "tellendil":
            if name in ["static", "dynamic"]:
                hosts[name].pop(event["id"])
                update_conf(safe_get(hosts, "static"), safe_get(hosts, "dynamic"))

        elif event["Action"] == "start" and host == "tellendil":
            if name in ["static", "dynamic"]:
                hosts[name][event["id"]] = cli.inspect_container(event["id"])["NetworkSettings"]["Networks"]["bridge"]["IPAddress"]
                update_conf(safe_get(hosts, "static"), safe_get(hosts, "dynamic"))


if __name__ == "__main__":
    main()
