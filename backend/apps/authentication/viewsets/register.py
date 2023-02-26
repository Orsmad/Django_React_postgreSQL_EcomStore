from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from apps.authentication.serializers import RegisterSerializer
from django.core.mail import send_mail
from django.conf import settings



class RegistrationViewSet(ViewSet):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        send_mail(
            'WELCOME',
            'This is just an example email for extra credit',
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[user.email],
            fail_silently=False,
        )
        print(user.email)

        refresh = RefreshToken.for_user(user)
        res = {
            # "refresh": str(refresh),
            "access": str(refresh.access_token),
        }
        response=res["access"]
        return Response(
            str(refresh.access_token)
        , status=status.HTTP_201_CREATED)