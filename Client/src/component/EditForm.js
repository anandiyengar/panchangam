import React, { useState, useEffect } from "react"

import Base from '../layout/Base'
import {TamilMonthArray,TithiArray, TamilDaysArray, NakshatramArray, ChandrashtamamArray, MaseArray, RuthouArray, AyanamArray} from './../helper/HelpArray'
import { getDateData, editData, getAllData } from '../helper/AllHelp';
import { toast } from 'react-toastify';
import { useParams, Redirect } from "react-router-dom";


const EditForm = () => {
    const week_of_day_arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const formId = useParams().formId
    const [values,setValues]=useState({
        Dates:"",
        Day:"",
        srardTithi: "",
        TamilMonth:"",
        TamilDate:"",
        TamilDay:"",
        tableTithi: "",
        TamilMonth:"",
        Note1:"",
        Note2:"",
        Ayanam:"",
        Ruthou:"",
        Mase:"",
        Pakshe:"",
        Tithi:"",
        Time:"",
        Vasaram:"",
        Nakshatram:"",
        NextNakshatram:"",
        Time2:"",
        NallaNeram:"",
        PM:"",
        RaghuKalam:"",
        Yemakandam:"",
        Yogam:"",
        Chandrashtamam:"",
        NextChandrashtamam:"",
        Sunrise:"",
        Sunset:"",
        AdditionalInfo:"",
        success :"",
        error :"",
        loading :"",
        kuligai: ""
      })
      const {
        Dates,Day,TamilMonth,TamilDate,TamilDay,srardTithi,
        Note1,Note2,Ayanam,Ruthou,Mase,Pakshe,Tithi, NextTithi,
        Time,Vasaram,Nakshatram,NextNakshatram,Time2,NallaNeram,PM,RaghuKalam,
        Yemakandam,Yogam,Chandrashtamam,NextChandrashtamam,Sunrise,Sunset,AdditionalInfo, tableTithi,
         error ,loading, kuligai, success
      } = values
      useEffect(() => {
          getAllData({formId}).then(
              res => {
                  if(res.error){
                      setValues({...values, error: res.error})
                      return
                  }
                  const {
                    Dates,Day,TamilMonth,TamilDate,TamilDay,
                    Note1,Note2,Ayanam,Ruthou,Mase,Pakshe,Tithi,
                    Time,Vasaram,Nakshatram,NextNakshatram,Time2,NallaNeram,PM,RaghuKalam,
                    Yemakandam,Yogam,Chandrashtamam,NextChandrashtamam,Sunrise,TableTithi, Sunset,AdditionalInfo,kuligai, SradTithi
                  } = res
                  setValues({...values, Dates,Day,TamilMonth,TamilDate,TamilDay,
                    Note1,Note2,Ayanam,Ruthou,Mase,Pakshe,Tithi,
                    Time,Vasaram,Nakshatram,NextNakshatram,Time2,NallaNeram,PM,RaghuKalam,
                    Yemakandam,Yogam,Chandrashtamam,NextChandrashtamam,Sunrise,Sunset,AdditionalInfo,kuligai
                    ,srardTithi:SradTithi, tableTithi:TableTithi
                     })
              }
          )
      }, [])
      const submitNow = (e) => {
        e.preventDefault()
        const dataComplete = {
          Dates,Day,TamilMonth,TamilDate,TamilDay,
        Note1,Note2,Ayanam,Ruthou,Mase,Pakshe,Tithi,
        Time,Vasaram,Nakshatram,NextNakshatram,Time2,NallaNeram,PM,RaghuKalam,
        Yemakandam,Yogam,Chandrashtamam,NextChandrashtamam,Sunrise,Sunset,AdditionalInfo,NextTithi
        }
        editData(dataComplete, formId)
          .then((dta)=>{
            if(dta && dta.error){
              setValues({...values, loading:false, error:"Something went wrong."})
            toast.error("Something went wrong.",{toast:"error"})
    
            }else{
              setValues({...values, loading:false, success:"Data has been saved!"})
              toast.success("Data has been saved!",{toast:"success"})
             
            }
            
          })
          .catch((err)=>{
            console.log(err)
          })
    
      }

      const successMsg = () => {
        if(success)
        {return <Redirect to = "/forms" />}
      }
    return(
        <Base>
        {successMsg()}
<div className="section full">
<div className="section-title">Fill Form To Make New Entry *</div>
<div className="wide-block pt-2 pb-2">
<form onSubmit={submitNow}>
  
<div className="form-group boxed">
	<label>Select Schedule Date: </label>
  <input type="date" className="form-control" name="Date" value={Dates} 
  onChange = {e =>  setValues({...values,Dates:e.target.value,Day:week_of_day_arr[new Date(e.target.value).getDay()]})}
  />
</div>
<div className="form-group boxed">
  
</div>
<div className="form-group boxed">
	<label>Day: </label>
	<input type="text" className="form-control" name="Day" value={Day} disabled onChange ={e => setValues({...values, Day:e.target.value})}/>
</div>
<div className="form-group boxed">
	<label>Select Tamil Month: </label>
	 <select className="form-control" name="TamilMonth" value={TamilMonth} onChange ={e => setValues({...values, TamilMonth:e.target.value})}>
   {TamilMonthArray && TamilMonthArray.map((tm,Index)=>(
     <option key={Index}>{tm}</option>
   ))}
	</select>
</div>

<div className="form-group boxed">
	<label>Select Tamil Date:  </label>
   <select className="form-control" value={TamilDate} onChange ={e => setValues({...values, TamilDate:e.target.value})}>
   <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option>	</select>
</div>

<div className="form-group boxed">
	 <label>Select Tamil Day: </label>
   <select className="form-control" value={TamilDay} onChange ={e => setValues({...values, TamilDay:e.target.value})}>
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
 onChange={e=>setValues({...values, srardTithi:e.target.value})}
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
<textarea id="title2" className="form-control" name="Note1" rows="2" cols="60" value = {Note1}
onChange={e=>setValues({...values,Note1:e.target.value})}
></textarea>
</div>

<div className="form-group boxed">
        <input type="text" className="form-control" name="Note2" id="desc1" value={Note2} size="55"
onChange={e=>setValues({...values,Note2:e.target.value})}
/> 
</div>
    
<div className="form-group boxed">
	 <label>Select ayanam: </label>
   <select className="form-control" value={Ayanam} name ="Ayanam" defaultValue = {Ayanam}
 onChange={e=>setValues({...values,Ayanam:e.target.value})}
 >
   {AyanamArray && AyanamArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
 <label>  Select ruthou:</label> 
 <select className="form-control" value={Ruthou} name ="Ruthou" defaultValue = {Ruthou}
 onChange={e=>setValues({...values,Ruthou:e.target.value})}
 >
   {RuthouArray && RuthouArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
  <label>Select Mase: </label>
  <select className="form-control" value={Mase} name ="Mase" defaultValue = {Mase}
  onChange={e=>setValues({...values,Mase:e.target.value})}
 >
   {MaseArray && MaseArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
  </select>
  </div>

<div className="form-group boxed">
   <label>Select pakshe:</label> 
 <select className="form-control" name="Pakshe" value={Pakshe} defaultValue={Pakshe}
 onChange={e=>setValues({...values,Pakshe:e.target.value})}
 >
    <option>Krishna Pakshe / க்ருஷ்ண பக்ஷம்</option>
    <option>Shukla Pakshe / சுக்ல பக்ஷம் </option>
 </select>
</div>

 <div className="form-group boxed">
  <label>Select thithi: </label>
 <select className="form-control" value={Tithi} name ="Tithi" defaultValue = {Tithi} onChange = {e => setValues({...values, Tithi:e.target.value})}
 >
   {TithiArray && TithiArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
  </select>
</div>
 <div className="form-group boxed">
  <label>Select time: </label>
<input type="time" className="form-control" value={Time}
onChange={e=>setValues({...values,Time:e.target.value})} />
  </div>
   <div className="form-group boxed">
  <label>Next thithi: </label>

  <select className="form-control" value={NextTithi} name ="NextTithi" defaultValue = {NextTithi} onChange = {e => setValues({...values, NextTithi:e.target.value})}
 >
   {TithiArray && TithiArray.map((ta,Index)=>(
     <option key={Index}>{ta}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
  <label>Next thithi (TABLE STATIC): </label>
 <select className="form-control" value={tableTithi} name ="Tithi" defaultValue = {tableTithi}
 onChange={e=>setValues({...values, tableTithi:e.target.value})}
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
  <select className="form-control" name="Vasaram" value={Vasaram} defaultValue={Vasaram}
  onChange={e=>setValues({...values, Vasaram:e.target.value})}
  >
    <option selected="" id="newdatefunc"></option>
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
	<div className="col-sm-6">
<div className="form-group boxed">
   <label>Select Nakashtram: </label>
   <select className="form-control" value={Nakshatram+'|'+NextNakshatram} name ="Nakshatram" defaultValue = {Nakshatram+'|'+NextNakshatram}
   onChange={e=>setValues({...values,Nakshatram:e.target.value.split("|")[0],NextNakshatram:e.target.value.split("|")[1]})}
 >
   {NakshatramArray && NakshatramArray.map((ta,Index,element)=>(
     <option value={ta+'|'+(Index !== NakshatramArray.length-1 ?(
      element[Index+1]):(element[0]))} key={Index}>{ta}</option>
   ))}
  </select>
</div>
</div>
<div className="col-sm-6">
	<div className="form-group boxed">
	<label>Select Time</label>
<input type="time" className="form-control" name="Time2" value={Time2}
onChange={e=>setValues({...values,Time2:e.target.value})}
/>
</div>
</div>
</div>
<div className="form-group boxed">
	<label>Next Nakashtram</label>
<input type="text" name="a14" className="form-control" value={NextNakshatram} onChange ={e => setValues({...values, NextNakshatram:e.target.value})}/>
</div>


<div className="form-group boxed">
   <label>Select Nalla Neram/நல்ல நேரம் :  </label>
 <label> AM /காலை :</label> <input type="text" className="form-control" id="desc3" value={NallaNeram} name="NallaNeram" size="55" onChange ={e => setValues({...values, NallaNeram:e.target.value})}/><br />
 <label> PM/மாலை  :</label> <input type="text" className="form-control" id="desc4" value={PM} name="PM" size="55" onChange ={e => setValues({...values, PM:e.target.value})} />
</div>

<div className="form-group boxed">
   <label>Raghu Kaalam/ராகு காலம்  : </label>
    <input type="text"  className="form-control" name="RaghuKalam" value={RaghuKalam} size="55" onChange ={e => setValues({...values, RaghuKalam:e.target.value})}/>
</div>
<div className="form-group boxed">
   <label>Yemakandam/எமகண்டம்  : </label>
  <input type="text"  className="form-control" name="Yemakandam" value={Yemakandam} size="55" onChange ={e => setValues({...values, Yemakandam:e.target.value})}/>
</div>

<div className="form-group boxed">
<label>Kuligai Neram :</label>
        <input type="text" className="form-control" name="Kuligai" id="desc1" value={kuligai} size="55"
onChange={e=>setValues({...values,kuligai:e.target.value})}
/> 
</div>
<div className="form-group boxed">
  <label>Select Yogam/யோகம் : </label> 
 <select className="form-control" name="Yogam" id="dateselect9" value={Yogam} defaultValue={Yogam}
 onChange={e=>setValues({...values,Yogam:e.target.value})}
 >
    <option>Sidha Yogam / சித்த யோகம்</option>
    <option>Amirda Yogam / அமிர்த் யோகம் </option>
	 <option>Yogam sariyillai / யோகம் சரியில்லை </option>
 </select>
</div>

  <div className="form-group boxed">
   <label>Select Chandrashtamam: </label>
   <select className="form-control" value={Chandrashtamam+'|'+NextChandrashtamam} name ="Chandrashtamam" defaultValue = {Chandrashtamam+'|'+NextChandrashtamam}
   onChange={e=>setValues({...values,Chandrashtamam:e.target.value.split("|")[0],NextChandrashtamam:e.target.value.split("|")[1]})}
 >
   {ChandrashtamamArray && ChandrashtamamArray.map((ta,Index,element)=>(
     <option value={ta+'|'+(Index !== ChandrashtamamArray.length-1 ?(
      element[Index+1]):(element[0]))} key={Index}>{ta}</option>
   ))}
  </select>
</div>

<div className="form-group boxed">
<input type="text" className="form-control" value={NextChandrashtamam} onChange = {e =>{
  setValues({...values, NextChandrashtamam:e.target.value})
  console.log(Chandrashtamam)} }/>

</div>

<div className="form-group boxed">
   <label>Sunrise / சூர்யோதயம்  : </label>
    <input type="text" className="form-control" name="Sunrise" value={`காலை 6.30 AM `} size="55" />
</div>
<div className="form-group boxed">
   <label>Sunset / அஸ்தமனம்  : </label>
	<input type="text"  className="form-control" name="Sunset" value={`மாலை 5.45 PM`}   size="55" />
</div>
<div className="form-group boxed">
	   <label>Additional Information  : </label>
	<textarea id="info" rows="10" className="form-control" name="a22" cols="50" value ={AdditionalInfo} onChange ={e => setValues({...values, AdditionalInfo:e.target.value})}></textarea>
</div>


<div className="form-group boxed">
<button type="submit" class="btn btn-danger btn-lg btn-block">
                           Save Changes
                        </button>
</div>

</form>
      </div>
      </div>
</Base>
    )
}

export default EditForm