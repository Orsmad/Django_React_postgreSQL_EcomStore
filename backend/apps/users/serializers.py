from apps.users.models import User
from rest_framework import serializers
from django.contrib.auth.models import Group

class GroupModelSerializer(serializers.ModelSerializer):
        name = serializers.SerializerMethodField()
        class Meta:
            model = Group
            fields = ['name']
            extra_kwargs = {
                'name': {'validators': []},
            }
        def get_name(self, obj):
            """
            This method modifies the way the name field is returned in a get request.
            """
            return [group.name for group in obj.objects.all()]


class UserSerializer(serializers.ModelSerializer):
    user_group = serializers.ReadOnlyField(source='group.name')
    
    class Meta:
        model = User
        fields = ['id', 'email', 'is_active', 'created', 'updated','user_group','is_staff']
        read_only_field = ['is_active', 'created', 'updated','user_group','is_staff']
