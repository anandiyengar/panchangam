import React from 'react'

const FormHelper = ({types,name,values,setValues=f=>f}) => {
   if(types === 'SELECT'){
       return(
           <p>SELECT</p>
       )
   }else{
       return("")
   }
}

export default FormHelper