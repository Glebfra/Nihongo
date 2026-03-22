from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import DictionarySerializer


class DictionaryCreateAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = DictionarySerializer

    def post(self, request: Request, format=None):
        user = request.user

        serializer = self.serializer_class(data=request.data)
        if not serializer.is_valid():
            return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        serializer.validated_data['created_by'] = user
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
