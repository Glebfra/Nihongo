import graphene
from django.core.paginator import Paginator
from graphene_django import DjangoObjectType

from .models import Dictionary, Word


OBJECTS_PER_PAGE = 25

class WordType(DjangoObjectType):
    class Meta:
        model = Word
        fields = ('id', 'original', 'furigana', 'english')


class DictionaryType(DjangoObjectType):
    class Meta:
        model = Dictionary
        fields = ('id', 'words', 'name')


class Query(graphene.ObjectType):
    all_words = graphene.List(
        WordType,
        page=graphene.Int(required=True),
        original=graphene.String(),
        furigana=graphene.String(),
        english=graphene.String()
    )
    all_dictionaries = graphene.List(
        DictionaryType,
        page=graphene.Int(required=True),
        name=graphene.String(),
    )

    def resolve_all_words(self, info, page, original=None, furigana=None, english=None):
        words = Word.objects.all()
        if original is not None:
            words = words.filter(original__contains=original)
        if furigana is not None:
            words = words.filter(furigana__contains=furigana)
        if english is not None:
            words = words.filter(english__contains=english)

        words_page = Paginator(words, OBJECTS_PER_PAGE).get_page(page).object_list
        return words_page

    def resolve_all_dictionaries(self, info, page, name=None):
        dictionaries = Dictionary.objects.all()
        if name is not None:
            dictionaries = dictionaries.filter(name__contains=name)

        dictionaries_page = Paginator(dictionaries, OBJECTS_PER_PAGE).get_page(page).object_list
        return dictionaries_page

schema = graphene.Schema(query=Query)
