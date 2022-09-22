from django.urls import path
from . import views
from . views import  MyTokenObtainPairView,BookViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('library', BookViewSet, basename='books')

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('signup/',views.signupUser),
    path('edit_book/<int:id>/',views.editBook)
]+router.urls

