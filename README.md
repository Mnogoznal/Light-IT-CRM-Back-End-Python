
# CRM System | Tech | _Застосунок для LigthIT_

**Виконав студент: Петренко Олександр**

# Інструкції для запуску проекту:

## Вимоги:

**Для запуску проекту вам знадобляться:**

- Python 3.8 або новіше
- Node.js 14 або новіше
- npm або yarn

## Бекенд (Django):

- Клонування репозиторію
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

## Фронтенд (React):

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

## Крок Налаштування проекту Django:
- Інсталяція Django, Django REST Framework та Django Allauth:
```sh
pip install django djangorestframework django-allauth dj-rest-auth
```

- Додайте налаштування CORS у бекенд для взаємодії з фронтендом::
```sh
pip install django-cors-headers
```

## Крок Налаштування проекту React:
- Інсталяція залежностей:
```sh
npm install axios react-router-dom jwt-decode
```