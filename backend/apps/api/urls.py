from django.urls import re_path
from apps.api import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

from apps.authentication.viewsets.logout import LogoutView

urlpatterns = [
#    profile
    re_path(r'^api/profiles/$', views.profile_detail),
#   token
    re_path(r'^api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

#  categories 
    re_path(r'^api/categories/$', views.get_categories),
    re_path(r'^api/admin/categories/$',views.get_categories_admin),
    re_path(r'^api/admin/categories/edit\/(?P<pk>.+)', views.category_edit),
    re_path(r'^api/admin/categories/renew\/(?P<pk>.+)', views.category_reactive),

#  products 
    # re_path(r'^api/products/$',views.product_list),
    re_path(r'^api/products/get\/(?P<pk>.+)',views.product_by_id),
    re_path(r'^api/admin/products/$',views.product_list_admin),
    re_path(r'^api/admin/products/edit\/(?P<pk>.+)', views.product_detail),
    re_path(r'^api/admin/products/renew\/(?P<pk>.+)', views.product_reactive),
    re_path(r'^api/admin/products/post/$', views.post_product),
    re_path(r'^api/products/categories\/(?P<category_id>.+)', views.product_list_by_cat_id),
    re_path(r'^api/products/all/$', views.product_list),

    


    
#  orders
    re_path(r'^api/orders/$', views.order_detail),

#  reviews -v
    re_path(r'^api/reviews/get\/(?P<product_pk>.+)', views.review_list_pub),
    re_path(r'^api/reviews/post/$', views.post_review),
    re_path(r'^api/reviews/edit\/(?P<pk>.+)', views.review_detail),
    re_path(r'^api/reviews/profiles/$', views.my_reviews),
    re_path(r'^api/reviews/can\/(?P<product_pk>.+)', views.can_post),
    re_path(r'^api/reviews/ai/$', views.ai_response),
    # re_path(r'^api/$', views.genorr),



re_path(r'api/auth/logout', LogoutView.as_view())

]
   

    
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
 
