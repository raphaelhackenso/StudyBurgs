# Generated by Django 3.1.4 on 2021-01-28 14:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studyburgs', '0009_auto_20210128_1516'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='birthplace',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='description',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='name_suffix',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='ordinal_number',
            field=models.TextField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='person',
            name='picture_url',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
