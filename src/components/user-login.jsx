import { TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


export function LoginUser(){

    const [users , setUsers] = useState([]);
    const [cookie , setcookie , removecookie] = useCookies("userid")
    const navigate = useNavigate();

    useEffect (() =>{
        axios.get("http://127.0.0.1:9146/Users")
        .then( response =>{
            setUsers(response.data)
        })
    },[])

    const fomik = useFormik ({
        initialValues:{
            UserId:'',
            Password:''
        },
        onSubmit: (formdata) =>{
            var userdetails = users.find(user => user.UserId===formdata.UserId)
            if(formdata.UserId === ""){
               
            }
            else{
                if(userdetails.Password === formdata.Password){
                    setcookie('userid',formdata.UserId);
                    navigate("/dashbord");  
                    window.location.reload();
                }
                else{
                    alert("invalide")
                }
            }
        }
    })
    return(
        <div  className="d-flex justify-content-center align-content-center mt-4">
           <form id="registerlogin" className="d-flex justify-content-center" onSubmit={fomik.handleSubmit}>
                <dl className="w-100 p-3">
                <h1 className="text-center uh1">User Login</h1>
                    <hr />
                    <dt>User Id</dt>
                    <dd><TextField id="standard-basic"  name="UserId" onChange={fomik.handleChange}    type="text"   className="w-100" label="Enter userid" variant="standard" /></dd>
                    <dt>Password</dt>
                    <dd><TextField id="standard-basic"  name="Password" onChange={fomik.handleChange}   type="password"  className="w-100" label="Enter password" variant="standard" /></dd>
                    <button type="submit" className="btn btn-outline-success mt-2 w-100"><b>Login</b></button>
                </dl>  
           </form>
        </div>
    )
}