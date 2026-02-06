from django.db import models

class Category(models.Model):
    name_fr = models.CharField(max_length=100)
    name_ar = models.CharField(max_length=100)
    description_fr = models.TextField(blank=True)
    description_ar = models.TextField(blank=True)
    image = models.FileField(upload_to='categories/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.name_fr} ({self.name_ar})"

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name_fr = models.CharField(max_length=200)
    name_ar = models.CharField(max_length=200, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description_fr = models.TextField()
    description_ar = models.TextField(blank=True)
    origin_fr = models.CharField(max_length=200, blank=True)
    origin_ar = models.CharField(max_length=200, blank=True)
    benefits_fr = models.TextField(blank=True)
    benefits_ar = models.TextField(blank=True)
    image = models.FileField(upload_to='products/')
    weight = models.CharField(max_length=50, blank=True, null=True, help_text="ex: 1kg, 500g, 250ml")
    views = models.IntegerField(default=0)
    is_promo = models.BooleanField(default=False)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    
    def __str__(self):
        return self.name_fr

class Order(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'En attente'),
        ('CONFIRMED', 'Confirmé'),
        ('SHIPPED', 'Expédié'),
        ('DELIVERED', 'Livré'),
        ('CANCELLED', 'Annulé'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    items_description = models.TextField(help_text="Description des produits commandés (ex: Panier ou nom du produit)")
    customer_name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    city = models.CharField(max_length=100)
    address = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order #{self.id} - {self.customer_name}"
