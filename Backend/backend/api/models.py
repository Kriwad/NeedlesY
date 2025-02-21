from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.


class CustomUser(AbstractUser):
    
   
    middle_name = models.CharField(max_length=15, null = True , blank=True)
    image = models.ImageField(upload_to="Profilepictures" , blank= True )
    groups = models.ManyToManyField('auth.Group', related_name='user_set_api', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='user_set_api', blank=True)
    def __str__(self):
        return self.username
    
    
    @property
    def fullname(self):
       name_part = [self.first_name , self.middle_name , self.last_name]
       return " ".join(part for part in name_part if part)

class ToDoList(models.Model):

  title = models.CharField( max_length=30,  blank = False )
  goal = models.TextField( blank = False)
  image = models.ImageField( upload_to='todoImage',null = True , blank=True,)
  video= models.FileField(upload_to="todoVideos" , null = True , blank= True )
  created_at = models.DateTimeField( default=timezone.now)
  user = models.ForeignKey(CustomUser , on_delete=models.CASCADE ,related_name = "todolist" ,null = True)

  def __str__(self):
    return self.title or f"TodoList {self.id}" or "Untitled TodoList"

class Like(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  todo = models.ForeignKey(ToDoList , on_delete= models.CASCADE)
  created_at = models.DateTimeField(default=timezone.now)

  class Meta : 
    unique_together = ["user" , "todo"]# Prevent multiple likes from same user
  
class Comment(models.Model):
  user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
  todo = models.ForeignKey(ToDoList , on_delete= models.CASCADE)
  content = models.TextField()
  created_at = models.DateTimeField(default=timezone.now)

  def __str__(self):
      return f"Comment by {self.user.username} on {self.todo.title} "
    