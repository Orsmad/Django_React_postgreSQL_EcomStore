from django.db import models
import uuid
from apps.profiles.models import Profile
from apps.products.models import Product

class Order(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_date          = models.DateTimeField(auto_now_add=True, editable=False)
    profile             = models.ForeignKey(Profile,on_delete=models.CASCADE, blank=True, null=True,unique=False)


    class Meta:
        verbose_name = "Order"
        verbose_name_plural = "Orders"

    def __str__(self):
        return (self.id)

class OrderDetail(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order               = models.ForeignKey(Order,on_delete=models.CASCADE, blank=True, null=True,unique=False)
    quantity            = models.IntegerField(blank=True, null=True)
    product             = models.ForeignKey(Product,on_delete=models.CASCADE, blank=True, null=True,unique=False)


    class Meta:
        verbose_name = "OrderDetail"
        verbose_name_plural = "OrderDetails"

    def __str__(self):
        return (self.order,self.product)