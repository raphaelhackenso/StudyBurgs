from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.exceptions import PermissionDenied
from . import serializers
from . import models

#TODO PERSMISIONS
# -------------------
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


# -------------------
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


# -------------------
class LearnedViewSet(viewsets.ModelViewSet):
    queryset = models.Learned.objects.all()
    #permission_classes = (DjangoModelPermissions,)
    serializer_class = serializers.LearnedSerializer

    def list(self, request):

        queryset = self.filter_queryset(self.get_queryset())

        return Response(self.serializer_class(queryset, many=True).data)

    def get_queryset(self):
        user = self.request.user

        if user is not None:
            if not user.is_superuser:
                return self.queryset.filter(learned_for_user=user)
            else:
                return self.queryset
        else:
            return self.queryset.none()


# -------------------
class StudyBurgsUserViewSet(viewsets.ModelViewSet):
    queryset = models.StudyburgsUser.objects.all()
    serializer_class = serializers.StudyburgsUserSerializer

    def list(self, request):

        queryset = self.filter_queryset(self.get_queryset())

        return Response(self.serializer_class(queryset, many=True).data)



    def get_queryset(self):
        user = self.request.user

        if user is not None:
            if not user.is_superuser:
                return self.queryset.filter(pk=user.pk)
            else:
                return self.queryset
        else:
            return self.queryset.none()


# -------------------
class NotesViewSet(viewsets.ModelViewSet):
    queryset = models.Notes.objects.all()

    serializer_class = serializers.NotesSerializer
