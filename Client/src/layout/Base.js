import React, { Fragment, useEffect } from 'react'
import Header from './Header'
import BottomMenu from './BottomMenu'
import Menu from './Menu'

const Base = ({children}) => {
    useEffect(()=>{
        document.body.classList.remove('modal-open')
      },[])
      
    return(
        <Fragment>
            <Header />
            <div id="appCapsule" className="mt-3">
            {children}
            </div>
            <Menu />
        </Fragment>
    )
}

export default Base