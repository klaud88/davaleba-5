import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';




const Smartphones = ()=> {

    const dataURL = 'https://api.vendoo.ge/api/beta/catalog?&url=technics%2Ftelefonebi%2Fmobiluri-telefonebi&sort=popular&sortDir=desc&page=1&hasDiscount=1' //სერვერის ლინკი
   
    const [data, setData]=useState([]); //დატა სერვერიდან
    const [search, setSearch]=useState(''); // INPUT ველი
    const [searchedData, setSearchedData]=useState([]); //გაფილტრული მონაცემები
    const [sort, setSort]=useState('Sort') // სორტირება
   
useEffect(()=>{
        axios.get(`${dataURL}`)
        .then((response)=>{
        setData(response.data.products)
        })
},[]);

const searching =(e)=>{
    setSearch(e.target.value)
}
//ფილტრი
const found = data.filter((data)=> 
data.name.toLowerCase().includes(search))

const handle =()=>{
    setSearchedData(found)
}
//სორტირება
const sortMethod = {
    Sort: {method: (a,b)=> null},
    Ascending: {method: (a,b)=> a.final_price > b.final_price ? 1 : -1},
    Descending: {method: (a,b)=> a.final_price > b.final_price ? -1 : 1},
    AZ: {method: (a,b)=> a.name > b.name ? 1 : -1},
    ZA: {method: (a,b)=> a.name > b.name ? -1 : 1}
}

const handleSort =(e)=> {
    setSort(e.target.value)
}

    return (
        <>
        <h3>მაღაზიაშია Apple, Alcatel და POVA სმარტფონები </h3>
<input onChange={searching}/>
<button className='btn' onClick={handle}>Search</button>
{/* სორტირება */}
<select onChange={handleSort} defaultValue={"AZ"}> 
    <option value="Ascending">ფასი ზრდადი</option>
    <option value="Descending">ფასი კლებადი</option>
    <option value="AZ">A-Z</option>
    <option value="ZA">Z-A</option>
</select>
<div className='ph'>{searchedData.sort(sortMethod[sort].method)
.map((data, index)=> <div className='phs'> <p className='phone' key={index}>
    <img width={"180"}  src={data.thumb_img.files.file}/>
<br/>
ძველი ფასი: <span style={{textDecoration: "line-through"}}>{data.original_price}</span>
<br/>
ახალი ფასი {data.final_price}
<br/>
{data.name}<br/>
<br/>
</p>
</div> )}
</div>
        </>
    )
}
export default Smartphones