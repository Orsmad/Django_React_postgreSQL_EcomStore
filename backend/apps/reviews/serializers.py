from rest_framework import serializers
from .models import Review
from drf_writable_nested import WritableNestedModelSerializer 
from apps.products.serializers import ProductSerializer
from apps.products.models import Product

from apps.profiles.serializers import ProfileSerializer


class ReviewSerializer(serializers.ModelSerializer):


    class Meta:
        model = Review 
        fields = ['id','profile','product','content','rating','is_active']


    def create(self, validated_data):
        return Review.objects.create(**validated_data,profile=self.context['user'].profile ) 




