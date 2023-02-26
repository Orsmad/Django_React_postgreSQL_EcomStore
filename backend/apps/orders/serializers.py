from rest_framework import serializers
from .models import Order, OrderDetail
from apps.profiles.models import Profile
from apps.profiles.serializers import ProfileSerializer
from apps.products.serializers import ProductSerializer
from apps.products.models import Product
from drf_writable_nested.serializers import WritableNestedModelSerializer



class OrderSerializer(serializers.ModelSerializer):

    # profile = ProfileSerializer(read_only=True)

    class Meta:
        model = Order 
        fields = ['id','order_date','profile']

    # def create(self, validated_data):
    #     return Product.objects.create(**validated_data,profile=Profile.objects.get(user=self.context['user']  ))

    # def update(self, instance, validated_data):
    #     instance.name = validated_data.get('name', instance.name)
    #     instance.price = validated_data.get('price', instance.price)
    #     instance.image = validated_data.get('image', instance.image)
    #     instance.save()
    #     return instance\

class OrderDetailSerializer(serializers.ModelSerializer):
    # order=OrderSerializer(read_only=True)
    # product= ProductSerializer(read_only=True)


    class Meta:
        model = OrderDetail 
        fields = ['id','order','quantity','product']



    def create(self, validated_data):
        # print("pro",self.context['product']['id'])
        print(validated_data)

        return OrderDetail.objects.create(**validated_data,order=Order.objects.get(id=self.context['order'])) 
