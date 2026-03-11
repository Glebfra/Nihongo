from django.contrib import admin

from .models import Language, Word


@admin.register(Language)
class LanguageAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code')
    search_fields = ('name', 'code')
    empty_value_display = "-empty-"


@admin.register(Word)
class WordAdmin(admin.ModelAdmin):
    list_display = ('id', 'word', 'language', 'created_at')
    search_fields = ('word', 'translations__word', 'pronunciation')
    filter_horizontal = ('translations',)
    list_filter = ('language__code','is_approved')
    readonly_fields = ('created_at', 'updated_at')
    actions = ('approve',)
    empty_value_display = "-empty-"
    list_per_page = 500

    @admin.action(description='Approve selected')
    def approve(self, request, queryset):
        queryset.update(is_approved=True)
