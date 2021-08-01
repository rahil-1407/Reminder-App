import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { CssBaseline } from '@material-ui/core'
import moment from 'moment'

const useStyles = makeStyles({
  table: {
    width: '100%',
  },
})

const PastMadeReminder = ({ pastReminder }) => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <TableContainer className={classes.table}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Past Reminders</TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>Reminder Label</TableCell>
              <TableCell align="right">Elapsed</TableCell>
              <TableCell align="right">Due Date and Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pastReminder.map((item) => (
              <TableRow>
                <TableCell align="center">{item.message}</TableCell>
                <TableCell align="right">{item.displayText}</TableCell>
                <TableCell align="right">
                  {moment(item.dateTime).format('MMMM Do YYYY, h:mm:ss a')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PastMadeReminder
