import React, { useEffect, useState, Fragment } from 'react'
import { getAllData } from '../helper/AllHelp'
import { useParams } from 'react-router-dom'
import { AyanamCall, TithiCall } from '../helper/WayCall'
import Base from './Base'

const TextView = () => {
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
                if(res?.NextTithi && res?.NextTithi?.split(" ")[0] === t.split(" ")[0]){
                    setNtIndex(ind)
            setnextTithi(res?.NextTithi? TithiCall[ind]: "anand")
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
    <Base>
   <div className="container" id="textView">
       <div className="row">
           <div className="col-md-12" style={{fontSize:"0.6rem"}}>
*~~~~~~~~~~~~~~~~~~~~~*<br />
*‎பஞ்சாங்கம்/Panchangam*<br />
*~~~~~~~~~~~~~~~~~~~~~*<br />
{datas && datas.Dates && montharray[new Date(datas.Dates).getMonth()]},
{datas && datas.Dates && datas.Dates.split("-")[2]} -
{datas && datas.Day}      <br />

{datas && datas.Note2 && datas.Note2.split(" ")[0]}&nbsp; 
                   Year, {daksh && daksh.split("/")[0]},
                    {datas && datas.Ruthou && datas.Ruthou.split(" ")[0]} Rithou, &nbsp;
                   {datas && datas.Mase && datas.Mase.split(" ")[0]}&nbsp; Masam,
                    {datas && datas.TamilMonth && datas.TamilMonth.split("/")[0]}&nbsp; -&nbsp;
                   {datas && datas.TamilDate } <br />


                   {datas && datas.Note2 && (datas.Note2.split("/")[1]).split(" ")[0]} ௵, 
                    {daksh && daksh.split("/")[1]}, 
                    {datas && datas.Ruthou && (datas.Ruthou.split("/")[1])}
                     ,{datas && datas.Mase && datas.Mase.split("/")[1]},&nbsp;
                     {datas && datas.TamilMonth && datas.TamilMonth.split("/")[1]}&nbsp;
                      - &nbsp;
                      {datas && datas.TamilDate } <br />
    
*~~~~~~~~~~~~~~~~~~~~~*<br />
*TODAY'S EVENT*<br />
*~~~~~~~~~~~~~~~~~~~~~*<br />
Sradha Tithi /  ஸ்ராத்த  திதி : {datas && datas.SrardTithi?.split("/")[0]} /
                             {datas && datas.SrardTithi?.split("/")[1]}<br />
                    {datas && datas.Note1 && datas.Note1.split("|").map((ad)=>(
                            <Fragment>
                                {ad} <br />
                            </Fragment>
                          ))}
*~~~~~~~~~~~~~~~~~~~~~*<br />
*பக்ஷ - திதி*<br />
{datas?.Time?.split(" ")[1] === "AM" ? " (காலை" : ""} {datas?.Time?.split(" ")[1] === "PM"  ? "( மாலை" : ""}  
 { datas?.Time ? datas?.Time?.split(" ")[0] + " வரை) " : ""} 
                    {datas?.Pakshe && (datas?.Pakshe?.split("/")[1]?.split(" ")[1])} &nbsp;
                          {(datas?.Tithi?.split("/")[1])?.split(" ")[1] } &nbsp;                         
                          {datas?.NextTithi?.split(" ")[0] === 'Prathamai' ? 
                          (datas?.Pakshe?.split(" ")[0].toLowerCase()[0]==='s' ? 
                          " பின்னர் க்ருஷ்ண ":" பின்னர் சுக்ல ") : " பின்னர் "}
                           {` ${ datas?.NextTithi?.split("/")[1]?.split(" ")[1]}`}&nbsp;<br />  
*~~~~~~~~~~~~~~~~~~~~~*<br />
*Paksha - Tithi*<br />
 {datas && datas.Pakshe && datas.Pakshe.split(" ")[0] } &nbsp;
                               {datas && datas.Tithi && datas.Tithi.split(" ")[0] } &nbsp;
                               {datas && `(upto ${datas.Time}`} &nbsp;
                               {datas && datas.NextTithi && ") then"}&nbsp;
                               {datas?.NextTithi?.split(" ")[0] === 'Prathamai' ? (datas?.Pakshe?.split(" ")[0].toLowerCase()[0]==='s') ?"Krishna ":"Shukla ":""}   
                               {datas && datas.NextTithi && datas.NextTithi.split(" ")[0] }&nbsp;<br />
*~~~~~~~~~~~~~~~~~~~~~*<br />
*நக்ஷத்திரம்*<br />
 {datas?.Time2?.split(" ")[1] === "AM" ? "( காலை " : ""} {datas?.Time2?.split(" ")[1] === "PM" ? "( மாலை " : ""}
                     {datas?.Time2 ? datas?.Time2?.split(" ")[0] + " வரை )  " : "" } &nbsp;
                          {datas && datas.Nakshatram && (datas.Nakshatram.split("/")[1]).split(" ")[1] }&nbsp; 
                 {datas && datas.NextNakshatram && `பின்னர் ${datas.NextNakshatram.split("/")[1].split(" ")[1]}`}&nbsp;
  <br />
  *~~~~~~~~~~~~~~~~~~~~~*<br />
  *Nakshatram*<br />
 {datas && datas.Nakshatram && (datas.Nakshatram.split(" ")[0])}&nbsp;
                          &nbsp; {datas && datas.Time2 && `(upto ${datas.Time2.split(" ")[0]}`}&nbsp;
                          {datas && datas.NextNakshatram && ") then"}&nbsp;
                          {datas && datas.NextNakshatram && (`${datas.NextNakshatram.split(" ")[0]}`)}&nbsp;<br />    
 *~~~~~~~~~~~~~~~~~~~~~*<br />      
 *Raghu Kaalam/ராகு காலம்*<br />
 {datas && datas.RaghuKalam}<br />
*Yemakandam/எமகண்டம்*<br />
{datas && datas.Yemakandam}<br />
*Kuligai/குளிகை*<br />
{datas && datas.kuligai}<br />
*Yogam/யோகம்*<br />
{datas && datas.Yogam}<br />
*Chandrashtamam/சந்த்ராஷ்டமம்*<br />
{datas && datas.Chandrashtamam}<br />
{datas && datas.NextChandrashtamam}<br />
*Nalla Neram/நல்ல நேரம்*<br />
{datas && datas.NallaNeram}<br />
{datas && datas.PM}<br />
*Sunrise / சூர்யோதயம்*<br />
{datas && datas.Sunrise}<br />
*Sunset / அஸ்தமனம்*<br />
{datas && datas.Sunset}<br />
*Next Day Sradha Tithi* <br />*அடுத்த நாள் ஸ்ராத்த  திதி*<br />
{datas && datas.TableTithi?.split("/")[0]} <br /> 
{datas && datas.TableTithi?.split("/")[1]}<br />
*~~~~~~~~~~~~~~~~~~~~~*<br />      
*NEXT DAY EVENT*<br />
<strong>{additionalInfoState?.split(",").map((tr)=>(
                             <Fragment>
                                 {tr} <br />
                             </Fragment>
                          ))} </strong>
*~~~~~~~~~~~~~~~~~~~~~*<br />      
{datas && datas.AdditionalInfo && datas.AdditionalInfo.split("|").map((ad)=>(
                            <Fragment>
                                {ad} <br />
                            </Fragment>
                          ))}
*~~~~~~~~~~~~~~~~~~~~~*<br />      
<p style={{lineHeight:"18px"}}>*
                 {datas.Note2? datas.Note2.split("/")[1]:"சார்வரி நாம ஸம்வத்ஸரே"} ,&nbsp;
                  {datas.Ayanam?datas.Ayanam.split("/")[1]:"தக்ஷிணாயணே"}, &nbsp;
                  {datas.Ruthou?datas.Ruthou.split("/")[1]?.trim()?.split(" ")[0]: ""} ,&nbsp;
                   {datas.Mase? datas.Mase.split("/")[1].trim().split(" ")[0]:""} மாஸே ,&nbsp;
                    {datas.Pakshe? datas.Pakshe.split("/")[1].trim().split(" ")[0]:""}&nbsp;
                 பக்ஷே,  {tithi? tithi.split("/")[3]: ""}  {datas?.Time?.split(" ")[1] === "AM" ? "( காலை " : ""}&nbsp;
                  {datas?.Time?.split(" ")[1] === "PM" ? "( மாலை " : ""}  &nbsp;
                   {datas?.Time ? datas?.Time?.split(" ")[0] + " வரை) பின்னர் " : ""}&nbsp;
                   {nextTithi? nextTithi?.split("/")[3]:""} ,சுபதிதௌ &nbsp;
                    {datas?.Vasaram ? datas?.Vasaram?.split("/")[1]?.trim()?.split(" ")[0]: ""} &nbsp;
                 வாஸர யுக்தாயாம், {datas?.Nakshatram? datas?.Nakshatram?.split("/")[1].trim().split(' ')[0]: ""} &nbsp;
                   {datas.Time2 && datas.NextNakshatram && datas?.Time2.split(" ")[1] === "AM" ? "  (காலை " : ""} 
                    {datas?.Time2?.split(" ")[1] === "PM" ? " (மாலை " : ""} 
                    {datas?.NextNakshatram && datas?.Time2?` ${datas.Time2?.split(" ")[0]} வரை ) பின்னர் `: ""} 
                     {datas?.NextNakshatram?` ${datas?.NextNakshatram.split("/")[1]?.trim()?.split(" ")[0]}`: ''} நக்ஷத்ர &nbsp;
                  யுக்தாயாம், ஸ்ரீ விஷ்ணு யோக ஸ்ரீ விஷ்ணு கரண ஸுப யோக ஸுப கரண ஏவங்குன விசேஷண&nbsp;
                   விசிஷ்டாயாம் அஸ்யாம்   {tithi? tithi.split("/")[3]: ""}  &nbsp;
                   {datas?.Time && datas?.NextTithi && datas?.Time?.split(" ")[1] === "AM" ? " ( காலை " : ""}&nbsp;
                   {datas?.Time?.split(" ")[1] === "PM" ? " ( மாலை" : ""}&nbsp;
                    {datas?.NextTithi? datas?.Time?.split(" ")[0] + " வரை ) பின்னர்" : ""}  &nbsp;
                    {nextTithi? nextTithi?.split("/")[3]:""}  சுபதிதௌ ....*<br /><br />*
                   {datas.Note2? datas.Note2.split("/")[0]:"சார்வரி நாம ஸம்வத்சரே"}, &nbsp;
                   {datas.Ayanam?datas.Ayanam.split("/")[0]:"தக்ஷிணாயணே"}  &nbsp;
                   {datas.Ruthou?datas.Ruthou.split("/")[0].trim().split(" ")[0]: ""}  Rithou&nbsp; 
                   {datas.Mase? datas.Mase.split("/")[0]?.trim()?.split(" ")[0]:""}&nbsp;
                    Mase {datas.Pakshe? datas.Pakshe.split("/")[0]?.trim()?.split(" ")[0]:""} Pakshe &nbsp;
                    {tithi? tithi?.split("/")[2]: ""} {datas?.Time ? `(upto ${datas?.Time} )  then `: " "}  &nbsp;
                    {nextTithi? nextTithi?.split("/")[2]:""} subhathithou &nbsp; 
                    {datas.Vasaram ? datas.Vasaram.split("/")[0]?.trim()?.split(" ")[0]: ""} &nbsp;
                     vasara yukhtayām {datas.Nakshatram? datas?.Nakshatram?.split("/")[0]?.trim()?.split(' ')[0]: ""}&nbsp;
                 {datas?.NextNakshatram && datas?.Time2?`(upto ${datas.Time2} ) then `: ""} 
                 {datas.NextNakshatram?datas.NextNakshatram.split("/")[0]?.trim()?.split(" ")[0]: ''} Nakshatra yukhtayām 
                 Sri Vishnu Yoga, Sri Vishnu Karana, Subha Yoga, Subha Karana Yevanguna Visheshana visishtayam asyam 
                 &nbsp;{tithi? tithi.split("/")[2]: ""} 
                 {datas?.NextTithi && datas.Time ? `(upto ${datas?.Time} ) then `: ""} {nextTithi? nextTithi?.split("/")[2]:""} 
                 &nbsp; Subhatithou...*
                 </p>
                 *~~~~~~~~~~~~~~~~~~~~~*<br />      

                                          </div>
       </div>
   </div>
   </Base>
)
}

export default TextView