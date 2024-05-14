from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

import uuid


class UserManager(BaseUserManager):
    def create_user(self, name, email, password=None, **kwargs):
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name=name,
            **kwargs
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, password=None):
        user = self.create_user(
            name=name,
            email=email,
            password=password,
        )
        user.is_admin = True
        user.is_active = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=255)
    date_joined = models.DateField(auto_now=False, auto_now_add=True)
    avatar = models.ImageField(
        upload_to='avatars', height_field=None, width_field=None, max_length=None)

    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    last_login = models.DateTimeField(blank=True, auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    Email_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin or self.staff_status
