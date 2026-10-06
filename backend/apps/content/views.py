import json

from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import permissions, viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import (
    Club,
    ContactSubmission,
    Event,
    GalleryImage,
    HeroSlide,
    JobOpening,
    Notice,
    TeamMember,
    Video,
)
from .serializers import (
    ClubSerializer,
    ContactSubmissionSerializer,
    EventSerializer,
    GalleryImageSerializer,
    HeroSlideSerializer,
    JobOpeningSerializer,
    NoticeSerializer,
    TeamMemberSerializer,
    VideoSerializer,
)


class PublishedQuerysetMixin:
    def get_queryset(self):
        queryset = super().get_queryset()
        if self.request.query_params.get("include_unpublished") == "true":
            return queryset
        return queryset.filter(is_published=True)


class HeroSlideViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = HeroSlide.objects.all()
    serializer_class = HeroSlideSerializer


class NoticeViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer

    @action(detail=False, methods=["get"])
    def latest(self, request):
        notice = self.get_queryset().filter(show_in_overlay=True).first()
        serializer = self.get_serializer(notice)
        return Response(serializer.data if notice else None)


class EventViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "slug"

    @action(detail=False, methods=["get"])
    def latest(self, request):
        queryset = self.get_queryset()[:3]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class GalleryImageViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer


class ClubViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    lookup_field = "slug"


class VideoViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer


class TeamMemberViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        team_group = self.request.query_params.get("group")
        if team_group in {"academic", "eca"}:
            queryset = queryset.filter(team_group=team_group)

        if self.request.query_params.get("homepage") == "true":
            queryset = queryset.filter(show_on_homepage=True)

        return queryset


class JobOpeningViewSet(PublishedQuerysetMixin, viewsets.ReadOnlyModelViewSet):
    queryset = JobOpening.objects.all()
    serializer_class = JobOpeningSerializer


class ContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer

    def get_permissions(self):
        if self.action == "create":
            return [AllowAny()]
        return [AdminPermission()]


class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class AdminHeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.all()
    serializer_class = HeroSlideSerializer
    permission_classes = [AdminPermission]


class AdminNoticeViewSet(viewsets.ModelViewSet):
    queryset = Notice.objects.all()
    serializer_class = NoticeSerializer
    permission_classes = [AdminPermission]


class AdminEventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [AdminPermission]
    lookup_field = "slug"


class AdminGalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [AdminPermission]


class AdminClubViewSet(viewsets.ModelViewSet):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    permission_classes = [AdminPermission]
    lookup_field = "slug"


class AdminVideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer
    permission_classes = [AdminPermission]


class AdminTeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer
    permission_classes = [AdminPermission]


class AdminJobOpeningViewSet(viewsets.ModelViewSet):
    queryset = JobOpening.objects.all()
    serializer_class = JobOpeningSerializer
    permission_classes = [AdminPermission]


class AdminContactSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AdminPermission]


@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([AllowAny])
def csrf(request):
    return Response({"detail": "CSRF cookie set"})


@api_view(["GET"])
@permission_classes([AllowAny])
def session_user(request):
    user = request.user
    if not user.is_authenticated:
        return Response({"authenticated": False, "is_staff": False})

    return Response(
        {
            "authenticated": True,
            "is_staff": user.is_staff,
            "username": user.username,
            "email": user.email,
        }
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    payload = request.data if hasattr(request, "data") else json.loads(request.body or "{}")
    username = payload.get("username", "")
    password = payload.get("password", "")

    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({"detail": "Invalid username or password."}, status=400)

    if not user.is_staff:
        return Response({"detail": "Staff access is required."}, status=403)

    login(request, user)
    return Response(
        {
            "authenticated": True,
            "is_staff": user.is_staff,
            "username": user.username,
            "email": user.email,
        }
    )


@api_view(["POST"])
def logout_view(request):
    logout(request)
    return Response({"authenticated": False})
