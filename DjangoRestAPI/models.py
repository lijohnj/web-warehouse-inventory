from django.db import models

# Create your models here.
# Entry some data into model


class Items(models.Model):
    name = models.CharField(max_length=10)
    image = models.CharField(max_length=100,default='alt')
    description = models.CharField(max_length=50, default='description')
    quantity = models.IntegerField(default=0)

    # Create a string representation
    def __str__(self):
        return self.name
