import React from 'react'
import MuiTextField from '@material-ui/core/TextField'
import {
    Autocomplete,
    AutocompleteRenderInputParams,
} from 'formik-material-ui-lab'
import { Field } from 'formik'
import { useTranslation } from 'react-i18next'
import { isParticipantValid } from './createRoomTools'
import { parsePhoneNumber } from 'libphonenumber-js'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {
    makeStyles,
    Theme,
    createStyles,
    withStyles,
} from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Flags from 'country-flag-icons/react/3x2'
import { selectGroups, Group } from '../groupsSelector'
import { useSelector } from 'react-redux'

interface Props {
    destinations: unknown[]
    setDestinations: Function
}

interface MyInputProps {
    onKeyDown: (event: object) => void
}
interface MyParams extends AutocompleteRenderInputParams {
    inputProps: MyInputProps
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chip: {
            borderColor: 'green',
        },
        chipIconContainer: {
            width: 'fit-content',
        },
        flagIcon: {
            height: '0.8rem',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
    })
)

const ErrorChip = withStyles({
    root: {
        borderColor: 'red',
    },
})(Chip)

export const InviteParticipantsField = ({
    destinations,
    setDestinations,
}: Props) => {
    const { t } = useTranslation('dashboard')
    const classes = useStyles()

    const groups: Array<Group> = useSelector(selectGroups)

    const handleKeyDown = (event) => {
        switch (event.keyCode) {
            case 186: // ;
            case 32: // space
            case 9: {
                autoCompleteHandler(event)
                break
            }
            default:
        }
    }

    const autoCompleteHandler = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        event.preventDefault()
        event.stopPropagation()
        const { target } = event
        if (target.value.length > 0) {
            const newValue = [...destinations, target.value] as never[]
            setDestinations(newValue)
        }
    }

    const renderTag = (participant, index, getTagProps) => {
        const ChipElement = isParticipantValid(participant, groups)
            ? Chip
            : ErrorChip

        return (
            <ChipElement
                icon={renderFlagIcon(participant)}
                variant="outlined"
                label={participant}
                size="small"
                {...getTagProps({ index })}
            />
        )
    }

    const renderFlagIcon = (participant) => {
        try {
            const phoneNumber = parsePhoneNumber(participant, 'FR')
            const FlagIcon = Flags[phoneNumber.country]
            return (
                <Grid
                    container
                    alignItems="center"
                    className={classes.chipIconContainer}>
                    <FlagIcon
                        title="United States"
                        className={classes.flagIcon}
                    />
                    <Divider orientation="vertical" flexItem />
                </Grid>
            )
        } catch (error) {
            return null
        }
    }

    return (
        <Field
            size="small"
            component={Autocomplete}
            multiple
            freeSolo
            filterSelectedOptions
            value={destinations}
            onChange={(_, newValue) => setDestinations(newValue)}
            options={groups.map((group) => group.name)}
            onBlur={autoCompleteHandler}
            defaultValue={[]}
            renderTags={(value, getTagProps) =>
                value.map((participant, index) =>
                    renderTag(participant, index, getTagProps)
                )
            }
            renderInput={(params: MyParams) => {
                params.inputProps.onKeyDown = handleKeyDown
                return (
                    <MuiTextField
                        variant="outlined"
                        {...params}
                        error={false}
                        helperText={false}
                        label=""
                        placeholder={t('form.participants.placeholder')}
                    />
                )
            }}
        />
    )
}
