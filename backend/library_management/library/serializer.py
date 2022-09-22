from rest_framework import serializers
from . models import Account, Books

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = '__all__'
        