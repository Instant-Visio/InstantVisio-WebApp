import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import theme from './styles/theme'
import './i18n/i18n'
import './i18n/countries'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

const rootComponent = (
    <Suspense fallback={null}>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </Suspense>
)

ReactDOM.render(rootComponent, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
