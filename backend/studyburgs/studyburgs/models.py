from django.db import models
from django import forms


## BIG TODO -> write comments on each entitttet

#TODO remove

class Test(models.Model):
    name = models.TextField()
    last_name = models.TextField()

    def __str__(self):
        return self.name




# TODO finish up
class Person(models.Model):
    CHOICES = (
        ('m', 'Male'),
        ('f', 'Female')
    )

    first_name = models.TextField()
    middle_name = models.TextField(null=True)
    last_name = models.TextField()
    title = models.TextField(null=True)
    date_of_birth = models.DateField()
    date_of_death = models.DateField()
    birthplace = models.TextField(null=True)
    description = models.TextField(null=True)
    gender = models.CharField(max_length=1, choices=CHOICES)

    father = models.ForeignKey('self', related_name='father_person', on_delete=models.SET_NULL, null=True)
    mother = models.ForeignKey('self', related_name='mother_person', on_delete=models.SET_NULL, null=True)

    # Marriage -> TODO is Marriage needed here?
    # notes

    def __str__(self):
        return "%s%s" % (self.first_name, self.last_name)  ##TODO add others for Admin page


## TODO -> this should be fine
class Marriage(models.Model):
    wife = models.ForeignKey(Person, related_name='wife_marriage', on_delete=models.CASCADE)
    husband = models.ForeignKey(Person, related_name='husband_marriage', on_delete=models.CASCADE)
    date_of_marriage = models.DateField()
    comments = models.TextField(null=True)

    def __str__(self):
        return (self.wife.last_name, self.husband.last_name, self.date_of_marriage)  ##TODO edit the return string


# TODO check if correct
class Learned(models.Model):
    state = models.BooleanField
    learned_person = models.ForeignKey(Person, on_delete=models.CASCADE)

    def __str__(self):
        return (self.state, self.learned_person)  # TODO


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


