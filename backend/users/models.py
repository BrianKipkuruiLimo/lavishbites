from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """Custom user with role-based access and health profile."""

    ROLE_CHOICES = [
        ("customer", "Customer"),
        ("hotel_admin", "Hotel Admin"),
        ("superadmin", "Super Admin"),
    ]

    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default="customer"
    )
    organization = models.CharField(
        max_length=200, blank=True, help_text="Hotel or company name"
    )
    phone = models.CharField(max_length=20, blank=True)
    health_profile = models.JSONField(
        default=dict,
        blank=True,
        help_text="Preferred health conditions for recommendations",
    )

    class Meta:
        ordering = ["-date_joined"]

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    @property
    def is_hotel_admin(self):
        return self.role == "hotel_admin"

    @property
    def is_superadmin(self):
        return self.role == "superadmin"
