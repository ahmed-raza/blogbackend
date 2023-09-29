from django.contrib.auth.models import User
from django.contrib import admin
from .models import Post
from .admins.CustomizedUserAdmin import CustomizedUserAdmin

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user', 'created_at')

admin.site.register(Post, PostAdmin)
admin.site.unregister(User)
admin.site.register(User, CustomizedUserAdmin)
