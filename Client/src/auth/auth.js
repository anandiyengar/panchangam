import {API} from './../helper/backend'

export const loginNow = (data) => {
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },body:JSON.stringify(data)
    }).then((res)=>{
        return res.json();
    }).catch((err)=>{
        console.log(err)
    })
}

export const authenticate = (data,next) => {
    if(typeof window != undefined){
        localStorage.setItem("panchangam",JSON.stringify(data))
        next()
    }
}

export const isAuthenticate = () => {
    if(typeof window != undefined){
    if(localStorage.getItem("panchangam")){
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    return fetch(`${API}/checklogin`,{
        method:"GET",
        headers:{
        Accept:"application/json",
        "content-type":"application/json",
        Authorization: `Bearer ${token}`
        }
    })
    .then((res)=>{
        if(res.status != 200){
            localStorage.removeItem("panchangam")
        }
        return res.json()

    }).catch((err)=>{
        console.log(err)
    })
}
    }
}

export const signOut = () => {
    if(typeof window != undefined){
        localStorage.removeItem("panchangam")
    }
}