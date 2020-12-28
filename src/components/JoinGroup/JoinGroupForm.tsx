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
const Button = styled(MuiButton)(spacing)

interface JoinGroupValues {
    name: string
    password: string
}

const JoinGroupForm = ({ onFormSubmit }) => {
    const { t } = useTranslation('join-group-form')

    return (
        <Formik
            initialValues={{
                name: '',
                password: '',
            }}
            validate={(values) => {
                const errors: Partial<JoinGroupValues> = {}
                if (!values.name) {
                    errors.name = 'Required'
                }
                return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    console.log('Submitted: ', values)
                    onFormSubmit(values, { setSubmitting })
                }, 500)
            }}>
            {({ submitForm, isSubmitting }) => (
                <Form>
                    <Typography variant="h5" component="h1">
                        {t('title')}
                    </Typography>
                    <Box m={4} />
                    <Typography variant="h6" component="h2">
                        {t('fields.name.title')}
                    </Typography>
                    <Typography variant="body1">
                        {t('fields.name.description')}
                    </Typography>
                    <Box m={2} />
                    <Field
                        size="small"
                        component={TextField}
                        variant="outlined"
                        name="name"
                        label={t('fields.name.placeholder')}
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
                        name="password"
                        label={t('fields.password.placeholder')}
                    />
                    <Box m={4} />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            startIcon={<CheckBoxIcon />}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            onClick={submitForm}>
                            {t('submit')}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default JoinGroupForm
