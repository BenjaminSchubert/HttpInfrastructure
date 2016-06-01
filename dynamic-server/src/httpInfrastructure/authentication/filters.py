#!/usr/bin/env python3

from rest_framework.filters import BaseFilterBackend


__author__ = "Benjamin Schubert <ben.c.schubert@gmail.com>"


class OwnerFilter(BaseFilterBackend):
    """
    Filter to prevent a user from having access to other's information
    """

    def filter_queryset(self, request, queryset, view):
        """ filters the query set based on the owner attribute """
        return queryset.filter(user=request.user)
