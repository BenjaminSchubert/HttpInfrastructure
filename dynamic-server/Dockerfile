FROM fedora:23

RUN dnf update -y && dnf clean all

COPY src/httpInfrastructure /srv/todoAppDynamic

WORKDIR /srv/todoAppDynamic

RUN pip3 install -r /srv/todoAppDynamic/requirements.pip && python3 manage.py makemigrations && python3 manage.py migrate

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
