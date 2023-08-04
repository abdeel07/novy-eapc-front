import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types'
import LocalizationProvider from '@mui/x-date-pickers/LocalizationProvider';
import DatePicker from '@mui/x-date-pickers/DatePicker';
import moment from 'moment'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { fr } from 'date-fns/locale'
import {
  DATE_PICKER_DATE_LIMIT,
  MY_IMPUTATIONS_DATE_PICKER_MAX_DATE_LIMIT,
} from '../../../../../constantes/consts'

export default function MonthPickerField(props) {
  const { updateCheckedState, selectedFilters } = props
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={fr}>
      <Grid item>
        <DatePicker
          views={['year', 'month']}
          minDate={moment(DATE_PICKER_DATE_LIMIT).toDate()}
          maxDate={MY_IMPUTATIONS_DATE_PICKER_MAX_DATE_LIMIT}
          value={selectedFilters?.month ? selectedFilters.month[0] : null}
          onChange={() => {}}
          onAccept={(newValue) => {
            if (moment(newValue).isValid()) {
              const firstDayOfMonth = moment(newValue)
                .format('YYYY-MM')
                .toString()
              updateCheckedState(firstDayOfMonth, 'month')
            }
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </Grid>
    </LocalizationProvider>
  )
}

MonthPickerField.propTypes = {
  selectedFilters: PropTypes.array.isRequired,
  updateCheckedState: PropTypes.func.isRequired,
}
