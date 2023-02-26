from django.db import models
from apps.users.models import User
import uuid

class Profile(models.Model):
    id                  = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user                = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    mobile_number       = models.CharField(max_length=15, unique=True, blank=True, null=True)
    full_name           = models.CharField(max_length=50, default=None, blank=True, null=True)
    is_active           = models.BooleanField(default=True)
    image               = models.ImageField(null=True,blank=True,default='/profile.png')
    address             = models.CharField(max_length=50, default=None, blank=True, null=True)


    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profiles"

    def __str__(self):
        return (self.full_name)