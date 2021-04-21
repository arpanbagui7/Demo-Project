from rest_framework import serializers
from .models import Product

class ProductSerializers(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(max_length = None, allow_empty_file = False, allow_null = True, use_url = True, required = False)
    class Meta():
        model = Product
        fields = ('id', 'name', 'description', 'price', 'stock', 'image', 'category')