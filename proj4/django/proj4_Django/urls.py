from django.conf.urls import url
from proj4_Django import views

urlpatterns=[

    url(r'^common/sendResponse/$', views.sendResponse.as_view()),
    url(r'^common/recExcel/$', views.receiveUploadedExcel.as_view()),

]