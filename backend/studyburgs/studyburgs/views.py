from rest_framework import viewsets
from rest_framework.response import Response
from . import serializers
from . import models


class PersonViewSet(viewsets.ModelViewSet):
    queryset = models.Person.objects.all()

    serializer_class = serializers.PersonSerializer

    def list(self, request):
        first_name = request.GET.get("first_name")
        queryset = self.filter_queryset(self.get_queryset())
        if first_name is None:
            serializer = self.serializer_class(queryset, many=True)
        else:
            serializer = self.serializer_class(queryset.filter(name=first_name), many=True)
        return Response(serializer.data)


class MarriageViewSet(viewsets.ModelViewSet):
    queryset = models.Marriage.objects.all()

    serializer_class = serializers.MarriageSerializer

    def list(self, request):
        wife = request.GET.get("wife")
        husband = request.GET.get("husband")

        queryset = self.filter_queryset(self.get_queryset())

        if wife is not None:
            queryset = queryset.filter(person__first_name=wife)
        if husband is not None:
            queryset = queryset.filter(person__first_name=husband)
        return Response(self.serializer_class(queryset, many=True).data)



class LearnedViewSet(viewsets.ModelViewSet):
    queryset = models.Learned.objects.all()

    serializer_class = serializers.LearnedSerializer



class StudyBurgsUserViewSet(viewsets.ModelViewSet):
    queryset = models.StudyburgsUser.objects.all()

    serializer_class = serializers.StudyburgsUserSerializer


class NotesViewSet(viewsets.ModelViewSet):
    queryset = models.Notes.objects.all()

    serializer_class = serializers.NotesSerializer
