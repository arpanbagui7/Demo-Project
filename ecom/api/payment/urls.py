from django.urls import path, include
from .views import generate_token, payment_process


urlpatterns = [
    path('gettoken/<str:id>/<str:token>/',generate_token, name="Payement_Token"),
    path('paymentprocess/<str:id>/<str:token>/', payment_process, name = 'Payement_Process'),
]