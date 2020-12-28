import React, { useEffect } from 'react'
import { isAndroid } from '../../../services/platform'
import { PushNotificationsService } from '../../../services/push-notifications'
import { useDispatch } from 'react-redux'
import { showErrorMessage } from '../Snackbar/snackbarActions'
import { useTranslation } from 'react-i18next'
import { LocalNotificationsService } from '../../../services/local-notifications'
import { setRegistrationToken } from '../../../actions/userActions'

export const PushNotifications = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    useEffect(() => {
        if (isAndroid()) {
            const initPushNotifications = async () => {
                const isPermissionGranted = await PushNotificationsService.requestPermissions()
                if (isPermissionGranted) {
                    console.log('Permissions granted')
                    PushNotificationsService.register()
                    PushNotificationsService.createDefaultChannel()
                    PushNotificationsService.listenForRegistration(
                        (registrationToken) => {
                            dispatch(setRegistrationToken(registrationToken))
                        },
                        () => {
                            dispatch(
                                showErrorMessage(
                                    t('notification.errors.registration')
                                )
                            )
                        }
                    )

                    const redirectHandler = (roomId: string) => {
                        window.location.pathname = `/premium-video/
                            room/${roomId}`
                    }
                    LocalNotificationsService.listenForNotificationClick(
                        redirectHandler
                    )
                    PushNotificationsService.listenForNotificationClick(
                        redirectHandler
                    )
                } else {
                    dispatch(showErrorMessage(t('errors.permissions')))
                }
            }

            initPushNotifications()
        }
    }, [dispatch, t])

    return <></>
}
