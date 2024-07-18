"""
URL configuration for ob30_apis project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path


from ob30_apis.ob30_apis import views



urlpatterns = [
    #path('admin/', admin.site.urls),

    # /.well-known/did.json
    #path( '.well-known/did.json', views.endpoint_well_known.as_view() ),
    path( '.well-known/<str:json_path>', views.endpoint__well_known.as_view() ),


    # /v1/apis/

    # /v1/apis/issuers
    #path( 'v1/issuers/<str:_id>', views.endpoint__issuers.as_view() ),
    path( 'issuers/<str:_id>', views.endpoint__issuers.as_view() ),

    # /v1/apis/refresh
    #path( 'v1/refresh', views.endpoint__refresh.as_view() ),
    path( 'refresh/<str:_id>', views.endpoint__refresh.as_view() ),

    # /v1/apis/credentials
    #path( 'v1/credentials/<str:_id>', views.endpoint__credentials.as_view() ),
    path( 'credentials/<str:_id>', views.endpoint__credentials.as_view() ),

    # ----------

    # /v1/apis/create_issuer
    #path( 'v1/create_issuer', views.endpoint__create_issuer.as_view() ),
    path( 'create_issuer', views.endpoint__create_issuer.as_view() ),

    # /v1/apis/create_credentials_issuance
    #path( 'v1/create_credentials_issuance', views.endpoint__create_credentials_issuance.as_view() ),
    path( 'create_credentials_issuance', views.endpoint__create_credentials_issuance.as_view() ),

    # /v1/apis/update_credentials_issuance
    #path( 'v1/update_credentials_issuance', views.endpoint__update_credentials_issuance.as_view() ),
    #path( 'update_credentials_issuance', views.endpoint__update_credentials_issuance.as_view() ),

    # /v1/apis/delete_credentials_issuance
    #path( 'v1/delete_credentials_issuance', views.endpoint__delete_credentials_issuance.as_view() ),
    #path( 'delete_credentials_issuance', views.endpoint__delete_credentials_issuance.as_view() ),

    # /v1/apis/revocate_credentials_issuance
    #path( 'v1/revocate_credentials_issuance', views.endpoint__revocate_credentials_issuance.as_view() ),
    #path( 'revocate_credentials_issuance', views.endpoint__revocate_credentials_issuance.as_view() ),

]
