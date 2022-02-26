from djoser.serializers import (UserSerializer as BaseUserSerializer, 
                                UserCreatePasswordRetypeSerializer)
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Customer
User=get_user_model()

class CreateUserSerializer(UserCreatePasswordRetypeSerializer):
    class Meta(UserCreatePasswordRetypeSerializer.Meta):
        model = User
        fields = [
            'id',
            'username',
            'email', 
            'password',
            're_password'
        ]

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = [
            'id',
            'username',
            'email',
        ]

class ShortUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    user = ShortUserSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'user_id',
            'user',
            'phone',
            'birth_date',
            'country',
            'image',
            'customer_type'
        ]