
from rest_framework.permissions import IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from apps.products.models import Product
from apps.products.serializers import ProductSerializer
from apps.categories.models import Category
import logging

logger = logging.getLogger(__name__)


""""Categories Views"""


"""Get all"""
@api_view(['GET'])
def product_list(request):
    # get all or by id route
    if request.method == "GET":
        products = Product.objects.filter(is_active=True)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    
"""Get all"""
@api_view(['GET'])
def product_by_id(request,pk):
    # get all or by id route
    if request.method == "GET":
        products = Product.objects.get(id=pk)
        serializer = ProductSerializer(products, many=False)
        return Response(serializer.data)

"""Get all by category id"""
@api_view(['GET'])
def product_list_by_cat_id(request,category_id):
    # get all or by id route
    if request.method == "GET":
        category_recieved =Category.objects.get(id=category_id)
        products = Product.objects.filter(is_active=True,category=category_recieved)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def post_product(request):
     # post method 
    if request.method == "POST":
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

"""Get all admins"""
@api_view(['GET','POST'])
@permission_classes([IsAdminUser])
def product_list_admin(request):
    # get all or by id route
    if request.method == "GET":
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

     # post method 
    elif request.method == "POST":
        # serializer = ProductSerializer(data=request.data, context={'category': request.data['category']})
        serializer = ProductSerializer(data=request.data, context={'category': request.data['category']})

        # print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   
"""Reactive Product for Admins"""
@api_view(['POST'])
@permission_classes([IsAdminUser])
def product_reactive(request,pk):
    # get Product by id
    if request.method == "POST":
        try:
            product = Product.objects.get(id=pk)
            product.is_active=True
            product.save()
            serializer = ProductSerializer(product, many=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

     
"""CRUDD Methods for Admins"""
@api_view(["DELETE","PUT","GET",])
@permission_classes([IsAdminUser])
def product_detail(request,pk):
    # get Product by id
    # if request.method == "GET":
    #     try:
    #         products = Product.objects.get(id=pk)
    #         serializer = ProductSerializer(products, many=False)
    #         return Response(serializer.data)
    #     except:
    #         return Response(status=status.HTTP_404_NOT_FOUND)
   
   
    
    # update Product by id
    if request.method == "PUT":
        try:
            product = Product.objects.get(id=pk)
            serializer = ProductSerializer(instance=product, data=request.data, context={'user': request.user})
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # delete Product by id
    elif request.method == "DELETE":
        try:
            product = Product.objects.get(id=pk)
            product.is_active=False
            product.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
