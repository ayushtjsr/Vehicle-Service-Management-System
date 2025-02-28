from rest_framework.routers import DefaultRouter,SimpleRouter
from django.conf import settings
from api.views import (
    ComponentViewSet, 
    VehicleViewSet, 
    RepairViewSet, 
    PaymentViewSet, 
    RevenueViewSet
)

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()
    
router.register('components', ComponentViewSet , basename='components')
router.register('vehicles', VehicleViewSet , basename='vehicles')
router.register('repairs', RepairViewSet , basename='repairs')  
router.register('payments', PaymentViewSet , basename='payments')   
router.register('revenues', RevenueViewSet , basename='revenues')

app_name = 'api'
urlpatterns = router.urls