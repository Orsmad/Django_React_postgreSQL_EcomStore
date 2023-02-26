from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    

    class Meta:
        model = Product 
        fields = ['id','name', 'price', 'added_on', 'image', 'is_active', 'category','image','description']


    
    def create(self, validated_data):
        return Product.objects.create(**validated_data)

    