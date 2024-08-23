// import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from "./components/form"

axios.defaults.baseURL="http://localhost:8080/"
function App() {

const [add,setAdd]=useState(false);
const [data,setData]=useState({
  name:"",
  email:"",
  mobile:"",
})
 

const [listData,setListData]=useState([]);

const handleChange=(e)=>{
  e.preventDefault();
  const {value,name}=e.target;
  setData((prev)=>{
    return{
      ...prev,
      [name]:value
  }
  })
}

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const data1=await axios.post("/create",data)
    console.log(data1);
    if(data1.data.success){
      setAdd(false);
      alert(data1.data.message);
      getData();
      setData({
        name:"",
        email:"",
        mobile:"",
      })
    }

  }
  const getData=async()=>{
    const data1=await axios.get("/");
    console.log(data1);
    if(data1.data.success){
      setListData(data1.data.data);
    }
  }


  useEffect(()=>{
    getData();
    
  },[])
  console.log(listData);

  const handleDelete=async(id)=>{
    const data1=await axios.delete("/delete/"+id);

    if (data1.data.message){
      getData();
      alert(data1.data.message);
    }
    
  }


 

 
  

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAdd(true)}>Add</button>

{
          add && (
            <Form
              handleChange={handleChange}
               handleSubmit = { handleSubmit }
                handleclose={()=>setAdd(false)}
                rest={data}
            />
          )
}


        
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                listData[0]?(
                listData.map((value)=>{
                  return(
                    <tr>
                      <td>{value.name}</td>
                      <td>{value.email}</td>
                      <td>{value.mobile}</td>
                      <td>
                        
                        <button className='btn btn-delete' onClick={() => { handleDelete(value._id)}}>Delete</button>
                      </td>
                    </tr>
                  )
                })):
                (
                  <p style={{textAlign:"center"}}>No data</p>
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
