from django.contrib import admin
from .models import Post

# Register your models here.

class PostAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'user', 'created_at')

admin.site.register(Post, PostAdmin)
