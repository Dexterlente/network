# Generated by Django 4.1.7 on 2023-03-30 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='following',
            field=models.ManyToManyField(related_name='followed_profiles', to='api.profile'),
        ),
    ]
