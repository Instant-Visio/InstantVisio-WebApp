import React, {useEffect} from 'react'
import {
    Route,
    withRouter
} from 'react-router-dom'

import './App.scss'
import LegalMentions from '../LegalMentions/LegalMentions'
import {Home} from '../../pages'

const App = () => {
    useEffect(() => {
        // when using vh and vw units in css:
        // to make sure the height taken into account
        // is the whole window size,
        // not the visible window size
        // (critical on mobile, where, on click on the contact form inputs,
        // the keyboard appears and takes half of the window size,
        // which shrinks the form size - unpleasant user experience)
        setTimeout(() => {
            const viewheight = window.innerHeight
            const viewwidth = window.innerWidth
            const viewport = document.querySelector('meta[name=viewport]')
            viewport.setAttribute('content', `height=${viewheight}px, width=${viewwidth}px, initial-scale=1.0`)
        }, 300)
    }, [])
    
    return  <div className="App">
        <Route path="/" exact component={Home}/>
        <Route path="/mentions-legales" exact component={LegalMentions}/>
    </div>
}

// withRouter to pass props to components (AnyCall)
export default withRouter(App)