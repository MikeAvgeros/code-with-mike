from djoser.serializers import (UserSerializer as BaseUserSerializer,
                                UserCreatePasswordRetypeSerializer)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Customer

User = get_user_model()


class CreateUserSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        fields = [
            'id',
            'username',
            'email',
            'password',
            're_password'
        ]


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = [
            'username',
            'email',
        ]


class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'user',
            'first_name',
            'last_name',
            'phone',
            'birth_date',
            'country',
            'image',
            'customer_type',
            'wishlist'
        ]


class UpdateCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            'first_name',
            'last_name',
            'phone',
            'birth_date',
            'country',
            'image',
            'customer_type',
        ]
