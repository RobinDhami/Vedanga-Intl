from rest_framework import serializers

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


class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = [
            "id",
            "title",
            "subtitle",
            "cta_text",
            "cta_link",
            "sort_order",
            "is_published",
            "image_url",
        ]


class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = [
            "id",
            "title",
            "excerpt",
            "link",
            "published_at",
            "is_published",
            "image_url",
            "show_in_overlay",
        ]


class EventSerializer(serializers.ModelSerializer):
    time = serializers.SerializerMethodField()
    date = serializers.DateField(source="event_date")

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "category",
            "venue",
            "date",
            "time",
            "schedule",
            "published_at",
            "is_published",
            "image_url",
        ]

    def get_time(self, obj):
        if not obj.start_time and not obj.end_time:
            return ""
        start = obj.start_time.strftime("%I:%M %p") if obj.start_time else ""
        end = obj.end_time.strftime("%I:%M %p") if obj.end_time else ""
        return " - ".join(part for part in [start, end] if part)


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = [
            "id",
            "title",
            "description",
            "category",
            "taken_on",
            "sort_order",
            "is_published",
            "image_url",
        ]


class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "icon_name",
            "members",
            "meeting_day",
            "activities",
            "advisor",
            "image_url",
            "sort_order",
            "is_published",
        ]


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = [
            "id",
            "title",
            "subtitle",
            "url",
            "sort_order",
            "is_published",
        ]


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = [
            "id",
            "name",
            "position",
            "image_url",
            "qualifications",
            "subject",
            "email",
            "phone",
            "team_group",
            "show_on_homepage",
            "sort_order",
            "is_published",
        ]


class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = [
            "id",
            "title",
            "department",
            "employment_type",
            "experience",
            "education",
            "description",
            "sort_order",
            "is_published",
        ]


class ContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone",
            "message",
            "status",
            "notes",
            "created_at",
        ]
        read_only_fields = ["status", "notes", "created_at"]
