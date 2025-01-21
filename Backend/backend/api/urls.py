from django.urls import path
from .views import CreateUserView  # Import the necessary views

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
]
