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

        f = open('habsburger.json', "r")
        data = json.load(f)

        models.Person.objects.create(data)


