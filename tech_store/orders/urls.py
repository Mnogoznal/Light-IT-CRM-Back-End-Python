from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, OrderViewSet, InvoiceViewSet, generate_pdf, orders_in_date_range

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'invoices', InvoiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('invoices/<int:pk>/pdf/', generate_pdf, name='generate_pdf'),
    path('orders-in-date-range/', orders_in_date_range, name='orders-in-date-range'),
]
