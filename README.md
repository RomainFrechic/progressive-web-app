## A Progressive Web App using React and material-ui components.

https://romainfrechic.github.io/progressive-web-app/#/

The project has been bootstraped with [create-react-app](https://github.com/facebookincubator/create-react-app) wich use react-scripts for [serving, building and deploying](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts)
#### Scritps:
>npm run start

Start a developement server on localhost:3000. Will auto-reload and parse code with react linter.

>npm run build

Start Webpack building tools, default configuration will:
* transpile es6 to es5,
* bundle and minify all js and css files,
* hash the files for cache busting,
* and more.

>npm run deploy

After having specified the target deployement url, will alloy you to easily re-deploy new versions
We used [gh-pages](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) but you can use [others common plateforms](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#building-for-relative-paths)

#### Project documentation:

For many minor modifications, near to no React experience is required. Just plain javascript (es6 or 5) is usable.

##### Progressive Web Apps specifications:
We used [sw-precache](https://github.com/GoogleChrome/sw-precache) to automatically register a service worker and automatically put files in cache([see config file](https://github.com/Mathiasduc/react-intesens-PWA/blob/master/sw-precache-config.js)) once deployed.
PWA specifications block all unsecured HTTP communications so in deployment build you might want to use a https server

##### LogginPage:
For developing purpose, we are sending login request to a [dummy HTTPS API](https://reqres.in).
We are displaying error to the user if password or login are left empty.
We did not implement a proper and secured log-in system, we are simply saving the auth-token send by the server in a cookie, and verifying its existence to switch the global state "isLogged" to true.
If a user try to access other URL without being logged in, he will be redirected to login page.

##### NewDeviceForm:
We are testing the id field with a regex that you can easily modify.
In the localization field we are using the autocomplete API from Google Maps for addresses suggestions, or user can choose to use geolocalisation. If user has the geolocalisation disabled, we prompt him to activating it then to reload the page (we did not found a better way). We need an internet connection to reverse search the postal address corresponding to the API GPS coordinates.

##### ConfirmationPage:
You can sinmulate a 403 error from the API by trying to register a device with the id of "E403"
