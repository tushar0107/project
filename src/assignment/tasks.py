from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_scheduled_mail():
    print("this is a task that runs through celery cron job")

    return "Task ran successfully"