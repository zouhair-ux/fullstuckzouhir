from django.contrib import admin
from .models import Category, Product, Order

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name_fr', 'name_ar')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name_fr', 'price', 'category', 'is_promo')
    list_filter = ('category', 'is_promo')
    search_fields = ('name_fr', 'name_ar')

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer_name', 'phone', 'city', 'status', 'created_at')
    list_filter = ('status', 'city')
    search_fields = ('customer_name', 'phone')
    readonly_fields = ('created_at',)
