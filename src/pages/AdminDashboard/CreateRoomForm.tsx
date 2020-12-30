import React from 'react'
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

const Button = styled(MuiButton)(spacing)

const CreateRoomForm = ({ fields, onFormSubmit }) => {
    const { t } = useTranslation('dashboard')
    interface Values {
        roomName: string
        participants: Array<any>
        startAt: Date
        hostName: string
    }

    const [value, setValue] = React.useState([])

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

    const validateEmail = (email) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regexp.test(email)
    }

    const validatePhoneNumber = (phoneNumber) => {
        let isValid = true

        try {
            parsePhoneNumber(phoneNumber, 'FR')
        } catch (error) {
            isValid = false
        }

        return isValid
    }

    const isParticipantValid = (participant) => {
        return validateEmail(participant) || validatePhoneNumber(participant)
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
        let ChipElement

        if (isParticipantValid(participant)) {
            ChipElement = Chip
        } else {
            ChipElement = ErrorChip
        }

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

    const isNumeric = (destination) => {
        for (let char of destination) {
            if (char >= '0' && char <= '9') continue
            else return false
        }

        return true
    }

    const formatDestinations = (destinations) => {
        return destinations.map((destination) => {
            if (destination.includes('@')) {
                return { email: destination }
            } else if (isNumeric(destination)) {
                return { phone: destination }
            } else {
                return { groupId: destination }
            }
        })
    }

    return (
        <Formik
            initialValues={fields}
            validate={(values) => {
                const errors: Partial<Values> = {}
                if (!values.roomName) {
                    errors.roomName = 'Required'
                }
                return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false)
                    const destinations = formatDestinations(value)
                    onFormSubmit({ ...values, participants: destinations })
                }, 500)
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
                            name="roomName"
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
                            name="participants"
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
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                startIcon={<CheckBoxIcon />}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}>
                                {t('form.submit')}
                            </Button>
                        </Box>
                    </Form>
                </MuiPickersUtilsProvider>
            )}
        </Formik>
    )
}

export default CreateRoomForm
