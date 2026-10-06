from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PublishableModel(TimeStampedModel):
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(blank=True, null=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        abstract = True
        ordering = ("sort_order", "-published_at", "-updated_at")

    def sync_publication_state(self):
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        if not self.is_published:
            self.published_at = None


def build_unique_slug(model_class, title: str, instance_pk=None) -> str:
    base_slug = slugify(title) or "item"
    candidate = base_slug
    index = 1

    while model_class.objects.filter(slug=candidate).exclude(pk=instance_pk).exists():
        index += 1
        candidate = f"{base_slug}-{index}"

    return candidate


class HeroSlide(PublishableModel):
    title = models.CharField(max_length=200)
    subtitle = models.TextField(blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    cta_text = models.CharField(max_length=80, blank=True)
    cta_link = models.CharField(max_length=255, blank=True)

    class Meta(PublishableModel.Meta):
        verbose_name = "Hero Slide"
        verbose_name_plural = "Hero Slides"

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        super().save(*args, **kwargs)


class Notice(PublishableModel):
    title = models.CharField(max_length=200)
    excerpt = models.TextField(blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    link = models.CharField(max_length=255, blank=True)
    show_in_overlay = models.BooleanField(default=False)

    class Meta(PublishableModel.Meta):
        ordering = ("-published_at", "-updated_at")
        verbose_name = "Update"
        verbose_name_plural = "Updates"

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        super().save(*args, **kwargs)


class NewsArticle(PublishableModel):
    CATEGORY_CHOICES = [
        ("Academic", "Academic"),
        ("Events", "Events"),
        ("Facilities", "Facilities"),
        ("International", "International"),
        ("Sports", "Sports"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    excerpt = models.TextField()
    content = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    author = models.CharField(max_length=120)
    image_url = models.CharField(max_length=500, blank=True)
    tags = models.JSONField(default=list, blank=True)

    class Meta(PublishableModel.Meta):
        ordering = ("-published_at", "-updated_at")

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        self.slug = build_unique_slug(NewsArticle, self.title, self.pk)
        super().save(*args, **kwargs)


class Event(PublishableModel):
    CATEGORY_CHOICES = [
        ("Academic", "Academic"),
        ("Sports", "Sports"),
        ("Cultural", "Cultural"),
        ("Community", "Community"),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    venue = models.CharField(max_length=255)
    event_date = models.DateField()
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    image_url = models.CharField(max_length=500, blank=True)
    schedule = models.JSONField(default=list, blank=True)

    class Meta(PublishableModel.Meta):
        ordering = ("event_date", "sort_order", "-updated_at")

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        self.slug = build_unique_slug(Event, self.title, self.pk)
        super().save(*args, **kwargs)


class GalleryImage(PublishableModel):
    CATEGORY_CHOICES = [
        ("School Life", "School Life"),
        ("Academics", "Academics"),
        ("Sports", "Sports"),
        ("Events", "Events"),
        ("Activities", "Activities"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    taken_on = models.DateField(blank=True, null=True)

    class Meta(PublishableModel.Meta):
        ordering = ("sort_order", "-taken_on", "-updated_at")

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        super().save(*args, **kwargs)


class Club(PublishableModel):
    ICON_CHOICES = [
        ("code", "Code"),
        ("camera", "Camera"),
        ("mic", "Mic"),
        ("palette", "Palette"),
        ("music", "Music"),
    ]

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, choices=ICON_CHOICES, default="code")
    members = models.PositiveIntegerField(default=0)
    meeting_day = models.CharField(max_length=100, blank=True)
    activities = models.JSONField(default=list, blank=True)
    advisor = models.CharField(max_length=255, blank=True)
    image_url = models.CharField(max_length=500, blank=True)

    class Meta(PublishableModel.Meta):
        ordering = ("sort_order", "name", "-updated_at")

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        self.slug = build_unique_slug(Club, self.name, self.pk)
        super().save(*args, **kwargs)


class Video(PublishableModel):
    title = models.CharField(max_length=255)
    subtitle = models.TextField(blank=True)
    url = models.URLField()

    class Meta(PublishableModel.Meta):
        ordering = ("sort_order", "-updated_at")

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        super().save(*args, **kwargs)


class TeamMember(PublishableModel):
    GROUP_CHOICES = [
        ("academic", "Academic"),
        ("eca", "ECA"),
    ]

    name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    image_url = models.CharField(max_length=500, blank=True)
    qualifications = models.TextField(blank=True)
    subject = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50, blank=True)
    team_group = models.CharField(max_length=20, choices=GROUP_CHOICES, default="academic")
    show_on_homepage = models.BooleanField(default=False)

    class Meta(PublishableModel.Meta):
        ordering = ("sort_order", "-updated_at")

    def __str__(self) -> str:
        return self.name

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        super().save(*args, **kwargs)


class JobOpening(PublishableModel):
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    employment_type = models.CharField(max_length=100)
    experience = models.CharField(max_length=255)
    education = models.CharField(max_length=255)
    description = models.TextField()

    class Meta(PublishableModel.Meta):
        ordering = ("sort_order", "-updated_at")

    def __str__(self) -> str:
        return self.title

    def save(self, *args, **kwargs):
        self.sync_publication_state()
        super().save(*args, **kwargs)


class ContactSubmission(TimeStampedModel):
    STATUS_CHOICES = [
        ("new", "New"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
    ]

    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    email = models.EmailField()
    phone = models.CharField(max_length=40)
    message = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="new")
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}".strip() or self.email
