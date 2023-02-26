
## Features
- custom user model
- auth with JWT
- profiles - signal to create (one to one to user)
- 2 apps( uuid, FK, time)
- .env
- image, files (Product Model)
- Full Crud to profiles and Products model

## Setup
* git clone https://github.com/Orsmad/Django_Rest_Framework_Template.git
* cd .\django_general_template
* python -m virtualenv myenv
* .\myenv\Scripts\activate
* pip install -r requirements.txt
* py .\manage.py runserver

## Useful commands
* py .\manage.py makemigrations
* py .\manage.py migrate
* py .\manage.py runserver
* py .\manage.py createsuperuser
* pip freeze > requirements.txt
* django-admin startproject myproj .    (the dot is part of the command)
* django-admin startapp (app name)	


## Superuser:
Email: or@mail.com
Username: or
password: 123

## Seed DB:
* py ./manage.py > dumpdata db.json
* py ./manage.py loaddata db.json


## Git
* git init
* git add .
* git commit -m "commit name"
* git branch -M main
* git remote add origin (link to github repo)
* git push -u origin main

## Git branch
*  git pull
*  git checkout -b "bramchname/xxx"
*  git add (files)
*  git commit -m "useful comment"
*  git push --set-upstream origin (branch-name)

* Create pull request.
* Merge.
