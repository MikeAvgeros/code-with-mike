import stripe
from django.conf import settings
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from .serializers import PaymentSerializer
from rest_framework.response import Response
from rest_framework import status

stripe.api_key = settings.STRIPE_SECRET_KEY


@permission_classes([permissions.IsAuthenticated])
class StripePayment(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            amount = data.get('amount')
            try:
                intent = stripe.PaymentIntent.create(
                    amount=amount,
                    currency='gbp',
                    automatic_payment_methods={
                        'enabled': True,
                    },
                )
                return Response({
                    'clientSecret': intent['client_secret']
                })
            except:
                return Response(
                    {'error':
                        'Something went wrong when creating a payment intent'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        return Response(
            {'error': 'The data you sent were empty or incorrect'},
            status=status.HTTP_400_BAD_REQUEST)
