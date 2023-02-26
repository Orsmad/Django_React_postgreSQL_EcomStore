


from django.db import models
from apps.categories.models import Category

# Create your models here.
class Product(models.Model):
    name                = models.CharField(max_length=60,  blank=True, null=True)
    description         = models.CharField(max_length=300,  blank=True, null=True)
    price               = models.IntegerField(blank=True, null=True)
    added_on            = models.DateTimeField(auto_now_add=True, editable=False)
    image               = models.ImageField(null=True,blank=True,default='/placeholder.png')
    is_active           = models.BooleanField(default=True)
    category            = models.ForeignKey(Category,on_delete=models.CASCADE, blank=True, null=True,unique=False)


    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def __str__(self):
        return (self.name)