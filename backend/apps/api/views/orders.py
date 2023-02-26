
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from apps.profiles.models import Profile
from apps.products.models import Product
from apps.orders.models import Order, OrderDetail
from apps.orders.serializers import OrderSerializer, OrderDetailSerializer
from apps.products.serializers import ProductSerializer
import logging

logger = logging.getLogger(__name__)


"""Orders views"""
@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def order_detail(request):  
    if request.method == "POST":
            print(request.data)
        # try:
            order=Order.objects.create(profile=request.user.profile)
            order.save()
            # print(type(product))
            
            serializer = OrderDetailSerializer(data=request.data, context={'order':order.id},many=True)
            if serializer.is_valid():
                    serializer.save()
            else: return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            # print(product['prodcut_id'])
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # except: return Response( status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        try:
            orders = Order.objects.filter(profile=request.user.profile)
            serializer = OrderSerializer(orders, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

