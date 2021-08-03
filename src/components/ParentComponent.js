import React from 'react'
import Form from './Form'
import ReminderList from './ReminderList'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { AppBar, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../actions/actionCreator'

const ParentComponent = () => {
  const dispatch = useDispatch()
  const { pastReminder, futureReminder } = useSelector((state) => state.reducer)

  const [reminder, setReminder] = useState({
    message: '',
    dateTime: '',
  })

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
      dispatch(ActionCreators.updatePast(pastReminder))
    } else {
      futureReminder.push({
        message: reminder.message,
        dateTime: reminder.dateTime,
      })
      dispatch(ActionCreators.updateFuture(futureReminder))
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
    dispatch(ActionCreators.updateFuture(updatedFutureReminder))
    dispatch(ActionCreators.updatePast(pastReminder))
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
