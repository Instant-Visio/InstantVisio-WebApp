Instant Visio app (web + firebase)

Instant Visio is a no-app one to one video conference created to help medical workers & caregivers connect patients with their friends and family.

More info on the Hacking Health Camp 2020 slack, #instantvisio

# API

_Current API Version: **v1**_

Currently in development and deployed for development propose only
- [API Documentation](https://instantvisio-dev.web.app/api/v1-docs/)
- [API Endpoint](https://instantvisio-dev.web.app/api/v1/)

# Setup

## Front

-   Make sure you have a correct version of `./.env.development`.

```bash
nvm use # Use correct node version
npm i # Install dependencies
npm start # Run the app
```

### Local Emulator

If you want to use Firebase Emulators to run the app locally:

```bash
cd functions;
export FIREBASE_AUTH_EMULATOR_HOST="localhost:9099"
nvm use; npm run serve-emulators
```

Furthermore, you need to change your `.env.development` file to set the following information:

```
REACT_APP_AUTH_EMULATOR_ENABLED=true
REACT_APP_API_URL=http://localhost:5050/.../api # Check the URL exposed by firebase functions emulator
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

## Mobile

1. Considering `platform` is either `android` or `ios`, you can **build** the project with

    ```bash
    nvm use
    npm i
    npm run build:${PLATFORM} # ex: npm run build:ios
    ```

    This command will build the web app, synchronise native plugin & assets with the native platform and open the mobile platform default `IDE`. You can then build and run the app using your `IDE`.

2. To only **open** the `IDE` you can use

    ```bash
    npm run open:${platform}
    ```

3. To build the app with livereload feature (for development purposes):

    ```bash
    npm run run:${PLATFORM}
    ```

# Guidelines

- JS & Typescript: 
    - use destructuring
    - use TS types & interfaces 
    - small to medium (1 -> ~300 lines) components
    - reusable components should be within `src/components`
    - reducers/actions/selectors should live alongside and be scoped to the domain (possible domains: room/call, dashboard/stats, group)
    - actions,reducers, props should be typed
- Libraries:
    - keep the amount of libraries to a minimum to have the lowest possible bundle size
    - form: Formik, Yup
    - UI: Material UI
    - state: Redux & redux-thunk for async actions
    - routing: Ionic Router
- Code organization
    - draft Pull Request for early on review if needed
    - branch name: you can use `issueNumber_feature-desc` but you are free to choose what you need
    - review: add 2 or more reviewers, one of them being either [MattiaPrimavera](https://github.com/MattiaPrimavera) or [HugoGresse](https://github.com/HugoGresse). At least one approve for the PR to be considered as accepted and ready to be merged 
    - Pull Request are merged using `Squash & merge`
    - Pull Request description: details what youthink is necessary to understand the code scope, linked issue, and any other things
- Use interfaces to [define prop types](https://github.com/facebook/create-react-app/issues/8021) in typescript
