from django.contrib import admin
from .models import Order, OrderDetail
# Register your models here.
admin.site.register(OrderDetail)
admin.site.register(Order)