from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework import viewsets
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.tokens import RefreshToken
from apps.users.models import User
from apps.users.serializers import UserSerializer


class RefreshViewSet(viewsets.ViewSet, TokenRefreshView):
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        refresh_token_obj = RefreshToken(request.data['refresh'])
        user_id=refresh_token_obj['user_id']
        user = User.objects.get(id=user_id)
        user_serializer = UserSerializer(user)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        return Response({
            "refresh": serializer.validated_data["refresh"],
            "token": serializer.validated_data["access"],
            "user": user_serializer.data
        }, status=status.HTTP_200_OK)