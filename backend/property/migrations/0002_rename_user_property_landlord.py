# Generated by Django 5.0.6 on 2024-05-28 11:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('property', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='property',
            old_name='user',
            new_name='landlord',
        ),
    ]