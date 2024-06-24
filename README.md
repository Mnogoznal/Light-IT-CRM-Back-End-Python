
# CRM System | Tech | _Застосунок для LigthIT_

**Виконав студент: Петренко Олександр, для LightIT**

![Static Badge](https://img.shields.io/badge/with%20a%20django-grey?style=for-the-badge&logo=django)
![Static Badge](https://img.shields.io/badge/with%20a%20js-grey?style=for-the-badge&logo=javascript)

# Інструкції для запуску проекту:

## [+] Вимоги:

**Для запуску проекту вам знадобляться:**

- Python 3.12.4 або новіше
- Node.js 14 або новіше
- npm або yarn

## [+] Бекенд (Django):

- Клонувати репозиторій: **tech_store**
- Створення і активація віртуального середовища:
```sh
python -m venv env
source env/bin/activate  # Для Linux/MacOS
env\Scripts\activate  # Для Windows
```
- Встановлення залежностей:
```sh
pip install -r requirements.txt
pip install requests
pip install drf-yasg
pip install xhtml2pdf
pip install reportlab
```
- Застосування міграцій
```sh
python manage.py migrate
```
- Завантаженя фікстури:
```sh
python manage.py loaddata products.json
```
- Створення суперкористувача
```sh
python manage.py createsuperuser
```
- Запуск сервера
```sh
python manage.py runserver
```

## [+] Крок Налаштування проекту Django:
- Інсталяція Django, Django REST Framework та Django Allauth:
```sh
pip install django djangorestframework django-allauth dj-rest-auth
```

- Додайте налаштування CORS у бекенд для взаємодії з фронтендом::
```sh
pip install django-cors-headers
```

## [+] Для отримання замовлень по даті:
```sh
 <-> Пояснення:
 [+] http://127.0.0.1:8000/api/orders-in-date-range/?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD

 [+] Де YYYY-MM-DD:
 <-> Це YYYY - Рік
 <-> Це MM - Місяць
 <-> Це DD - День

 <-> Приклад:
 [+] http://127.0.0.1:8000/api/orders-in-date-range/?start_date=2024-04-01&end_date=2024-05-16
```

_Посилання:_
**http://127.0.0.1:8000/api/orders-in-date-range/?start_date=2024-04-01&end_date=2024-05-16**

## [+] Для отримання більш детальної інформації о ендпоінтах в АПІ, потрібно звернутися за посиланням:
**http://127.0.0.1:8000/swagger/**
**Або:**
**http://127.0.0.1:8000/redoc/**

## Для отримання PDF файлу з рахунком, потрібно звернутися за цим посилання замість 2, будь-яке ID:
**http://127.0.0.1:8000/api/invoices/2/pdf/**

## [+] Фронтенд (ReactJS):

- Клонування репозиторію:
```sh
cd tech-store-frontend
```
- Встановлення залежностей:
```sh
npm install
# або
yarn install
```
- Запуск сервера:
```sh
npm start
# або
yarn start
```

## [+] Крок Налаштування проекту React:
- Інсталяція залежностей:
```sh
npm install axios react-router-dom jwt-decode
```

![Lax 2.0 Gif](https://i.imgur.com/XNvvAOv.gif)