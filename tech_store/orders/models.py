from django.db import models
from django.utils import timezone
from datetime import timedelta
from decimal import Decimal

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def discounted_price(self):
        if self.created_at < timezone.now() - timedelta(days=30):
            return self.price * Decimal('0.8')  # 20% знижка
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
