from django.db import models
import uuid
from apps.profiles.models import Profile
from apps.products.models import Product
from .choices import REVIEWS_RATING_CHOICES

class Review(models.Model):
    id              = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile         = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True, null=True)
    product         = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True, null=True)
    content         = models.CharField(max_length=256, blank=True, null=True)
    rating          = models.CharField(max_length=50, choices=REVIEWS_RATING_CHOICES, blank=True, null=True)
    is_active       = models.BooleanField(default=True)
    pub_date        = models.DateTimeField(auto_now_add=True, editable=False, blank=True, null=True)



    class Meta:
        verbose_name = "Review"
        verbose_name_plural = "Reviews"

    def __str__(self):
        return (f'content: {self.content}')