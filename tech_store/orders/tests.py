from django.test import TestCase
from .models import Product, Order

class ProductModelTest(TestCase):
    def test_discounted_price(self):
        product = Product.objects.create(name='Test Product', price=100, created_at='2024-01-01T00:00:00Z')
        self.assertEqual(product.discounted_price, 80)

class OrderModelTest(TestCase):
    def test_order_creation(self):
        product = Product.objects.create(name='Test Product', price=100)
        order = Order.objects.create(product=product)
        self.assertEqual(order.status, 'new')
