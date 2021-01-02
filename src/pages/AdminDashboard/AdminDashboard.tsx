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
import { createRoom, editRoom, getRooms, newRoom } from './roomsActions'
import UserDetails from './UserDetails'
import { Room } from './CreateRoomForm'
import CreateRoomConfirmation from './CreateRoomConfirmation'
import { selectCreatedRoom } from './roomsSelector'

const initialValues: Room = {
    id: '',
    name: '',
    destinations: [],
    startAt: null,
    hostName: '',
    hideChatbot: false,
    roomUrl: '',
}

const AdminDashboard = () => {
    const { t } = useTranslation('dashboard')
    const dispatch = useDispatch()
    const { userId, token } = useSelector(selectUser)
    const [fields, setFields] = useState<Room>(initialValues)
    const { roomId: createdRoomId } = useSelector(selectCreatedRoom)

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

        return () => {
            dispatch(newRoom())
        }
    }, [token, userId, dispatch, t])

    const onFormSubmit = (room, isEditing, remindAt) => {
        room.startAt = room.startAt / 1000
        if (isEditing) {
            console.log('SAving room: ', room)
            dispatch(editRoom(t, room))
        } else {
            dispatch(createRoom(t, room, remindAt))
        }
    }

    const onRoomEdit = (room) => {
        const updatedFields = {
            ...fields,
            ...room,
            startAt: room.startAt * 1000,
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
                            {!createdRoomId && (
                                <CreateRoomForm
                                    fields={fields}
                                    onFormSubmit={onFormSubmit}
                                    onCreateFormReset={onCreateFormReset}
                                />
                            )}
                            {createdRoomId && <CreateRoomConfirmation />}
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
