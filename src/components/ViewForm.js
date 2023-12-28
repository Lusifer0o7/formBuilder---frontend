import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ViewForm.css'
import { useAlert } from 'react-alert';

export default function ViewForm() {

  const {id} = useParams();
  const [form, setForm] = useState();
  const alert = useAlert();

  useEffect(() => {

    axios.get(`http://localhost:4000/api/v1/form/${id}`)
    .then((res)=>{
      setForm(res.data.form)
    }).catch((err) =>{
      alert.error(<div className='alert'>{err.message}</div>)
    })
  },[])
  

  return (
    <div className='view-container'>
      <div className='view-header'><h1>View Form Details</h1></div>
    
      <div className='view-form'>
          <div className='view-form-title'>{form? (form.title):""}</div>

          <div style={{display:'grid',gridTemplateColumns:'auto auto' }}>
          {form? (form.inputs.map((input)=>(
              <div 
              style={{display:'grid',gridTemplateColumns:'auto auto' ,alignItems:"center", justifyContent:'space-between'}} 
              key={input._id}>

              <label style={{textTransform: 'capitalize'}} htmlFor={input._id}>{input.title} :</label>

              <input className="view-form-inputs" 
              type={input.type} 
              id={input._id}
              name={input.title} 
              placeholder={input.placeholder}/>
              </div>
            ))) : ""
          }
          </div>
      <Link to={`/`}><button className='submit-btn' >Done</button></Link>
      </div>
    </div>
  )
}
