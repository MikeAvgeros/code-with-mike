# Generated by Django 4.0.1 on 2022-01-30 18:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_alter_category_options_alter_product_options_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ('name',), 'verbose_name_plural': 'Categories'},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ('-last_update',)},
        ),
        migrations.AlterModelOptions(
            name='promotion',
            options={'ordering': ('discount',)},
        ),
        migrations.RemoveField(
            model_name='product',
            name='created_at',
        ),
        migrations.AlterField(
            model_name='category',
            name='slug',
            field=models.SlugField(),
        ),
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.category'),
        ),
        migrations.AlterField(
            model_name='product',
            name='promotion',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='store.promotion'),
        ),
        migrations.AlterField(
            model_name='promotion',
            name='name',
            field=models.CharField(max_length=255, unique=True),
        ),
    ]
