import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { TextField } from 'formik-material-ui'
import { Formik, Form, Field } from 'formik'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import frLocale from 'date-fns/locale/fr'
import { DateTimePicker } from 'formik-material-ui-pickers'
import { useTranslation } from 'react-i18next'
import NotificationSelector, { UNITS } from '../Reminders/NotificationSelector'
import { validationSchema } from './formValidation'
import {
    mapDestinationsToInputField,
    getRemindAt,
    formatDestinations,
} from './createRoomTools'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import { InviteParticipantsField } from './InviteParticipantsField'
import Button from '../../../components/Button/Button'
export interface Room {
    id: string
    name: string
    destinations: Array<any>
    startAt: Date | null
    hostName: string
    hideChatbot: boolean
    roomUrl: string
}

type Unit = 'Minutes' | 'Heures' | 'Jours'
interface Notification {
    unit: Unit
    number: number
}

enum DateToggleValue {
    NOW = 'now',
    LATER = 'later',
}

const CreateRoomForm = ({ fields, onFormSubmit, onCreateFormReset }) => {
    const { t } = useTranslation('dashboard')
    const [dateToggleValue, setToggleValue] = React.useState<string | null>(
        DateToggleValue.NOW
    )
    const [destinations, setDestinations] = React.useState([])

    const [isEditing, setIsEditing] = React.useState(false)
    const [notification, setNotification] = React.useState<Notification>({
        unit: UNITS.mins as Unit,
        number: 0,
    })

    // Populate the form with fields values when isEditing
    useEffect(() => {
        if (fields?.destinations?.length) {
            const mappedDestinations = mapDestinationsToInputField(
                fields.destinations
            )
            setDestinations(mappedDestinations as any)
        }

        if (fields?.name?.length) {
            setIsEditing(true)
        }
    }, [setDestinations, fields])

    const cancelEdit = () => {
        setIsEditing(false)
    }

    const dateToggleChanged = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        setToggleValue(newValue)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={fields}
            validationSchema={validationSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                const formattedDestinations = formatDestinations(destinations)
                const room = {
                    ...values,
                    id: fields.id,
                    destinations: formattedDestinations,
                }
                if (dateToggleValue === DateToggleValue.NOW) {
                    room.startAt = null
                }
                const remindAt = getRemindAt(room.startAt / 1000, notification)

                onFormSubmit(room, isEditing, remindAt)
            }}>
            {({ submitForm, isSubmitting }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                    <Form>
                        <Typography variant="h5" component="h1">
                            {t('form.create-visio')}
                        </Typography>
                        <Box m={4} />
                        <Typography variant="h6" component="h2">
                            {t('form.visio-name.title')}
                        </Typography>
                        <Typography variant="body1">
                            {t('form.visio-name.description')}
                        </Typography>
                        <Box m={2} />
                        <Field
                            size="small"
                            component={TextField}
                            variant="outlined"
                            name="name"
                            required={true}
                            label={t('form.visio-name.placeholder')}
                        />
                        <Box m={4} />
                        <Typography variant="h6" component="h2">
                            {t('form.host-name.title')}
                        </Typography>
                        <Typography variant="body1">
                            {t('form.host-name.description')}
                        </Typography>
                        <Box m={2} />
                        <Field
                            size="small"
                            component={TextField}
                            variant="outlined"
                            name="hostName"
                            required={true}
                            label={t('form.host-name.placeholder')}
                        />
                        <Box m={4} />

                        <Typography variant="h6" component="h2">
                            {t('form.participants.title')}
                        </Typography>
                        <Typography variant="body1">
                            {t('form.participants.description')}
                        </Typography>
                        <Box m={2} />
                        <Typography variant="body2">
                            {t('form.participants.description2')}
                        </Typography>
                        <Box m={2} />
                        <InviteParticipantsField
                            destinations={destinations}
                            setDestinations={setDestinations}
                        />
                        <Box m={4} />
                        <Typography variant="h6" component="h2">
                            {t('form.plan-visio.title')}
                        </Typography>
                        <Box m={2} />
                        <ToggleButtonGroup
                            value={dateToggleValue}
                            exclusive
                            onChange={dateToggleChanged}
                            aria-label="text alignment">
                            <ToggleButton value={DateToggleValue.NOW}>
                                {t('form.plan-visio.now')}
                            </ToggleButton>
                            <ToggleButton value={DateToggleValue.LATER}>
                                {t('form.plan-visio.later')}
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Box m={2} />
                        {dateToggleValue === DateToggleValue.LATER && (
                            <>
                                <Typography variant="body1">
                                    {t('form.plan-visio.description')}
                                </Typography>
                                <Box m={2} />
                                <Field
                                    name="startAt"
                                    size="small"
                                    component={DateTimePicker}
                                    inputVariant="outlined"
                                    placeholder={t('form.date.placeholder')}
                                    fullWidth
                                    locale="fr"
                                    format="dd MMMM yyyy à HH:mm"
                                    ampm={false}
                                />

                                <Box m={2} />
                                {!isEditing && (
                                    <>
                                        <Typography variant="h6" component="h2">
                                            {t('form.reminders.title')}
                                        </Typography>
                                        <NotificationSelector
                                            notification={notification}
                                            setNotification={setNotification}
                                        />
                                    </>
                                )}
                            </>
                        )}

                        <Box m={4} />

                        <Box display="flex" justifyContent="flex-end">
                            {isEditing && (
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        onCreateFormReset()
                                        cancelEdit()
                                        setDestinations([])
                                    }}>
                                    {t('form.buttons.cancel')}
                                </Button>
                            )}
                            <Button
                                startIcon={<CheckBoxIcon />}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}>
                                {t(
                                    isEditing
                                        ? 'form.buttons.save'
                                        : 'form.buttons.submit'
                                )}
                            </Button>
                        </Box>
                    </Form>
                </MuiPickersUtilsProvider>
            )}
        </Formik>
    )
}

export default CreateRoomForm
