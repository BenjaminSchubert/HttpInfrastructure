from rest_framework import serializers

from simpleTODO.models import Tag, Todo


class AutoCreatedPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def to_internal_value(self, data):
        if self.pk_field is not None:
            data = self.pk_field.to_internal_value(data)
        try:
            return self.get_queryset().get_or_create(pk=data)[0]
        except (TypeError, ValueError):
            self.fail('incorrect_type', data_type=type(data).__name__)


class TodoSerializer(serializers.ModelSerializer):
    tags = AutoCreatedPrimaryKeyRelatedField(queryset=Tag.objects, many=True)

    class Meta:
        model = Todo
        fields = ("id", "content", "deadline", "tags", "done")

    def create(self, validated_data):
        tags = validated_data.pop("tags")
        todo = Todo(user=self.context["request"].user, **validated_data)
        todo.save()
        for tag in tags:
            todo.tags.add(tag)

        return todo
