import React, { ComponentType } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import TableBase from './TableBase.widget'
import { TableBasePropTypes } from '../typeDefs/Types'

const styles = () =>
  createStyles({
    container: {
      backgroundColor: '#fff',
      right: 0,
      position: 'absolute',
      top: 0,
      zIndex: 9999,
      overflow: 'hidden',
      transition: 'box-shadow .3s ease'
    }
  })

/**
 * @description For the right fixed table
 */
const TableFixedRightWidget: ComponentType<TableBasePropTypes> = (
  props: TableBasePropTypes
) => {
  const { classes, columns, data, showRightShadow, totalsData } = props

  return (
    <div
      className={classes.container}
      style={{
        boxShadow: showRightShadow ? '-6px 0 6px -4px rgba(0,0,0,0.15)' : 'none'
      }}
    >
      <TableBase
        classes={{ footer: classes.footer }}
        columns={columns}
        data={data}
        totalsData={totalsData}
      />
    </div>
  )
}

export default withStyles(styles)(TableFixedRightWidget)
