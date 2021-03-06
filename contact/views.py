from rest_framework import views, status
from .serializers import ContactSerializer, ReceiptSerializer
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
                f'Email from {name} at {email}',
                message,
                email,
                [settings.EMAIL_HOST_USER],
            )
            send_mail(
                f'Email from codewithmike',
                'Thank you for getting in touch with us.',
                settings.EMAIL_HOST_USER,
                [email],
            )
            return Response({'success': 'Email Sent'})
        return Response(
            {'error': 'The data you sent were empty or incorrect'},
            status=status.HTTP_400_BAD_REQUEST)


class ReceiptView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = ReceiptSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            email = data.get('email')
            message = data.get('message')
            send_mail(
                f'Receipt from codewithmike',
                message,
                settings.EMAIL_HOST_USER,
                [email],
            )
