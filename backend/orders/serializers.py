from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(
        source="product.name", read_only=True
    )
    product_image = serializers.CharField(
        source="product.image", read_only=True
    )
    subtotal = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True
    )

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "product",
            "product_name",
            "product_image",
            "quantity",
            "unit_price",
            "subtotal",
        ]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    order_id = serializers.CharField(read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "order_id",
            "hotel_name",
            "status",
            "total",
            "shipping_address",
            "city",
            "zip_code",
            "nutrition_summary",
            "notes",
            "items",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "order_id", "total", "created_at", "updated_at"]


class OrderCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating orders with items."""

    items = serializers.ListField(child=serializers.DictField(), write_only=True)

    class Meta:
        model = Order
        fields = [
            "hotel_name",
            "shipping_address",
            "city",
            "zip_code",
            "notes",
            "items",
        ]

    def create(self, validated_data):
        items_data = validated_data.pop("items")
        from products.models import Product

        order = Order.objects.create(
            user=self.context["request"].user, **validated_data
        )

        total = 0
        nutrition_summary = {
            "calories": 0,
            "protein": 0,
            "fiber": 0,
            "sodium": 0,
        }

        for item_data in items_data:
            product = Product.objects.select_related("nutrition").get(
                id=item_data["product_id"]
            )
            qty = item_data.get("quantity", 1)
            unit_price = product.price

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=qty,
                unit_price=unit_price,
            )
            total += unit_price * qty

            # Aggregate nutrition
            if hasattr(product, "nutrition"):
                n = product.nutrition
                nutrition_summary["calories"] += n.calories * qty
                nutrition_summary["protein"] += float(n.protein) * qty
                nutrition_summary["fiber"] += float(n.fiber) * qty
                nutrition_summary["sodium"] += n.sodium * qty

        order.total = total
        order.nutrition_summary = nutrition_summary
        order.save()
        return order
