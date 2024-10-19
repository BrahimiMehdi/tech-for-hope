import React from 'react'

type Props = {}

const Spinner = (props: Props) => {
  return (
    <div className="size-8 rounded-full border-r-2 border-t-2 animate-spin border-primary"></div>
  )
}

export default Spinner