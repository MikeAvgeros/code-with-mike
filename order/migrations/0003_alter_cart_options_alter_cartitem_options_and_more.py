# Generated by Django 4.0.3 on 2022-03-26 20:07

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0002_alter_order_payment_status'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='cart',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterModelOptions(
            name='cartitem',
            options={'verbose_name': 'Cart item'},
        ),
        migrations.AlterModelOptions(
            name='order',
            options={'ordering': ['created_at'], 'permissions': [('cancel_order', 'Can cancel order')]},
        ),
        migrations.AlterModelOptions(
            name='orderitem',
            options={'verbose_name': 'Order item'},
        ),
        migrations.AlterModelOptions(
            name='wishlist',
            options={'ordering': ['created_at'], 'verbose_name_plural': 'Wishlist'},
        ),
        migrations.AlterModelOptions(
            name='wishlistitem',
            options={'verbose_name': 'Wishlist item'},
        ),
        migrations.AddField(
            model_name='order',
            name='client_secret',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='orderitem',
            name='quantity',
            field=models.PositiveSmallIntegerField(default=1, validators=[django.core.validators.MinValueValidator(1)]),
        ),
    ]