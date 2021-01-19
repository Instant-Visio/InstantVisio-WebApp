import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { TextField } from 'formik-material-ui'
import { spacing } from '@material-ui/system'
import { styled } from '@material-ui/core/styles'
import MuiButton from '@material-ui/core/Button'
import { Formik, Form, Field } from 'formik'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { useTranslation } from 'react-i18next'
import { selectToken, selectRegistrationToken } from '../App/userSelector'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import { useSelector } from 'react-redux'
const Button = styled(MuiButton)(spacing)

export interface JoinGroupValues {
    groupId: string
    groupPassword: string
    displayName: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        loader: {
            zIndex: theme.zIndex.drawer + 1,
            position: 'absolute',
            margin: 'auto',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        },
        container: {
            position: 'relative',
        },
    })
)

const JoinGroupForm = ({ onFormSubmit }) => {
    const { t } = useTranslation('join-group-form')
    const token = useSelector(selectToken)
    const registrationToken = useSelector(selectRegistrationToken)
    const classes = useStyles()

    const validateForm = (values) => {
        const errors: Partial<JoinGroupValues> = {}
        const requiredFields = ['groupId', 'groupPassword', 'displayName']
        for (const requiredField of requiredFields) {
            if (!values[requiredField]) {
                errors[requiredField] = 'Required'
            }
        }
        return errors
    }

    return (
        <Box className={classes.container}>
            {!registrationToken && (
                <CircularProgress className={classes.loader} color="primary" />
            )}
            <Formik
                initialValues={{
                    groupId: '',
                    groupPassword: '',
                    displayName: '',
                }}
                validate={(values) => validateForm(values)}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        console.log('Submitted: ', values)
                        onFormSubmit(values, { setSubmitting })
                    }, 500)
                }}>
                {({ submitForm, isSubmitting, isValid }) => (
                    <Form autoComplete="off">
                        <Typography variant="h5" component="h1">
                            {t('title')}
                        </Typography>
                        <Box m={4} />

                        <Typography variant="h6" component="h2">
                            {t('fields.username.title')}
                        </Typography>
                        <Typography variant="body1">
                            {t('fields.username.description')}
                        </Typography>
                        <Box m={2} />
                        <Field
                            size="small"
                            component={TextField}
                            variant="outlined"
                            name="displayName"
                            placeholder={t('fields.username.placeholder')}
                        />
                        <Box m={4} />

                        <Typography variant="h6" component="h2">
                            {t('fields.id.title')}
                        </Typography>
                        <Typography variant="body1">
                            {t('fields.id.description')}
                        </Typography>
                        <Box m={2} />
                        <Field
                            size="small"
                            component={TextField}
                            variant="outlined"
                            name="groupId"
                            placeholder={t('fields.id.placeholder')}
                        />
                        <Box m={4} />

                        <Typography variant="h6" component="h2">
                            {t('fields.password.title')}
                        </Typography>
                        <Typography variant="body1">
                            {t('fields.password.description')}
                        </Typography>
                        <Box m={2} />
                        <Field
                            size="small"
                            component={TextField}
                            variant="outlined"
                            type="password"
                            name="groupPassword"
                            placeholder={t('fields.password.placeholder')}
                        />
                        <Box m={4} />
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                startIcon={<CheckBoxIcon />}
                                variant="contained"
                                color="primary"
                                disabled={
                                    isSubmitting ||
                                    !token ||
                                    !registrationToken ||
                                    !isValid
                                }
                                onClick={submitForm}>
                                {t('submit')}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default JoinGroupForm
