import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes , Route } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const token = localStorage.getItem('token')
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes >
      <Route path="/" element={<App/>} />  
      {/* <Route path="*" element={'404'}/>   */}
      </Routes>
    </BrowserRouter>
    {/* reportWebVitals(console.log); */}
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

