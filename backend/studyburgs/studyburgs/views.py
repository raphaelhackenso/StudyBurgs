from rest_framework import viewsets
from rest_framework.response import Response
from . import serializers
from . import models


class TestViewSet(viewsets.ModelViewSet):
    queryset = models.Test.objects.all()

    serializer_class = serializers.TestSerializer


class PersonViewSet(viewsets.ModelViewSet):
    queryset = models.Person.objects.all()

    serializer_class = serializers.PersonSerializer


class MarriageViewSet(viewsets.ModelViewSet):
    queryset = models.Marriage.objects.all()

    serializer_class = serializers.MarriageSerializer

class LearnedViewSet(viewsets.ModelViewSet):
    queryset = models.Learned.objects.all()

    serializer_class = serializers.LearnedSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()

    serializer_class = serializers.UserSerializer


class NotesViewSet(viewsets.ModelViewSet):
    queryset = models.Notes.objects.all()

    serializer_class = serializers.NotesSerializer


#BIG TODO -> for now we just give back everything without serarching

'''

class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()

    serializer_class = serializers.CountrySerializer

    def list(self, request):
        name = request.GET.get("name")
        queryset = self.filter_queryset(self.get_queryset())
        if name is None:
            serializer = self.serializer_class(queryset, many=True)
        else:
            serializer = self.serializer_class(queryset.filter(name=name), many=True)
        return Response(serializer.data)
        
        
'''

'''

class MovieViewSet(viewsets.ModelViewSet):
    queryset = models.Movie.objects.all()

    serializer_class = serializers.MovieSerializer

    def list(self, request):
        title = request.GET.get("title")  # if not "title" is given the get method returns None
        country = request.GET.get("country")  # if not "title" is given the get method returns None
        # store a reference to the queryset in a local 
        # variable:
        queryset = self.filter_queryset(self.get_queryset())
        if title is not None:
            # If title is given, filter the query 
            queryset = queryset.filter(title=title)
        if country is not None:
            # query chaining: If the country is given too, 
            # apply another filter to our local query_set
            queryset = queryset.filter(country__name=country)
        # Return the JSON response: Apply the serializer to our 
        # queryset stored in the local queryset:
        return Response(self.serializer_class(queryset, many=True).data)
'''
