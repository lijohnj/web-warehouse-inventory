# Create your views here.
from django.shortcuts import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Items
from .serializers import ItemsSerializer


class ItemList(APIView):

    def get(self, request):
        item1 = Items.objects.all()
        serializer = ItemsSerializer(item1, many=True)
        return Response(serializer.data)  # Return JSON

    def post(self, request, format=None):
        serializer = ItemsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemDetail(APIView):

    def get_object(self, pk):
        try:
            return Items.objects.get(pk=pk)
        except Items.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ItemsSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = ItemsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)