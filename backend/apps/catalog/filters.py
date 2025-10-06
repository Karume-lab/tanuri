import django_filters

from apps.catalog.models import ProductModel


class ProductFilter(django_filters.FilterSet):
    category_id = django_filters.NumberFilter(
        field_name="category__id", lookup_expr="exact"
    )

    category_name = django_filters.CharFilter(
        field_name="category__name", lookup_expr="icontains"
    )

    min_price = django_filters.NumberFilter(
        field_name="variants__price", lookup_expr="gte"
    )
    max_price = django_filters.NumberFilter(
        field_name="variants__price", lookup_expr="lte"
    )

    name = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = ProductModel
        fields = ["category_id", "category_name", "name", "min_price", "max_price"]
