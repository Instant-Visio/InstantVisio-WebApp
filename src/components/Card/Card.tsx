import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import VideocamIcon from '@material-ui/icons/Videocam'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '90%',
        },
    },
    title: {
        fontSize: 40,
        [theme.breakpoints.down('md')]: {
            fontSize: 28,
        },
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#30404f',
    },
    pos: {
        fontSize: 35,
        [theme.breakpoints.down('md')]: {
            fontSize: 17,
        },
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#30404f',
    },
    icon: {
        width: theme.spacing(10),
        height: theme.spacing(10),
        left: '50%',
        color: '#566777',
    },
    button: {
        margin: theme.spacing(1),
        fontSize: 20,
        [theme.breakpoints.down('md')]: {
            fontSize: 10,
        }
    },
}))

export default function SimpleCard({ onClick,title, messageOne, messageTwo, labelBtnNewCall }) {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <Grid container justify="center" alignItems="center">
                <EmojiEmotionsIcon className={classes.icon} />
            </Grid>
            <CardContent>
                <Typography className={classes.title}>{title}</Typography>
                <Typography className={classes.pos} component="p">
                    {messageOne}
                </Typography>
                <Typography className={classes.pos} component="p">
                    {messageTwo}
                </Typography>
            </CardContent>
            <Grid container justify="center" alignItems="center">
                <Button
                    onClick={() => onClick(true)}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<VideocamIcon style={{ fontSize: 30 }} />}>
                     {labelBtnNewCall}
                </Button>
            </Grid>
        </Card>
    )
}
