# Generated by Django 4.1.7 on 2023-04-15 20:29

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_profile_joined_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='followers',
        ),
        migrations.AddField(
            model_name='profile',
            name='following',
            field=models.ManyToManyField(related_name='followers', to=settings.AUTH_USER_MODEL),
        ),
    ]
