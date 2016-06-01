#!/usr/bin/env python3


from rest_framework.authentication import SessionAuthentication


class CSRFEnforcedSessionAuthentication(SessionAuthentication):
    """
    Use Django's session framework for authentication. But this time forces CSRF
    """

    def authenticate(self, request):
        """
        Returns a `User` if the request session currently has a logged in user.
        Otherwise returns `None`.
        """

        # Get the session-based user from the underlying HttpRequest object
        user = getattr(request._request, 'user', None)

        self.enforce_csrf(request)

        # CSRF passed with authenticated user
        return (user, None)
