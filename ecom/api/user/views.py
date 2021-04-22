from rest_framework import viewsets
from rest_framework.permissions import AllowAny
import random
import re
from django.http import JsonResponse
from django.contrib.auth import get_user_model, login, logout
from django.views.decorators.csrf import csrf_exempt
from .models import CustomUser
from .serializers import UserSerializers
# Create your views here.

def session_generate_token(length = 10):
    return ''.join(random.SystemRandom().choice([chr(char) for char in range(97, 123)] + [str(number) for number in range(10)]) for _ in range(length))

@csrf_exempt
def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'Error' : 'You need to pass POST request with valid parameters only'})
    username = request.POST['email']
    password = request.POST['password']
    if not re.match('^[\w\.-]+@[\w\.-]+\.\w{2,4}$', username):
        return JsonResponse({'Error' : 'Provide a valid Email'})
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(email = username)
        if user.check_password(password):
            userDict = UserModel.objects.filter(email = username).values().first()
            userDict.pop('password')
            if user.session_token != '0' :
                user.session_token = '0'
                user.save()
                return JsonResponse({'message' : 'Previous Session Exist'})
            token = session_generate_token(10)
            user.session_token = token
            user.save()
            login(request, user)
            return JsonResponse({'token' : token, 'user' : userDict})
        else:
            return JsonResponse({'Error' : 'Password does not match'})


    except UserModel.DoesNotExist:
        return JsonResponse({'Error' : 'User does not exist'})

def signout(request, id):
    logout(request)
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk = id)
        user.session_token = "0"
        user.save()
    except UserModel.DoesNotExist:
        return JsonResponse({'Error' : 'Invalid User'})
    return JsonResponse({'Message' : 'Logout successfully'})

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializers
    queryset = CustomUser.objects.all().order_by('id')

    permission_classes_by_action = {'create': [AllowAny]}
    def get_permissions(self):
        try:
            # return permission_classes depending on `action` 
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError: 
            # action is not set return default permission_classes
            return [permission() for permission in self.permission_classes]