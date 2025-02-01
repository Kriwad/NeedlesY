from django.contrib.auth.models import User
from .serializer import UserSerializer , ToDoSerializer
from .models import ToDoList
from rest_framework.permissions import AllowAny , IsAuthenticated , IsAdminUser 
from rest_framework import generics



class CreateUserView(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = [AllowAny]

# only admin
class ListUserView(generics.ListAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes= [IsAdminUser]

# only admin
class ListActiveUserView(generics.ListAPIView):
  queryset = User.objects.filter(is_active= True)
  serializer_class = UserSerializer
  permission_classes= [IsAdminUser]

# only logged in
class DetailUserView(generics.RetrieveAPIView):

  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
    queryset= User.objects.filter(id = self.request.user.id)
    return queryset
  
#fetches current user
class CurrentUserView(generics.RetrieveAPIView):
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return self.request.user

# only authenticated and current user
class CreateToDoListView(generics.CreateAPIView):
  queryset = ToDoList.objects.all()
  serializer_class= ToDoSerializer
  permission_classes = [IsAuthenticated]

  def perform_create(self, serializer):
    
    serializer.save(user= self.request.user)

class ListTodoView(generics.ListAPIView):
  serializer_class = ToDoSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):
   return ToDoList.objects.all()

# only authenticated and current user
class EditToDoListView(generics.RetrieveUpdateDestroyAPIView):
 
  serializer_class = ToDoSerializer
  permission_classes = [IsAuthenticated]

  def get_queryset(self):   
    return ToDoList.objects.filter(user = self.request.user )

