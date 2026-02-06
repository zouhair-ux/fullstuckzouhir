from django.core.management.base import BaseCommand
from api.models import Category

class Command(BaseCommand):
    help = 'Seed initial categories'

    def handle(self, *args, **kwargs):
        categories = [
            {
                'name_fr': 'Miel Naturel',
                'name_ar': 'عسل طبيعي',
                'description_fr': 'Sélection de miels purs et authentiques.',
                'description_ar': 'تشكيلة من العسل الحر والأصلي.'
            },
            {
                'name_fr': 'Huiles Précieuses',
                'name_ar': 'زيوت الطبيعية',
                'description_fr': 'Huiles d\'olive et d\'argan extra vierge.',
                'description_ar': 'زيت الزيتون  بجودة عالية.'
            },
            {
                'name_fr': 'Amlou Traditionnel',
                'name_ar': 'أملو تقليدي',
                'description_fr': 'La fameuse pâte à tartiner berbère.',
                'description_ar': 'وصفة أملو التقليدية الشهيرة.'
            },
            {
                'name_fr': 'Promotions',
                'name_ar': 'عروض خاصة',
                'description_fr': 'Découvrez nos offres exceptionnelles.',
                'description_ar': 'اكتشف عروضنا الحصرية.'
            },
        ]

        for cat_data in categories:
            category, created = Category.objects.get_or_create(
                name_fr=cat_data['name_fr'],
                defaults=cat_data
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Catégorie "{cat_data["name_fr"]}" créée.'))
            else:
                self.stdout.write(self.style.WARNING(f'Catégorie "{cat_data["name_fr"]}" existe déjà.'))
