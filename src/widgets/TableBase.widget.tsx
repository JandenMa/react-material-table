import React, { ComponentType, Fragment, useEffect, useState } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableFooter from '@material-ui/core/TableFooter'
import {
  TableBasePropTypes,
  DataCellPropTypes,
  ColumnPropTypes
} from '../typeDefs/Types'
import { checkEqual } from 'check-equal'

const styles = () =>
  createStyles({
    headerTitle: {
      fontWeight: 700
    },
    header: {
      transition: 'all .3s, height 0s',
      backgroundColor: '#EAEBEC',
      height: '50px'
    },
    row: {
      transition: 'all .3s, height 0s',
      height: '75px',
      '&:nth-of-type(odd)': {
        background: '#FEFEFE'
      },
      '&:nth-of-type(even)': {
        backgroundColor: '#F7F8F9'
      }
    },
    cell: {
      padding: '2px 16px',
      transition: 'all .3s, height 0s'
    },
    footer: {
      borderTop: 'solid 3px #1bad9f'
    }
  })

/**
 * @description Every widget of the table is based on this component
 */
const TableWidget: ComponentType<TableBasePropTypes> = (
  props: TableBasePropTypes
) => {
  const { classes, columns, data, hideFixedCell = false, totalsData } = props
  const [cols, setCols] = useState(new Array<ColumnPropTypes>())

  /**
   * @description Match the row data to the column by name
   * @param {Array<DataCellPropTypes>} dataRow the row data which needs to match
   * @param {string} name the unique name
   */
  const getDataCell = (
    dataRow: Array<DataCellPropTypes>,
    name: string
  ): DataCellPropTypes => {
    return (
      dataRow.find(_d => checkEqual(name, _d.name)) || {
        name: '',
        render: <Fragment />
      }
    )
  }

  useEffect(() => {
    // TO DIVIDE COLUMNS INTO THREE PARTS, AND SORT BY INDEX IN EACH PART
    let arr: Array<ColumnPropTypes> = []
    arr = arr.concat(
      // THIS IS FOR THE LEFT FIXED COLUMNS
      columns
        .filter(_c => {
          const { isFixed = false, fixedPosition = 'start' } = _c
          return isFixed && fixedPosition === 'start'
        })
        .sort((a, b) => a.index - b.index)
    )
    // THIS IS FOR THE NORMAL COLUMNS
    arr = arr.concat(
      columns
        .filter(_c => {
          const { isFixed = false } = _c
          return !isFixed
        })
        .sort((a, b) => a.index - b.index)
    )
    // THIS IS FOR THE RIGHT FIXED COLUMNS
    arr = arr.concat(
      columns
        .filter(_c => {
          const { isFixed = false, fixedPosition = 'start' } = _c
          return isFixed && fixedPosition === 'end'
        })
        .sort((a, b) => a.index - b.index)
    )
    setCols(arr)
  }, [columns])

  return (
    <Table>
      <TableHead>
        <TableRow className={classes.header}>
          {cols.map(_c => {
            const {
              index,
              displayName,
              align = 'left',
              isFixed = false,
              fixedColWidth = 100
            } = _c

            return (
              <TableCell
                key={index}
                align={align}
                className={classes.cell}
                style={{
                  // TO HIDDEN THE CELL WHICH IS IN NORMAL ROW BY FIXED
                  visibility: hideFixedCell && isFixed ? 'hidden' : 'visible',
                  width: isFixed ? `${fixedColWidth}px` : 'auto',
                  minWidth: isFixed ? `${fixedColWidth}px` : 'auto'
                }}
              >
                <Typography
                  noWrap
                  color="textPrimary"
                  variant="subtitle2"
                  className={classes.headerTitle}
                >
                  {displayName}
                </Typography>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((_d, _i) => {
          return (
            <TableRow key={_i} className={classes.row}>
              {cols.map(_c => {
                const {
                  index,
                  name,
                  align = 'left',
                  isFixed = false,
                  fixedColWidth = 100
                } = _c
                const { render = <Fragment /> } = getDataCell(_d, name) || {}
                return (
                  <TableCell
                    className={classes.cell}
                    align={align}
                    key={index}
                    style={{
                      height: '48px',
                      width: isFixed ? `${fixedColWidth}px` : 'auto',
                      minWidth: isFixed ? `${fixedColWidth}px` : 'auto',
                      // TO HIDDEN THE CELL WHICH IS IN NORMAL ROW BY FIXED
                      visibility:
                        hideFixedCell && isFixed ? 'hidden' : 'visible'
                    }}
                  >
                    {render}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
      {totalsData && (
        <TableFooter className={classes.footer}>
          <TableRow className={classes.row}>
            {cols.map(_c => {
              const {
                index,
                name,
                align = 'left',
                isFixed = false,
                fixedColWidth = 100
              } = _c
              const { render = <Fragment /> } =
                getDataCell(totalsData, name) || {}
              return (
                <TableCell
                  className={classes.cell}
                  align={align}
                  key={index}
                  style={{
                    height: '48px',
                    width: isFixed ? `${fixedColWidth}px` : 'auto',
                    minWidth: isFixed ? `${fixedColWidth}px` : 'auto',
                    // TO HIDDEN THE CELL WHICH IS IN NORMAL ROW BY FIXED
                    visibility: hideFixedCell && isFixed ? 'hidden' : 'visible'
                  }}
                >
                  {render}
                </TableCell>
              )
            })}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  )
}

export default withStyles(styles)(TableWidget)
