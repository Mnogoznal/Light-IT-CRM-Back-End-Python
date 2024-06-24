from django.test import TestCase
from django.utils import timezone
from .models import Product, Order
from datetime import timedelta
from decimal import Decimal

class ProductModelTest(TestCase):
    def test_discounted_price(self):
        # Создаем продукт
        product = Product.objects.create(name='Test Product', price=Decimal('100.00'))
        # Обновляем дату создания продукта на более чем месяц назад
        Product.objects.filter(id=product.id).update(created_at=timezone.now() - timedelta(days=31))
        # Обновляем объект продукта
        product.refresh_from_db()
        # Проверяем, что цена со скидкой 80
        self.assertEqual(product.discounted_price, Decimal('80.00'))  # 20% скидка

class OrderModelTest(TestCase):
    def test_order_creation(self):
        product = Product.objects.create(name='Test Product', price=Decimal('100.00'))
        order = Order.objects.create(product=product)
        self.assertEqual(order.status, 'new')
