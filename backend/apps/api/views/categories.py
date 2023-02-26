
from rest_framework.permissions import IsAdminUser, IsAuthenticated,IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from apps.categories.serializers import CategorySerializer
from apps.categories.models import Category
from apps.products.models import Product
import logging

logger = logging.getLogger(__name__)

""""Categories Views"""

"""Get all"""
@api_view(['GET'])
def get_categories(request):
    if request.method == "GET":
        categories = Category.objects.filter(is_active=True)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_categories_admin(request):
    if request.method == "GET":
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


"""CRUD Methods for Admins"""
@api_view(["DELETE","PUT","POST"])
@permission_classes([IsAdminUser])
def category_edit(request,pk):
    # Post Category
    if request.method == "POST":
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    # update Category by id
    elif request.method == "PUT":
        try:
            category = Category.objects.get(id=pk)
            serializer = CategorySerializer(instance=category, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # delete Category by id
    elif request.method == "DELETE":
        try:
            category_recieved = Category.objects.get(id=pk)
            category_recieved.is_active=False
            category_recieved.save()
            products = Product.objects.filter(category=category_recieved)
            for product in products:
                product.is_active= False
                product.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


"""Renew Category Admins"""
@api_view(["POST"])
@permission_classes([IsAdminUser])
def category_reactive(request,pk):
    if request.method == "POST":
        try:
            category_recieved = Category.objects.get(id=pk)
            category_recieved.is_active=True
            category_recieved.save()
            products = Product.objects.filter(category=category_recieved)
            for product in products:
                product.is_active= True
                product.save()
            serializer = CategorySerializer(category_recieved, many=False)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)