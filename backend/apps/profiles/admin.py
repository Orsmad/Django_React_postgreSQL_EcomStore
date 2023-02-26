from django.contrib import admin
from .models import Profile

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user','mobile_number','full_name')


admin.site.register(Profile,ProfileAdmin)