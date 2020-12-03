from django.db import models
from django import forms


## BIG TODO -> write comments on each entitttet

'''
* The Person Model
    
* This Model defines the Persons, in our case the Habsburgs
*
*
* first_name: id the id of the game.

*
'''

# TODO add documentation
class Person(models.Model):
    CHOICES = (
        ('m', 'Male'),
        ('f', 'Female')
    )

    first_name = models.TextField()
    ordinal_number = models.TextField(null=True)
    name_suffix = models.TextField(null=True)
    date_of_birth = models.DateField()
    date_of_death = models.DateField()
    birthplace = models.TextField(null=True)
    description = models.TextField(null=True)
    gender = models.CharField(max_length=1, choices=CHOICES)
    habsburg_ancestor = models.ForeignKey('self', related_name='habsburg_ancestor_person', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return "%s %s %s" % (self.first_name, (self.ordinal_number if self.ordinal_number is not None else ""), (self.name_suffix if self.name_suffix is not None else ""))


## TODO -> this should be fine
class Marriage(models.Model):
    wife = models.ForeignKey(Person, related_name='wife_marriage', on_delete=models.CASCADE)
    husband = models.ForeignKey(Person, related_name='husband_marriage', on_delete=models.CASCADE)
    date_of_marriage = models.DateField()
    comments = models.TextField(null=True)

    def __str__(self):
        return "%s %s %s" % (self.wife.__str__(), self.husband.__str__(), self.date_of_marriage)  ##TODO edit the return string


# TODO check if correct
class Learned(models.Model):
    state = models.BooleanField(default=False)
    learned_person = models.ForeignKey(Person, on_delete=models.CASCADE)

    def __str__(self):
        return "%s is learned: %s" % (self.learned_person.first_name, self.state)


# TODO Admin Role / User role
class User(models.Model):
    email = models.TextField()
    password = forms.PasswordInput  # TODO
    role = models.TextField  # TODO
    progress = models.FloatField
    learned = models.ForeignKey(Learned, on_delete=models.CASCADE)

    def __str__(self):
        return (self.email, self.role)


# TODO do we need Person and User here?
class Notes(models.Model):
    content = models.TextField()
    creation_date_time = models.DateTimeField()
    note_for_user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    note_for_person = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return (self.content, self.creation_date_time)


