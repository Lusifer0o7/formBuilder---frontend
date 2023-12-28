import React from 'react';
import {Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './components/Home';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditForm';
import ViewForm from './components/ViewForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/form/create" exact element={<CreateForm/>} />
        <Route path="/form/:id/edit" exact element={<EditForm/>} />
        <Route path="/form/:id" exact element={<ViewForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
