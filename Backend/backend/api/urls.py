from django.urls import path

from .views import CreateUserView,ListActiveUserView, ListUserView , CreateToDoListView , EditToDoListView ,ListTodoView , CurrentUserView ,DetailUserTodoView, EditDetailTodoView



urlpatterns = [
    path('user/register/', CreateUserView.as_view(), name='register'),
    path('user/all/', ListUserView.as_view(), name='all_user'),
    path('user/active/', ListActiveUserView.as_view(), name='active_user'),
    path("user/current/", CurrentUserView.as_view(), name="currentuser"),
    path('user/todo/', CreateToDoListView.as_view(), name='todo'),
    path('user/todo/list/', ListTodoView.as_view(), name='todo'),
    path('user/todo/edit/<int:pk>/', EditToDoListView.as_view(), name='edit_todo'),
   
    path('user/profile/<int:user_id>/', DetailUserTodoView.as_view(), name='users_todo'),
    path('user/profile/edit/<int:user_id>/<int:pk>/', EditDetailTodoView.as_view(), name='user_todo'),
]


