import React, { useEffect, useState } from 'react'
import { IonContent } from '@ionic/react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../../styles/muiTheme'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CreateRoomForm from './CreateRoomForm'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/App/userSelector'
import { Api } from '../../services/api'
import { UserDetailsRetrieved } from '../../actions/userActions'
import { useDispatch } from 'react-redux'
import { createRoom, editRoom, getRooms } from './roomsActions'
import UserDetails from './UserDetails'
import { Values } from './CreateRoomForm'

const initialValues = {
    roomName: '',
    destinations: [],
    startAt: null,
    hostName: '',
}

const AdminDashboard = () => {
    const { t } = useTranslation('dashboard')

    const dispatch = useDispatch()
    const { userId, token, details } = useSelector(selectUser)
    const [fields, setFields] = useState<Values>(initialValues)

    useEffect(() => {
        const getUserDetails = async () => {
            const api = new Api(token)
            const userDetails = await api.getUserDetails(userId)
            dispatch(UserDetailsRetrieved(userDetails))
        }

        if (token) {
            getUserDetails()
            dispatch(getRooms(t))
        }
    }, [token, userId, dispatch, t])

    const onFormSubmit = (values, isEditing) => {
        const { roomName, hostName, destinations, roomId } = values
        if (isEditing) {
            dispatch(editRoom(t, roomId, roomName, hostName, destinations))
        } else {
            dispatch(createRoom(t, roomName, hostName, destinations))
        }
    }

    const onRoomEdit = (room) => {
        const updatedFields = {
            ...fields,
            ...{
                roomName: room.name,
                hostName: room.hostName,
                startAt: room.startAt,
                destinations: room.destinations,
            },
        }
        setFields(updatedFields)
    }

    const onCreateFormReset = () => {
        setFields(initialValues)
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <IonContent style={{ '--background': 'white' }}>
                <Container maxWidth="lg">
                    <Box m={6} />
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <CreateRoomForm
                                fields={fields}
                                onFormSubmit={onFormSubmit}
                                onCreateFormReset={onCreateFormReset}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <UserDetails onRoomEdit={onRoomEdit} />
                        </Grid>
                    </Grid>
                </Container>
            </IonContent>
        </ThemeProvider>
    )
}

export default AdminDashboard
