
# Ecommerce store - Or Smadga

My ecommerce store project is a full-stack web application that was built using Django, DRF, React with TypeScript, Redux, PostgreSQL, and Docker. 
Project was created for 'John Bryce' 

## LINK
site is live at https://lovely-creponne-ff5330.netlify.app/


## Key Features
* Built with Django, DRF, React with TypeScript, Redux, PostgreSQL, and Docker.
* AI-powered system that recommends products reviews based on user browsing history and purchase behavior.
* Profile image updating that automatically updates images based on user feedback and preference.
* Custom logger and decorators that monitor the activity of the site and ensure it is running smoothly.
* Email notification system that sends notifications to users regarding order confirmation and shipping updates.
* Seamless login and logout experience,  including the ability to create an account and add products to a cart.
* Secure and straightforward checkout process that allows users to complete transactions with ease.
* Built using Docker containerization technology, making it easy to deploy and run the application in various environments.
* Fake ecommerce store that is designed for coursework at John Bryce.
Provides an excellent user experience that is both intuitive and secure.

## Superuser:
Email: admintest@mail.com
password: Aa123456

## Testuser:
Email: testuser@mail.com
password: Aa123456

## Seed DB:
* py ./manage.py > dumpdata db.json
* py ./manage.py loaddata db.json


## Setup

First, change the DB.

If you have not installed Python3, [please do](https://www.python.org/downloads/).

First create and activate some form of environment to store your dependencies. I like [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html):

```
$ conda create -n myenv python=3.7

$ conda activate myenv
```

**Or** just use Pythons built in environments:

```
$ python3 -m venv venv

$ .venv/bin/activate
```
**Or** install virtualenvs:
```

$ pip install virtualenv
$ python -m virtualenv myenv
$ myenv\Scripts\activate
```

then, install the requierments 

`$ pip install -r requirements.txt`
```
DB under instance folder should come with data.
to add data  run

$ py .\init_db.py

```

### Run the app

`$ py ./manage.py runserver`

You should now be able to see the output in your browser window (at http://127.0.0.1:8000) 





## Setup-frontend
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
