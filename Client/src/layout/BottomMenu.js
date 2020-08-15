import React from 'react'
import { Link } from 'react-router-dom'

const BottomMenu = () => {
return(
    <div className="appBottomMenu bg-danger">
    <Link to="/" className="item text-white" style = {{disabled: "disabled"}}>
        <div className="col text-white">
            <ion-icon style={{color:"white"}} name="home-outline"></ion-icon>
        </div>
    </Link>
    {/* <a href="app-components.html" className="item">
        <div className="col">
            <ion-icon name="cube-outline"></ion-icon>
        </div>
    </a>
    <a href="page-chat.html" className="item">
        <div className="col">
            <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
            <span className="badge badge-danger">5</span>
        </div>
    </a>
    <a href="app-pages.html" className="item">
        <div className="col">
            <ion-icon name="layers-outline"></ion-icon>
        </div>
    </a>
    <a href="javascript:;" className="item" data-toggle="modal" data-target="#sidebarPanel">
        <div className="col">
            <ion-icon name="menu-outline"></ion-icon>
        </div>
    </a> */}
</div>
)
}

export default BottomMenu