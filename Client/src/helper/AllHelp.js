import {API} from './backend'

export const getDateData = (data) => {
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    return fetch(`${API}/scrape-api/${data}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const homeData = () => {
    return fetch(`${API}/home-count`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        }
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const getDateData1 = (data) => {
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    return fetch(`${API}/scrape/${data}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const submitData = (data) => {
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    const user = JSON.parse(localStorage.getItem("panchangam")).user.id
    return fetch(`${API}/form/create/${user}`,{
        method:"post",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },body:JSON.stringify(data)
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const editData = (data, formId) => {
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    const user = JSON.parse(localStorage.getItem("panchangam")).user.id
    console.log(data)
    return fetch(`${API}/form/${user}/${formId}`,{
        method:"put",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        },body:JSON.stringify(data)
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const removeForm = (formId) => {
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    const user = JSON.parse(localStorage.getItem("panchangam")).user.id
    return fetch(`${API}/form/${user}/${formId}`,{
        method:"delete",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const getAllData = (data) => {
    const formId = data.formId
    return fetch(`${API}/form/${formId}`,{
        method:"get",
        headers:{
            Accept:"application/json",
            "content-type":"application/json"
        },
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}
export const getALlUserForms = () => {
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    const user = JSON.parse(localStorage.getItem("panchangam")).user.id
    return fetch(`${API}/forms/${user}`,{
        method:"get",
        headers:{
            Accept:"application/json",
            "content-type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then((res)=>{
        return res.json()
    }).catch((err)=>{
        console.log(err)
    })
}

export const downloadForm = (formId) => {
    const token = JSON.parse(localStorage.getItem("panchangam")).token
    return fetch(`${API}/makeimage/${formId}`,
    {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(
        res => {
            if(res.error){
                return res.error
            }
            return res
        }
    )
    .catch(er => console.log(er))
}
