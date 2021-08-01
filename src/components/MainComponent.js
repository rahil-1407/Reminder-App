import React from 'react'
import { useState, useEffect } from 'react'
import { AppBar, Grid } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Form from './Form'
import moment from 'moment'
import PastMadeReminder from './PastMadeReminder'
import FutureMadeReminder from './FutureMadeReminder'

const MainComponent = () => {
  const [reminder, setReminder] = useState({
    message: '',
    dateTime: '',
  })

  const [pastReminder, setPastReminder] = useState([])
  const [futureReminder, setFutureReminder] = useState([])

  const handleChange = (e) => {
    const { name, value } = e.target
    setReminder({
      ...reminder,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const dueDate = moment(new Date(reminder.dateTime)).fromNow()

    if (dueDate.includes('ago')) {
      pastReminder.push({
        message: reminder.message,
        displayText: dueDate,
        dateTime: reminder.dateTime,
      })
      setPastReminder(pastReminder)
    } else {
      futureReminder.push({
        message: reminder.message,
        displayText: dueDate,
        dateTime: reminder.dateTime,
      })
      setFutureReminder(futureReminder)
    }
    setReminder({
      message: '',
      dateTime: '',
    })
    console.log(reminder)
    console.log(pastReminder)
    console.log(futureReminder)
  }

  const updateReminderTable = () => {
    const updatedFutureReminder = futureReminder.filter((item) => {
      const dueDate = moment(new Date(item.dateTime)).fromNow()
      if (dueDate.includes('ago')) {
        pastReminder.push(item)
      } else return { ...item, displayText: dueDate }
    })
    setFutureReminder(updatedFutureReminder)

    const updatedPastReminder = pastReminder.map((item) => {
      const dueDate = moment(new Date(item.dateTime)).fromNow()
      return { ...item, displayText: dueDate }
    })
    setPastReminder(updatedPastReminder)
  }

  useEffect(() => {
    const timerId = setInterval(updateReminderTable, 1000)
    return () => clearInterval(timerId)
  })

  return (
    <div>
      <AppBar position="static">
        <Typography variant="h5" align="center">
          Reminder App
        </Typography>
      </AppBar>
      <Form
        reminder={reminder}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Grid container spacing={10} justify="center">
        <Grid item>
          <PastMadeReminder pastReminder={pastReminder} />
        </Grid>
        <Grid item>
          <FutureMadeReminder futureReminder={futureReminder} />
        </Grid>
      </Grid>
    </div>
  )
}

export default MainComponent
