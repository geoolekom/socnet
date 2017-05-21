from django.contrib import admin
from mailing.models import SystemEmail

from djcelery.models import TaskState, WorkerState, PeriodicTask, IntervalSchedule, CrontabSchedule


@admin.register(SystemEmail)
class SystemEmailAdmin(admin.ModelAdmin):
    pass

admin.site.unregister(TaskState)
admin.site.unregister(WorkerState)
admin.site.unregister(IntervalSchedule)
admin.site.unregister(CrontabSchedule)
admin.site.unregister(PeriodicTask)
