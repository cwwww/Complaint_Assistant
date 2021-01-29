from django.shortcuts import render

# Create your views here.
from rest_framework.mixins import Response
from rest_framework.views import APIView
import os


def response_success_200(res={}):
    """
    返回请求成功
    :param data_dict:
    :return: response(dict)
    """
    response = dict()
    response['msg'] = '请求成功'
    response['result'] = res
    response['code'] = 200
    return Response(response, status=200)


def response_failed_400():
    """
    返回请求失败
    :return: response(dict)
    """
    response = dict()
    response['msg'] = '请求参数错误'
    response['result'] = dict()
    response['code'] = 400
    return Response(response, status=400)

class sendResponse(APIView):
    def post(self, request):
        res=['hello']
        return response_success_200(res)

def writeFile(filePath, file):
    with open(filePath, "wb") as f:
        if file.multiple_chunks():
            for content in file.chunks():
                f.write(content)
        else:
            data=file.read() ###.decode('utf-8')
            f.write(data)

class receiveUploadedExcel(APIView):
    def post(self,request):
        if request.method == "POST":
            fileDict = request.FILES.items()
            # 获取上传的文件，如果没有文件，则默认为None
            if not fileDict:
                return Response({'msg': 'no file upload'})
            for (k, v) in fileDict:
                print("dic[%s]=%s" % (k, v))
                fileData = request.FILES.getlist(k)
                for file in fileData:
                    fileName = file._get_name()
                    filePath = os.path.join('uploadFile/', fileName)
                    print('filepath = [%s]' % filePath)
                    try:
                        writeFile(filePath, file)
                    except:
                        return response_failed_400('file write failed')
            return response_success_200('success')