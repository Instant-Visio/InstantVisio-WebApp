import React, { useEffect, useState } from 'react'
import { IonContent } from '@ionic/react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../../styles/muiTheme'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CreateRoomForm from './CreateRoomForm/CreateRoomForm'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/App/userSelector'
import { getUserDetails } from '../../actions/userActions'
import { useDispatch } from 'react-redux'
import { getGroups } from './groupsActions'
import {
    createRoom,
    editRoom,
    getRooms,
    resetRoomCreated,
} from './roomsActions'
import UserDetails from './UserDetails'
import { Room } from './CreateRoomForm/CreateRoomForm'
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
    const isCreatedRoom = useSelector(selectCreatedRoom)

    useEffect(() => {
        if (token) {
            dispatch(getUserDetails(t))
            dispatch(getRooms(t))
            dispatch(getGroups(t))
        }

        return () => {
            dispatch(resetRoomCreated())
        }
    }, [token, userId, dispatch, t])

    const onFormSubmit = async (room, isEditing, remindAt) => {
        room.startAt = room.startAt / 1000
        if (isEditing) {
            await dispatch(editRoom(t, room, remindAt))
            onCreateFormReset()
        } else {
            dispatch(createRoom(t, room, remindAt))
        }
    }

    const onRoomEdit = (room) => {
        dispatch(resetRoomCreated())
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
                            {!isCreatedRoom && (
                                <CreateRoomForm
                                    fields={fields}
                                    onFormSubmit={onFormSubmit}
                                    onCreateFormReset={onCreateFormReset}
                                />
                            )}
                            {isCreatedRoom && <CreateRoomConfirmation />}
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
