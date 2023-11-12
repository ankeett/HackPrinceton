import { forwardRef } from 'react'
import { TextField } from '@mui/material'

const phoneInput = (props, ref) => {

  return (

    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      size='medium'
      label='Phone Number'
      variant='outlined'
      name='phone'
      required
    />
  )
}
export default forwardRef(phoneInput)