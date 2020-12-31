import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { Select as MaterialSelect, TextField } from '@material-ui/core'

export const UNITS = {
    mins: 'Minutes',
    hours: 'Heures',
    days: 'Jours',
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
)

type Unit = 'Minutes' | 'Heures' | 'Jours'

export default function NotificationSelector({
    notification,
    setNotification,
}) {
    const classes = useStyles()
    const handleChangeUnit = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNotification({
            ...notification,
            unit: event.target.value as Unit,
        })
    }

    const handleChangeNumber = (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setNotification({
            ...notification,
            number: event.target.value as number,
        })
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <TextField
                    id="outlined-basic"
                    value={notification.number}
                    type="number"
                    variant="outlined"
                    onChange={handleChangeNumber}
                />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <MaterialSelect
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={notification.unit as string}
                    onChange={handleChangeUnit}>
                    <MenuItem value={UNITS.mins}>{UNITS.mins}</MenuItem>
                    <MenuItem value={UNITS.hours}>{UNITS.hours}</MenuItem>
                    <MenuItem value={UNITS.days}>{UNITS.days}</MenuItem>
                </MaterialSelect>
            </FormControl>
        </div>
    )
}
