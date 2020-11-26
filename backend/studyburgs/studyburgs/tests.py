import datetime

from django.test import TestCase
from . import models


class MovieDBTest(TestCase):

    def test_create_person(self):
        eq = self.assertEquals # for convenience
        # 1. Create two objects of class models.Person.
        # First person is called Joe Doe (born 1955),
        # second person is called Jane Doe (born 1976)
        # TODO: Create the two model instances using Django's ORM layer:
        # Test: two persons should be in the database

        ##models.Person.objects.create(first_name="Test",last_name="Testest",date_of_birth=datetime.date,date_of_death=datetime.date,gender='m')
        models.Test.objects.create(name="nix",last_name="test")
        


    def test_update_movie(self):
        movie = models.Movie.objects.create(title = "Blade Runner", 
                                            genre = "a", 
                                            release_date=datetime.datetime(year=2018,month=1,day=1),
                                            plot="Lorem ipsum",
                                            duration=200,
                                            black_and_white=False)
        # TODO: Update the duration to 180 and the genre to "c"
        movie.duration=180
        movie.genre="c"
        movie.save()
        movie_updated = models.Movie.objects.get(title="Blade Runner")
        self.assertEquals(movie_updated.genre,"c")
        self.assertEquals(movie_updated.duration,180)

    def test_delete_person(self):
        models.Person.objects.create( first_name = "Joe" , last_name = "Doe", year_of_birth=1955)
        models.Person.objects.create( first_name = "Jane", last_name = "Doe", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jonathan", last_name = "Smith", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jerry", last_name = "Smith", year_of_birth=1971)
        # TODO: delete the record of jerry smith
        models.Person.objects.filter(first_name="Jerry",last_name="Smith").delete()
        self.assertEquals(models.Person.objects.count(),3)

    def test_filter_persons(self):
        eq = self.assertEquals # for convenience
        models.Person.objects.create( first_name = "Joe" , last_name = "Doe", year_of_birth=1955)
        models.Person.objects.create( first_name = "Jane", last_name = "Doe", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jonathan", last_name = "Smith", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jerry", last_name = "Smith", year_of_birth=1971)
        # TODO: Count the total number of persons
        total_number = models.Person.objects.count()
        total_number = models.Person.objects.all().count()
        eq(total_number,4)
        # TODO: Count the total number of persons with first name "Joe"
        count_joe = models.Person.objects.filter( first_name = "Joe" ).count()
        eq(count_joe,1)
        # TODO: Count the total number of persons born after 1970
        count_persons_born_after_1970 = models.Person.objects.filter( year_of_birth__gt = 1970 ).count()
        # The following does not work, as it is not supported by Python syntax.
        # models.Person.objects.filter( year_of_birth > 1970 ).count()
        eq(count_persons_born_after_1970,3)        
        # TODO: Count the total number of persons born after 1970 with last name "Smith"
        count_joe = models.Person.objects.filter( year_of_birth__gt = 1970 , last_name = "Smith"  ).count()
        eq(count_joe,2)

    def test_q_objects(self):
        eq = self.assertEquals # for convenience
        models.Person.objects.create( first_name = "Joe" , last_name = "Doe", year_of_birth=1955)
        models.Person.objects.create( first_name = "Jane", last_name = "Doe", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jonathan", last_name = "Smith", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jerry", last_name = "Smith", year_of_birth=1971)
        models.Person.objects.create( first_name = "Jerry", last_name = "Jason", year_of_birth=1994)
        # TODO: Filter Persons with last name Jason OR last name Smith
        # (Be aware, normally, we place the following import at the top of tests.py)
        from django.db.models import Q 
        persons = models.Person.objects.filter( Q(last_name="Jason") | Q(last_name="Smith")  )
        eq(persons.count(),3)

    def test_exclude_objects(self):
        eq = self.assertEquals # for convenience
        models.Person.objects.create( first_name = "Joe" , last_name = "Doe", year_of_birth=1955)
        models.Person.objects.create( first_name = "Jane", last_name = "Doe", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jonathan", last_name = "Smith", year_of_birth=1976)
        models.Person.objects.create( first_name = "Jerry", last_name = "Smith", year_of_birth=1971)
        models.Person.objects.create( first_name = "Jerry", last_name = "Jason", year_of_birth=1994)
        # TODO : Filter all persons that do NOT have the last name "Smith"
        persons = models.Person.objects.exclude( last_name="Smith" )
        eq(persons.count(),3)
        # TODO : Filter all Persons not named "Smith" (last name) and with first name "Jerry"
        persons = models.Person.objects.exclude(last_name="Smith").filter(first_name="Jerry")
        eq(persons.count(),1)

    def test_create_object_with_foreign_key_relation(self):
        eq = self.assertEquals # for convenience
        # TODO : Create a movie named "Blade Runner" and associate it with a country "USA"
        country = models.Country.objects.create(name="USA")
        movie   = models.Movie.objects.create(
            title="Blade Runner",
            genre="a",
            release_date=datetime.datetime(year=2018,day=1,month=1),
            plot="...",
            duration=100,
            black_and_white=False,
            country=country
        )
        eq(models.Movie.objects.count(),1)
        eq(models.Movie.objects.all()[0].title,"Blade Runner")
        eq(models.Movie.objects.all()[0].country.name,models.Country.objects.all()[0].name)
        # TODO: now , query all movies with country "USA":
        movies = models.Movie.objects.filter(country__name="USA")
        eq(movies.count(),1)
        # TODO: now, query all movies where the country starts with "U" (Field look up)
        movies = models.Movie.objects.filter(country__name__startswith="U")
        eq(movies.count(),1)
        # TODO: delete all movies with Country USA
        models.Movie.objects.filter(country__name="USA").delete()
        eq(models.Movie.objects.count(),0)

    def test_many_to_many_relations(self):
        eq = self.assertEquals # for convenience
        movie = models.Movie.objects.create(title = "Blade Runner", 
                                            genre = "a", 
                                            release_date=datetime.datetime(year=2018,month=1,day=1),
                                            plot="Lorem ipsum",
                                            duration=200,
                                            black_and_white=False)
        # TODO: Create a person "Harrison Ford" and add him as actor to the movie
        ford = models.Person.objects.create( first_name = "Harrison", last_name = "Ford", year_of_birth=1940)
        movie.actors.add(ford)
        eq(movie.actors.count(),1)
        # TODO: Now remove Harrison Ford from the list of actors:
        movie.actors.remove(models.Person.objects.get(first_name="Harrison",last_name="Ford"))
        eq(movie.actors.count(),0)

    def test_add_gender_field(self):
        eq = self.assertEquals # for convenience
        # TODO: Go to models.py and add a field "gender" to the model definition of class Person
        # make migrations and execute them. Make sure, that field "gender" is optional (thus null values 
        # are allowed) - gender could either be "m", "f" or "*" - you can model a choice field as it is 
        # done for "genre" in the movie model.

        # Once this is done, create a new person with gender female here:

        models.Person.objects.create( first_name = "Harrison", 
                                      last_name = "Ford", 
                                      gender = "f",
                                      year_of_birth=1940)

        eq(models.Person.objects.count(),1)
        eq(models.Person.objects.all()[0].gender,"f")


