from rest_framework import routers
from django.urls import path, include
from .views import UserViewSet, signin, signout

router = routers.DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [
    path('login/', signin, name = 'Sign In'),
    path('logout/<str:id>/', signout, name = 'Sign Out'),
    path('', include(router.urls))
]