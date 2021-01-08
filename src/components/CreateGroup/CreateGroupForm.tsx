import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { TextField } from 'formik-material-ui'
import Button from '../Button/Button'
import { Formik, Form, Field } from 'formik'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { useTranslation } from 'react-i18next'
import { selectToken } from '../App/userSelector'
import { useSelector } from 'react-redux'
import { createGroup } from '../../pages/AdminDashboard/groupsActions'
import { useDispatch } from 'react-redux'
import { validationSchema } from './formValidation'

export interface Group {
    name: string
    password: string
}

const CreateGroupForm = () => {
    const { t } = useTranslation('create-group-form')
    const token = useSelector(selectToken)
    const dispatch = useDispatch()

    return (
        <Formik
            initialValues={{
                name: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true)
                dispatch(createGroup(t,values))
                setSubmitting(false)
            }}>
            {({ submitForm, isSubmitting, isValid }) => (
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
                        placeholder={t('fields.name.placeholder')}
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
                        name="password"
                        placeholder={t('fields.password.placeholder')}
                    />
                    <Box m={4} />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            startIcon={<CheckBoxIcon />}
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting || !token || !isValid}
                            onClick={submitForm}>
                            {t('submit')}
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    )
}

export default CreateGroupForm
