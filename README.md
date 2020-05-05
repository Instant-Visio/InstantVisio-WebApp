Instant Visio app (web + firebase)

Instant Visio is a no-app one to one video conference created to help medical workers & caregivers connect patients with their friends and family.

More info on the Hacking Health Camp 2020 slack, #instantvisio

# Setup

## Front

-   Make sure you have a correct version of `./.env.development`.

```bash
nvm use # Use correct node version
npm i # Install dependencies
npm start # Run the app
```

## Functions

-   Make sure you have a correct version of `./functions/runtimeconfig.json`
-   Your should be logged in with firebase-cli: `firebase login`
-   Select the development project: `firebase use instantvisio-dev`
-   The developer email should be added in firebase project in order to be able to locally run functions

```bash
cd functions
nvm use
npm i
npm run serve
```
