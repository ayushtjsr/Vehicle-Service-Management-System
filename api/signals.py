from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Payment, Revenue
from datetime import date
from decimal import Decimal

@receiver(post_save, sender=Payment)
def update_revenue_on_payment(sender, instance, **kwargs):
    payment_date = instance.payment_date.date()
    amount_paid = Decimal(instance.amount_paid)

    # Update or create daily revenue
    daily_revenue, _ = Revenue.objects.get_or_create(date=payment_date)
    
     # Explicitly cast existing fields to Decimal for arithmetic operations
    daily_revenue.daily_revenue = Decimal(daily_revenue.daily_revenue) + amount_paid
    daily_revenue.monthly_revenue = Decimal(daily_revenue.monthly_revenue) + amount_paid
    daily_revenue.yearly_revenue = Decimal(daily_revenue.yearly_revenue) + amount_paid
    
    daily_revenue.save()
