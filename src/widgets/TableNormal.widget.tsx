import React, { ComponentType, useRef, useEffect, useState } from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery'
import TableBase from './TableBase.widget'
import { TableBasePropTypes } from '../typeDefs/Types'

const styles = () =>
  createStyles({
    container: {
      overflowY: 'auto',
      zIndex: 0
    },
    scrollBar: {
      overflowX: 'auto'
    }
  })

/**
 * @description For the normal table
 */
const TableNormalWidget: ComponentType<TableBasePropTypes> = (
  props: TableBasePropTypes
) => {
  const { classes, columns, data, onScroll = () => {}, totalsData } = props
  const [oldWidth, setOldWidth] = useState('0px') //RECORD THE WIDTH FOR AVOIDING CALL MORE WHEN RESIZE
  const ref = useRef(null)
  let canFixed = useMediaQuery('(min-width:960px)')

  //RESET SHADOW WHEN WINDOW RESIZE
  window.onresize = () => {
    let width = '0px'
    if (ref && ref.current) {
      width = getComputedStyle(ref.current!).getPropertyValue('width')
    }
    if (width === oldWidth) return
    setOldWidth(width)
    onScroll(ref)
  }

  useEffect(() => {
    setTimeout(() => {
      onScroll(ref)
    }, 0)
  }, [columns, data])

  return (
    <div className={classes.container}>
      <div
        className={classes.scrollBar}
        ref={ref}
        id="TableNormalWidgetScrollArea"
        onScroll={() => onScroll(ref)}
      >
        <TableBase
          classes={{ footer: classes.footer }}
          columns={columns}
          data={data}
          hideFixedCell={canFixed}
          totalsData={totalsData}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(TableNormalWidget)
