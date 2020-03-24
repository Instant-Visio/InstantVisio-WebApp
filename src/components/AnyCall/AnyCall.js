import React from 'react'
import {
    useParams
} from 'react-router-dom'
import VideoCallFrame from '../VideoCallFrame/VideoCallFrame'

const AnyCall = () => {
    const {callId}  = useParams()

    return  <div>
        <VideoCallFrame url={`https://instantvisio.daily.co/${callId}`}/>
    </div>
}

export default AnyCall