from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializers

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializers
    queryset = Product.objects.all().order_by('name')