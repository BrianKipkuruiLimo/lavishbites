from django.urls import path
from .views import RecommendationView, ComplianceView

urlpatterns = [
    path("recommend/", RecommendationView.as_view(), name="ai-recommend"),
    path("compliance/", ComplianceView.as_view(), name="ai-compliance"),
]
