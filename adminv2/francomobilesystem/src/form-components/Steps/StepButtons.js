import React from 'react'
import {Box, Button} from "@mui/material"

function StepButtons({handleBack, handleNext, isLastStep, isFirstStep}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color="inherit"
            disabled={isFirstStep}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />

          <Button onClick={handleNext}>
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </Box>
  )
}

export default StepButtons