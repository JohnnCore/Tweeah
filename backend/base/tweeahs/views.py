from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.core.exceptions import ObjectDoesNotExist

from tweeahs.models import Tweeah
from .serializers import TweeahSerializer, CreateTweeahSerializer

from django.core.cache import cache
from django.views.decorators.cache import cache_page

# Create your views here.

#Function Based Views
@api_view(['POST']) 
def tweeah_create_view(request, *args, **kwargs):
    data = {
        'body': request.data.get('body'),
        'user': request.user.id,
    }
    serializer = CreateTweeahSerializer(data = data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        cache.set(serializer.instance.pk, serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({}, status=400)

@api_view(['GET'])
def tweeah_list_view(request, *args, **kwargs):
        # cache.add('chave', 'valor', 3600)  # Armazena 'valor' com a chave 'chave' por 1 hora
        # cache.set('coiso', 'valor', 3600)  # Armazena 'valor' com a chave 'chave' por 1 hora

        # print(cache.get('chave'))
        qs = Tweeah.objects.all()
        parent_tweets = [tweet for tweet in qs if tweet.is_parent]
        paginator = Paginator(parent_tweets, 7)
        page_number = request.GET.get('page')

        try:
            page_obj = paginator.page(page_number)
            serializer = TweeahSerializer(page_obj, many=True, context={'request': request})

            data = {
                'results': serializer.data,
                'total_pages': paginator.num_pages,
                'current_page': page_obj.number,
            }
            return Response(data)
        except EmptyPage:
            return Response({'error': 'Página inválida'})
        except PageNotAnInteger:
            page_obj = paginator.page(1)
            serializer = TweeahSerializer(page_obj, many=True, context={'request': request})
            data = {
                'results': serializer.data,
                'total_pages': paginator.num_pages,  
                'current_page': page_obj.number,

            }
            return Response(data)

@api_view(['GET']) 
def tweeah_details_view(request, pk, *args, **kwargs):
    try:
        qs = Tweeah.objects.get(id=pk)
        serializer = TweeahSerializer(qs, context={'request': request})  # Pass the request object to the serializer
        thread_serializer = TweeahSerializer(qs.get_tweet_thread(), many=True, context={'request': request})
        data = {
            'results':serializer.data,
            'thread':thread_serializer.data,
        }
        return Response(data, status=status.HTTP_200_OK)
    except Tweeah.DoesNotExist:
        return Response({}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH']) 
def tweeah_update_view(request, pk, *args, **kwargs):
    qs = Tweeah.objects.get(pk=pk)
    if qs.user.id == request.user.id:
        serializer = TweeahSerializer(instance=qs, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"message" : "You cannot delete this tweet"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE']) 
def tweeah_delete_view(request, pk, *args, **kwargs):
    qs = Tweeah.objects.get(pk=pk)

    # qs = qs.filter(user=request.user)
    # if not qs.exists():
    #     return Response({"message" : "You cannot delete this tweet"}, status=401)

    if qs.user.id == request.user.id:
        qs.delete()
        return Response({"message" : "Tweet removed"}, status=status.HTTP_200_OK)
    return Response({"message" : "You cannot delete this tweet"}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST']) 
def replies_create_view(request, pk, *args, **kwargs):
    print(f'printei {pk}')
    if pk:
        qs = Tweeah.objects.get(id=pk)
        data = {
            'body': request.data.get('body'),
            'parent_tweet':pk,
            'user': request.user.id,
        }
        serializer = CreateTweeahSerializer(data = data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def replies_list_view(request, pk, *args, **kwargs):
    if pk:
        try:
            qs = Tweeah.objects.get(id=pk)
            replies = qs.replies.all()
            serializer = TweeahSerializer(replies, many=True, context={'request': request})

            data = {
                'results': serializer.data,
            }
            return Response(data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Tweet não encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
@api_view(['POST'])
def like_unlike_tweeah(request, pk, *args, **kwargs):
    if pk:
        try:
            qs = Tweeah.objects.get(id=pk)
            if request.data.get("iliked"):
                qs.liked_by.remove(request.user.id)
            else:
                qs.liked_by.add(request.user.id)

            return Response({"message" : "Tweet liked"}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Tweet não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

"""
#GENERICS VIEWS
class TweeahList(generics.ListAPIView):
    queryset = Tweeah.objects.all()
    serializer_class = TweeahSerializer

class TweeeahCreate(generics.CreateAPIView):
    queryset = Tweeah.objects.all()
    serializer_class = TweeahSerializer

class TweetDetailUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tweeah.objects.all()
    serializer_class = TweeahSerializer 
"""

"""
@api_view(['POST']) 
def comment_create_view(request,pk, *args, **kwargs):
    data = {
        'tweeah': pk,
        'body': request.data.get('body'),
    }
    serializer = CommentSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)
    return Response({}, status=400)

@api_view(['GET'])
def comment_list_view(request, pk, *args, **kwargs):
    qs = Comment.objects.filter(tweeah_id=pk)
    serializer = CommentSerializer(qs, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def retweeah_create_view(request, pk, *args, **kwargs):
    print(pk)
    data = {
        'tweeah':pk,
    }
    qs = Tweeah.objects.get(id=pk)
    serializer = RetweeahSerializer(data=data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return Response(serializer.data, status=201)
    return Response({}, status=400)
"""