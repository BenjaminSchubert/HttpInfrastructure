FROM fedora/apache

MAINTAINER Benjamin Schubert

RUN dnf update -y && dnf clean all

COPY 50-reverse-proxy.conf /etc/httpd/conf.d
