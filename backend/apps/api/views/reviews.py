
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from apps.reviews.models import Review
from apps.reviews.serializers import ReviewSerializer
from apps.profiles.models import Profile
from apps.products.models import Product
from apps.orders.models import Order,OrderDetail
from functools import wraps
from django.shortcuts import get_object_or_404
from django.http import HttpResponseForbidden

import logging

logger = logging.getLogger(__name__)


""""Reviews Views"""


"""Get all by product id"""
@api_view(['GET'])
def review_list_pub(request,product_pk):
    if request.method == "GET":
        try:
            product_recived = Product.objects.get(id=product_pk)
            reviews = Review.objects.filter(product=product_recived,is_active=True)
            # print(reviews.count())
            if reviews.count() == 0:
                return Response([],status=status.HTTP_204_NO_CONTENT)
            elif reviews.count()>0:
                serializer = ReviewSerializer(reviews, many=True)
                return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


"""CUD Methods"""
@api_view(["DELETE","PUT"])
@permission_classes([IsAuthenticated])
def review_detail(request,pk):
    # update Product by id
    if request.method == "PUT":
        try:
            review = Review.objects.get(id=pk)
            serializer = ReviewSerializer(instance=review, data=request.data)
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
            review = Review.objects.get(id=pk)
            review.is_active=False
            review.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
""""Get users reviews"""
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_reviews(request):
    if request.method == "GET":
        try:
            # profile_recieved = Profile.objects.filter(user=request.user)
            reviews = Review.objects.filter(profile=request.user.profile,is_active=True)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


"""can post decorator"""
def can_post_dec(function):
    # checks if user can post a review before posting as a decorator
    @wraps(function)
    def wrap(request, *args, **kwargs):
        product_pk = request.data['product']
        orders = Order.objects.filter(profile=request.user.profile)
        product = get_object_or_404(Product, id=product_pk)
        for order in orders:
            order_det = OrderDetail.objects.filter(order=order, product=product)
            if order_det:
                return function(request, *args, **kwargs)
        return HttpResponseForbidden()
    return wrap


"""Post a review"""
@api_view(["POST"])
@permission_classes([IsAuthenticated])
@can_post_dec
def post_review(request):
     # post method 
    if request.method == "POST":
        serializer = ReviewSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    """method for the frontend to check if a user can buy a product"""
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def can_post(request,product_pk):
    if request.method == "GET":
        try:
            orders=Order.objects.filter(profile=request.user.profile)
            product = Product.objects.get(id=product_pk)
            for order in orders:
             order_det=OrderDetail.objects.filter(order=order,product=product)
             if order_det:
                return Response(status=status.HTTP_200_OK)
             else: continue
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except:return Response(status=status.HTTP_401_UNAUTHORIZED)
    
# def genorr(request):
#     if request.method == "GET":
#         prods=Product.objects.all()
#         for prod in prods:
#             review = Review(profile= Profile.objects.get(id="a0f96b7508204f99bdb52fae24a968b9"),
#             product         = prod,
#             content         = "This product is a game changer! It exceeded my expectations and delivered outstanding results. Highly recommend it to anyone looking for top-notch quality.",
#             rating="5" )
#             review.save()
#     return Response("nice")

