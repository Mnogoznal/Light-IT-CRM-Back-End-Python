# orders/models.py

from django.db import models
from django.utils import timezone
from datetime import timedelta, datetime
from decimal import Decimal

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def discounted_price(self):
        if self.created_at < timezone.now() - timedelta(days=30):
            return self.price * Decimal('0.8')  # 20% discount
        return self.price

    def __str__(self):
        return self.name

class Order(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('processed', 'Processed'),
        ('completed', 'Completed'),
        ('paid', 'Paid'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} - {self.product.name}"

class Invoice(models.Model):
    STATUS_CHOICES = Order.STATUS_CHOICES  # Используем те же статусы, что и в Order
    
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    issue_date = models.DateField(auto_now_add=True)
    due_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='new')

    @property
    def total_amount(self):
        return self.order.product.discounted_price

    def save(self, *args, **kwargs):
        if not self.due_date:
            self.due_date = self.issue_date + timedelta(days=30)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Invoice {self.id} for Order {self.order.id}"
