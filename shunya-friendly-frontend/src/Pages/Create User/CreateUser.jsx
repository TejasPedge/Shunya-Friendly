import React from 'react'
import FormComp from '../../Components/FormComp'

import style from './CreateUser.module.css'

const CreateUser = () => {
  return (
    <div className = {style['form-container']}>
        <FormComp />
    </div>
  )
}

export default CreateUser