from rest_framework import serializers
from . import models
import re


# PersonSerializer
class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Person
        fields = ['pk', 'first_name', 'ordinal_number', 'name_suffix', 'date_of_birth', 'date_of_death',
                  'birthplace', 'description', 'gender', 'picture_url', 'habsburg_ancestor']

    def validate(self, data):
        # Validate that DoD is after DoB.
        if data['date_of_death'] < data['date_of_birth']:
            raise serializers.ValidationError("Date of Death must be after Date of Birth!")
        return data

    def validate_ordinal_number(self, value):
        # Validate that only I V X and . is allowed
        if value != None:
            if not (bool(re.match('^[ivxcdm.]+$', value.lower()))):
                if not value == '':
                    raise serializers.ValidationError("Numbers must only be I V X C D M and . ")

        return value


# MarriageSerializer
class MarriageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Marriage
        fields = ['pk', 'wife', 'husband', 'date_of_marriage', 'comments']

    def validate(self, data):
        # Validate that the person does not marry itself
        wife = data['wife']
        husband = data['husband']
        if wife.pk == husband.pk:
            raise serializers.ValidationError("You cannot marry yourself!")
        return data


# LearnedSerializer
class LearnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Learned
        fields = ['pk', 'state', 'learned_person', 'learned_for_user']


# StudyburgsUserSerializer
class StudyburgsUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudyburgsUser
        fields = ['pk', 'username', 'progress', 'last_name', 'first_name', 'email', 'date_joined', 'groupsReference']


# NotesSerializer
class NotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Notes
        fields = ['pk', 'content', 'creation_date_time', 'note_for_user', 'note_for_person', 'title']
