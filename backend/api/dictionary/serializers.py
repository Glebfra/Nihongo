from rest_framework import serializers

from dictionary.models import Dictionary


class DictionarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Dictionary
        fields = ('id', 'name')
        read_only_fields = ('created_by', 'created_at', 'updated_at')
