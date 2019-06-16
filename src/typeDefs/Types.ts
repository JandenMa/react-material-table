export type ColumnPropTypes = {
  index: number //render order is according to the index
  name: string //unique name in the columns, seems like id
  displayName: string //to display in the table header title
  isFixed?: boolean
  fixedPosition?: 'start' | 'end'
  fixedColWidth?: number // default 100
  align?: 'left' | 'inherit' | 'center' | 'right' | 'justify'
}

export type DataCellPropTypes = {
  name: string
  render: JSX.Element
}

type TableBaseClassPropTypes = {
  headerTitle?: string
  container?: string
  scrollBar?: string
  row?: string
  cell?: string
  header?: string
}

export type TableBasePropTypes = {
  columns: Array<ColumnPropTypes>
  classes: TableBaseClassPropTypes
  data: Array<Array<DataCellPropTypes>>
  hideFixedCell?: boolean
  showLeftShadow?: boolean
  showRightShadow?: boolean
  onScroll?: Function
}

export type TablePropTypes = {
  columns: Array<ColumnPropTypes>
  classes?: any
  data: Array<Array<DataCellPropTypes>>
  showPagination?: boolean
  rowsPerPageOptions?: Array<number>
}
