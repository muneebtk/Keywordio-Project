from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . models import Books
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from . serializer import BookSerializer
from . models import Account
from . serializer import BookSerializer
from rest_framework import status
from django.contrib.auth.hashers import make_password
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes

# customising default token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['first_name'] = user.first_name
     
        return token
       
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
 # user signup 
@api_view(['POST'])
def signupUser(request):
    try:
        data=request.data
        email = data['email']
        password = data['password']
        confirm_password = data['confirm_password']
        if Account.objects.filter(email=email):
            return Response('Email account already exists',status=status.HTTP_202_ACCEPTED)
        elif password !=confirm_password:
            return Response('The password does not matching',status=status.HTTP_202_ACCEPTED)
        else:
            Account.objects.create(
                first_name = data['first_name'],
                last_name = data['last_name'],
                email = email,
                password=make_password(data['password']),
                is_active = True,
            )
            return Response('User created successfully',status=status.HTTP_201_CREATED)
    except:
        return Response('Something is going wrong!')


#for crud operations
class BookViewSet(viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# for getting indivitual book details
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def editBook(request,id):
    book = get_object_or_404(Books,id=id)
    serializer = BookSerializer(book,many=False)
    return Response(serializer.data)

