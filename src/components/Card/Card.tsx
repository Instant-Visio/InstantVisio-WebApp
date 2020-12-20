import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import VideocamIcon from '@material-ui/icons/Videocam'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1500,
        [theme.breakpoints.down('md')]: {
            maxWidth: 300,
        },
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#30404f',
    },
    pos: {
        fontSize: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#30404f',
    },
    icon: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        left: '50%',
    },
    button: {
        margin: theme.spacing(1),
        fontSize: 20,
    },
}))

export default function SimpleCard({ onClick }) {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <SentimentVerySatisfiedIcon className={classes.icon} />
            </Grid>
            <CardContent>
                <Typography className={classes.title}>A BIENTÔT !</Typography>
                <Typography className={classes.pos} component="p">
                    Nous espérons que votre InstantVisio s'est bien passé.
                </Typography>
                <Typography className={classes.pos} component="p">
                    Prenez soin de vous.
                </Typography>
            </CardContent>
            <Grid container justify="center" alignItems="center">
                <Button
                    onClick={() => onClick(true)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<VideocamIcon style={{ fontSize: 30 }} />}>
                    Lancer un nouvel instantVisio
                </Button>
            </Grid>
        </Card>
    )
}
