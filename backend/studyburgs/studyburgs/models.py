from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractUser

''' -------------------------------------------------------------------------------------------------
* The Person model
* This model defines the persons, in our case the Habsburgs
*
*
* first_name: Name of the person.
* ordinal_number: a name suffix like Karl "I."
* name_suffix: Suffix of the name f.e. Der Große
* date_of_birth: the date when the person is born
* date_of_death: the date of death
* birthplace: the place where the person is born
* description: further description of the person
* gender: male or female as CHOICES 'm' or 'f'
* habsburg_ancestor: the ancestor from the Habsburg family
*
'''

## TODO -> implementation of Photo Media

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
    picture_url = models.TextField(null=True)
    habsburg_ancestor = models.ForeignKey('self', related_name='habsburg_ancestor_person', on_delete=models.SET_NULL,
                                          null=True)

    def __str__(self):
        return "%s %s %s" % (self.first_name, (self.ordinal_number if self.ordinal_number is not None else ""),
                             (self.name_suffix if self.name_suffix is not None else ""))



''' -------------------------------------------------------------------------------------------------
* The Marriage model
* This model defines the marriages, between two people
*
* wife: first member of the marriage  fk person
* husband: second member of marriage fk Person
* date_of_marriage: The date of the marriage
* comments: further descriptions of the marriage
*
'''
class Marriage(models.Model):
    wife = models.ForeignKey(Person, related_name='wife_marriage', on_delete=models.CASCADE)
    husband = models.ForeignKey(Person, related_name='husband_marriage', on_delete=models.CASCADE)
    date_of_marriage = models.DateField()
    comments = models.TextField(null=True)

    def __str__(self):
        return "%s %s %s" % (
            self.wife.__str__(), self.husband.__str__(), self.date_of_marriage)





''' -------------------------------------------------------------------------------------------------
* The StudyburgsUser Model
* This Model defines the StudyburgsUser, which extends the default Django User
*
* contains the default parameters of username, email, first_name ...
* progress: logs the learning progress for every user -> always starts a 0%
* 
* needs to be set in admin.py & settings.py
*
'''
class StudyburgsUser(AbstractUser):
    progress = models.FloatField(default=0.0)


    # Notes can be accessed by the related name = 'users_note'
    # Learned Person can be accessed by the related name = 'users_learned_person'

    def __str__(self):
        return self.username



''' -------------------------------------------------------------------------------------------------
* The Notes Model
* This Model defines the Notes, which every user can create. Every note is linked to a Hapsburg.
*
*
* content: defines the notes' content
* creation_date_time: when the note was created
* note_for_user: which User has created the note and can therefore access its contents
* note_for_person: which Hapsburg the note is linked to.
'''
class Notes(models.Model):
    content = models.TextField()
    creation_date_time = models.DateTimeField()
    note_for_user = models.ForeignKey(StudyburgsUser, on_delete=models.SET_NULL, null=True, related_name='users_notes')
    note_for_person = models.ForeignKey(Person, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return "%s %s %s" % (self.note_for_user.__str__(), self.note_for_person.__str__(), str(self.creation_date_time))



''' -------------------------------------------------------------------------------------------------
* The Learned model
* This model defines the already learned Persons, in our case the Habsburgs
*
*
* state: a bool state if the person is learned
* learned_person: defines the person which is learned
* learned_for_user: defines the user who learned the specific Person 
'''
class Learned(models.Model):
    state = models.BooleanField(default=True)
    learned_person = models.ForeignKey(Person, on_delete=models.CASCADE)
    learned_for_user = models.ForeignKey(StudyburgsUser, on_delete=models.CASCADE, related_name='users_learned_person')

    def __str__(self):
        return "%s is learned: %s" % (self.learned_person.first_name, self.state)
