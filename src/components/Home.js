import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TiPlus } from "react-icons/ti";
import { FaEye } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FcAnswers } from "react-icons/fc";
import './Home.css'
import { useAlert } from 'react-alert';

const Home = () => {

  const [forms, setforms] = useState([])
  const alert = useAlert();

  useEffect(() => {
    
    axios.get("http://localhost:4000/api/v1/forms")
    .then(res => setforms(res.data.forms))
    .catch(err =>  alert.error(<div className='alert'>{err.message}</div>))

  }, [])

  const handleDelete=(id)=>{

    axios.delete(`http://localhost:4000/api/v1/form/${id}`)
    .then(res => {
      setforms(prevForms => prevForms.filter(form => form._id !== id));
      alert.success(<div className='alert'>Form Deleted Successfully</div>)
    })
    .catch(err => alert.error(<div className='alert'>{err.message}</div>))
  }
  
  return (
    <div className='home-container'>
      <div className='home-header'><h1>Home</h1></div>

      <Link style={{textDecoration:'none', alignSelf: 'flex-start'}} to="/form/create">
        <div className='create-form'>
          <TiPlus/><span style={{color: 'rgba(0, 0, 0, 0.650)'}}>Create Form</span>
        </div>
      </Link>

    <div className="home-forms">
      {forms.length===0 ? (
      <div> 
        <FcAnswers style={{fontSize:"200px"}}/>
        <div style={{fontSize:"25px", textAlign:'center'}}>No Forms Found!</div> 
      </div>) : (
      
        forms.map((form) => (
            <div className="form-card" key={form._id}>
                <h2 style={{textTransform:"capitalize"}}>{form.title}</h2>
                <div className='home-card-buttons'>
                  <Link to={`/form/${form._id}`}><button className='home-button'><FaEye/>&nbsp;view&nbsp;</button></Link>
                  <Link to={`/form/${form._id}/edit`}><button className='home-button'><FaEdit />&nbsp;edit&nbsp;&nbsp;</button></Link>
                  <button className='home-button' onClick={()=>handleDelete(form._id)}><MdDeleteForever/>delete</button>
                </div>
            </div>
          )))
        }

    </div>
      

      
    </div>
  );
}

export default Home;
