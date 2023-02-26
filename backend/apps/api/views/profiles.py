
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from apps.profiles.serializers import ProfileSerializer
from apps.profiles.models import Profile
from apps.users.models import User

import logging

logger = logging.getLogger(__name__)

"""Profile views"""
@api_view(['GET',"DELETE","PUT"])
@permission_classes([IsAuthenticated])
def profile_detail(request):
    # get profile by id
    if request.method == "GET":
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(profile, many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    # update profile by id
    elif request.method == "PUT":
        try:
            profile = Profile.objects.get(user=request.user)
            serializer = ProfileSerializer(instance=profile, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # delete profile by id
    elif request.method == "DELETE":
        try:
            profile = Profile.objects.get(user=request.user)
            profile.is_active=False
            profile.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except :
                return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
