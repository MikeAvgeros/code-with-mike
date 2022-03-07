from django.contrib import admin
from .models import (Cart, CartItem, 
    WishList, WishListItem, Order, OrderItem)

admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(WishList)
admin.site.register(WishListItem)
admin.site.register(Order)
admin.site.register(OrderItem)
