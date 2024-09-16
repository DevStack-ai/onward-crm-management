import React from 'react'

export function IndexColumn(index: any, state: any){
    const itemIndex = state.page > 1
    ? ((state.page - 1) * state.itemsPerPage) + ((index) + 1)
    : ((index) + 1);
    return <div>{itemIndex}</div>
}