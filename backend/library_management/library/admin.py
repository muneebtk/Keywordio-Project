from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . models import Account, Books

class AccountAdmin(UserAdmin):
    list_display = ('email','first_name','last_name','is_admin','is_superadmin','is_active')
    list_display_links = ['first_name','email']
    ordering = ['id']
    list_filter = ('date_joined',)
    readonly_fields = ('date_joined',)
    fieldsets = ()
    filter_horizontal = ()

class BooksAdmin(admin.ModelAdmin):
    list_display = ('title','description','image')
admin.site.register(Books,BooksAdmin)
admin.site.register(Account,AccountAdmin)