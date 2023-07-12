const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Card from "./Card";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";

const initialState = {
    email: "",
    password: "",
    password2: "",
  };

  const indicator = {
    display: "flex", 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    fontSize: '12px'
  }

const Register = ({setIsLoginModalOpen, setIsSignupModalOpen}) => {
    const [signupData, setSignUpData] = useState(initialState);
    const { email, password, password2 } = signupData;

    const [uCase, setUCase] = useState(false);
    const [num, setNum] = useState(false);
    const [sChar, setSChar] = useState(false);
    const [passLength, setPassLength] = useState(false);

    const timesIcon = <FaTimes color="red" size={15} />;
    const checkIcon = <BsCheck2All color="green" size={15} />;
  
    const switchIcon = (condition) => {
      if (condition) {
        return checkIcon;
      }
      return timesIcon;
    };

    useEffect(() => {
        // Check Lower and Uppercase
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
          setUCase(true);
        } else {
          setUCase(false);
        }
        // Check for numbers
        if (password.match(/([0-9])/)) {
          setNum(true);
        } else {
          setNum(false);
        }
        // Check for special character
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
          setSChar(true);
        } else {
          setSChar(false);
        }
        // Check for PASSWORD LENGTH
        if (password.length > 5) {
          setPassLength(true);
        } else {
          setPassLength(false);
        }
      }, [password]);
     
  const handleSignUp = (e) => {
    setSignUpData((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
     // Sign Up function
  const handleSignupSubmit = async(e) => {
    e.preventDefault();
    if (!email || !password) {
        return toast.error("All fields are required", {theme: 'dark'});
      }
      if (password.length < 6) {
        return toast.error("Password must be up to 6 characters", {theme: 'dark'});
      }
      if (!email.match(validate)) {
        return toast.error("Please enter a valid email", {theme: 'dark'});
      }
      if (password !== password2) {
        return toast.success("Passwords do not match", {theme: 'dark'});
      }
    // Handle signup form submission
    try {
      // const res = await axios.post("https://artboardz.net/api/register")
      const res = await axios.post('http://localhost:3000/api/register', signupData);
      // await axios.post("http://localhost:3000/api/verification");
      setIsSignupModalOpen(false)
      setIsLoginModalOpen(true);
      toast.success("Registration successful", {theme: 'dark'})
    }catch(err) {
      console.log(err)
      toast.error("Something went wrong", {theme: 'dark'})
    }
  };

    return (
        <div className="bg-[#011335] rounded p-8 max-w-md mt-36 mx-auto text-white h-[450px]">
          <h2 className="text-lg font-semibold mb-4 text-center">Create an Account</h2>
            {/* Signup form goes here */}
            <form onSubmit={handleSignupSubmit}>
              {/* Signup form fields */}
              <div className="flex gap-2 flex-col w-full">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleSignUp}
                // onChange={(e) => setName(e.target.value)}
                className="bg-[#011335] border  px-3 border-white rounded h-10 focus:outline-blue-500"
              />
            </div>
      
            <div className="flex gap-2 flex-col w-full mt-2">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleSignUp}
                className="bg-[#011335] px-3 border border-white rounded h-10 focus:outline-blue-500"
              />
            </div>
            <div className="flex gap-2 flex-col w-full mt-2">
              <label htmlFor="password">Repeat Password:</label>
              <input
                type="password"
                id="repeatPassword"
                name="password2"
                onChange={handleSignUp}
                onPaste={(e) => {
                  e.preventDefault();
                  toast.error("Cannot paste into input field");
                  return false;
                }}
                className="bg-[#011335] border border-white rounded h-10 focus:outline-blue-500"
              />
              </div>
              
            {/* Password Strength */}
            <Card >
              <ul className="form-list">
                <li>
                  <span style={indicator}>
                    {switchIcon(uCase)}
                    &nbsp; Lowercase & Uppercase
                  </span>
                </li>
                <li>
                  <span style={indicator}>
                    {switchIcon(num)}
                    &nbsp; Number (0-9)
                  </span>
                </li>
                <li>
                  <span style={indicator}>
                    {switchIcon(sChar)}
                    &nbsp; Special Character (!@#$%^&*)
                  </span>
                </li>
                <li>
                  <span style={indicator}>
                    {switchIcon(passLength)}
                    &nbsp; At least 6 Character
                  </span>
                </li>
              </ul>
            </Card>
          <div className="grid grid-cols-2 gap-4 mt-4">
              <button  className="w-full m-auto h-[35px] px-2 bg-transparent border border-1 border-white text-white rounded rounded-lg hover:bg-[#6E028F]" type="button" onClick={() => setIsSignupModalOpen(false)}>
                Cancel
              </button>
              <button 
              className="w-full m-auto  px-2 h-[35px] bg-[#6E028F] border border-1 border-white text-white rounded rounded-md hover:bg-transparent" 
              type="submit">Create</button>
              </div>
            </form>
          </div>
    )
}

export default Register;