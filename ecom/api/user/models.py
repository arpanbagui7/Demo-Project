from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
# Create your models here.

def validatePhoneNo(value):
    if(len(str(value)) == 10):
        return value
    else:
        raise ValidationError('Phone Number must be 10 digits')

class CustomUser(AbstractUser):
    name = models.CharField(max_length = 50)
    email = models.EmailField(max_length = 254, unique = True)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['dateOfBirth', 'phone']

    dateOfBirth = models.DateField()
    phone = models.IntegerField(validators = [validatePhoneNo])
    gender = models.CharField(max_length = 10, blank = True, null = True)
    session_token = models.CharField(max_length = 10, default = 0)
    createdAt = models.DateField(auto_now_add = True)
    updatedAt = models.DateField(auto_now = True)

