import React, { useEffect, useState, Fragment } from 'react'
import { getAllData } from '../helper/AllHelp'
import { useParams } from 'react-router-dom'
import { AyanamCall, TithiCall } from '../helper/WayCall'

const Mob = () => {
    const week_of_day_arr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   const formId = useParams().formId
   const montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
   const [daksh,setDaksh] = useState()
   const [tithi,setTithi] = useState()
   const [nextTithi,setnextTithi] = useState()
   const [datas,setDatas] = useState([])
   const [additionalInfoState,setAdditionalInfoState] = useState()
   let [tIndex, setTIndex] = useState()
   let [ntIndex, setNtIndex] = useState()
   let nextDay = '';
    useEffect(()=>{
        getAllData({formId})
        .then((res)=>{
            setDatas(res)
            setDaksh((res.Ayanam[0]==='D' || res.Ayanam[0]==='d')?(AyanamCall[0]):(AyanamCall[1]))
            TithiCall && TithiCall.map((t, ind) => {

                if(res.Tithi.split(" ")[0] === t.split(" ")[0].trim()){
                    
                    setTIndex(ind)
                    
            console.log("Tithi",TithiCall[ind])
            setTithi(TithiCall[ind])
                }
                if(res.NextTithi && res.NextTithi.split(" ")[0] === t.split(" ")[0]){
                    setNtIndex(ind)
                    
            setnextTithi(res.NextTithi? TithiCall[ind]: "")
                }
            })
            const fmon = new Date(res.Dates).getDate()
            nextDay = new Date(res.Dates)
            
            nextDay.setDate(nextDay.getDate()+1);
            setAdditionalInfoState(week_of_day_arr[nextDay.getDay()] + ", " + nextDay.getDate() + " " + montharray[nextDay.getMonth()])
    
            
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
return(
   <div className="container" style={{padding:"0",margin:"0",maxWidth:"100%"}}>
   <div className="row">
    <div className="col-md-12" style={{background:"black",paddingTop:"22px"}}>
        <div className="col-md-12 text-center" style={{background: "#250c3a",
    color: "white"}}>
            <b>பஞ்சாங்கம் / Panchangam. Compiled By: Nagai Narasimhan (9967504474)</b>
        </div>
        <ul className="listview image-listview media" style={{color: "yellow",borderColor:"orange",
        background: "#250c3a",fontWeight: "700",fontSize:" 0.85rem"}}><li>
    <div class="item">
                        <div className="imageWrapper text-center text-white">
                        <img src="/call.png" alt="cal" style={{width:"80px",height:"75px"}} />
                       <div style={{fontSize:"0.73rem",marginTop:"-68px",fontWeight:"700"}}>
                       {datas && datas.Dates && montharray[new Date(datas.Dates).getMonth()]}
                       </div>
                       <div style={{fontSize:"1.7rem",color:"#444040",marginTop:"12.5px",fontWeight:"900"}}>
                       {datas && datas.Dates && datas.Dates.split("-")[2]}
                       </div>
                       <div style={{fontSize:"0.6rem",color:"#444040",marginTop:"3.5px"}}>
                       {datas && datas.Day}     
                       </div>   
                       </div>

                        <div className="in">
                            <div>
                                {datas && datas.Note2 && datas.Note2.split(" ")[0]}&nbsp; 
                   Year, {daksh && daksh.split("/")[0]},
                    {datas && datas.Ruthou && datas.Ruthou.split(" ")[0]} Rithou, &nbsp; <br />
                   {datas && datas.Mase && datas.Mase.split(" ")[0]}&nbsp; Masam,
                    {datas && datas.TamilMonth && datas.TamilMonth.split("/")[0]}&nbsp; -&nbsp;
                   {datas && datas.TamilDate } 
                    <div style={{    paddingTop: "0.45rem"}}></div>

                   {datas && datas.Note2 && (datas.Note2.split("/")[1]).split(" ")[0]} ௵, 
                    {daksh && daksh.split("/")[1]}, 
                    {datas && datas.Ruthou && (datas.Ruthou.split("/")[1])}
                     ,<br /> {datas && datas.Mase && datas.Mase.split("/")[1]},&nbsp;
                     {datas && datas.TamilMonth && datas.TamilMonth.split("/")[1]}&nbsp;
                      - &nbsp;
                      {datas && datas.TamilDate }
                            </div>
                        </div>
                    </div>
                    </li>
    </ul>
    </div>
    <div className="col-md-12">
        
        <table class="table table-bordered table-hover" style={{background:"url('/spvs.png')",backgroundSize:"contain"}}>
            <tbody>
                <tr>
                    <td className="bg-cust">Today's Event</td>
                    <td className="bg-cust1">  
                    Sradha Tithi /  ஸ்ராத்த  திதி : {datas && datas.SrardTithi?.split("/")[0]} /
                             {datas && datas.SrardTithi?.split("/")[1]}<br />
                    {datas && datas.Note1 && datas.Note1.split("|").map((ad)=>(
                            <Fragment>
                                {ad} <br />
                            </Fragment>
                          ))}</td>
                </tr>
                <tr>
                    <td className="bg-cust">பக்ஷ - திதி</td>
                    <td className="bg-cust1">
                    {datas?.Time?.split(" ")[1] === "AM" ? " (காலை" : ""} {datas?.Time?.split(" ")[1] === "PM"  ? "( மாலை" : ""}   { datas.Time ? datas?.Time?.split(" ")[0] + " வரை) " : ""} 
                    {datas && datas?.Pakshe && (datas?.Pakshe?.split("/")[1].split(" ")[1])} &nbsp;
                          {datas && datas.Tithi && (datas.Tithi.split("/")[1]).split(" ")[1] } &nbsp;     
                          {(datas?.Pakshe?.split(" ")[0].toLowerCase()[0]==='s'  && datas?.NextTithi?.split(" ")[0] === 'Prathamai') ? "க்ருஷ்ண ":"சுக்ல "}                                     
                          {datas && datas.NextTithi && `பின்னர் ${ datas.NextTithi.split("/")[1].split(" ")[1]}`}&nbsp;
                    </td>
                </tr>
                <tr>
                    <td className="bg-cust">Paksha - Tithi</td>
                    <td className="bg-cust1">
                    {datas && datas.Pakshe && datas.Pakshe.split(" ")[0] } &nbsp;
                               {datas && datas.Tithi && datas.Tithi.split(" ")[0] } &nbsp;
                               {datas && `(upto ${datas.Time}`} &nbsp;
                               {datas && datas.NextTithi && ") then"}&nbsp;
                               {(datas?.Pakshe?.split(" ")[0].toLowerCase()[0] === 'Prathamai') ?"Krishna ":"Shukla "}   
                               {datas && datas.NextTithi && datas.NextTithi.split(" ")[0] }&nbsp;
                    </td>
                </tr>
                <tr>
                    <td className="bg-cust">நக்ஷத்திரம்</td>
                    <td className="bg-cust1">
                    {datas?.Time2?.split(" ")[1] === "AM" ? "( காலை " : ""} {datas?.Time2?.split(" ")[1] === "PM" ? "( மாலை " : ""}
                     {datas?.Time2 ? datas?.Time2?.split(" ")[0] + " வரை )  " : "" } &nbsp;
                          {datas && datas.Nakshatram && (datas.Nakshatram.split("/")[1]).split(" ")[1] }&nbsp; 
                         
                          {datas && datas.NextNakshatram && `பின்னர் ${datas.NextNakshatram.split("/")[1].split(" ")[1]}`}&nbsp;
                    </td>
                </tr>
                <tr>
                    <td className="bg-cust">Nakshatram</td>
                    <td className="bg-cust1">
                    {datas && datas.Nakshatram && (datas.Nakshatram.split(" ")[0])}&nbsp;
                          &nbsp; {datas && datas.Time2 && `(upto ${datas.Time2.split(" ")[0]}`}&nbsp;
                          {datas && datas.NextNakshatram && ") then"}&nbsp;
                          {datas && datas.NextNakshatram && (`${datas.NextNakshatram.split(" ")[0]}`)}&nbsp;
                    </td>
                </tr>
               
            </tbody>
        </table>
        
        <table class="table table-bordered table-hover" style={{background:"url('/spvs.png')",backgroundSize:"contain"}}>
            <tbody>
            <tr>
                    <td className="bg-cust"> Raghu Kaalam/ராகு காலம்</td>
                    <td className="bg-cust"> Yogam/யோகம் </td>
                    <td className="bg-cust"> Sunrise / சூர்யோதயம் </td>
                </tr>
                <tr>
                    <td className="bg-cust1">{datas && datas.RaghuKalam}</td>
                    <td className="bg-cust1">{datas && datas.Yogam}</td>
                    <td className="bg-cust1">{datas && datas.Sunrise}</td>
                </tr>

                <tr>
                    <td className="bg-cust">  Yemakandam/எமகண்டம்</td>
                    <td className="bg-cust"> Chandrashtamam/சந்த்ராஷ்டமம்</td>
                    <td className="bg-cust">  Sunset / அஸ்தமனம் </td>
                </tr>
                <tr>
                    <td className="bg-cust1"> {datas && datas.Yemakandam}</td>
                    <td className="bg-cust1">{datas && datas.Chandrashtamam}<br />
                                    {datas && datas.NextChandrashtamam}</td>
                    <td className="bg-cust1">{datas && datas.Sunset}</td>
                </tr>
                <tr>
                    <td className="bg-cust">  Kuligai/குளிகை</td>
                    <td className="bg-cust">  Nalla Neram/நல்ல நேரம்</td>
                    <td className="bg-cust" style={{fontSize:"0.7rem"}}>  Next Day Sradha Tithi <br />அடுத்த நாள் ஸ்ராத்த  திதி</td>

                </tr>
                <tr>
                    <td className="bg-cust1">  {datas && datas.kuligai}</td>
                    <td className="bg-cust1"> {datas && datas.NallaNeram}<br />
                             {datas && datas.PM}</td>
                             <td className="bg-cust1"> {datas && datas.TableTithi?.split("/")[0]} <br /> 
                             {datas && datas.TableTithi?.split("/")[1]}
                             </td>
                </tr>

              
            </tbody>
        </table>
        
      
        <table class="table table-bordered text-center">
                  <tbody>
                      <tr>
                          <td className="bg-cust" style={{width:"20%"}}>Next Day Event <br /><
                              strong>{additionalInfoState?.split(",").map((tr)=>(
                             <Fragment>
                                 {tr} <br />
                             </Fragment>
                          ))} </strong></td>
                          <td className="bg-cust1 text-left"> 
                          {datas && datas.AdditionalInfo && datas.AdditionalInfo.split("|").map((ad)=>(
                            <Fragment>
                                {ad} <br />
                            </Fragment>
                          ))}
                          </td>
                      </tr>
                  </tbody>
              </table>
              <div style={{fontSize:"0.80rem",paddingRight:"10px",paddingLeft:"10px",textAlign:"center",paddingTop:"5px",height:"500px",background:"#250c3a",color:"white"}}>
              <p style={{lineHeight:"18px"}}>
                 {datas.Note2? datas.Note2.split("/")[1]:"சார்வரி நாம ஸம்வத்ஸரே"} ,&nbsp;
                  {datas.Ayanam?datas.Ayanam.split("/")[1]:"தக்ஷிணாயணே"}, &nbsp;
                  {datas.Ruthou?datas.Ruthou.split("/")[1].trim().split(" ")[0]: ""} ,&nbsp;
                   {datas.Mase? datas.Mase.split("/")[1].trim().split(" ")[0]:""} மாஸே ,&nbsp;
                    {datas.Pakshe? datas.Pakshe.split("/")[1].trim().split(" ")[0]:""}&nbsp;
                 பக்ஷே,  {datas?.Tithi? datas?.Tithi.split("/")[3]: ""}  {datas?.Time?.split(" ")[1] === "AM" ? "( காலை " : ""}&nbsp;
                  {datas?.Time?.split(" ")[1] === "PM" ? "( மாலை " : ""}  &nbsp;
                   {datas?.Time ? datas?.Time?.split(" ")[0] + " வரை) பின்னர் " : ""}&nbsp;
                    {datas?.NextTithi? ` ${datas?.NextTithi?.split("/")[1].split(" ")[1]}`: ""} ,சுபதிதௌ &nbsp;
                    {datas?.Vasaram ? datas?.Vasaram?.split("/")[1].trim().split(" ")[0]: ""} &nbsp;
                 வாஸர யுக்தாயாம், {datas?.Nakshatram? datas?.Nakshatram?.split("/")[1].trim().split(' ')[0]: ""} &nbsp;
                   {datas.Time2 && datas.NextNakshatram && datas?.Time2.split(" ")[1] === "AM" ? "  (காலை " : ""} 
                    {datas?.Time2?.split(" ")[1] === "PM" ? " (மாலை " : ""} 
                    {datas?.NextNakshatram && datas?.Time2?` ${datas.Time2?.split(" ")[0]} வரை ) பின்னர் `: ""} 
                     {datas?.NextNakshatram?` ${datas?.NextNakshatram.split("/")[1].trim().split(" ")[0]}`: ''} நக்ஷத்ர &nbsp;
                  யுக்தாயாம், ஸ்ரீ விஷ்ணு யோக ஸ்ரீ விஷ்ணு கரண ஸுப யோக ஸுப கரண ஏவங்குன விசேஷண&nbsp;
                   விசிஷ்டாயாம் அஸ்யாம்  {datas?.Tithi? datas?.Tithi.split("/")[1].split(" ")[0]: ""} &nbsp;
                   {datas?.Time && datas?.NextTithi && datas?.Time?.split(" ")[1] === "AM" ? " ( காலை " : ""}&nbsp;
                   {datas?.Time?.split(" ")[1] === "PM" ? " ( மாலை" : ""}&nbsp;
                    {datas?.NextTithi? datas?.Time?.split(" ")[0] + " வரை ) பின்னர்" : ""}  &nbsp;
                     {datas?.NextTithi? datas?.NextTithi.split("/")[1].split(" ")[0]: ""}   சுபதிதௌ ....<br /><br />
                   {datas.Note2? datas.Note2.split("/")[0]:"சார்வரி நாம ஸம்வத்சரே"}, &nbsp;
                   {datas.Ayanam?datas.Ayanam.split("/")[0]:"தக்ஷிணாயணே"}  &nbsp;
                   {datas.Ruthou?datas.Ruthou.split("/")[0].trim().split(" ")[0]: ""}  Rithou&nbsp; 
                   {datas.Mase? datas.Mase.split("/")[0].trim().split(" ")[0]:""}&nbsp;
                    Mase {datas.Pakshe? datas.Pakshe.split("/")[0].trim().split(" ")[0]:""} Pakshe &nbsp;
                    {tithi? tithi?.split("/")[2]: ""} {datas?.Time ? `(upto ${datas?.Time} )  then `: " "}  &nbsp;
                    {datas?.NextTithi? datas?.NextTithi?.split("/")[0].split(" ")[0]: ""} subhathithou &nbsp; 
                    {datas.Vasaram ? datas.Vasaram.split("/")[0].trim().split(" ")[0]: ""} &nbsp;
                     vasara yukhtayām {datas.Nakshatram? datas?.Nakshatram?.split("/")[0].trim().split(' ')[0]: ""}&nbsp;
                 {datas?.NextNakshatram && datas?.Time2?`(upto ${datas.Time2} ) then`: ""} &nbsp;
                 {datas.NextNakshatram?datas.NextNakshatram.split("/")[0].trim().split(" ")[0]: ''} Nakshatra yukhtayām 
                 Sri Vishnu Yoga, Sri Vishnu Karana, Subha Yoga, Subha Karana Yevanguna Visheshana visishtayam asyam 
                 &nbsp;{tithi? tithi.split("/")[2]: ""} 
                 {datas?.NextTithi && datas.Time ? `(upto ${datas?.Time} ) then `: ""} {datas?.NextTithi? datas?.NextTithi?.split("/")[0].split(" ")[0]: ""} 
                 &nbsp; Subhatithou...
                 </p>

              </div>
        
        
    </div>
   </div>

   </div>
)
}

export default Mob