import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { CssBaseline } from '@material-ui/core'

const useStyles = makeStyles({
  table: {
    maxWidth: '100%',
  },
})

const FutureMadeReminder = ({ futureReminder }) => {
  const classes = useStyles()
  return (
    <>
    <CssBaseline />
    <TableContainer className={classes.table}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Future Reminders</TableCell>
          </TableRow>
        </TableHead>
        <TableHead>
          <TableRow>
            <TableCell>Reminder Label</TableCell>
            <TableCell align="right">Due Date and Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {futureReminder.map((item) => (
            <TableRow>
              <TableCell align="center">{item.message}</TableCell>
              <TableCell align="right">{item.displayText}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default FutureMadeReminder
