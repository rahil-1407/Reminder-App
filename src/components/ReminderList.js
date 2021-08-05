import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import moment from 'moment'

const ReminderList = ({ type, list }) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{type} Reminders</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Reminder Label</TableCell>
            <TableCell align="right">
              {type === 'Past' ? 'Elapsed' : 'Get Ready in'}
            </TableCell>
            <TableCell align="right">Due Date and Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,index) => (
            <TableRow key={index}>
              <TableCell align="center">{item.message}</TableCell>
              <TableCell align="right">
                {moment(new Date(item.dateTime)).fromNow()}
              </TableCell>
              <TableCell align="right">
                {moment(item.dateTime).format('MMMM Do YYYY, h:mm:ss a')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ReminderList
