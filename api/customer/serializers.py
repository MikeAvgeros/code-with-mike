from djoser.serializers import (UserSerializer as BaseUserSerializer, 
                                UserCreateSerializer)
from rest_framework import serializers
from .models import Customer

class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        fields = [
            'id', 
            'username', 
            'password', 
            'email', 
            'first_name',
            'last_name'
        ]

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields = [
            'id',
            'username',
            'email',
            'first_name',
            'last_name'
        ]

class CustomerSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Customer
        fields = [
            'id',
            'user_id',
            'phone',
            'birth_date',
            'country',
            "image",
            "get_image",
            "get_thumbnail",
            'customer_type'
        ]