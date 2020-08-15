import React, { Fragment, useEffect } from 'react'

const Header = () => {
    useEffect(()=>{
        if(document.body.classList.contains('.modal-backdrop fade show')){
            document.body.classList.remove('modal-backdrop fade show');
        }
    })
    return (
        <Fragment>
       <div className="appHeader bg-danger">
        <div className="left">
            <a style={{color:"white"}} href="#" className="headerButton" data-toggle="modal" data-target="#sidebarPanel">
                <ion-icon name="menu-outline"></ion-icon>
            </a>
        </div>
        <div className="pageTitle">
            PANCHANGAM
        </div>
    </div>
   
        </Fragment>  
    )
}

export default Header