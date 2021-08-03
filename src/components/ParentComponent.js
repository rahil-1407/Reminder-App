import React from 'react'
import Form from './Form'
import ReminderList from './ReminderList'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { AppBar, Grid, Typography } from '@material-ui/core'

const ParentComponent = () => {
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
    if (new Date() >= moment(reminder.dateTime)) {
      pastReminder.push({
        message: reminder.message,
        dateTime: reminder.dateTime,
      })
      setPastReminder(pastReminder)
    } else {
      futureReminder.push({
        message: reminder.message,
        dateTime: reminder.dateTime,
      })
      setFutureReminder(futureReminder)
    }
    setReminder({
      message: '',
      dateTime: '',
    })
  }

  const updateReminderList = () => {
    const updatedFutureReminder = futureReminder.filter((item) => {
      if (new Date() >= moment(item.dateTime)) {
        pastReminder.push(item)
      } else return { item }
    })
    setFutureReminder(updatedFutureReminder)

    const updatedPastReminder = pastReminder.map((item) => item)
    setPastReminder(updatedPastReminder)
  }

  useEffect(() => {
    const timerId = setInterval(updateReminderList, 1000)
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
          <ReminderList type="Past" List={pastReminder} />
        </Grid>
        <Grid item>
          <ReminderList type="Future" List={futureReminder} />
        </Grid>
      </Grid>
    </div>
  )
}

export default ParentComponent
