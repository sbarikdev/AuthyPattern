import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
// import renderFormGroupField from "../../helpers/renderFormGroupField";
// import {
//   required,
//   maxLength20,
//   minLength8,
//   maxLengthMobileNo,
//   minLengthMobileNo,
//   digit,
// } from "../../helpers/validation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTwitter,
//   faFacebookF,
//   faGoogle,
// } from "@fortawesome/free-brands-svg-icons";
// import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
// import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";

const SignInForm = (props) => {
  // const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  const [credentials,setCredentials] = useState({mobile_number:"",password:""})
  let navigate = useNavigate();
  
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:8000/login", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({mobile_number:credentials.mobile_number,password:credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            // props.showAlert("Logged in Successfully" , "success");
            navigate("/");
            alert("Logged In Successful!");
            
          }
          else{
            var error = document.getElementById("error")
            console.log('error---->',error)
            alert("invalid credentials");
            // props.showAlert("invalid credentials" , "danger");
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }
  return (

  <form onSubmit={handleSubmit}>
    <div className="my-3">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" value={credentials.mobile_number} onChange={onChange} id="mobile_number" name="mobile_number" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
    </div>
    <button type="submit" className="btn btn-primary" >Submit</button>
  </form>

  );
};

export default compose(
  reduxForm({
    form: "signin",
  })
)(SignInForm);
