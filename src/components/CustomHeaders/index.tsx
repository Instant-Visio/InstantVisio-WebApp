import React from 'react'
import { Helmet } from 'react-helmet'

export default function CustomHeaders() {
    return (
        <Helmet>
            <script id="mcjs">
                {`!function(c,h,i,m,p)
            {
                ((m = c.createElement(h)),
                (p = c.getElementsByTagName(h)[0]),
                (m.async = 1),
                (m.src = i),
                p.parentNode.insertBefore(m, p))
            }
            (document,"script","https://chimpstatic.com/mcjs-connected/js/users/54f72daf5d7948c23e68e8acb/d14e2a65c735d591f7145a7ee.js");`}
            </script>
        </Helmet>
    )
}
