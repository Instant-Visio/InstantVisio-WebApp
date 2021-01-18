import React, { useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import GroupIcon from '@material-ui/icons/Group'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ClearIcon from '@material-ui/icons/Clear'
import { IconButton } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { selectGroup } from './groupSelector'
import { useSelector } from 'react-redux'
import { selectUser } from '../../components/App/userSelector'
import { useTranslation } from 'react-i18next'
import { getGroup, deleteMembers } from './groupActions'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            marginLeft: theme.spacing(2),
        },
        list: {
            paddingTop: 0,
            paddingBottom: 0,
            maxHeight: 200,
            overflowY: 'auto',
        },
        listItem: {
            paddingTop: 0,
            paddingBottom: 0,
        },
    })
)

interface Props {
    groupId: string
}

const GroupMembersList = ( { groupId }: Props ) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { token } = useSelector(selectUser)
    const group = useSelector(selectGroup)
    const { t } = useTranslation('group-members-list')

    useEffect(() => {
        if (token) {
            dispatch(getGroup(t, groupId))
        }
    }, [token, dispatch, groupId, t])

    const deleteMember = (member) => {
        dispatch(deleteMembers(t,groupId,[member]))
    }

    return (
        <Paper elevation={0}>
            <Grid container alignItems="center" spacing={2}>
                <Grid item>
                    <GroupIcon className={classes.icon} />
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        {t('title')}
                    </Typography>
                </Grid>
            </Grid>
            <Divider />
            <List component="nav" className={classes.list}>
                {group && group.members.map((member) => {
                    return (
                        <ListItem
                            key={member.id}
                            className={classes.listItem}>
                            <ListItemText primary={member.name} />
                            <IconButton onClick={() => deleteMember(member)}>
                                <ClearIcon />
                            </IconButton>
                            <Divider variant="middle" />
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
    )
}

export default GroupMembersList
