import react from 'react';
import {useState,useEffect}from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
    useEffect(() => {
    localStorage.removeItem("token");
  }, []);
 
 const [form , setForm] = useState({
    email:"",
    password:""
  })
  
  var handleChange = (e)=>{
   var {name , value} = e.target;
   setForm((prev)=>({
    ...prev,
    [name]:value,
   }));
  }
 
  var handleSubmit = async (e) => {
    e.preventDefault();
   try {
   const response = await axios.post( "http://localhost:5000/api/check",form );
    setForm({
    email:"",
    password:""
    });
    alert("login successfully..!")
    localStorage.setItem("token", response.data.token);
    navigate("/user");

    
   } catch (error) {
    console.log("fetching error" , error);
        alert("Enter valid Email and Password! ")
       

   }
};

  return (
  <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-5">

            <div className="card shadow p-4 LoginCard">
                <h1 className="text-center mb-4">Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                   <input type="email"id="email"name="email" className="form-control"   placeholder="Enter Email" value={form.email}  onChange={handleChange}required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 login-button">
                        Login
                    </button>
                    <center>
                    <h4 onClick={()=>navigate("/register")}>
                        Register</h4>
                    </center>
                </form>

            </div>

        </div>
    </div>
</div>
  );
}
export default Login;
