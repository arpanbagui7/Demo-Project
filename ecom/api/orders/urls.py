from rest_framework import routers
from django.urls import path, include
from .views import addOrder, OrdersViewSet

router = routers.DefaultRouter()
router.register(r'', OrdersViewSet)

urlpatterns = [
    path('addOrder/<str:id>/<str:token>', addOrder, name = 'Orders'),
    path('', include(router.urls))
]