from pathlib import Path

import pandas as pd
from django.core.management.base import BaseCommand

from dictionary.models import Dictionary, Word

DICT_FILE = Path(__file__).resolve().parent / 'jlpt_vocab.csv'


class Command(BaseCommand):
    def handle(self, *args, **options):
        data = pd.read_csv(DICT_FILE)

        dictionaries = Dictionary.objects.filter(name__contains='JLPT')
        jlpt_dictionaries = {
            'N1': dictionaries.get(name='JLPT N1'),
            'N2': dictionaries.get(name='JLPT N2'),
            'N3': dictionaries.get(name='JLPT N3'),
            'N4': dictionaries.get(name='JLPT N4'),
            'N5': dictionaries.get(name='JLPT N5'),
        }

        for row in data.values:
            word, is_created = Word.objects.get_or_create(
                original=row[0],
                furigana=row[1],
                english=row[2],
                created_by_id=1
            )
            if not is_created:
                word.english = row[2]
            word.save()

            dictionary = jlpt_dictionaries[row[3]]
            dictionary.words.add(word)
            dictionary.save()
