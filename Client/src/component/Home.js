import React, { useEffect, useState } from 'react'
import Base from '../layout/Base'
import { homeData } from '../helper/AllHelp'


const Home = () => {
const [count,setCount] = useState("0")
const [data,setData] = useState("-")

useEffect(()=>{
homeData()
.then((data)=>{
    if(data.count){
    setCount(data && data.count)
    setData(data && data.data && data.data[0].Dates)
    }
})
},[])
return(
    <Base >
    <div class="card text-white bg-primary m-3" id ="home">
                <div class="card-header">Total Entries</div>
                <div class="card-body">
                    <h5 class="card-title">{count}</h5>
                    <p class="card-text">Number of data already stored in the system</p>
                </div>
            </div>

            <div class="card text-white bg-secondary m-3">
                <div class="card-header">Last Date</div>
                <div class="card-body">
                    <h5 class="card-title">{data}</h5>
                    <p class="card-text">Last entered date of data stored in the system.</p>
                </div>
            </div>

    </Base>
)
}

export default Home