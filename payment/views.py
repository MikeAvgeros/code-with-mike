import os
import stripe
from django.conf import settings
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect

stripe.api_key = os.environ.get('STRIPE_SECRET_KEY')

@permission_classes([permissions.IsAuthenticated])
class StripeCheckout(APIView):
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card', ],
                line_items=[
                    {
                        'price': 'price_xxxx',
                        'quantity': 1,
                    },
                ],
                mode='payment',
                success_url=settings.SITE_URL +
                '/?success=true&session_id={CHECKOUT_SESSION_ID}',
                cancel_url=settings.SITE_URL + '/?canceled=true',
            )
            return redirect(checkout_session.url)
        except:
            return Response(
                {'error': 'Something went wrong when creating stripe checkout session'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
