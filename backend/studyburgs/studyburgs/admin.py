from django.contrib import admin
from . import models

from django.contrib.auth.admin import UserAdmin

'''

### NOTE ###

In order to problery hash the Password -> https://stackoverflow.com/questions/15377544/model-inherited-from-abstractuser-doesnt-hash-password-field - 15

This however in turn does not show the 'Progress' in the Django Admin Panel -> In our case this is fine, since when
a new user is added the default learning progress will be 0%, since the user hasn't learned anything yet.

'''

# PersonAdmin, searchable by Name
class PersonAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'ordinal_number', 'name_suffix', 'date_of_birth',
                    'date_of_death', 'birthplace', 'description', 'gender', 'habsburg_ancestor')

    search_fields = ('first_name',)


# MarriageAdmin, filterable by wife or husband
class MarriageAdmin(admin.ModelAdmin):
    list_display = ('wife', 'husband', 'date_of_marriage', 'comments')

    #list_filter = ('wife', 'husband')


# LearnedAdmin, filterable by person and user
class LearnedAdmin(admin.ModelAdmin):
    list_display = ('state', 'learned_person', 'learned_for_user')

    #list_filter = ('learned_person', 'learned_for_user')


# StudyBurgsUserAdmin
class StudyBurgsUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'progress' 'last_name', 'first_name', 'email', 'date_joined')


# NotesAdmin, filterable by user and person
class NotesAdmin(admin.ModelAdmin):
    list_display = ('content', 'creation_date_time', 'note_for_user', 'note_for_person')

    #list_filter = ('note_for_user', 'note_for_person')


admin.site.register(models.Person, PersonAdmin)
admin.site.register(models.Marriage, MarriageAdmin)
admin.site.register(models.Learned, LearnedAdmin)
admin.site.register(models.StudyburgsUser, UserAdmin) # <- our custom User
admin.site.register(models.Notes, NotesAdmin)
