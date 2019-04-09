# @clearc2/c2-table [![CircleCI](https://circleci.com/gh/ClearC2/c2-table.svg?style=svg)](https://circleci.com/gh/ClearC2/c2-table)

A react table component that supports:

- sorting
- pageable data
- expandable rows

## Install

```sh
# for yarn
yarn add @clearc2/c2-table

# for npm
npm install @clearc2/c2-table
```

## Usage

```jsx
import React from 'react'
import {Table, Column} from '@clearc2/c2-table'

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
