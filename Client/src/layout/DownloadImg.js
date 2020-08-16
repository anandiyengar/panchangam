import React from 'react'
import Base from './Base'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const DownloadImg = () => {
const download = () => { 
        axios({ 
            url:`/static/${formId}.png`, 
            method:'GET', 
            responseType: 'blob' 
    }) 
    .then((response) => { 
           const url = window.URL 
           .createObjectURL(new Blob([response.data])); 
                  const link = document.createElement('a'); 
                  link.href = url; 
                  link.setAttribute('download', `${formId}.png`); 
                  document.body.appendChild(link); 
                  link.click(); 
    }) 
    } 
const formId = useParams().formId
return(
    <Base>
    <div className="text-center">
    <p  className="text-center">Click on the image to download!</p>
    <img onClick={download} src={`/static/${formId}.png`} style={{width:"100%"}} />
    </div>
    </Base>
)
}

export default DownloadImg