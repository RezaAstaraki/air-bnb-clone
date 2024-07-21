from django.forms.models import ModelForm
from .models import Property


class AddPropertyForm(ModelForm):

    class Meta:
        model = Property
        exclude = ['landlord', 'favorite']
        # fields = '__all__'
        # fields = ['title', 'descriptions', 'price_per_night', 'bedrooms', 'bathrooms', 'guests', 'country', 'country_code', 'category', 'image']
