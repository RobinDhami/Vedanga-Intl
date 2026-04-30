from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AdminClubViewSet,
    AdminContactSubmissionViewSet,
    AdminEventViewSet,
    AdminGalleryImageViewSet,
    AdminHeroSlideViewSet,
    AdminJobOpeningViewSet,
    AdminNewsArticleViewSet,
    AdminNoticeViewSet,
    AdminTeamMemberViewSet,
    AdminVideoViewSet,
    ClubViewSet,
    ContactSubmissionViewSet,
    EventViewSet,
    GalleryImageViewSet,
    HeroSlideViewSet,
    JobOpeningViewSet,
    NewsArticleViewSet,
    NoticeViewSet,
    TeamMemberViewSet,
    VideoViewSet,
    csrf,
    login_view,
    logout_view,
    session_user,
)


router = DefaultRouter()
router.register("hero-slides", HeroSlideViewSet, basename="hero-slide")
router.register("notices", NoticeViewSet, basename="notice")
router.register("news", NewsArticleViewSet, basename="news")
router.register("events", EventViewSet, basename="event")
router.register("gallery-images", GalleryImageViewSet, basename="gallery-image")
router.register("clubs", ClubViewSet, basename="club")
router.register("videos", VideoViewSet, basename="video")
router.register("team-members", TeamMemberViewSet, basename="team-member")
router.register("job-openings", JobOpeningViewSet, basename="job-opening")
router.register("contact-submissions", ContactSubmissionViewSet, basename="contact-submission")

admin_router = DefaultRouter()
admin_router.register("hero-slides", AdminHeroSlideViewSet, basename="admin-hero-slide")
admin_router.register("notices", AdminNoticeViewSet, basename="admin-notice")
admin_router.register("news", AdminNewsArticleViewSet, basename="admin-news")
admin_router.register("events", AdminEventViewSet, basename="admin-event")
admin_router.register("gallery-images", AdminGalleryImageViewSet, basename="admin-gallery-image")
admin_router.register("clubs", AdminClubViewSet, basename="admin-club")
admin_router.register("videos", AdminVideoViewSet, basename="admin-video")
admin_router.register("team-members", AdminTeamMemberViewSet, basename="admin-team-member")
admin_router.register("job-openings", AdminJobOpeningViewSet, basename="admin-job-opening")
admin_router.register("contact-submissions", AdminContactSubmissionViewSet, basename="admin-contact-submission")

urlpatterns = [
    path("auth/csrf/", csrf, name="csrf"),
    path("auth/login/", login_view, name="login"),
    path("auth/logout/", logout_view, name="logout"),
    path("auth/me/", session_user, name="session-user"),
    path("", include(router.urls)),
    path("admin/", include(admin_router.urls)),
]
