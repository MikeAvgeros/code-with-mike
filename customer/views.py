from rest_framework.viewsets import ModelViewSet
from .models import Customer
from .serializers import CustomerSerializer, UpdateCustomerSerializer
from .permissions import ViewCustomerHistoryPermission
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class CustomerViewSet(ModelViewSet):
    http_method_names = ['get', 'post', 'patch',
                         'delete', 'head', 'options']

    queryset = Customer.objects.all()
    permission_classes = [IsAdminUser]

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return UpdateCustomerSerializer
        return CustomerSerializer

    @action(detail=True, permission_classes=[ViewCustomerHistoryPermission])
    def history(self, request, pk):
        return Response('ok')

    @action(detail=False, methods=['GET', 'PATCH'],
            permission_classes=[IsAuthenticated])
    def me(self, request):
        customer = Customer.objects.get(user_id=request.user.id)
        if request.method == 'GET':
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        elif request.method == 'PATCH':
            serializer = UpdateCustomerSerializer(customer, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
