
from django.test import TestCase
from django.test import Client
from .models import Items

# models test


class ModelTest(TestCase):

	def create_items(self, name="unit test", description="this is a test", image="testImage", quantity=1):
		return Items.objects.create(name=name, description=description, image=image, quantity=quantity)

	def test_items_creation(self):
		w = self.create_items()
		self.assertTrue(isinstance(w, Items))
		self.assertEqual(w.__str__(), w.name)


# views


class ViewTest(TestCase):

	def setUp(self):
		self.client = Client()

	def test_item_list_view(self):
		res = self.client.get('http://localhost:8000/items/')
		print(res)
		self.assertEqual(res.status_code, 200)
