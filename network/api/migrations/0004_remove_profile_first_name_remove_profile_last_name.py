# Generated by Django 4.1.7 on 2023-04-07 15:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_profile_first_name_profile_last_name_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='profile',
            name='last_name',
        ),
    ]