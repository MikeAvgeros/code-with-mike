from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as Admin
from .models import User, Customer

@admin.register(User)
class UserAdmin(Admin):
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'username', 
                'password1', 
                'password2', 
                'email', 
                'first_name', 
                'last_name'),
        }),
    )
    list_display = ['username', 'email']


admin.site.register(Customer)
