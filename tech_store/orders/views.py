from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from django.template.loader import get_template
from xhtml2pdf import pisa
from rest_framework import viewsets
from django.utils import timezone
from datetime import timedelta, datetime
from .models import Product, Order, Invoice
from .serializers import ProductSerializer, OrderSerializer, InvoiceSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

def generate_pdf(request, pk):
    try:
        invoice = Invoice.objects.get(pk=pk)
        template_path = 'invoice_template.html'
        context = {'invoice': invoice}
        
        template = get_template(template_path)
        html = template.render(context)
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="invoice_{pk}.pdf"'
        
        pisa_status = pisa.CreatePDF(html, dest=response)
        
        if pisa_status.err:
            return HttpResponse('We had some errors <pre>' + html + '</pre>')
        
        return response
    except Invoice.DoesNotExist:
        return HttpResponse(status=404)

@require_http_methods(["GET"])
def orders_in_date_range(request):
    try:
        start_date_str = request.GET.get('start_date')
        end_date_str = request.GET.get('end_date')

        if not start_date_str or not end_date_str:
            return JsonResponse({'error': 'Both start_date and end_date must be provided as query parameters'}, status=400)

        start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
        end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

        orders = Order.objects.filter(created_at__date__gte=start_date, created_at__date__lte=end_date)
        serializer = OrderSerializer(orders, many=True)
        return JsonResponse(serializer.data, safe=False)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)