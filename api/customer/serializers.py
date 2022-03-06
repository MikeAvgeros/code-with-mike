from djoser.serializers import (UserSerializer as BaseUserSerializer, 
                                UserCreatePasswordRetypeSerializer)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Customer

User=get_user_model()

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
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
        ]

class CustomerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'user',
            'phone',
            'birth_date',
            'country',
            'image',
            'customer_type'
        ]