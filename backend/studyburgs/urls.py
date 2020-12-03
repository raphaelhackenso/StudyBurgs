
from django.contrib import admin
from django.urls import include,path
from rest_framework import routers

# JWT
from django.conf.urls import url
from rest_framework_jwt.views import obtain_jwt_token

from .studyburgs import views

router = routers.DefaultRouter()
router.register(r'persons', views.PersonViewSet)
router.register(r'marriages', views.MarriageViewSet)
router.register(r'learneds', views.LearnedViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'notes', views.NotesViewSet)
router.register(r'tests',views.TestViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    url(r'^api-token-auth/', obtain_jwt_token),
]
