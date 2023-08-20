import React, { useEffect, useState } from 'react'
import { getAllData } from '../helper/AllHelp'
import { useParams } from 'react-router-dom'
import { AyanamCall, TithiCall } from '../helper/WayCall'

const ImgFinal = () => {
   
   const formId = useParams().formId
   const montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const [daksh,setDaksh] = useState()
   const [tithi,setTithi] = useState()
   const [nextTithi,setnextTithi] = useState()
   const [datas,setDatas] = useState([])
   let [tIndex, setTIndex] = useState()
   let [ntIndex, setNtIndex] = useState()
    useEffect(()=>{
        getAllData({formId})
        .then((res)=>{
            setDatas(res)
            setDaksh((res.Ayanam[0]==='D' || res.Ayanam[0]==='d')?(AyanamCall[0]):(AyanamCall[1]))
            TithiCall && TithiCall.map((t, ind) => {

                if(res.Tithi.split(" ")[0] === t.split(" ")[0].trim()){
                    
                    setTIndex(ind)
                    
            setTithi(TithiCall[ind])
                }
                if(res.NextTithi && res.NextTithi.split(" ")[0] === t.split(" ")[0]){
                    setNtIndex(ind)
                    
            setnextTithi(res.NextTithi? TithiCall[ind]: "")
                }
            })
            
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
return(
   <div className="container" style={{padding:"0",margin:"0",maxWidth:"100%"}}>
       <div className="row">
        <div className="col-md-12">
            <div className="row">
                <div className="col-md-12 text-white text-center" style={{background:"#202028",padding:"10px",border:"2px solid white"}}>
<b>பஞ்சாங்கம் / Panchangam. Compiled By: Nagai Narasimhan (9967504474)</b>
                </div>
                <div className="col-md-12 text-white text-center" style={{background:"#6e0000",borderBottom:"2px solid white"}}>
                    <div className="row">
                    <div className="col-md-5" style={{paddingTop:"10px",paddingLeft:"15px",color:"yellow"}}>
                   <b style={{fontWeight: "700",fontSize:"1.1rem"}}> {datas && datas.Note2 && datas.Note2.split(" ")[0]}&nbsp; 
                   Year, {daksh && daksh.split("/")[0]},
                    {datas && datas.Ruthou && datas.Ruthou.split(" ")[0]} Rithou,&nbsp; 
                   {datas && datas.Mase && datas.Mase.split(" ")[0]}&nbsp;Masam, {datas && datas.TamilMonth && datas.TamilMonth.split("/")[0]}&nbsp; -&nbsp;
                   {datas && datas.TamilDate }</b>
                    </div>
                    <div className="col-md-2" style={{paddingTop:"0.1rem"}}>
                       <img src="/call.png" alt="cal" style={{width:"95px",height:"70px"}} />
                       <div style={{fontSize:"0.65rem",marginTop:"-66px",fontWeight:"700"}}>
                       {datas && datas.Dates && montharray[new Date(datas.Dates).getMonth()]}
                       </div>
                       <div style={{fontSize:"1.7rem",color:"#444040",marginTop:"-1px",fontWeight:"900"}}>
                       {datas && datas.Dates && datas.Dates.split("-")[2]}
                       </div>
                       <div style={{fontSize:"0.6rem",color:"#444040",marginTop:"-3px"}}>
                       {datas && datas.Day}
                       </div>

                    </div>
                    <div className="col-md-5" style={{fontSize:"0.95rem",paddingTop:"10px",paddingRight:"13px",color:"yellow"}}>
                    <b style={{fontWeight: "700"}}>{datas && datas.Note2 && (datas.Note2.split("/")[1]).split(" ")[0]} ௵, 
                    {daksh && daksh.split("/")[1]}, 
                    {datas && datas.Ruthou && (datas.Ruthou.split("/")[1])}
                     , {datas && datas.Mase && datas.Mase.split("/")[1]},&nbsp;
                     {datas && datas.TamilMonth && datas.TamilMonth.split("/")[1]}&nbsp;
                      - &nbsp;
                      {datas && datas.TamilDate }
                    </b> </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <div className="" style={{background:"url('/spvs.png')",backgroundSize:"inherit",height:"400px",width:"100%"}}>
        <div className="col-md-12 text-white text-center" style={{background:"#ffda74",padding:"10px",border:"2px solid white"}}>
<p style={{color:"#202028",fontSize:"0.75rem",lineHeight:"0.9rem"}}>Today's Event:  {datas && datas.Note1 }</p>
          </div>
          <div className="col-md-12">
              <table className="table table-bordered imgdisplay" style={{fontWeight:"800"}}>
                  <tbody>
                      <tr>
                          <td style={{padding:"0.25rem",background:"#6e0000",color:"white"}}>பக்ஷ - திதி</td>
                          <td style={{padding:"0.25rem",color:"red"}}>
                              {datas && datas.Pakshe && (datas.Pakshe.split("/")[1].split(" ")[1])} &nbsp;
                          {datas && datas.Tithi && (datas.Tithi.split("/")[1]).split(" ")[1] } &nbsp;                       
                          {datas && datas.Time} &nbsp;                          
                          {datas && datas.NextTithi && "மலை"}&nbsp;
                          {datas && datas.NextTithi && (datas.NextTithi.split("/")[1]).split(" ")[1] } &nbsp; </td>
                      </tr>
                      <tr>
                          <td style={{padding:"0.25rem",background:"#6e0000",color:"white"}}>Paksha - Tithi</td>
                          <td style={{padding:"0.25rem",color:"red"}}>
                               {datas && datas.Pakshe && datas.Pakshe.split(" ")[0] } &nbsp;
                               {datas && datas.Tithi && datas.Tithi.split(" ")[0] } &nbsp;
                               {datas && datas.Time} &nbsp;
                               {datas && datas.NextTithi && "then"}&nbsp;
                               {datas && datas.NextTithi && datas.NextTithi.split(" ")[0] }&nbsp;</td>
                      </tr>
                      <tr>
                          <td style={{padding:"0.25rem",background:"#6e0000",color:"white"}}>நக்ஷத்திரம்</td>
                          <td style={{padding:"0.25rem",color:"red"}}>
                          மாலை&nbsp; {datas && datas.Time2} &nbsp;
                          {datas && datas.Nakshatram && (datas.Nakshatram.split("/")[1]).split(" ")[1] }&nbsp; நக்ஷத்திரம்
                          &nbsp;பின்னர்&nbsp;
                          {datas && datas.NextNakshatram && (datas.NextNakshatram.split("/")[1]).split(" ")[1] }&nbsp;நக்ஷத்திரம்
</td>
                      </tr>
                      <tr>
                          <td style={{padding:"0.25rem",background:"#6e0000",color:"white"}}>Nakshatram</td>
                          <td style={{padding:"0.25rem",color:"red"}}>
                          {datas && datas.Nakshatram && (datas.Nakshatram.split(" ")[0])}&nbsp;Nakashatram
                          Upto &nbsp; {datas && datas.Time2}&nbsp;
                          {datas && datas.NextNakshatram && "then"}&nbsp;
                          {datas && datas.NextNakshatram && (datas.NextNakshatram.split(" ")[0])}&nbsp;Nakashatram</td>
                      </tr>

                      

                  
                  </tbody>
              </table>
              
              <table class="table table-bordered imgdisplay" style={{fontWeight:"700"}}>
                  
                  <tbody>
                  <tr>
                          <td className="text-left text-danger" 
                          style={{background:"url(/sun.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "33px",backgroundPosition: "left",padding:"0.25rem",paddingLeft:"50px"}}>
                          <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                              Raghu Kaalam/ராகு காலம்</b> <br />
                              {datas && datas.RaghuKalam}
                          </td>
                          <td className="text-left text-danger" 
                          style={{background:"url(/zod.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "33px",backgroundPosition: "left",padding:"0.25rem",paddingLeft:"50px"}}>
                           <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                                yogam/யோகம் </b><br />
                                {datas && datas.Yogam}
                          </td>
                          <td className="text-left text-danger" 
                          style={{background:"url(/rise.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "50px",backgroundPosition: "left",padding:"0.25rem",paddingLeft:"50px"}}>
                          <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                              Sunrise / சூர்யோதயம்</b> <br />
                              {datas && datas.Sunrise}
                          </td>
                      </tr>
                    

                      <tr>
                          <td className="text-left text-danger" 
                          style={{background:"url(/sun.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "33px",backgroundPosition: "left",padding:"0.25rem",paddingLeft:"50px"}}>
                            <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                                Yemakandam/எமகண்டம்</b><br />
                                {datas && datas.Yemakandam}
                          </td>
                          <td className="text-left text-danger" 
                          style={{background:"url(/moon.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "33px",backgroundPosition: "left",padding:"0.25rem",paddingLeft:"50px"}}>
                                <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                                    Chandrashtamam</b><br />
                                    {datas && datas.Chandrashtamam}<br />
                                    {datas && datas.NextChandrashtamam}
                          </td>
                          <td className="text-left text-danger" 
                          style={{background:"url(/rise.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "50px",backgroundPosition: "left",padding:"0.25r",paddingLeft:"50px"}}>
                           <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                               Sunset / அஸ்தமனம்</b> <br />
                               {datas && datas.Sunset}
                          </td>
                      </tr>

                      <tr>
                          <td className="text-left text-danger" 
                          style={{background:"url(/sun.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "33px",backgroundPosition: "left",padding:"0.25rem",paddingLeft:"50px"}}>
                            <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                                Kuligai</b><br />
                                {datas && datas.kuligai}
                          </td>
                          <td className="text-center text-danger" 
                          style={{padding:"0.25rem"}}>
                            
                          </td>
                          <td className="text-left text-danger" 
                          style={{background:"url(/sun.png)",backgroundRepeat: "no-repeat",
                          backgroundSize: "33px",backgroundPosition: "left",padding:"0.25rem",paddingLeft:"50px"}}>
                         <b style={{background: "blue",color: "white",padding: "2px",paddingRight: "10px"}}>
                             Nalla Neram/நல்ல நேரம்</b><br />
                             {datas && datas.NallaNeram}<br />
                             {datas && datas.PM}
                          </td>
                      </tr>
                  </tbody>
              </table>

              
              <table class="table table-bordered text-center imgdisplay">
                  <tbody>
                      <tr>
                          <td style={{padding:"0.25rem",fontWeight:"700"}}>
                          {datas && datas.AdditionalInfo}
                          </td>
                      </tr>
                  </tbody>
              </table>
              <div style={{fontSize:"0.80rem",paddingRight:"10px",paddingLeft:"10px",textAlign:"center",paddingTop:"5px",height:"500px",background:"#6e0000",color:"white"}}>
              <p style={{lineHeight:"18px"}}>
                 {datas.Note2? datas.Note2.split("/")[1]:"சார்வரி நாம ஸம்வத்சரே"}   , {datas.Ayanam?datas.Ayanam.split("/")[1]:"தக்ஷிணாயணே"}, {datas.Ruthou?datas.Ruthou.split("/")[1].trim().split(" ")[0]: ""} ருதௌ  , {datas.Mase? datas.Mase.split("/")[1].trim().split(" ")[0]:"கடக"} மாஸே {datas.Pakshe? datas.Pakshe.split("/")[1].trim().split(" ")[0]:""}
                 பக்ஷே {tithi? tithi.split("/")[3]: ""} {datas.Time && nextTithi? datas.Time + " பின்னர் " : ""} {nextTithi? nextTithi.split("/")[3]: ""} , சுபதிதௌ {datas.Vasaram ? datas.Vasaram.split("/")[1].trim().split(" ")[0]: ""} வாஸர யுக்தாயாம், {datas.Nakshatram? datas.Nakshatram.split("/")[1].trim().split(' ')[0]: ""} நக்ஷ்த்ர {datas.NextNakshatram && datas.Time2?` ${datas.Time2} பின்னர்  `: ""} , {datas.NextNakshatram?datas.NextNakshatram.split("/")[1].trim().split(" ")[0]: ''} 
                  யுக்தாயாம், ஸ்ரீ விஷ்ணு யோக ஸ்ரீ விஷ்ணு கரண ஸுப யோக ஸுப கரண ஏவங்குன விசேஷண
                   விசிஷ்டாயாம் அஸ்யாம் சதுர்த்தியம் {tithi? tithi.split("/")[3]: ""} {datas.Time && nextTithi? datas.Time : ""} {nextTithi? nextTithi.split("/")[3]: ""} சுபதிதௌ ....<br /><br />
                   {datas.Note2? datas.Note2.split("/")[0]:"சார்வரி நாம ஸம்வத்சரே"}, {datas.Ayanam?datas.Ayanam.split("/")[0]:"தக்ஷிணாயணே"}  {datas.Ruthou?datas.Ruthou.split("/")[0].trim().split(" ")[0]: ""}  Rithou {datas.Mase? datas.Mase.split("/")[0].trim().split(" ")[0]:"கடக"}&nbsp;
Mase {datas.Pakshe? datas.Pakshe.split("/")[0].trim().split(" ")[0]:""} Pakshe {tithi? tithi.split("/")[2]: ""} {nextTithi && datas.Time ? `upto ${datas.Time} then `: ""} {nextTithi? nextTithi.split("/")[2]: ""} subha thithou {datas.Vasaram ? datas.Vasaram.split("/")[0].trim().split(" ")[0]: ""} vasara yukhtayām {datas.Nakshatram? datas.Nakshatram.split("/")[0].trim().split(' ')[0]: ""}&nbsp;
                 {datas.NextNakshatram && datas.Time2?`upto ${datas.Time2} and then`: ""} {datas.NextNakshatram?datas.NextNakshatram.split("/")[0].trim().split(" ")[0]: ''} Nakshatra yukhtayām 
                 Sri Vishnu Yoga, Sri Vishnu Karana, Subh Yoga, Subh Karana Evanguna Visheshana vasishtayam asyam {tithi? tithi.split("/")[2]: ""} {nextTithi && datas.Time ? `upto ${datas.Time} then `: ""} {nextTithi? nextTithi.split("/")[2]: ""}...
                 </p>

              </div>
              
              
          </div>
         </div>
       </div>
   </div>
)
}

export default ImgFinal