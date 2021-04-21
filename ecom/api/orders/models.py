from django.db import models
from api.user.models import CustomUser
from api.product.models import Product

# Create your models here.
class Orders(models.Model):
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE, blank = True, null = True)
    product_details = models.CharField(max_length = 500)
    total_products = models.IntegerField(default = 0)  
    transaction_id = models.CharField(max_length = 150)
    total_amount = models.IntegerField(default = 0)
    createdAt = models.DateField(auto_now_add = True)
    updatedAt = models.DateField(auto_now = True)
    
    def __str__(self):
        return self.product_details[:50]