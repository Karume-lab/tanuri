# TANURI BACKEND

The **Tanuri Backend** powers all core functionality for the Tanuri ecosystem — including authentication, order management, gas delivery tracking, and loyalty systems.  
It is built using **Django** and **Django REST Framework (DRF)**, providing a robust and scalable API foundation for both the web and mobile applications.

---

## Tech Stack

- **Python 3+**
- **Django**
- **Django REST Framework (DRF)**
- **drf-spectacular** for API documentation (Swagger and Redoc)
- **SQLite** (default for development)

---

## Setup Instructions

Assuming you have already cloned the repository, navigate to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

- **macOS / Linux**

  ```bash
  source venv/bin/activate
  ```

- **Windows**

  ```bash
  venv\Scripts\activate
  ```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## Database Setup (SQLite for Development)

Run migrations to set up your local database:

```bash
python manage.py migrate
```

(Optional) Create a superuser for accessing the Django admin panel:

```bash
python manage.py createsuperuser
```

---

## Running the Server

Start the local development server:

```bash
python manage.py runserver
```

The backend will now be running at:
**[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

You can access:

- API endpoints → **[http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)**
- Django Admin Panel → **[http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)**
- Swagger Docs → **[http://127.0.0.1:8000/api/docs/swagger/](http://127.0.0.1:8000/api/docs/swagger/)**
- Redoc Docs → **[http://127.0.0.1:8000/api/docs/redoc/](http://127.0.0.1:8000/api/docs/redoc/)**

---

## Common Development Commands

| Command                            | Description                              |
| ---------------------------------- | ---------------------------------------- |
| `python manage.py makemigrations`  | Create migration files for model changes |
| `python manage.py migrate`         | Apply database migrations                |
| `python manage.py createsuperuser` | Create an admin user                     |
| `python manage.py runserver`       | Start the local development server       |

---

## Notes

- The backend uses **SQLite** in development for simplicity.
- For production environments, configure **PostgreSQL** by changing `DATABASE_URL` in the .env.

---

## Related

- [Tanuri Website README](../apps/tanuri-website/README.md)
- [Tanuri Mobile App README](../apps/tanuri-consumer-mobile/README.md)
