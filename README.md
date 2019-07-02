# React Material Table

> _A custom table which can fixed columns based on **Material-UI** and built by **TypeScript**_

## Change Logs

- v1.0.0 - v1.0.2: First release version.
- v1.0.3 - v1.0.4: Optimize webpack config, minimize package size. (~~307Kib~~ 10.8Kib)
- v1.0.5: Supports passing parameter to render totals data footer.

## Install

- npm

- ```bash
  npm install @jandenma/react-material-table --save
  ```

- yarn

- ```bash
  yarn add @jandenma/react-material-table --save
  ```

## Usage

```jsx
import { TableWidget } from '@jandenma/react-material-table'
```

## Props

1. **columns**:

   **Type**: `Array<object>`

   **Required**: true

   **Array Item**:

   - index: number, render order is according to the index
   - name: string, unique name in the columns, seems like id
   - displayName: string, to display in the table header title
   - isFixed: boolean, default `false`, if true, this column will be fixed on the left or right of the container
   - fixedPosition: one of `start` / `end`, default `start`, to control the column fixed on the left or right of the container if `isFixed` is true
   - fixedColWidth: number, default 100, to control the width of fixed column.
   - align: one of `left` / `inherit` / `center` / `right` / `justify`, default `left`, to display in the table header title

2. **data**:

   - **Type**: `Array<Array<object>>`
   - **Required**: true, but can be empty
   - **Outer Array**: Includes all of rows data
   - **Inner Array**: Includes all columns data in each row
     - **Item**:
       - name: string, must be included in the columns, will match the column according to the name
       - render: element, to render what you want

3. **showPagination**: boolean, default `false`, if true it will show the pagination.

4. **rowsPerPageOptions**: `Array<number>`, default [10, 15, 20], to set the rows per page select options.

5. **totalsData**:

   - **Type**: `Array<object>`

   - **Required**: true, but can be empty

   - **Array Item**:
   - name: string, must be included in the columns, will match the column according to the name
     - render: element, to render what you want

6. **classes**:

   - footer: for table footer style

## Example

```jsx
import React, { useState } from 'react'

import { TableWidget } from '@jandenma/react-material-table'

const OrdinaryPayroll = props => {
  const [cols, setCols] = useState([
    {
      index: 0,

      name: 'employee',

      displayName: 'Employee',

      isFixed: true,

      fixedColWidth: 100
    },

    {
      index: 1,

      name: 'actions',

      displayName: 'Actions',

      isFixed: true,

      fixedColWidth: 100
    },

    {
      index: 2,

      name: 'grossPay',

      displayName: 'Gross Pay',

      isFixed: true,

      fixedPosition: 'end',

      fixedColWidth: 110
    },

    {
      index: 3,

      name: 'regularHours1',

      displayName: 'Regular Hours'
    },

    {
      index: 4,

      name: 'regularHours2',

      displayName: 'Regular Hours'
    },

    {
      index: 5,

      name: 'regularHours3',

      displayName: 'Regular Hours'
    },

    {
      index: 6,

      name: 'regularHours4',

      displayName: 'Regular Hours'
    }
  ])

  return (
    <div className="App">
      <TableWidget
        showPagination
        columns={cols}
        data={[
          [
            { name: 'employee', render: <input /> },

            { name: 'grossPay', render: <button>22</button> },

            { name: 'actions', render: <span>33</span> },

            { name: 'regularHours1', render: <strong>cc</strong> },

            { name: 'regularHours2', render: <u>21</u> },

            { name: 'regularHours3', render: <em>poeo</em> },

            { name: 'regularHours4', render: <strong>cc</strong> }
          ],

          [
            { name: 'employee', render: <input /> },

            { name: 'grossPay', render: <button>22</button> },

            { name: 'actions', render: <span>33</span> },

            { name: 'regularHours1', render: <strong>dd</strong> },

            { name: 'regularHours2', render: <u>21</u> },

            { name: 'regularHours3', render: <em>92201</em> },

            { name: 'regularHours4', render: <em>poeo</em> }
          ]
        ]}
        totalsData={[
          { name: 'employee', render: 'Totals' },

          { name: 'grossPay', render: 200 },

          { name: 'actions', render: <React.Fragment /> },

          { name: 'regularHours1', render: 100 },

          { name: 'regularHours2', render: 300 },

          { name: 'regularHours3', render: 200 },

          { name: 'regularHours4', render: 400 }
        ]}
      />
    </div>
  )
}

export default OrdinaryPayroll
```
