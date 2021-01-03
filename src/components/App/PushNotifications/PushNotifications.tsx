import React, { useEffect } from 'react'
import { isAndroid } from '../../../services/platform'
import { PushNotificationsService } from '../../../services/push-notifications'
import { useDispatch } from 'react-redux'
import { showErrorMessage } from '../Snackbar/snackbarActions'
import { useTranslation } from 'react-i18next'
import { LocalNotificationsService } from '../../../services/local-notifications'
import { sendRegistrationToken } from '../../../actions/userActions'
import { useSelector } from 'react-redux'
import { selectToken } from '../userSelector'
import { openPremiumVideoCall } from '../../../services/safari-view-controller'

export const PushNotifications = () => {
    const dispatch = useDispatch()
    const { t } = useTranslation('notifications')
    const hasToken = useSelector(selectToken)

    useEffect(() => {
        if (isAndroid() && hasToken) {
            const initPushNotifications = async () => {
                const isPermissionGranted = await PushNotificationsService.requestPermissions()
                if (isPermissionGranted) {
                    console.log('Permissions granted')
                    PushNotificationsService.register()
                    PushNotificationsService.createDefaultChannel()
                    PushNotificationsService.listenForRegistration(
                        (registrationToken) => {
                            dispatch(
                                sendRegistrationToken(t, registrationToken)
                            )
                        },
                        () => {
                            dispatch(showErrorMessage(t('errors.registration')))
                        }
                    )

                    const redirectHandler = (roomUrl: string) => {
                        openPremiumVideoCall(roomUrl)
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
    }, [dispatch, t, hasToken])

    return <></>
}
