import './App.css';
import React from "react";

import PostView from './components/post-view/post-view';
import Landing_page from './components/landingPage';
import Form from './components/postForm.js/postForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing_page />} />
          <Route path='/feeds' element={[<PostView />]} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App