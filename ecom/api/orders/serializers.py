from rest_framework import serializers
from .models import Orders

class OrdersSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Orders
        fields = ('user')