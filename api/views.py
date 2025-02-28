from django.shortcuts import render
import logging
logger = logging.getLogger(__name__)
# Create your views here.
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum
from .models import Component, Vehicle, Repair, Payment, Revenue
from decimal import Decimal
class ComponentViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing components (register, list, update, and delete) without serializers.
    """

    @action(detail=False, methods=["post"], url_path="register-component")
    def register(self, request):
        """
        API to register a new component.
        """
        name = request.data.get("name")
        type_ = request.data.get("type")
        price = request.data.get("price")

        if not name or not type_ or not price:
            return Response({"error": "Missing required fields: name, type, or price"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            component = Component.objects.create(name=name, type=type_, price=price)
            return Response(
                {
                    "id": component.id,
                    "name": component.name,
                    "type": component.type,
                    "price": str(component.price),
                    "created_at": component.created_at,
                    "updated_at": component.updated_at,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["get"], url_path="list-components")
    def list_components(self, request):
        """
        API to list all components.
        """
        components = Component.objects.all()
        result = [
            {
                "id": component.id,
                "name": component.name,
                "type": component.type,
                "price": str(component.price),
                "created_at": component.created_at,
                "updated_at": component.updated_at,
            }
            for component in components
        ]
        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=["patch"], url_path="update-component")
    def update_component(self, request):
        """
        API to update a specific component's details by component_id.
        """
        component_id = request.query_params.get("component_id")

        if not component_id:
            return Response({"error": "Missing required parameter: component_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            component = Component.objects.get(pk=component_id)
        except Component.DoesNotExist:
            return Response({"error": "Component not found"}, status=status.HTTP_404_NOT_FOUND)

        name = request.data.get("name", component.name)
        type_ = request.data.get("type", component.type)
        price = request.data.get("price", component.price)

        try:
            component.name = name
            component.type = type_
            component.price = price
            component.save()
            return Response(
                {
                    "id": component.id,
                    "name": component.name,
                    "type": component.type,
                    "price": str(component.price),
                    "created_at": component.created_at,
                    "updated_at": component.updated_at,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    @action(detail= False, methods=["delete"], url_path="delete-component")
    def delete_component(self, request):
        """
        API to delete a specific component by component_id.
        """
        component_id = request.query_params.get("component_id")

        if not component_id:
            return Response({"error": "Missing required parameter: component_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            component = Component.objects.get(pk=component_id)
        except Component.DoesNotExist:
            return Response({"error": "Component not found to be deleted"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            component = Component.objects.get(pk=component_id)
            component.delete()
            return Response({"message": "Component deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
        except Component.DoesNotExist:
            return Response({"error": "Component not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VehicleViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing vehicles (add, list, update status).
    """

    @action(detail=False, methods=["post"], url_path="add")
    def add_vehicle(self, request):
        """
        API to add a new vehicle for repair tracking.
        """
        vehicle_id = request.data.get("vehicle_id")
        owner_name = request.data.get("owner_name")
        issue_description = request.data.get("issue_description")

        if not vehicle_id or not owner_name or not issue_description:
            return Response({"error": "Missing required fields: vehicle_id, owner_name, or issue_description"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicle.objects.create(
                vehicle_id=vehicle_id,
                owner_name=owner_name,
                issue_description=issue_description,
            )
            return Response(
                {
                    "id": vehicle.id,
                    "vehicle_id": vehicle.vehicle_id,
                    "owner_name": vehicle.owner_name,
                    "issue_description": vehicle.issue_description,
                    "status": vehicle.status,
                    "created_at": vehicle.created_at,
                    "updated_at": vehicle.updated_at,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["get"], url_path="list")
    def list_vehicles(self, request):
        """
        API to list all vehicles.
        """
        vehicles = Vehicle.objects.all()
        result = [
            {
                "id": vehicle.id,
                "vehicle_id": vehicle.vehicle_id,
                "owner_name": vehicle.owner_name,
                "issue_description": vehicle.issue_description,
                "status": vehicle.status,
                "created_at": vehicle.created_at,
                "updated_at": vehicle.updated_at,
            }
            for vehicle in vehicles
        ]
        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=["put"], url_path="update-status")
    def update_vehicle_status(self, request):
        """
        API to update the status of a specific vehicle by ID.
        """
        vehicle_id = request.query_params.get("vehicle_id")

        if not vehicle_id:
            return Response({"error": "Missing required parameter: vehicle_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
        except Vehicle.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)


        status_ = request.data.get("status")
        if status_ not in ["pending", "in_progress", "completed"]:
            return Response({"error": "Invalid status. Choose from 'pending', 'in_progress', or 'completed'"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle.status = status_
            vehicle.save()
            return Response(
                {
                    "id": vehicle.id,
                    "vehicle_id": vehicle.vehicle_id,
                    "owner_name": vehicle.owner_name,
                    "issue_description": vehicle.issue_description,
                    "status": vehicle.status,
                    "created_at": vehicle.created_at,
                    "updated_at": vehicle.updated_at,
                },
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["delete"], url_path="delete")
    def delete_vehicle(self, request):
        """
        API to delete a specific vehicle by ID.
        """
        
        vehicle_id = request.query_params.get("vehicle_id")

        if not vehicle_id:
            return Response({"error": "Missing required parameter: vehicle_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
        except Vehicle.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
            vehicle.delete()
            return Response({"message": "Vehicle deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Vehicle.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class RepairViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing issues (reporting and selecting components).
    """

    @action(detail=False, methods=["post"], url_path="add-issue")
    def add_issue(self, request):
        """
        API to report an issue for a vehicle and select components for repair or replacement.
        """
        vehicle_id = request.data.get("vehicle_id")
        component_id = request.data.get("component_id")
        repair_type = request.data.get("repair_type")
        labor_cost = request.data.get("labor_cost")

        if not vehicle_id or not component_id or not repair_type or labor_cost is None:
            return Response(
                {"error": "Missing required fields: vehicle_id, component_id, repair_type, or labor_cost"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate repair_type
        if repair_type not in ["new", "repair"]:
            return Response({"error": "Invalid repair_type. Choose 'new' or 'repair'"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
        except Vehicle.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            component = Component.objects.get(pk=component_id)
        except Component.DoesNotExist:
            return Response({"error": "Component not found"}, status=status.HTTP_404_NOT_FOUND)

        # Calculate total price
        total_price = float(labor_cost) + float(component.price)

        try:
            repair = Repair.objects.create(
                vehicle=vehicle,
                component_id=component.id,
                repair_type=repair_type,
                labor_cost=labor_cost,
                total_price=total_price,
            )
            return Response(
                {
                    "id": repair.id,
                    "vehicle_id": vehicle.id,
                    "component_id": component.id,
                    "repair_type": repair.repair_type,
                    "labor_cost": str(repair.labor_cost),
                    "total_price": str(repair.total_price),
                    "created_at": repair.created_at,
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["get"], url_path="list-issues")
    def list_issues(self, request):
        """
        API to list all issues (repairs) for a vehicle.
        """
        vehicle_id = request.query_params.get("vehicle_id")

        if not vehicle_id:
            return Response({"error": "Missing vehicle_id query parameter"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
        except Vehicle.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            repairs = vehicle.repairs.all()
            result = [
                {
                    "id": repair.id,
                    "vehicle_id": repair.vehicle.id,
                    "component_id": repair.component.id,
                    "component_name": repair.component.name,
                    "repair_type": repair.repair_type,
                    "labor_cost": str(repair.labor_cost),
                    "total_price": str(repair.total_price),
                    "created_at": repair.created_at,
                }
                for repair in repairs
            ]
            return Response(result, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error on listing isues": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    @action(detail=False, methods=["delete"], url_path="delete-issue")
    def delete_issue(self, request):
        """
        API to delete a specific issue (repair) by ID.
        """
        repair_id = request.query_params.get("repair_id")

        if not repair_id:
            return Response({"error": "Missing required parameter: repair_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            repair = Repair.objects.get(pk=repair_id)
        except Repair.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)
        
        try:
            repair = Repair.objects.get(pk=repair_id)
            repair.delete()
            return Response({"message": "Issue deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Repair.DoesNotExist:
            return Response({"error": "Issue not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class PaymentViewSet(viewsets.ViewSet):
    """
    A ViewSet for handling final price calculation and payment simulation.
    """

    @action(detail=False, methods=["get"], url_path="calculate-price")
    def calculate_price(self, request):
        """
        API to calculate the total price for all repairs of a specific vehicle.
        """
        vehicle_id = request.query_params.get("vehicle_id")

        if not vehicle_id:
            return Response({"error": "Missing required parameter: vehicle_id"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            vehicle = Vehicle.objects.get(pk=vehicle_id)
        except Vehicle.DoesNotExist:
            return Response({"error": "Vehicle not found"}, status=status.HTTP_404_NOT_FOUND)
        try:
            
            repairs = vehicle.repairs.all()
            total_cost = sum(repair.total_price for repair in repairs)

            return Response(
                {
                    "vehicle_id": vehicle.id,
                    "vehicle_identifier": vehicle.vehicle_id,
                    "total_cost": str(total_cost),
                },
                status=status.HTTP_200_OK,
            )
            
        except Exception as e:
            return Response({"error on fetching prices": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=["post"], url_path="simulate-payment")
    def simulate_payment(self, request):
        """
        API to simulate payment for a specific repair.
        """
        repair_ids = request.data.get("repair_ids")
        amount_paid = Decimal(request.data.get("amount_paid", 0))

        if not repair_ids or amount_paid <= 0:
            return Response({"error": "Missing or invalid repair_ids or amount_paid"}, status=status.HTTP_400_BAD_REQUEST)

        repairs = Repair.objects.filter(pk__in=repair_ids)
        if repairs.count() != len(repair_ids):
            return Response({"error": "One or more repairs not found"}, status=status.HTTP_404_NOT_FOUND)

        total_price = sum(Decimal(repair.total_price) for repair in repairs)
        if amount_paid < total_price:
            return Response({"error": f"Insufficient amount paid. Required: {total_price}"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # Create payments for each repair
            payments = []
            for repair in repairs:
                # Calculate payment for each repair
                payment_amount = min(amount_paid, Decimal(repair.total_price))
                payment = Payment.objects.create(
                    repair=repair,
                    amount_due=Decimal(repair.total_price),
                    amount_paid=payment_amount,
                )
                payments.append({
                    "repair_id": repair.id,
                    "amount_due": str(payment.amount_due),
                    "amount_paid": str(payment.amount_paid),
                    "payment_date": payment.payment_date,
                })

                # Deduct payment amount from the total
                amount_paid -= payment_amount


            return Response({"payments": payments}, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class RevenueViewSet(viewsets.ViewSet):
    """
    A ViewSet for generating revenue data for graphs (daily, monthly, yearly).
    """

    @action(detail=False, methods=["get"], url_path="daily")
    def daily_revenue(self, request):
        """
        API to fetch daily revenue data.
        """
        revenues = Revenue.objects.values("date").annotate(daily_revenue=Sum("daily_revenue")).order_by("date")
        result = [{"date": revenue["date"], "daily_revenue": str(revenue["daily_revenue"])} for revenue in revenues]

        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="monthly")
    def monthly_revenue(self, request):
        """
        API to fetch monthly revenue data.
        """
        revenues = (
            Revenue.objects.extra(select={"month": "DATE_TRUNC('month', date)"})
            .values("month")
            .annotate(monthly_revenue=Sum("monthly_revenue"))
            .order_by("month")
        )
        result = [{"month": revenue["month"].strftime("%Y-%m"), "monthly_revenue": str(revenue["monthly_revenue"])} for revenue in revenues]

        return Response(result, status=status.HTTP_200_OK)

    @action(detail=False, methods=["get"], url_path="yearly")
    def yearly_revenue(self, request):
        """
        API to fetch yearly revenue data.
        """
        revenues = (
            Revenue.objects.extra(select={"year": "DATE_TRUNC('year', date)"})
            .values("year")
            .annotate(yearly_revenue=Sum("yearly_revenue"))
            .order_by("year")
        )
        result = [{"year": revenue["year"].year, "yearly_revenue": str(revenue["yearly_revenue"])} for revenue in revenues]

        return Response(result, status=status.HTTP_200_OK)