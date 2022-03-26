from django.db import models


class Payment(models.Model):
    amount = models.IntegerField()
