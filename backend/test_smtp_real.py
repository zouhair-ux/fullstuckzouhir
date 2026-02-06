import os
import django
from django.core.mail import send_mail
from django.conf import settings
import smtplib

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'zadibio_backend_project.settings')
django.setup()

def test_real_email():
    print(f"Tentative de connexion à {settings.EMAIL_HOST}:{settings.EMAIL_PORT}...")
    print(f"Utilisateur: {settings.EMAIL_HOST_USER}")
    # Ne pas afficher le mot de passe complet pour la sécurité
    masked_password = settings.EMAIL_HOST_PASSWORD[:2] + "****" if settings.EMAIL_HOST_PASSWORD else "None"
    print(f"Mot de passe: {masked_password}")

    try:
        send_mail(
            'Test de connexion SMTP',
            'Ceci est un test pour vérifier si le mot de passe est accepté par Google.',
            settings.DEFAULT_FROM_EMAIL,
            ['zouhirzaitoune36@gmail.com'],
            fail_silently=False,
        )
        print("\nSUCCÈS ! L'email a été envoyé. Vérifiez votre boîte de réception.")
    except smtplib.SMTPAuthenticationError as e:
        print("\nERREUR D'AUTHENTIFICATION GOOGLE :")
        print(f"Code: {e.smtp_code}")
        print(f"Message: {e.smtp_error.decode('utf-8')}")
        print("\nSOLUTION : Google a refusé ce mot de passe. C'est probablement votre mot de passe normal.")
        print("wlkohvnvpbbtyoac")
    except Exception as e:
        print(f"\nAUTRE ERREUR : {e}")

if __name__ == "__main__":
    test_real_email()
