/**
 * This file was modified by
 * Mattia Primavera <sconqua@gmail.com>
 */

import { useContext } from 'react'
import { VideoContext } from '../../components/VideoProvider'

export default function useVideoContext() {
    const context = useContext(VideoContext)
    if (!context) {
        throw new Error('useVideoContext must be used within a VideoProvider')
    }
    return context
}
