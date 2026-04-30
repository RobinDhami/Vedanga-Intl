from django.contrib import admin

from .models import (
    Club,
    ContactSubmission,
    Event,
    GalleryImage,
    HeroSlide,
    JobOpening,
    NewsArticle,
    Notice,
    TeamMember,
    Video,
)


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "sort_order", "updated_at")
    list_editable = ("is_published", "sort_order")
    search_fields = ("title", "subtitle")


@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ("title", "show_in_overlay", "is_published", "published_at", "updated_at")
    list_filter = ("show_in_overlay", "is_published")
    list_editable = ("show_in_overlay",)
    search_fields = ("title", "excerpt")


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "author", "is_published", "published_at")
    list_filter = ("category", "is_published")
    search_fields = ("title", "excerpt", "content", "author")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "event_date", "is_published")
    list_filter = ("category", "is_published")
    search_fields = ("title", "description", "venue")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "taken_on", "is_published", "sort_order")
    list_filter = ("category", "is_published")
    search_fields = ("title", "description", "category")
    list_editable = ("is_published", "sort_order")


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ("name", "icon_name", "members", "meeting_day", "is_published", "sort_order")
    list_filter = ("icon_name", "is_published")
    search_fields = ("name", "description", "advisor", "meeting_day")
    list_editable = ("is_published", "sort_order")
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "is_published", "sort_order", "updated_at")
    list_filter = ("is_published",)
    search_fields = ("title", "subtitle", "url")
    list_editable = ("is_published", "sort_order")


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "team_group", "show_on_homepage", "is_published", "sort_order", "updated_at")
    search_fields = ("name", "position", "qualifications", "subject", "email", "phone", "image_url")
    list_filter = ("team_group", "show_on_homepage", "is_published")
    list_editable = ("show_on_homepage", "is_published", "sort_order")


@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display = ("title", "department", "employment_type", "is_published", "sort_order")
    search_fields = ("title", "department", "employment_type", "experience", "education", "description")
    list_filter = ("employment_type", "is_published")
    list_editable = ("is_published", "sort_order")


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("first_name", "last_name", "email", "phone", "status", "created_at")
    list_filter = ("status",)
    search_fields = ("first_name", "last_name", "email", "phone", "message")
    list_editable = ("status",)
