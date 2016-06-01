FROM fedora/apache

RUN dnf update -y && dnf clean all

COPY 50-reverse-proxy.conf /etc/httpd/conf.d
