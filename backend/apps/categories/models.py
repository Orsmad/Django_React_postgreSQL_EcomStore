from django.db import models
class Category(models.Model):
    name                = models.CharField(max_length=100,  blank=True, null=True)
    is_active           = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return (self.name)
