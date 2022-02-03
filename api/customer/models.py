from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models

class UserManager(UserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('User must have an email address')

        user = self.model(
            email = self.normalize_email(email),
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password=password)
        user.is_admin = True
        user.save()
        return user


class User(AbstractUser):
    objects = UserManager()
    email = models.EmailField(unique=True, db_index=True)
    created = models.DateTimeField(auto_now_add=True)
    last_update = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'

    ordering = ('created',)

    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    def get_short_name(self):
        return self.email

    def get_full_name(self):
        return self.email

    def __unicode__(self):
        return self.email


class Customer(models.Model):
    user = models.OneToOneField(User)
    first_name = models.CharField(max_length=120, blank=False)
    last_name = models.CharField(max_length=120, blank=False)
    phone = models.CharField(blank=True, null=True)
    country = models.CharField(blank=True, null=True)

    def __str__(self):
        return f'Profile of user: {self.user.email}'
