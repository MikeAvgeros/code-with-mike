from rest_framework import views, status
from .serializers import ContactSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.response import Response


class ContactView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            email = data.get('email')
            name = data.get('name')
            message = data.get('message')
            send_mail(
                f'Email from {name}',
                message,
                email,
                [settings.EMAIL_HOST_USER],
            )
            return Response({"success": "Sent"})
        return Response({'success': "Failed"}, status=status.HTTP_400_BAD_REQUEST)
