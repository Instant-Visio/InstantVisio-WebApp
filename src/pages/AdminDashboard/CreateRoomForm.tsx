import React from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TextField } from 'formik-material-ui';
import MuiTextField from '@material-ui/core/TextField';
import {Autocomplete, AutocompleteRenderInputParams} from 'formik-material-ui-lab';
import { spacing } from "@material-ui/system";
import { styled } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";
import { Formik, Form, Field } from 'formik';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import frLocale from "date-fns/locale/fr";
import {DateTimePicker} from 'formik-material-ui-pickers';
import Chip from '@material-ui/core/Chip';  
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles';
import Flags from 'country-flag-icons/react/3x2'
import {parsePhoneNumber} from 'libphonenumber-js'




const Button = styled(MuiButton)(spacing);

const CreateRoomForm = () => {

    interface Values {
        roomName: string;
        participants: Array<any>;
        startAt : Date;
    }

    const [value, setValue] = React.useState([]);


    const ErrorChip = withStyles({
        root: {

            borderColor: "red"
          
        }
      })(Chip);

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            chip : {
                borderColor : "green"
            },
            chipIconContainer: {
                width: 'fit-content'
            },
            flagIcon:{
                height:'0.8rem',
                marginRight:theme.spacing(1),
                marginLeft:theme.spacing(1)
            }
        }),    
    );

    const classes = useStyles();

    const handleKeyDown = (event) => {
        switch (event.keyCode) {
          case 186: // ;
          case 32:  // space
          case 9:{  // tab
            event.preventDefault();
            event.stopPropagation();
            if (event.target.value.length > 0) {
                const newValue = [...value, event.target.value] as never[]
                setValue(newValue);
            }
            break;
          }
          default:
        }
      };

    const  validateEmail = (email) =>{
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexp.test(email);
    }

    const validatePhoneNumber = (phoneNumber) =>{
        let isValid = true;

        try {
            parsePhoneNumber(phoneNumber,'FR');
        }catch(error){
            isValid = false;
        }

        return isValid;
    }

    const isParticipantValid = (participant) => {
        return validateEmail(participant) || validatePhoneNumber(participant);
    }
    interface MyInputProps {
        onKeyDown: (event: object) => void;
    }
    interface MyParams extends AutocompleteRenderInputParams {
        inputProps: MyInputProps;
    }

    const renderFlagIcon = (participant) => {
        try {
            const phoneNumber = parsePhoneNumber(participant,'FR');
            const FlagIcon = Flags[phoneNumber.country];
            return ( 
            <Grid container alignItems="center" className={classes.chipIconContainer}>
                <FlagIcon title="United States" className={classes.flagIcon}/>
                <Divider orientation="vertical" flexItem/>
            </Grid>
            );
        }catch(error){
            return null;
        } 
    }

    const renderTag = (participant, index, getTagProps) => {

        let ChipElement;

        if(isParticipantValid(participant)){
            ChipElement = Chip;
        }else{
            ChipElement = ErrorChip;

        }

        return (
            <ChipElement
                icon = {renderFlagIcon(participant)}
                variant="outlined"
                label={participant}
                size="small"
                {...getTagProps({ index })}
            />
        )
    }

    return (
 
        <Formik
            initialValues={{
                roomName: '',
                participants: [],
                startAt : null,
            }}
            validate={values => {
                const errors: Partial<Values> = {};
                if (!values.roomName) {
                    errors.roomName = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                setSubmitting(false);
                alert(JSON.stringify(values, null, 2));
                }, 500);
            }}
        >

        {({ submitForm, isSubmitting }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>
                    <Form>
                        <Typography variant="h5" component="h1">
                            Créer une discussion en visio
                        </Typography>
                        <Box m={4} />
                        <Typography variant="h6" component="h2">
                            Nom de la discussion
                        </Typography>
                        <Typography variant="body1">
                            Donner un nom à votre discussion pour la retrouver plus facilement.
                        </Typography>
                        <Box m={2} />
                        <Field
                            size="small"
                            component={TextField}
                            variant="outlined"
                            name="roomName"
                            label="Réunion de rédaction"
                        />
                        <Box m={4} />
                        <Typography variant="h6" component="h2">
                            Liste des participants
                        </Typography>
                        <Typography variant="body1">
                            Notez ici les numéros de téléphone, les adresses email et les groupes de contact à qui vous souhaitez envoyer une invitation.
                        </Typography>
                        <Box m={2} />
                        <Typography variant="body2">
                            Les numéros de téléphone ne doivent pas contenir d'espace.
                        </Typography>
                        <Field        
                            size="small"
                            name="participants"
                            component={Autocomplete}
                            multiple
                            freeSolo
                            value={value}
                            onChange={(event, newValue) => setValue(newValue)}
                            options={[]}
                            defaultValue={[]}
                            renderTags={(value, getTagProps) =>
                                value.map((participant, index) => 
                                    renderTag(participant, index, getTagProps)
                                )
                            }
                            renderInput={(params: MyParams) => {
                                params.inputProps.onKeyDown = handleKeyDown;
                                return (<MuiTextField
                                    {...params}
                                    error={false}
                                    helperText={false}
                                    label="Autocomplete"
                                    variant="outlined"
                                />);
                            }}
                        />
                        <Box m={4} />
                        <Typography variant="h6" component="h2">
                            Planifier votre RDV en visio
                        </Typography>
                        <Typography variant="body1">
                            Choisissez la date et l'heurede début de votre visio.
                        </Typography>
                        <Box m={2} />
                        <Field
                            name="startAt"
                            size="small"
                            component={DateTimePicker}
                            inputVariant="outlined"
                            placeholder="Cliquez pour choisir la date et l'heure"
                            fullWidth
                            locale="fr"
                            format='dd MMMM yyyy à HH:MM'
                            ampm={false}
                        />
                        <Box m={4} />
                        <Box display="flex" justifyContent="flex-end">
                            <Button
                                startIcon={<CheckBoxIcon/>}
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={submitForm}
                            >
                                Je crée le RDV
                            </Button>
                        </Box>
                    </Form>
                </MuiPickersUtilsProvider>
            )}
        </Formik>                                            
    )
}

export default CreateRoomForm
