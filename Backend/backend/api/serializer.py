from django.contrib.auth.models import User
# from .models import ToDo
from rest_framework import serializers
from .models import ToDoList , Like  , Comment

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id' , 'username' , 'password']
    extra_kwargs = {'password': {'write_only': True}}
  
  def create(self, validated_data):
    user = User.objects.create_user(
      username = validated_data['username'],
      password = validated_data['password']
    )
    return user  

class DetailUserSerializer(serializers.ModelSerializer):
  
  class Meta:

    model = User
    fields = ['id', 'username' ]

class ToDoSerializer(serializers.ModelSerializer):
  user = DetailUserSerializer(read_only = True)
  class Meta:
    model= ToDoList
    fields = ['id', 'user', 'title' , 'goal' , 'image', 'created_at']
    read_only_fields = ['user']


#like and comment

class LikeSerializer(serializers.Serializer):
  user = UserSerializer(read_only = True)
  class Meta:
    model = Like
    fields = ["id" , "user " , "created_at"]

class CommentSerializer(serializers.Serializer):
  user = UserSerializer(read_only  = True)
  class Meta:
    model = Comment
    fields = ["id" , "user " , "content", "created_at"]


