from django.conf import settings
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import DeleteUserSerializer, RegisterSerializer, UserSerializer


def response_error(serializer_error: dict, error: dict) -> Response:
    if settings.DEBUG:
        return Response(serializer_error, status=status.HTTP_400_BAD_REQUEST)
    return Response(error, status=status.HTTP_400_BAD_REQUEST)


class UserAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    @staticmethod
    def get(request: Request, format=None) -> Response:
        serializer = UserSerializer(instance=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @staticmethod
    def delete(request: Request, format=None) -> Response:
        serializer = DeleteUserSerializer(data=request.data)
        if not serializer.is_valid():
            return response_error(serializer.errors, {'Error': 'Invalid data'})

        password = serializer.validated_data.get('password')
        user: User = request.user
        if user.check_password(password):
            user.delete()
            return Response({'message': 'User successfully deleted'}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)


class RegisterUserAPIView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request: Request, format=None) -> Response:
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return response_error(serializer.errors, {'Error': 'Invalid data'})
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
