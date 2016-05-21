FROM fedora/apache

MAINTAINER Benjamin Schubert

RUN mkdir /var/log/httpd #&& dnf update -y
COPY conf/apache_default.conf /etc/httpd/conf.d/default_site.conf
COPY src/ /srv/assets

RUN chown -R apache: /srv/assets && chmod -R u=rX,go=rX,o= /srv/assets
