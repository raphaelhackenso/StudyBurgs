import datetime

from django.test import TestCase
from . import models
import json

from django.core import serializers


class HabsburgerCreation(TestCase):

    def test_create_habsburger(self):
        eq = self.assertEquals  # for convenience
        # 1. Create two objects of class models.Person.
        # First person is called Joe Doe (born 1955),
        # second person is called Jane Doe (born 1976)
        # TODO: Create the two model instances using Django's ORM layer:
        # Test: two persons should be in the database

        with open('habsburger.json', encoding='utf-8') as data_file:
            json_data = json.loads(data_file.read())

        for person_data in json_data:
            movie = models.Person.create(**person_data)
            # movie and genres created
