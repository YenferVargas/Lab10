from django.shortcuts import render
from django.http import JsonResponse
from .models import Categoria,Producto
# Create your views here.
def index(request):
    lista_productos = Producto.objects.all()
    lista_categorias = Categoria.objects.all()
    
    context = {
        'productos':lista_productos,
        'categorias':lista_categorias
    }
    return render(request,'index.html',context)



def producto(request):
    data = [
        {
            "codigo": 1,
            "descripcion": "Coca cola",
            "precio": 2.33
        },
        {
            "codigo": 2,
            "descripcion": "Fanta",
            "precio": 1.7
        }
    ]

    return JsonResponse(data, safe=False)


def categoria(request,categoria_id):
    categoria = Categoria.objects.get(pk=categoria_id)
    lista_productos = categoria.producto_set.all()
    lista_categorias = Categoria.objects.all()
    
    context = {
        'productos':lista_productos,
        'categorias':lista_categorias,
        'categoria':categoria
    }
    
    return render(request,'index.html',context)