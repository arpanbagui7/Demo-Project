from rest_framework import viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Orders
from .serializers import OrdersSerializers
from django.contrib.auth import get_user_model

# Create your views here.
def isValidUser(id, token):
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk = id)
        if user.session_token is token:
            return True
        return False
    except UserModel.DoesNotExist:
       return False

@csrf_exempt
def addOrder(request, id, token):
    if not isValidUser(id, token):
        return JsonResponse({'Error' : 'Please Re-Login'})
    userId = id
    transaction_id = request.POST['transaction_id']
    total_amount = request.POST['total_amount']
    products = request.POST['products']
    total_products = len(products.split(','))
    
    UserModel = get_user_model()
    try:
         user = UserModel.objects.get(pk = id)
         order = Orders(user = user, product_details = products, total_products = total_products, transaction_id = transaction_id, total_amount = total_amount)
         order.save()
         return JsonResponse({'Message' : 'Order placed Successfully'})
    except UserModel.DoesNotExist:
        return JsonResponse({'Error' : 'Invalid User'})

class OrdersViewSet(viewsets.ModelViewSet):
    serializer_class = OrdersSerializers
    queryset = Orders.objects.all().order_by('updatedAt')