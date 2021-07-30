import React from 'react'
import { useState } from 'react'
import { AppBar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Form from './Form'
import moment from 'moment'

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
      pastReminder.push({ message: reminder.message, displayText: dueDate })
      setPastReminder(pastReminder)
    } else {
      futureReminder.push({ message: reminder.message, displayText: dueDate })
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
    </div>
  )
}

export default MainComponent
