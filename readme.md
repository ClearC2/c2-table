# c2-table

A react table component that supports:

- sorting
- pageable data
- expandable rows

## Install

```
yarn add ClearC2/c2-table#^1.0.0
```

## Usage

```jsx
import React from 'react'
import {Table, Column} from 'c2-table'

const data = [
  {id: 1, firstName: 'Mickey', lastName: 'Patton', role: 'President'},
  {id: 2, firstName: 'Kevin', lastName: 'Bull', role: 'Developer'}
]

const example = (
  <Table id='example' rowId='id' data={data}>
    <Column id='id' header='ID' />
    <Column
      id='name'
      header='Name'
      orderValue={row => row.lastName + ', ' + row.firstName}
      cell={(row) => (
        <React.Fragment>
        {row.firstName} {row.lastName}
        </React.Fragment>
      )}
    />
    <Column id='role' header='Role' />
  </Table>
)
````

[See more documentation here.](https://clearc2.github.io/c2-table/)