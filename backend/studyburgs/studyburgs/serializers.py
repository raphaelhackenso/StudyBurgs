from rest_framework import serializers
from . import models


class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Test
        fields = ['pk', 'name', 'last_name']




class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = ['pk', 'first_name', 'middle_name', 'last_name', 'title', 'date_of_birth', 'date_of_death',
                  'birthplace', 'description', 'gender', 'father', 'mother']


# TODO server sided valiadation




class MarriageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Marriage
        fields = ['pk', 'wife', 'husband', 'date_of_marriage', 'comments']


class LearnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Learned
        fields = ['pk', 'state', 'learned_person']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['pk', 'email', 'password', 'role', 'progress', 'learned']


class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notes
        fields = ['pk', 'content', 'creation_date_time', 'note_for_user', 'note_for_person']


