import React, {useEffect} from 'react'
import {
    Route,
    withRouter
} from 'react-router-dom'

import NewCall from '../NewCall'
import LegalMentions from '../LegalMentions'
import PersonalData from '../PersonalData'
import './app.css'

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
        <Route path="/" exact component={NewCall}/>
        <Route path="/mentions-legales" exact component={LegalMentions}/>
        <Route path="/donnees-personnelles" exact component={PersonalData}/>
    </div>
}

// withRouter to pass props to components (AnyCall)
export default withRouter(App)