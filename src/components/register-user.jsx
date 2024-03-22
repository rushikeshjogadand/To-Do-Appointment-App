import {  TextField } from "@mui/material"
import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import   * as yup from "yup";



export function RegisterUser (){
    let navigate = useNavigate();
    const [users, setUsers] = useState([{UserId:'', UserName:'', Password:'', Mobile:'', Email:''}]);
    const [userError, setUserError] = useState('');

    useEffect (() =>{
        axios.get("http://127.0.0.1:9146/Users")
        .then( response =>{
            setUsers(response.data)
        })
    },[])

    const formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Password:'',
            Mobile:'',
            Email:''
        },
        validationSchema:yup.object({UserId:yup.string(),UserName:yup.string().min(4,"Name too Short")}),
      
        onSubmit: (formData) =>{
            axios.post("http://127.0.0.1:9146/register-user",formData);
            alert("Register Successfully...")
            navigate("/login")
         
        }
    })

    function verifyuser(e){
            for( var user of users){
                if(user.UserId === e.target.value){
                    setUserError("User Id Taken - Try Another");
                   break;
                }else {
                    setUserError("User Id Available");
                 }
            }
    }

    return (
        <div  className="d-flex justify-content-center align-content-center mt-4">
           <form id="userlogin" className="d-flex justify-content-center " onSubmit={formik.handleSubmit}>
        
                <dl className="w-100 p-3">
                <h1 className="text-center rh1">Register User</h1>
                <hr />
                    <dt>User Id</dt>
                    <dd><TextField id="standard-basic"  name="UserId" required   type="text" onKeyUp={verifyuser}   onChange={formik.handleChange}  className="w-100" label="Enter user id" variant="standard" /></dd>
                    <span className="text-danger">{formik.errors.UserId}</span>
                    <dd>{userError}</dd>
                    <dt>Full  Name</dt>
                    <dd><TextField id="standard-basic" name="UserName"   required type="text"  onChange={formik.handleChange}  className="w-100" label="Enter Name" variant="standard" /></dd>
                    <span className="text-danger">{formik.errors.UserName}</span>
                    <dt>Password</dt>
                    <dd><TextField id="standard-basic"  name="Password" required  type="password"  onChange={formik.handleChange}  className="w-100" label="Enter password" variant="standard" /></dd>
                    <span className="text-danger">{formik.errors.Password}</span>
                    <dt>Mobile No</dt>
                    <dd><TextField id="standard-basic"     type="number" name="Mobile" required   onChange={formik.handleChange}  className="w-100" label="Enter mobile no" variant="standard" /></dd>
                    <span className="text-danger">{formik.errors.Mobile}</span>
                    <dt>Email Id</dt>
                    <dd><TextField id="standard-basic"  name="Email" required  type="email"  onChange={formik.handleChange}  className="w-100" label="Enter email " variant="standard" /></dd>

                    <button type="submit" className="btn btn-outline-primary mt-2 w-100">Register</button>
                </dl>
               
           </form>
        </div>
    )
}