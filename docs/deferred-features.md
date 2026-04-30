## Deferred Features

### Newsletter and Subscriptions

The newsletter archive and subscriber capture flow were removed from the active product on April 21, 2026.

What was removed from the live app:
- public newsletter page
- homepage newsletter component
- newsletter navigation links
- newsletter issue and subscriber APIs/models in Django

If this feature returns later, rebuild it from the existing CMS pattern:
- add Django models and serializers for issues/subscribers
- add public and admin API routes
- restore a frontend page/component only after budget and scope are approved
