# Generated by Django 5.0.6 on 2024-06-24 02:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Invoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('issue_date', models.DateField(auto_now_add=True)),
                ('due_date', models.DateField()),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('status', models.CharField(choices=[('paid', 'Paid'), ('unpaid', 'Unpaid')], default='unpaid', max_length=20)),
                ('order', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='orders.order')),
            ],
        ),
    ]
