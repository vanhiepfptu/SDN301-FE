import { Box } from '@mui/material'
import React from 'react'

function FlexBox({children}) {
  return (
    <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}>
        {children}
    </Box>
  )
}

export default FlexBox