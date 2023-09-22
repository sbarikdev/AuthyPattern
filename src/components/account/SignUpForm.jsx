import React, {useState} from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { useNavigate } from "react-router-dom";

const SignUpForm = (props) => {
  // const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  const [credentials,setCredentials] = useState({country_code:"",mobile_number:"",password:""})
  let navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
       const {country_code,mobile_number,password} = credentials;
        const response = await fetch("http://localhost:8000/signup", {
            method: "POST", 
            headers: {
              'Content-Type': 'application/json'
              
            },
            body: JSON.stringify({country_code,mobile_number,password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            alert("Account Created Successfully!");
            //props.showAlert("Account Created Successfully" , "success");
            
          }
          else{
            alert("invalid details!");
            // props.showAlert("invalid details" , "danger");
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
      }
  return (
  <div className='container mt-2'>
    <h2>Creat an account to use This site</h2>
      <form onSubmit={handleSubmit}>
      <div className="my-3">
    <label htmlFor="country_code" className="form-label">country_code</label>
    <input type="text" className="form-control" id="country_code" name="country_code" onChange={onChange} maxLength={5} aria-describedby="emailHelp" required/>
  <div className="mb-3">
    </div>
    <label htmlFor="mobile_number" className="form-label">mobile_number/ email</label>
    <input type="mobile_number" className="form-control" id="mobile_number" name="mobile_number" onChange={onChange} minLength={5} aria-describedby="emailHelp" required/>
    <div id="mobile_number" className="form-text">We'll never share your mobile_number/ email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>

  </form>
  </div>
  );
};

export default compose(
  reduxForm({
    form: "signup",
  })
)(SignUpForm);
