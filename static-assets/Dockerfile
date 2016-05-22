FROM fedora/apache

MAINTAINER Benjamin Schubert

RUN mkdir /var/log/httpd #&& dnf update -y && dnf clean all
COPY conf/apache_default.conf /etc/httpd/conf.d/default_site.conf
COPY dist/ /srv/todoAppStatic

RUN chown -R apache: /srv/todoAppStatic && chmod -R u=rX,go=rX,o= /srv/todoAppStatic
