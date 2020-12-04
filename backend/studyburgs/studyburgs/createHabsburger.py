from .models import Person
import json
import os
#from studyburgs.models import Person


def createhabsburger():
    working_directory = os.getcwd()
    file_path = working_directory + '\\studyburgs\\studyburgs\\habsburger.json'

    with open(file_path, encoding='utf-8') as data_file:
        json_data = json.loads(data_file.read())

    for person_data in json_data:
        persons = Person.objects.create(**person_data)
        print(persons)
        persons.save()


createhabsburger()
