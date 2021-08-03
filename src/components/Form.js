import React from 'react'
import { TextField, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  form: {
    marginTop: 30,
    width: '50',
  },
}))

const Form = ({ reminder, handleChange, handleSubmit }) => {
  const classes = useStyles()
  return (
    <form align="center" className={classes.form}>
      <TextField
        type="text"
        placeholder="Make a reminder"
        name="message"
        onChange={handleChange}
        value={reminder.message}
      />
      <br /> <br />
      <TextField
        name="dateTime"
        value={reminder.dateTime}
        label="Select date and time"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      <br /> <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Reminder
      </Button>
      <br /> <br />
    </form>
  )
}

export default Form
