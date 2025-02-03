from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

def bites(request):
	context = {}
	return render(request, 'bites/main.html', context)

def cart(request):
	context = {}
	return render(request, 'bites/cart.html', context)

def checkout(request):
	context = {}
	return render(request, 'bites/checkout.html', context)

def thankyou(request):
	context = {}
	return render(request, 'bites/thankyou.html', context) 
def cardiovascular(request):
	context = {}
	return render(request, 'bites/cardiovascular.html', context)

def diabetes(request):
	context = {}
	return render(request, 'bites/diabetes.html', context)

def hypertension(request):
	context = {}
	return render(request, 'bites/hypertension.html', context)

def product(request):
	context = {}
	return render(request, 'bites/product.html', context)
