import React from 'react'
import { StyledForms } from '../assets/stylingWrappers/StyledForms'
import { Toaster } from 'react-hot-toast'

export default function ViewCase() {
  return (
    <>
    <StyledForms
      className={"court-form"}
      formID="court-form"
      title="Court Details Form"
      method="POST"
      buttonText="ADD COURT"
    //   fields={COURT_FIELDS}
    />
    <Toaster position="bottom-center" />
  </>
  )
}
