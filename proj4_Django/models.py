# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Bankqa(models.Model):
    question = models.TextField(db_column='Question', blank=True, null=True)  # Field name made lowercase.
    answer = models.TextField(db_column='Answer', blank=True, null=True)  # Field name made lowercase.
    company = models.TextField(db_column='Company', blank=True, null=True)  # Field name made lowercase.
    id = models.BigIntegerField(primary_key=True)

    class Meta:
        managed = False
        db_table = 'bankQA'
