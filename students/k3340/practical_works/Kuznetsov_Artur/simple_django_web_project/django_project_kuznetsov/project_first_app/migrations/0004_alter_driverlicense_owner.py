# Generated by Django 5.1.2 on 2024-11-12 15:23

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('project_first_app', '0003_alter_ownership_car_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='driverlicense',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='driverlicense', to=settings.AUTH_USER_MODEL),
        ),
    ]