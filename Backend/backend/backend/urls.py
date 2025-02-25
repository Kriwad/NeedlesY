
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path , include
from rest_framework_simplejwt.views import TokenObtainPairView , TokenRefreshView
from django.urls import path



from api.views import CreateUserView,ListActiveUserView, ListUserView , CreateToDoListView , EditToDoListView ,ListTodoView , CurrentUserView ,DetailUserView, ListUserToDoView





urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/refresh/' , TokenRefreshView.as_view() , name = 'refresh' ),
    path('api/token/' , TokenObtainPairView.as_view() , name = 'get_token' ),


    
    path('api-auth/' , include('rest_framework.urls')),

    path('api/user/register/', CreateUserView.as_view(), name='register'),
    path('api/user/all/', ListUserView.as_view(), name='all_user'),
    path('api/user/active/', ListActiveUserView.as_view(), name='active_user'),
    path("api/user/current/", CurrentUserView.as_view(), name="currentuser"),
    path('api/user/todo/', CreateToDoListView.as_view(), name='todo'),
    path('api/user/todo/list/', ListTodoView.as_view(), name='todo'),
    path('api/user/todo/edit/<int:pk>/', EditToDoListView.as_view(), name='edit_todo'),
    

    path('api/user/profile/<int:id>/', DetailUserView.as_view(), name='users_nameid'),
   
    path('api/user/profile/todos/<int:user_id>/',ListUserToDoView.as_view(), name='users_todo'),
    
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)