import graphene
from django.core.paginator import Paginator
from django.db.models import QuerySet
from graphene import ObjectType
from graphene_django import DjangoObjectType
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Dictionary, Word

OBJECTS_PER_PAGE = 25


def _paginate(queryset: QuerySet, page: int) -> dict:
    paginator = Paginator(queryset, OBJECTS_PER_PAGE)
    page_obj = paginator.get_page(page)

    return {
        "items": page_obj.object_list,
        "total": paginator.count,
        "pages": paginator.num_pages,
        "current_page": page_obj.number,
        "has_next": page_obj.has_next(),
        "has_prev": page_obj.has_previous()
    }


def _get_user_from_jwt(info):
    request = info.context
    auth = JWTAuthentication()

    header = auth.get_header(request)
    if header is None:
        raise AuthenticationFailed("No authentication credentials provided")

    raw_token = auth.get_raw_token(header)
    if raw_token is None:
        raise AuthenticationFailed("Invalid token")

    validated_token = auth.get_validated_token(raw_token)
    user = auth.get_user(validated_token)

    return user


class WordType(DjangoObjectType):
    class Meta:
        model = Word
        fields = ('id', 'original', 'furigana', 'english')

    id = graphene.Int()

    def resolve_id(self, info):
        return int(getattr(self, 'id'))


class WordPaginatedType(ObjectType):
    items = graphene.List(WordType)
    total = graphene.Int()
    pages = graphene.Int()
    current_page = graphene.Int()
    has_next = graphene.Boolean()
    has_prev = graphene.Boolean()


class DictionaryType(DjangoObjectType):
    class Meta:
        model = Dictionary
        fields = ('name',)

    id = graphene.Int()
    words_paginated = graphene.Field(
        WordPaginatedType,
        page=graphene.Int(required=True)
    )

    def resolve_words_paginated(self, info, page: int):
        queryset: QuerySet[Word] = getattr(self, 'words').all()
        return _paginate(queryset, page)

    def resolve_id(self, info):
        return int(getattr(self, 'id'))


class Query(ObjectType):
    word = graphene.Field(
        WordPaginatedType,
        page=graphene.Int(required=True),
        original=graphene.String(),
        furigana=graphene.String(),
        english=graphene.String()
    )
    dictionary = graphene.List(
        DictionaryType,
        id=graphene.Int(),
        name=graphene.String(),
    )

    def resolve_word(self, info, page, original=None, furigana=None, english=None):
        queryset = Word.objects.all()
        if original is not None:
            queryset = queryset.filter(original=original)
        if furigana is not None:
            queryset = queryset.filter(furigana=furigana)
        if english is not None:
            queryset = queryset.filter(english=english)
        return _paginate(queryset, page)

    def resolve_dictionary(self, info, id=None, name=None):
        try:
            user = _get_user_from_jwt(info)
            dictionaries = Dictionary.objects.filter(created_by_id__in=[1, user.pk])
        except AuthenticationFailed:
            dictionaries = Dictionary.objects.filter(created_by=1)
        if id is not None:
            dictionaries = dictionaries.filter(pk=id)
        if name is not None:
            dictionaries = dictionaries.filter(name__contains=name)
        return dictionaries


schema = graphene.Schema(query=Query)
