from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Account(models.Model):
    MALE = "MA"
    FEMALE = "FE"
    GENDER_CHOICES = [
        (MALE, "Male"),
        (FEMALE, "Female")
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthday = models.DateField()
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    def __str__(self):
        return self.user.username
class Post(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    body = models.TextField()
    image = models.ImageField(upload_to='uploads/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title
