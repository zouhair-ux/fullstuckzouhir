from rest_framework import viewsets, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product, Order
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['views', 'price', 'created_at']
    ordering = ['-views']  # Default ordering by trending
    
    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        is_promo = self.request.query_params.get('is_promo')
        if category:
            queryset = queryset.filter(category__id=category)
        if is_promo:
            queryset = queryset.filter(is_promo=True)
        return queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderSerializer

    def perform_create(self, serializer):
        order = serializer.save()
        
        # Send email notification asynchronously
        import threading
        from django.core.mail import send_mail
        from django.conf import settings
        
        def send_email_thread():
            subject = f"Nouvelle commande #{order.id} - {order.customer_name}"
            message = f"""
Une nouvelle commande a été reçue !

Détails de la commande:
-----------------------
ID Commande: {order.id}
Client: {order.customer_name}
Téléphone: {order.phone}
Ville: {order.city}
Adresse: {order.address}

Description des produits:
{order.items_description}

Statut: {order.get_status_display()}
"""
            recipient_list = ['zouhirzaitoune36@gmail.com']
            try:
                send_mail(
                    subject, 
                    message, 
                    settings.DEFAULT_FROM_EMAIL, 
                    recipient_list,
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Erreur lors de l'envoi de l'email: {e}")

        # Start the email thread
        email_thread = threading.Thread(target=send_email_thread)
        email_thread.start()

    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def daily_stats(self, request):
        from django.db.models import Count
        from django.db.models.functions import TruncDate
        from django.utils import timezone
        import datetime

        # Get current date info
        now = timezone.now()
        current_month = now.month
        current_year = now.year

        # Filter orders for this month
        orders = Order.objects.filter(
            created_at__year=current_year, 
            created_at__month=current_month
        ).annotate(
            date=TruncDate('created_at')
        ).values('date').annotate(
            count=Count('id')
        ).order_by('date')

        return Response(list(orders))
