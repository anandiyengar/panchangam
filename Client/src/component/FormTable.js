import React, { useState, useEffect, useMemo, Fragment} from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import Base from '../layout/Base';
import { getALlUserForms, removeForm, downloadForm } from '../helper/AllHelp';
import { FaDownload, FaEdit, FaTrash } from 'react-icons/fa'
import "../App.css"
const FormList = () => {
    const TextField = styled.input`
        height: 32px;
        width: 200px;
        border-radius: 3px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #e5e5e5;
        padding: 0 32px 0 16px;

        &:hover {
        cursor: pointer;
        }
        `;
const [data,setData] = useState([])
const [error,setError] = useState(false)
const [reload, setReload] = useState(false)
const [loading, setLoading] = useState(false)

useEffect(()=>{
    getALlUserForms()
    .then(
        res => {
            if(res.error){
                setError(res.error)
            }
            else{
                return setData(res)
            }
        }
    )
    .catch(err => console.log(err))
},[reload])
const [img,setImg] = useState(false)
const downloadLogic = (id) => {
  setLoading(true)
  downloadForm(id)
  .then((result)=>{
    setImg(id)
  }).catch((err)=>{
    console.log(err)
  })
}

const goHere = (id) =>{
  return <Redirect to={`/download/${id}`} />
}


const FilterComponent = ({ filterText, onFilter, onClear }) => (
<>
  <TextField style={{position:"relative"}} id="search" type="text" placeholder="Filter By Dates" value={filterText} onChange={onFilter} autoFocus/>
  <button type="button" className = "btn-danger" onClick={onClear} >X</button>
</>
);

const columns = [

{
  name: 'Date',
  selector: 'Dates',
  sortable: true,
},
{
    name: 'T Month',
    selector: 'TamilMonth',
    sortable: true,
  },
  {        cell: row => (
    <Link id = {row._id} className = "btn btn-dark btn-sm fr text-center text-white" to = {`/text/${row._id}`}>
    Text
  </Link>)
  ,
button:true,},{ cell: row => (
    <button id = {row._id} onClick = {() => downloadLogic(row._id)} className = "btn fr btn-success btn-sm text-center text-white">
    <FaDownload />
  </button>),
button:true,},{
  cell: row => (
<Link id = {row._id} className = "btn btn-info btn-sm fr text-center text-white" to = {`/form/edit/${row._id}`}>
    <FaEdit />
  </Link> )
  ,
  button:true,},{
    cell: row => (
  <button id = {row._id} onClick = {() => removeForm(row._id).then((res)=>{
  setReload(!reload)
})} className = "btn btn-danger btn-sm fr text-center text-white">
  <FaTrash />

</button>
),
button:true,},

{
    name: '',
    selector: '_id',
    sortable: true,
    right:false,
    style:{
        color:"white",
        width:"10px"
    }
  },
];




const [filterText, setFilterText] = useState('');
const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
const filteredItems = data.filter(item => item.Dates && item.Dates.toLowerCase().includes(filterText.toLowerCase()));

const subHeaderComponentMemo = useMemo(() => {
const handleClear = () => {
if (filterText) {
  setResetPaginationToggle(!resetPaginationToggle);
  setFilterText('');
}
};



return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
}, [filterText, resetPaginationToggle]);


return(
    
    <Base>
    {img && (
      <Redirect to={`/download/${img}`} />
      
    )}
     {loading && (
        <div className="text-center loaddiv">
      <img src="/loading.gif" alt="ttt" className="text-center loadimg" style={{width:"150px",borderRadius:"30%"}} />
      </div>
    )}
    
           <Fragment id = "forms">
<DataTable
        title="Submitted Forms"
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
      />
     
    
            </Fragment>
    </Base>
)
}

export default FormList