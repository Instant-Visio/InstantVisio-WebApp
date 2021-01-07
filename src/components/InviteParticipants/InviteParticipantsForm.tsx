import React from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Formik, Form } from 'formik'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { InviteParticipantsField } from '../../pages/AdminDashboard/CreateRoomForm/InviteParticipantsField'
import { formatDestinations } from '../../pages/AdminDashboard/CreateRoomForm/createRoomTools'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
    selectHostName,
    selectRoomId,
} from '../../pages/PremiumVideoCall/roomSelector'
import { inviteParticipants } from '../../pages/AdminDashboard/roomsActions'

export default function InviteParticipantsForm() {
    const { t } = useTranslation(['add-participants-form', 'dashboard'])
    const dispatch = useDispatch()
    const hostName = useSelector(selectHostName)
    const roomId = useSelector(selectRoomId)

    const [destinations, setDestinations] = React.useState([])
    const initialValues = []

    const onFormSubmit = (destinations) => {
        dispatch(inviteParticipants(t, roomId, hostName, destinations))
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    const formattedDestinations = formatDestinations(
                        destinations
                    )
                    onFormSubmit(formattedDestinations)
                }}>
                {({ submitForm, isSubmitting }) => (
                    <Form>
                        <Typography variant="h5" component="h2">
                            {t('add-participants-form:title')}
                        </Typography>
                        <Typography variant="h6" component="h2">
                            {t('dashboard:form.participants.title')}
                        </Typography>
                        <Typography variant="body1">
                            {t('dashboard:form.participants.description')}
                        </Typography>
                        <Box m={2} />
                        <Typography variant="body2">
                            {t('dashboard:form.participants.description2')}
                        </Typography>
                        <Box m={2} />
                        <InviteParticipantsField
                            destinations={destinations}
                            setDestinations={setDestinations}
                        />
                        <Box m={4} />

                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                startIcon={<CheckBoxIcon />}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}>
                                {t('add-participants-form:buttons.submit')}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </>
    )
}
