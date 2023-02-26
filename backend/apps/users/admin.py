from django.contrib import admin
from apps.users.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('email','is_active','is_staff','created','updated')
    

admin.site.register(User,UserAdmin)