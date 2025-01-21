from django.contrib.auth.models import User
from .serializer import UserSerializer
from .models import ToDoList
from rest_framework.permissions import AllowAny , IsAuthenticated , IsAdminUser
from rest_framework import generics


class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]
  


