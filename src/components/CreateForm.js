import React, { useState } from 'react';
import axios from 'axios'
import './CreateForm.css'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';


const CreateForm = () => {
  const [formTitle, setFormTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();
  const alert = useAlert();

  const handleInputChange = (index, key, value) => {
    const newInputs = [...inputs];
    newInputs[index][key] = value;
    setInputs(newInputs);
  };

  const handleAddInput = (e) => {
    if (inputs.length !== 20) {
      (setInputs([...inputs, { type: e.target.id, title: '', placeholder: '' }]));
     }
     else{
        alert.error("Reached Max limit of Inputs")
     }
  };

  const handleDeleteInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const saveForm = () => {

      // Validate input titles
    const isTitleEmpty = inputs.some((input) => input.title.trim() === '');

    if (isTitleEmpty || formTitle.trim()==="") {
      alert.error(<div className='alert'>Title cannot be empty!!</div>)
      return; // Do not proceed with form submission
    }
    if(inputs.length==0){
      alert.error(<div className='alert'>Form requires an Input field</div>)
      return; 
    }

    const formData = {
      title: formTitle,
      inputs: inputs,
    };
    axios.post("http://localhost:4000/api/v1/form/create" ,formData)
    .then(res => {alert.success(<div className='alert'>Form Created Successfully</div>); navigate('/')})
    .catch(err => alert.error(<div className='alert'>{err.message}</div>))
  }

  return (
    <div className='createform-container'>

      <div className='createform-header'><h1>Create Form</h1></div>

      <div className='createform-main'>
        <label htmlFor="formTitle"><h2>Form Title:</h2></label>
        <input className='cf-input'
          style={{fontSize:'20px' ,fontWeight:'bold', textAlign:'center'}}
          type="text"
          id="formTitle"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
        />

        <h2>Form Inputs:</h2>
        {inputs.map((input, index) => (
          <div key={index}>
            <label htmlFor={`type${index}`}>Type:</label>
            <input className='cf-input'
              type="text"
              id={`type${index}`}
              value={input.type}
              onChange={(e) => handleInputChange(index, 'type', e.target.value)}
              readOnly
            />

            <label htmlFor={`title${index}`}>Title:</label>
            <input className='cf-input'
              type="text"
              id={`title${index}`}
              value={input.title}
              onChange={(e) => handleInputChange(index, 'title', e.target.value)}
            />

            <label htmlFor={`placeholder${index}`}>Placeholder:</label>
            <input className='cf-input'
              type="text"
              id={`placeholder${index}`}
              value={input.placeholder}
              onChange={(e) => handleInputChange(index, 'placeholder', e.target.value)}
            />

            <button className='dlt-btn' type="button" onClick={() => handleDeleteInput(index)}>
              Delete
            </button>
          </div>
        ))}
      

        <div className='cf-types'>
          <button className='cf-type-btn' type="button" id="text" onClick={handleAddInput}>Text</button>
          <button className='cf-type-btn' type="button" id="email" onClick={handleAddInput}>Email</button>
          <button className='cf-type-btn' type="button" id="number" onClick={handleAddInput}>Number</button>
          <button className='cf-type-btn' type="button" id="password" onClick={handleAddInput}>Password</button>
          <button className='cf-type-btn' type="button" id="date" onClick={handleAddInput}>Date</button>
        </div>

        <button className='submit-btn' type="submit" onClick={saveForm}>Create Form</button>
      </div>
    </div>
  );
}

export default CreateForm;