from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(
            name = 'Arpan',
            email = 'arpan@gmail.com',
            phone = 987654321,
            gender = 'Male',
            dateOfBirth = '1995-07-28',
            is_active = True,
            is_staff = True,
            is_superuser = True
        )
        user.set_password('12345')
        user.save()

    dependencies = [
        
    ]

    operations = [
        migrations.RunPython(seed_data),
    ]