from django.db import models

# Create your models here.
class Component(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=50, choices=[('repair', 'Repair'), ('purchase', 'Purchase')])
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
    
class Vehicle(models.Model):
    id = models.BigAutoField(primary_key=True)
    vehicle_id = models.CharField(max_length=50, unique=True)  # Unique identifier for the vehicle
    owner_name = models.CharField(max_length=255)
    issue_description = models.TextField()
    status = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('in_progress', 'In Progress'), ('completed', 'Completed')],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.vehicle_id} - {self.owner_name}"
    
    
class Repair(models.Model):
    id = models.BigAutoField(primary_key=True)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='repairs')
    component = models.ForeignKey(Component, on_delete=models.CASCADE, related_name='repairs')  
    repair_type = models.CharField(
        max_length=10,
        choices=[('new', 'New'), ('repair', 'Repair')],
        default='repair'
    )
    labor_cost = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Repair {self.id} for Vehicle {self.vehicle.vehicle_id}"
    
class Payment(models.Model):
    id = models.BigAutoField(primary_key=True)
    repair = models.ForeignKey(Repair, on_delete=models.CASCADE, related_name='payments')
    amount_due = models.DecimalField(max_digits=10, decimal_places=2)
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} for Repair {self.repair.id}"
    

class Revenue(models.Model):
    id = models.BigAutoField(primary_key=True)
    date = models.DateField()
    daily_revenue = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    monthly_revenue = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)
    yearly_revenue = models.DecimalField(max_digits=15, decimal_places=2, default=0.00)

    def __str__(self):
        return f"Revenue for {self.date}"
