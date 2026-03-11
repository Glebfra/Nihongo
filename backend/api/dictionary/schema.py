import graphene
from django.core.paginator import Paginator
from graphene_django import DjangoObjectType

from .models import Language, Word


class LanguageType(DjangoObjectType):
    class Meta:
        model = Language
        fields = ('id', 'name', 'code')


class WordType(DjangoObjectType):
    class Meta:
        model = Word
        fields = ('id', 'word', 'language', 'translations', 'pronunciation', 'is_approved')


class Query(graphene.ObjectType):
    all_languages = graphene.List(LanguageType)
    all_words = graphene.List(
        WordType,
        language_code=graphene.String(),
        pronunciation=graphene.String(),
        page=graphene.Int(required=True, default_value=1),
        limit=graphene.Int(required=True, default_value=100)
    )

    def resolve_all_languages(self, info):
        return Language.objects.all()

    def resolve_all_words(self, info, page, limit, language_name=None, language_code=None, pronunciation=None):
        objects = Word.objects.all()
        try:
            if language_name is not None:
                objects = objects.filter(language__name=language_name)
            if language_code is not None:
                objects = objects.filter(language__code=language_code)
            if pronunciation is not None:
                objects = objects.filter(pronunciation=pronunciation)

            paginator = Paginator(objects, limit)
            return paginator.page(page)
        except Word.DoesNotExist:
            return None

schema = graphene.Schema(query=Query)
