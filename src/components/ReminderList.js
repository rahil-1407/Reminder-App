import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  makeStyles,
} from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
})

const ReminderList = ({ type, List }) => {
  const classes = useStyles()
  return (
    <TableContainer className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              {type === 'Past' ? 'Past Reminders' : 'Future Reminders'}
            </TableCell>
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
          {List.map((item) => (
            <TableRow>
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
