from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.




class ToDoList(models.Model):

  title = models.CharField( max_length=30, null=True , blank = False )
  goal = models.TextField(null=True , blank = False)
  image = models.ImageField( upload_to='todoImage',null=True, blank=True,)
  video= models.FileField(upload_to="todoVideos" , null = True , blank= True )
  created_at = models.DateTimeField( default=timezone.now)
  user = models.ForeignKey(User , on_delete=models.CASCADE ,related_name = "todolist" ,null = True)

  def __str__(self):
    return self.title or f"TodoList {self.id}" or "Untitled TodoList"

class Like(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  todo = models.ForeignKey(ToDoList , on_delete= models.CASCADE)
  created_at = models.DateTimeField(default=timezone.now)

  class Meta : 
    unique_together = ["user" , "todo"]# Prevent multiple likes from same user
  
class Comment(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  todo = models.ForeignKey(ToDoList , on_delete= models.CASCADE)
  content = models.TextField()
  created_at = models.DateTimeField(default=timezone.now)

  def __str__(self):
      return f"Comment by {self.user.username} on {self.todo.title} "
    