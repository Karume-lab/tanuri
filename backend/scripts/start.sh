#!/usr/bin/env bash
# Exit on error
set -o errexit

# Convert static asset files
python manage.py collectstatic --no-input

# Apply any outstanding database migrations
python manage.py flush --no-input
python manage.py migrate
python manage.py seed
