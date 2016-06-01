from django.conf import settings
from django.db import models


class Tag(models.Model):
    name = models.TextField(primary_key=True)


class Todo(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    content = models.TextField()
    deadline = models.DateField()
    tags = models.ManyToManyField(Tag)
    done = models.BooleanField(default=False)
