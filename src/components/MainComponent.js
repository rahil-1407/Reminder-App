import React from 'react'
import Form from './Form'
import ReminderList from './ReminderList'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { AppBar, Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { ActionCreators } from '../actions/actionCreator'

const MainComponent = () => {
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
    if (reminder.message === '' || reminder.dateTime === '') {
      alert('Please fill all the details!!')
      return
    }
    if (new Date() >= moment(reminder.dateTime)) {
      pastReminder.push(reminder)
      dispatch(ActionCreators.updatePast(pastReminder))
    } else {
      futureReminder.push(reminder)
      dispatch(ActionCreators.updateFuture(futureReminder))
    }
    setReminder({
      message: '',
      dateTime: '',
    })
  }

  const updateReminderList = () => {
    const updatedFutureReminder = []
    for (let i = 0; i < futureReminder.length; i++) {
      let item = futureReminder[i]
      if (new Date() >= moment(item.dateTime)) {
        pastReminder.push(item)
      } else {
        updatedFutureReminder.push(item)
      }
    }
    dispatch(ActionCreators.updateFuture(updatedFutureReminder))
    dispatch(ActionCreators.updatePast(pastReminder))
  }

  useEffect(() => {
    const timerId = setInterval(updateReminderList, 1000)
    return () => clearInterval(timerId)
  })

  const clearAll = () => {
    dispatch(ActionCreators.updatePast([]))
    dispatch(ActionCreators.updateFuture([]))
  }

  return (
    <div>
      <AppBar position="static">
        <Typography variant="h5" align="center">
          Reminder App
        </Typography>
      </AppBar>
      <Form
        clearAll={clearAll}
        reminder={reminder}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Grid container spacing={10} justifyContent="center">
        <Grid item>
          <ReminderList type="Past" list={pastReminder} />
        </Grid>
        <Grid item>
          <ReminderList type="Future" list={futureReminder} />
        </Grid>
      </Grid>
    </div>
  )
}

export default MainComponent
