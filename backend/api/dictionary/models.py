from django.db import models

from authentication.models import User


class Word(models.Model):
    original = models.CharField(max_length=255)
    furigana = models.CharField(max_length=255)
    english = models.CharField(max_length=255)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.original} [{self.furigana}]'


class Dictionary(models.Model):
    name = models.CharField(max_length=255)
    words = models.ManyToManyField('Word', related_name='dictionaries', blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
