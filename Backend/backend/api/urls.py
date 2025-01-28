from django.urls import path
from .views import CreateUserView,ListActiveUserView, ListUserView , CreateToDoListView , EditToDoListView ,DetailUserView 

urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('user/all/', ListUserView.as_view(), name='all_user'),
    path('user/active/', ListActiveUserView.as_view(), name='active_user'),
    path('user/todo/', CreateToDoListView.as_view(), name='todo'),
    # path('user/todo/list/', ListTodoView.as_view(), name='todo'),
    path('user/todo/edit/<int:pk>/', EditToDoListView.as_view(), name='edit_todo'),
    path('user/<int:pk>', DetailUserView.as_view(), name='detail_user'),
]
