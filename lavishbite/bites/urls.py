from django.urls import path 
from . import views
urlpatterns=[
    path('', views.bites, name="bites"),
    path('cardiovascular/', views.cardiovascular, name="cardiovascular"),
	path('cart/', views.cart, name="cart"),
	path('checkout/', views.checkout, name="checkout"),
    path('diabetes/', views.diabetes, name="diabetes"),
    path('thankyou/', views.thankyou, name="thankyou"),
    path('hypertension/', views.hypertension, name="hypertension"),
     path('product/', views.product, name="product"),
]


