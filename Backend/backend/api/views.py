from django.contrib.auth.models import User
from .serializer import UserSerializer , ToDoSerializer , CommentSerializer , LikeSerializer
from .models import ToDoList , Comment , Like
from rest_framework.permissions import AllowAny , IsAuthenticated , IsAdminUser 
from rest_framework import generics , viewsets


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

  
#fetches current user
class CurrentUserView(generics.RetrieveAPIView):
  serializer_class = UserSerializer
  permission_classes = [IsAuthenticated]

  def get_object(self):
    return self.request.user
  

class DetailUserTodoView(generics.ListAPIView):
  serializer_class = ToDoSerializer
  permission_classes = [AllowAny]


  def get_queryset(self):
    user_id = self.kwargs["user_id"]
    return ToDoList.objects.filter(user_id = user_id)

class EditDetailTodoView(generics.RetrieveUpdateDestroyAPIView):
  serializer_class = ToDoSerializer
  permission_classes = [AllowAny]

  def get_queryset(self):
    user_id = self.kwargs["user_id"]
    todo_id = self.kwargs["pk"]
    return ToDoList.objects.filter(user_id = user_id, id = todo_id)

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



#Like and Comment 

