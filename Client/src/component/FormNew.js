import React, { useState } from 'react'
import Base from '../layout/Base'
import {TamilYearArray, TamilMonthArray,TithiArray, TamilDaysArray, NakshatramArray, ChandrashtamamArray, MaseArray, RuthouArray, AyanamArray, PaksheArray, YogamArray} from './../helper/HelpArray'
import { getDateData, submitData, getAllData, getALlUserForms, getDateData1 } from '../helper/AllHelp';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { AyanamApi, TithiApi, PaksheApi, TamilMonthAPI, NakshatramApi } from '../helper/ApiArray';
import { initializeApp } from 'firebase';

const FormNew = () => {
  const VasaramArray = ["Bhanu Vasaram / பானு வாஸரம்",  "Indhu Vasaram / இந்து வாஸரம்","Bouma Vasaram / பௌம வாஸரம்",
  "Soumya Vasaram/ சௌம்ய வாஸரம்",  "Guru Vasaram / குரு வாஸரம்",  "Bruhu Vasaram / ப்ருஹு வாஸரம்", "Sthira Vasaram / ஸ்திர வாஸரம்"]

  const week_of_day_arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [dates,setDates] = useState("")
  const [day,setDay] = useState("")
  const [tamilMonth,setTamilMonth] = useState("")
  const [tamilDay,setTamilDay] = useState("")
  const [tamilDate,setTamilDate] = useState("")
  const [note1,setNote1] = useState("")
  const [note2,setNote2] = useState("Saarvari nama samvatsare/சார்வரி நாம ஸம்வத்ஸரே")
  const [ayanam,setAyanam] = useState("")
  const [ruthou,setRuthou] = useState("")
  const [mase,setMase] = useState("")
  const [pakshe,setPakshe] = useState("Sukla Pakshe / சுக்ல பக்ஷம்")
  const [tithi,setTithi] = useState("")
  const [nextTithi,setNextTithi] = useState("")
  const [kuligai,setKuligai] = useState("")
  const [time,setTime] = useState("")
  const [timeam,setTimeAm] = useState("")
  const [vasaram,setVasaram] = useState("")
  const [nakshatram,setNakshatram] = useState("")
  const [nextNakshatram,setNextNakshatram] = useState("")
  const [time2,setTime2] = useState("")
  const [time2am,setTime2Am] = useState("")
  const [tableTithi,setTableTithi] = useState("")
  const [srardTithi,setsrardTithi] = useState("")
  const [nallaNeram,setNallaNeram] = useState("")
  const [pm,setPm] = useState("")
  const [raghuKalam,setRaghuKalam] = useState("")
  const [yemakandam,setYemakandam] = useState("")
  const [yogam,setYogam] = useState("")
  const [chandrashtamam,setChandrashtamam] = useState("")
  const [nextChandrashtamam,setNextChandrashtamam] = useState("")
  const [sunrise,setSunrise] = useState("காலை")
  const [sunset,setSunset] = useState("மாலை")
  const [additionalInfo,setAdditionalInfo] = useState("")
  const [success,setSuccess] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const [prev,setPrev] = useState(true)
  const [t1, setT1] = useState({hour: "", min:"", timeOfDay: ""})
  const [t, setT] = useState({hour: "", min:"", timeOfDay: ""})
  const [v, setV] = useState(true)
  
 const [arr, setArr] = useState([])
  
  const dateCall = (e) => {
    e.preventDefault()
    const fmon = new Date(dates).getDate()
    const data = new Date(dates).getFullYear() + '-' + montharray[new Date(dates).getMonth()].toLowerCase() + '-' + ("0" +  fmon).slice(-2) 
    getDateData(data).then((dd)=>{
        // AYANAM
        const apiAyanam = AyanamApi && AyanamApi.filter((r) => {
            return r.split("/")[0].toLowerCase() === dd.Ayanam.toLowerCase()
          })
          setAyanam(AyanamArray[apiAyanam[0].split("/")[1]])
        //   Tithi
        const apiTithi = TithiApi && TithiApi.filter((r)=>{
            return r.split("/")[0].toLowerCase() === dd.tithi.toLowerCase()   
        })
        setTithi(TithiArray[apiTithi[0].split("/")[1]])
        // Tithi Time
        setTime(dd.tithiTime ? dd.tithiTime.split(" ")[0].split("|")[1] : "")
        setTimeAm(dd.tithiTime ? dd.tithiTime.split(" ")[1] : "")
        //  Next Tithi
        const apiNextTithi = TithiApi && TithiApi.filter((r)=>{
            return r.split("/")[0].toLowerCase() === dd.NextTithi.toLowerCase()   
        })
        setNextTithi((apiNextTithi!="")?TithiArray[apiNextTithi[0].split("/")[1]]:"")
        // Next Tithi Time
        
   
        // Pakshe
        const apiPakshe = PaksheApi && PaksheApi.filter((r)=>{
            return r.split("/")[0].toLowerCase() === dd.Paksham.toLowerCase()   
        })
        setPakshe(PaksheArray[apiPakshe[0].split("/")[1]])
        // Tamil Month
        const apiTamilMonth = TamilMonthAPI && TamilMonthAPI.filter((r)=>{
            return r.split("/")[0].toLowerCase() === dd.TamilMonth.toLowerCase()   
        })
        setTamilMonth(TamilMonthArray[apiTamilMonth[0].split("/")[1]])
        // Tamil Date
        setTamilDate(dd.date)
        // RUTU
     let mIndex = 0
     let rutu
     mIndex = parseInt(apiTamilMonth[0].split("/")[1])
     if(mIndex === 0 || mIndex === 1){
       rutu =  RuthouArray[0]
     }
     else if(mIndex === 2 || mIndex === 3){
       rutu =  RuthouArray[1]
     }
     else if(mIndex === 4 || mIndex === 5){
      rutu = RuthouArray[2]
    }
    else if(mIndex === 6 || mIndex === 7){
      rutu = RuthouArray[3]
    }
    else if(mIndex === 8 || mIndex === 9){
     rutu =  RuthouArray[4]
    }
    else if(mIndex === 10 || mIndex === 11){
     rutu = RuthouArray[5]
    }
    setRuthou(rutu)
    // Mase
    setMase(MaseArray[mIndex])
    // Nakshatram
    const apiNakshatram = NakshatramApi && NakshatramApi.filter((r)=>{
        return r.split("/")[0].toLowerCase() === dd.Nakshatram.toLowerCase()   
    })
    setNakshatram(NakshatramArray[apiNakshatram[0].split("/")[1]])
    // Next Nakshatram
    const apiNextNakshatram = NakshatramApi && NakshatramApi.filter((r)=>{
        return r.split("/")[0].toLowerCase() === dd.nextNakshatram.toLowerCase()   
    })
    setNextNakshatram((apiNextNakshatram!='')?NakshatramArray[apiNextNakshatram[0].split("/")[1]]:"")
    //  Nakshatra Time
    setTime2(dd.nakshatraTime ? dd.nakshatraTime.split("|")[1].split(" ")[0] : "")
    setTime2Am(dd.nakshatraTime ? dd.nakshatraTime.split(" ")[1] : "")
    // Yogam
    const apiYogam = YogamArray && YogamArray.map((r)=>{
        if(dd.Yogam[0].toLowerCase()==='m'){
           return  YogamArray[2]
        }else if(dd.Yogam[0].toLowerCase()==='s'){
            return  YogamArray[0]
        }else{
            return  YogamArray[1]
        }
    })
    setYogam(apiYogam[0].split(",")[0])
    let valra = ''
let val = ''
    if(day.toUpperCase() == "MONDAY"){
      valra = "7.30 - 9.00 AM";
      val = "10.30 - 12.00 NOON";
    }
    if(day.toUpperCase() == "TUESDAY"){
      valra = "3.00 - 4.30 PM";
      val = "9.00 - 10.30 AM";
    }
    if(day.toUpperCase() == "WEDNESDAY"){
      valra = "12.00 - 1.30 PM";
      val = "7.30 - 9.00 AM";
    }
    if(day.toUpperCase() == "THURSDAY"){
      valra = "1.30 - 3.00 PM";
      val = "6.00 - 7.30 AM ";
    }
    if(day.toUpperCase() == "FRIDAY"){
      valra = "10.30 - 12.00 NOON";
      val = "3.00 - 4.30 PM";

    }
    if(day.toUpperCase() == "SATURDAY"){
      valra = "9.00 - 10.30 AM";
      val = "1.30- 3.00 PM";
    }
    if(day.toUpperCase() == "SUNDAY"){
      valra = "4.30 - 6.00 PM";
      val = "12.00 - 1.30 PM";
    }
    // Rahu
    setRaghuKalam(valra)
    // Yemakandam
    setYemakandam(val)
    // Sunrise
    setSunrise(dd.Sunrise)
    // Sunset
    setSunset(dd.Sunset)
    dateCall2()
    
    }).catch((err)=>{
        console.log(err)
    })

}

const dateCall2 = () => {
    let mainDate = new Date(dates)
   
      const fmon1 = new Date(mainDate).getDate()
      const data1 = ("0" +  fmon1).slice(-2) + '-' + montharray[new Date(mainDate).getMonth()] + '-' + 
      new Date(mainDate).getFullYear()
      getDateData1(data1)
      .then((tres)=>{
          setKuligai(tres.kuligai)
          setNallaNeram(tres.nallaneram1)
          setPm(tres.nallaneram2)
      }).catch((err)=>{
        console.log(err)
      })
  }


    const Success = () => {
    if(success){
      return <Redirect to = "/forms" /> 
    }
  }

  const submitNow = (e) => {
    e.preventDefault()
    const dataComplete = {
        Dates:dates,
        Day:day,
        TamilMonth:tamilMonth,
        TamilDay:tamilDay,
        TamilDate:tamilDate,
        Note1:note1,
        Note2:note2,
        Ayanam:ayanam,
        Ruthou:ruthou,
        Mase:mase,
        Pakshe:pakshe,
        Tithi:tithi,
        NextTithi:nextTithi,
        kuligai:kuligai,
        Time:time+' '+timeam,
        Vasaram:vasaram,
        Nakshatram:nakshatram,
        NextNakshatram:nextNakshatram,
        Time2:time2 + ' '+ time2am,
        NallaNeram:nallaNeram,
        PM:pm,
        RaghuKalam:raghuKalam,
        Yemakandam:yemakandam,
        Yogam:yogam,
        Chandrashtamam:chandrashtamam,
        NextChandrashtamam:nextChandrashtamam,
        Sunrise:sunrise,
        Sunset:sunset,
        AdditionalInfo:additionalInfo,
        TableTithi: tableTithi,
        SrardTithi: srardTithi
    }
    setLoading(true)
    submitData(dataComplete)
      .then((dta)=>{
        if(dta.error){
          
        toast.error("Something went wrong.",{toast:"error"})

        }else{
          toast.success("Data has been saved!",{toast:"success"})
          setSuccess(true)
        }
        
      })
      .catch((err)=>{
        console.log(err)
      })

  }

  // SELECT CHANGES
  const chandraChange = (e) => {
    e.preventDefault()
    const chandraCount = ChandrashtamamArray && ChandrashtamamArray.length
    ChandrashtamamArray && ChandrashtamamArray.map((mu, Index)=>{
      
      if(e.target.value.split("/")[0].toLowerCase().trim() == mu.split("/")[0].toLowerCase().trim()){
        
      console.log("array",mu)
      console.log("target",e.target.value)
        if(Index === 26){
          setNextChandrashtamam(ChandrashtamamArray[0])
          setChandrashtamam(e.target.value)
        }else{
          setNextChandrashtamam(ChandrashtamamArray[Index+1])
              setChandrashtamam(e.target.value)
        }
      }else{
        console.log("arraynp",mu)
      console.log("targetnp",e.target.value)
      }
    })
  }

  const tithiChange = (e) => {
    e.preventDefault()
    TithiArray && TithiArray.map((mu, Index)=>{
      
      if(e.target.value.split("/")[0].toLowerCase().trim() == mu.split("/")[0].toLowerCase().trim()){
        
      console.log("array",mu)
      console.log("target",e.target.value)
        if(Index === 14 || Index === 15){
          setNextTithi(TithiArray[0])
          setTithi(e.target.value)
        }else{
          setNextTithi(TithiArray[Index+1])
              setTithi(e.target.value)
        }
      }else{
        console.log("arraynp",mu)
      console.log("targetnp",e.target.value)
      }
    })
  }

  const nakshatramChange = (e) => {
    e.preventDefault()
    NakshatramArray && NakshatramArray.map((mu, Index)=>{
      
      if(e.target.value.split("/")[0].toLowerCase().trim() == mu.split("/")[0].toLowerCase().trim()){
        
      console.log("array",mu)
      console.log("target",e.target.value)
        if(Index === 14 || Index === 15){
          setNextNakshatram(NakshatramArray[0])
          setNakshatram(e.target.value)
        }else{
          setNextNakshatram(NakshatramArray[Index+1])
              setNakshatram(e.target.value)
        }
      }else{
        console.log("arraynp",mu)
      console.log("targetnp",e.target.value)
      }
    })
  }
  const initialize = () => {
    if(time && time2) {
      setT({...t, hour:time.split(":")[0], min:time.split(":")[1].split(" ")[0], timeOfDay: time.split(" ")[1]})
      setT1({...t1, hour:time2.split(":")[0], min:time2.split(":")[1].split(" ")[0], timeOfDay: time2.split(" ")[1]})
      setV(false)
    }
    else if(time || time2){
      if(time){setV(false)
         setT({...t, hour:time.split(":")[0], min:time.split(":")[1].split(" ")[0], timeOfDay: time.split(" ")[1]})}
      if(time2){setV(false)
      setT1({...t1, hour:time2.split(":")[0], min:time2.split(":")[1].split(" ")[0], timeOfDay: time2.split(" ")[1]})}
  
    }else{
      setV(false)
    }
  }
  
    return(
<Base>
{loading && (
        <div className="text-center loaddiv">
      <img src="/loading.gif" alt="ttt" className="text-center loadimg" style={{width:"150px",borderRadius:"30%"}} />
      </div>
    )}
      {Success()}   
      {v && initialize()}   
<div className="section full">
<div className="section-title">Fill Form To Make New Entry *</div>
<div className="wide-block pt-2 pb-2">
<form onSubmit={submitNow}>
    
<div className="form-group boxed">
  <label>Select Schedule Date: </label>
  <input type="date" className="form-control" name="Date" value={dates} 
  onChange = {e => {
             setDates(e.target.value)
             setDay(week_of_day_arr[new Date(e.target.value).getDay()])
             setVasaram(VasaramArray[new Date(e.target.value).getDay()])
             setTamilDay(TamilDaysArray[[new Date(e.target.value).getDay()]])
  }}
  />
</div>
<div className="form-group boxed">
  
<button className="btn btn-danger btn-block" type="button" onClick = {dateCall} >FETCH DATA</button>
</div>
<div className="form-group boxed">
  <label>Day: </label>
  <input type="text" className="form-control" name="Day" value={day} disabled />
</div>
<div className="form-group boxed">
  <label>Select Tamil Month: </label>
   <select className="form-control" name="TamilMonth" value={tamilMonth}>
   {TamilMonthArray && TamilMonthArray.map((tm,Index)=>(
     <option key={Index}>{tm}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
  <label>Select Tamil Date:  </label>
   <select className="form-control" value={tamilDate}>
   <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option>  </select>
</div>

<div className="form-group boxed">
   <label>Select Tamil Day: </label>
   <select className="form-control" value={tamilDay}>
    <option>MONDAY/திங்கள்</option>
    <option>TUESDAY/செவ்வாய்</option>
    <option>WEDNESDAY/புதன்</option>
    <option>THURSDAY/வியாழன்</option>
    <option>FRIDAY/வெள்ளி</option>
  <option>SATURDAY/சனி </option>
  <option>SUNDAY/ஞாயிறு</option>

  </select>
</div>

<div className="form-group boxed">
  <label>Srard Tithi: </label>
 <select className="form-control" value={srardTithi} name ="Tithi" defaultValue = {srardTithi}
 onChange={e=>setsrardTithi(e.target.value)}
 >
   {TithiArray && TithiArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
   <option>Soonya tithi/சூன்ய திதி</option>
   <option>Tithidwayam/திதித்வயம்</option>
   <option></option>
  </select>
</div> 

<div className="form-group boxed">
<textarea placeholder="Today's Event" id="title2" className="form-control" name="Note1" rows="2" cols="60" value = {note1}
onChange={e=>setNote1(e.target.value)}
></textarea>
</div>

    
<div className="form-group boxed">
   <label>Select ayanam: </label>
   <select className="form-control" value={ayanam} name ="Ayanam" defaultValue = {ayanam}
 onChange={e=>setAyanam(e.target.value)}
 >
   {AyanamArray && AyanamArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
 <label>  Select Tamil Year:</label> 
 <select className="form-control" value={note2} name ="Note2" defaultValue = {note2}
 onChange={e=>setNote2(e.target.value)}
 >
   {TamilYearArray && TamilYearArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
 <label>  Select ruthou:</label> 
 {/* <input className="form-control" value={ruthou} name ="Ruthou"
 onChange={e=>setRuthou(e.target.value)}
 /> */}
 <select className="form-control" name="Ruthou" value= {ruthou} defaultValue={ruthou}
 onChange={e=>setRuthou(e.target.value)}
 >
   {RuthouArray && RuthouArray.map((r, Index )=> (<option key ={Index}>{r}</option>))}    
 </select>
</div>

<div className="form-group boxed">
  <label>Select Mase: </label>
   {/* <input value = {mase} name ="Mase" className = "form-control" /> */}

   <select className="form-control" name="Mase" value= {mase} defaultValue={mase}
 onChange={e=>setMase(e.target.value)}
 >
   {MaseArray && MaseArray.map((r, Index )=> (<option key ={Index}>{r}</option>))}    
 </select>
</div>

<div className="form-group boxed">
   <label>Select pakshe:</label> 
 <select className="form-control" name="Pakshe" value= {pakshe} defaultValue={pakshe}
 onChange={e=>setPakshe(e.target.value)}
 >
   {PaksheArray && PaksheArray.map((r, Index )=> (<option key ={Index}>{r}</option>))}    
 </select>
</div>

 <div className="form-group boxed">
  <label>Select thithi: </label>
 <select className="form-control" value={tithi} name ="Tithi" defaultValue = {tithi}
 onChange={tithiChange}
 >
   {TithiArray && TithiArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
   <option></option>
  </select>
</div> 
<div className="col-sm-12">
  <div className="form-group boxed">
  <label>Time for Tithi:</label>
  <input style={{width: "50px",
    height: "40px",
    marginLeft: "10px",
    background: "blue",
    color: "white"}} type="text" value={time} maxLength="5" onChange={e=>setTime(e.target.value)} />
  <select  onChange = {e => setTimeAm(e.target.value)} 
  value = {timeam} className = "mr-3" style = {{width:"50px", height:"40px"}}>
                <option></option>
                <option>AM</option>
                <option>PM</option>
            </select>
</div>
</div>



   <div className="form-group boxed">
  <label>Next thithi: </label>
<input type="text" name="NextTithi" className="form-control" value={nextTithi}
onChange={e=>setNextTithi(e.target.value)}
/> 

</div>


<div className="form-group boxed">
  <label>Next thithi (TABLE STATIC): </label>
 <select className="form-control" value={tableTithi} name ="Tithi" defaultValue = {tableTithi}
 onChange={e=>setTableTithi(e.target.value)}
 >
   {TithiArray && TithiArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
   <option>Soonya tithi/சூன்ய திதி</option>
   <option>Tithidwayam/திதித்வயம்</option>
   <option></option>
  </select>
</div> 

<div className="form-group boxed">
   <label>Enter Vasaram / வாஸரம்: </label>
  <select className="form-control" name="Vasaram" value={vasaram} defaultValue={vasaram}
  onChange={e=>setVasaram(e.target.value)}
  >
<option>Bhanu Vasaram / பானு வாஸரம்</option>
<option>Indhu Vasaram / இந்து வாஸரம்</option>
 <option>Bouma Vasaram / பௌம வாஸரம்</option>
<option>Soumya Vasaram/ சௌம்ய வாஸரம்</option>
<option>Guru Vasaram / குரு வாஸரம்</option>
<option>Bruhu Vasaram / ப்ருஹு வாஸரம்</option>
<option>Sthira Vasaram / ஸ்திர வாஸரம்</option>
</select>
</div>
<div className="row">
  <div className="col-sm-12">
<div className="form-group boxed">
   <label>Select Nakashtram: </label>
   <select className="form-control" value={nakshatram} name ="Nakshatram" defaultValue = {nakshatram}
onChange={nakshatramChange}
 >
   {NakshatramArray && NakshatramArray.map((ta,Index,element)=>(
     <option key={Index}>{ta}</option>
   ))}
   <option></option>
  </select>
</div>
</div>
<div className="col-sm-12">
  <div className="form-group boxed">
  <label>Time for Nakshatram:</label>
  <input style={{width: "50px",
    height: "40px",
    marginLeft: "10px",
    background: "blue",
    color: "white"}} type="text" value={time2} maxLength="5" onChange={e=>setTime2(e.target.value)} />
  <select  onChange = {e => setTime2Am(e.target.value)} 
  value = {time2am} className = "mr-3" style = {{width:"50px", height:"40px"}}>
                <option></option>
                <option>AM</option>
                <option>PM</option>
            </select>
</div>
</div>
</div>

<div className="form-group boxed">
  <label>Next Nakashtram</label>
<input type="text" name="a14" className="form-control" value={nextNakshatram}
onChange={e=>setNextNakshatram(e.target.value)} />

</div>


<div className="form-group boxed">
   <label>Select Nalla Neram/நல்ல நேரம் :  </label>
 <label> AM /காலை :</label> <input type="text" className="form-control" id="desc3" value={nallaNeram} name="NallaNeram" size="55"
 onChange={e=>setNallaNeram(e.target.value)}
 /><br />
 <label> PM/மாலை  :</label> <input type="text" className="form-control" id="desc4" value={pm} name="PM" size="55"
 onChange={e=>setPm(e.target.value)}
 />
</div>

<div className="form-group boxed">
   <label>Raghu Kaalam/ராகு காலம்  : </label>
    <input type="text"  className="form-control" name="RaghuKalam" value={raghuKalam} size="55" onChange ={e => setRaghuKalam(e.target.value)}/>
</div>
<div className="form-group boxed">
   <label>Yemakandam/எமகண்டம்  : </label>
  <input type="text"  className="form-control" name="Yemakandam" value={yemakandam} size="55" onChange ={e => setYemakandam(e.target.value)} />
</div>

<div className="form-group boxed">
  <label>Kuligai Neram :</label>
        <input type="text" className="form-control" name="kuligai" id="desc1" value={kuligai} size="55"
onChange={e=>setKuligai(e.target.value)}
/> 
</div>


<div className="form-group boxed">
  <label>Select Yogam/யோகம் : </label> 
 <select className="form-control" name="Yogam" id="dateselect9" value={yogam} defaultValue={yogam}
 onChange={e=>setYogam(e.target.value)}
 >
    <option>Sidha Yogam / சித்த யோகம்</option>
    <option>Amirda Yogam / அமிர்த் யோகம் </option>
   <option>Yogam sariyillai / யோகம் சரியில்லை </option>
 </select>
</div>

  <div className="form-group boxed">
   <label>Select Chandrashtamam: </label>
   <select className="form-control" value={chandrashtamam} name ="Chandrashtamam" 
   defaultValue = {chandrashtamam}
   onChange={chandraChange} >
   {ChandrashtamamArray && ChandrashtamamArray.map((ta,Index,element)=>(
     <option>{ta}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
<input type="text" className="form-control" value={nextChandrashtamam} 
onChange={e=>setNextChandrashtamam(e.target.value)} />

</div>

<div className="form-group boxed">
   <label>Sunrise / சூர்யோதயம்  : </label>
    <input type="text" className="form-control" name="Sunrise" value={sunrise} size="55" onChange ={e => setSunrise(e.target.value)} />
</div>
<div className="form-group boxed">
   <label>Sunset / அஸ்தமனம்  : </label>
  <input type="text"  className="form-control" name="Sunset" value={sunset}   size="55" onChange ={e => setSunset(e.target.value)}/>
</div>
<div className="form-group boxed">
     <label>Additional Information  : </label>
  <textarea id="info" rows="10" className="form-control" value ={additionalInfo} name="a22" cols="50" onChange ={e => setAdditionalInfo(e.target.value)}></textarea>
</div>


<div className="form-group boxed">
<button type="submit" class="btn btn-danger btn-lg btn-block">
                           Save
                        </button>
</div>

</form>
      </div>
      </div>
</Base>
)
}

export default FormNew