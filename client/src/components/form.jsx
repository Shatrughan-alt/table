import React from 'react';
import "../App.css";
import { MdClose } from "react-icons/md";
export default function Form({handleChange,handleSubmit,handleclose,rest}) {
  return (
      <div className="addContainer">
          <form action="" onSubmit={handleSubmit}>
              <div className="close-btn" onClick={handleclose} ><MdClose /></div>
              <label htmlFor='name'>Name : </label>
              <input type="text" id="name" name='name' onChange={handleChange} value={rest.name} />
              <label htmlFor='email'>Email : </label>
              <input type="email" id="email" name='email' onChange={handleChange} value={rest.email} />
              <label htmlFor='mobile'>Mobile : </label>
              <input type="number" id="mobile" name='mobile' onChange={handleChange} value={rest.mobile} />
              <button className='btn'>Submit</button>
          </form>
      </div>
  )
}
