from django.contrib import admin

from .models import Dictionary, Word


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ('id', 'original', 'furigana', 'english', 'created_at')
    search_fields = ('original', 'furigana', 'english')


@admin.register(Dictionary)
class DictionaryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'created_by__username', 'created_at')
    filter_horizontal = ('words',)
