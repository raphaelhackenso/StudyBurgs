from django.contrib import admin
from . import models

##BIG TODO

'''


(a) Person should include all fields defined (including the "gender" field you have added through a migration)
(b) Country should display name in the change list. It should be possible to search for the country name.
(c) Movie should display title, genre and release_date in the change list. It should also be possible to filter movies by country
(d) When viewing the Movie form you will notice, that "country" and "actors" fields read 
    "Country object (1)" and "Person object (1)" respectively: go back to models.py and implement the __str__ 
    methods and return something human readable there. 
'''

class TestAdmin(admin.ModelAdmin):
    list_display = ('name','last_name')





class PersonAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'middle_name', 'last_name', 'title', 'date_of_birth',
                    'date_of_death', 'birthplace', 'description', 'gender', 'father', 'mother')


class MarriageAdmin(admin.ModelAdmin):
    list_display = ('wife', 'husband', 'date_of_marriage', 'comments')

    #search_fields = ('wife')  ##TODO


class LearnedAdmin(admin.ModelAdmin):
    list_display = ('state', 'learned_person')

    #list_filter = ('state')


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'role', 'progress', 'learned')


class NotesAdmin(admin.ModelAdmin):
    list_display = ('content', 'creation_date_time', 'note_for_user', 'note_for_person')




admin.site.register(models.Test, TestAdmin)
admin.site.register(models.Person, PersonAdmin)
admin.site.register(models.Marriage, MarriageAdmin)
admin.site.register(models.Learned, LearnedAdmin)
admin.site.register(models.User, UserAdmin)
admin.site.register(models.Notes, NotesAdmin)
