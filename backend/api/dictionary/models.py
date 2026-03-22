from django.db import models

from authentication.models import User


class Word(models.Model):
    original = models.CharField(max_length=255)
    furigana = models.CharField(max_length=255)
    english = models.CharField(max_length=255)

    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['original', 'furigana'], name='unique_word')
        ]

    @property
    def word(self) -> str:
        return f'{self.original} [{self.furigana}]'

    def __str__(self) -> str:
        return self.word


class Dictionary(models.Model):
    name = models.CharField(max_length=255)
    words = models.ManyToManyField('Word', related_name='dictionaries', blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
