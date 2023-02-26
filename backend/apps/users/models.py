from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group


class UserManager(BaseUserManager):

    def create_user(self,email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
       
        if email is None:
            raise TypeError('Users must have an email.')
        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user
        
    def create_superuser(self, password,email):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')

        user = self.create_user(email,password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    # username    = models.CharField(db_index=True, max_length=255, unique=True,  null=True, blank=True)
    email       = models.EmailField(db_index=True, unique=True)
    is_active   = models.BooleanField(default=True)
    is_staff    = models.BooleanField(default=False)
    created     = models.DateTimeField(auto_now=True)
    updated     = models.DateTimeField(auto_now_add=True)
    group       = models.ForeignKey(Group, on_delete=models.SET_NULL,related_name='user_group', null=True, blank=True)

    USERNAME_FIELD = 'email'
    objects = UserManager()

    def __str__(self):
        return f"{self.email}"
