# from django.contrib import admin
# from .models import User


# class UserAdmin(admin.ModelAdmin):
#     # fields  = ('email', 'name', 'last_login', 'is_staff',)
#     # list_display = ('email', 'name', 'last_login', 'is_staff',)
#     fields = ('avatar', 'email', 'name', 'is_active', 'is_admin', 'is_staff')


# admin.site.register(User, UserAdmin)


from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'last_login', 'get_is_staff',)

    def get_is_staff(self, obj):
        # Define how to calculate is_staff here
        return obj.is_admin
    get_is_staff.boolean = True
    get_is_staff.short_description = 'Is staff'  # Custom column header


admin.site.register(User, UserAdmin)
