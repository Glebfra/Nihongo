from django.db import models


class Language(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=8)

    def __str__(self):
        return self.code


class Word(models.Model):
    word = models.CharField(max_length=255, blank=False, null=False)
    language = models.ForeignKey(Language, on_delete=models.CASCADE, related_name='words', blank=False, null=False)
    translations = models.ManyToManyField('Word', symmetrical=True, blank=True, null=True)
    pronunciation = models.CharField()

    is_approved = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.word
