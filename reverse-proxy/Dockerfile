FROM fedora/apache

MAINTAINER Benjamin Schubert

RUN dnf update -y && dnf clean all
RUN pip3 install docker-py


COPY 50-reverse-proxy.conf /etc/httpd/conf.d
COPY listen.py /opt/
COPY apache.sh /opt/

RUN touch /etc/httpd/conf.d/proxy.hosts && chmod +x /opt/apache.sh && chmod +x /opt/listen.py

CMD ["sh", "/opt/apache.sh"]
#COPY proxy.hosts /etc/httpd/conf.d/
