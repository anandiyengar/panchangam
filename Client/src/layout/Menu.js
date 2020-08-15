import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const [switchbtn,setSwitchbtn] = useState(false)
    const switchTheme = () => {
    setSwitchbtn(!switchbtn)
      if(switchbtn === true){
        if(!localStorage.getItem("theme")){
            localStorage.setItem("theme","YES")
        }
        document.body.classList.add('dark-mode-active');
      }else{
        if(localStorage.getItem("theme")){
            localStorage.removeItem("theme")
        }
        document.body.classList.remove('dark-mode-active');
      }
    }
    
    useEffect(()=>{
        if(localStorage.getItem("theme")){
            document.body.classList.add('dark-mode-active');
            setSwitchbtn(true)
        }else{
            document.body.classList.remove('dark-mode-active');
            setSwitchbtn(false)
        }
    },[])


    return(
        <Fragment>
          <div className="modal fade panelbox panelbox-left" id="sidebarPanel" tabindex="-1" role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-body p-0">

                    <div className="profileBox bg-danger">
                        <div className="image-wrapper">
                            <img src="/theme/assets/img/sample/avatar/avatar1.png" alt="panchangam"  className="imaged rounded" />
                        </div>
                        <div className="in">
                            <strong>Hi, Narasimhan</strong>
                            <div className="text-muted">
                                <ion-icon name="location"></ion-icon>
                                India
                            </div>
                        </div>
                        <a href="javascript:;" className="close-sidebar-button" data-dismiss="modal">
                            <ion-icon name="close"></ion-icon>
                        </a>
                    </div>

                    <ul className="listview flush transparent no-line image-listview mt-2">
                        <li>
                            <Link to = "/" className="item">
                                <div className="icon-box bg-danger">
                                    <ion-icon name="home-outline"></ion-icon>
                                </div>
                                <div className="in">
                                    Home
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to = "/new" className="item ">
                                <div className="icon-box bg-danger">
                                    <ion-icon name="cube-outline"></ion-icon>
                                </div>
                                <div className="in">
                                    Create
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to = "/forms" className="item">
                                <div className="icon-box bg-danger">
                                    <ion-icon name="layers-outline"></ion-icon>
                                </div>
                                <div className="in">
                                    <div> View all forms</div>
                                </div>
                            </Link>
                        </li>
                       
                        <li>
                            <div className="item">
                                <div className="icon-box bg-danger">
                                    <ion-icon name="moon-outline"></ion-icon>
                                </div>
                                <div className="in">
                                    <div>Dark Mode</div>
                                    <div className="custom-control custom-switch">
                                        <input type="checkbox" className="custom-control-input dark-mode-switch"
                                        checked={switchbtn===true}
                                            id="darkmodesidebar" onChange={()=>{switchTheme()}} />
                                        <label className="custom-control-label" for="darkmodesidebar"></label>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                   

                </div>

              
            </div>
        </div>
    </div>
    </Fragment>
    )
}

export default Menu