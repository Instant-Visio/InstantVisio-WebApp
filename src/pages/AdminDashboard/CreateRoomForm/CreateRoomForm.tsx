import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { TextField } from 'formik-material-ui'
import MuiTextField from '@material-ui/core/TextField'
import {
    Autocomplete,
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab'
import { spacing } from '@material-ui/system'
import { styled } from '@material-ui/core/styles'
import MuiButton from '@material-ui/core/Button'
import { Formik, Form, Field } from 'formik'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import frLocale from 'date-fns/locale/fr'
import { DateTimePicker } from 'formik-material-ui-pickers'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {
    makeStyles,
    Theme,
    createStyles,
    withStyles,
} from '@material-ui/core/styles'
import Flags from 'country-flag-icons/react/3x2'
import { parsePhoneNumber } from 'libphonenumber-js'
import { useTranslation } from 'react-i18next'
import NotificationSelector, { UNITS } from '../Reminders/NotificationSelector'
import { validationSchema } from '../formValidation'
import {
    mapDestinationsToInputField,
    getRemindAt,
    validateEmail,
    validatePhoneNumber,
    isParticipantValid,
    isNumeric,
    formatDestinations,
} from './createRoomTools'

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

export const Button = styled(MuiButton)(spacing)

const CreateRoomForm = ({ fields, onFormSubmit, onCreateFormReset }) => {
    const { t } = useTranslation('dashboard')
    const [value, setValue] = React.useState([])
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
            setValue(mappedDestinations as any)
        }

        if (fields?.name?.length) {
            setIsEditing(true)
        }
    }, [setValue, fields])

    const ErrorChip = withStyles({
        root: {
            borderColor: 'red',
        },
    })(Chip)

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            chip: {
                borderColor: 'green',
            },
            chipIconContainer: {
                width: 'fit-content',
            },
            flagIcon: {
                height: '0.8rem',
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
            },
        })
    )

    const classes = useStyles()

    const handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 186: // ;
            case 32: // space
            case 9: {
                // tab
                event.preventDefault()
                event.stopPropagation()
                if (event.target.value.length > 0) {
                    const newValue = [...value, event.target.value] as never[]
                    setValue(newValue)
                }
                break
            }
            default:
        }
    }

    interface MyInputProps {
        onKeyDown: (event: object) => void
    }
    interface MyParams extends AutocompleteRenderInputParams {
        inputProps: MyInputProps
    }

    const renderFlagIcon = (participant) => {
        try {
            const phoneNumber = parsePhoneNumber(participant, 'FR')
            const FlagIcon = Flags[phoneNumber.country]
            return (
                <Grid
                    container
                    alignItems="center"
                    className={classes.chipIconContainer}>
                    <FlagIcon
                        title="United States"
                        className={classes.flagIcon}
                    />
                    <Divider orientation="vertical" flexItem />
                </Grid>
            )
        } catch (error) {
            return null
        }
    }

    const renderTag = (participant, index, getTagProps) => {
        const ChipElement = isParticipantValid(participant) ? Chip : ErrorChip

        return (
            <ChipElement
                icon={renderFlagIcon(participant)}
                variant="outlined"
                label={participant}
                size="small"
                {...getTagProps({ index })}
            />
        )
    }

    const cancelEdit = () => {
        setIsEditing(false)
    }

    return (
        <Formik
            enableReinitialize
            initialValues={fields}
            //validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false)
                const destinations = formatDestinations(value)
                const room = {
                    ...values,
                    id: fields.id,
                    destinations,
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
                        <Field
                            size="small"
                            name="destinations"
                            component={Autocomplete}
                            multiple
                            freeSolo
                            value={value}
                            onChange={(event, newValue) => setValue(newValue)}
                            options={[]}
                            defaultValue={[]}
                            renderTags={(value, getTagProps) =>
                                value.map((participant, index) =>
                                    renderTag(participant, index, getTagProps)
                                )
                            }
                            renderInput={(params: MyParams) => {
                                params.inputProps.onKeyDown = handleKeyDown
                                return (
                                    <MuiTextField
                                        {...params}
                                        error={false}
                                        helperText={false}
                                        label={t(
                                            'form.participants.placeholder'
                                        )}
                                        variant="outlined"
                                    />
                                )
                            }}
                        />
                        <Box m={4} />
                        <Typography variant="h6" component="h2">
                            {t('form.plan-visio.title')}
                        </Typography>
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
                            format="dd MMMM yyyy à HH:MM"
                            ampm={false}
                        />
                        <Box m={4} />

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

                        <Box display="flex" justifyContent="flex-end">
                            {isEditing && (
                                <Button
                                    color="primary"
                                    disabled={isSubmitting}
                                    onClick={() => {
                                        onCreateFormReset()
                                        cancelEdit()
                                        setValue([])
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
