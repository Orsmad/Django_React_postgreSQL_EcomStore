
# Register your models here.
from django.contrib import admin
from .models import Product

# class ProductAdmin(admin.ModelAdmin):
# #     list_display = ('user','full_name','mobile_number')
# 
admin.site.register(Product)