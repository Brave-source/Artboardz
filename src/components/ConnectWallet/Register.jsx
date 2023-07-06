const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// import { FaTimes } from "react-icons/fa";
// import { BsCheck2All } from "react-icons/bs";

const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

const Register = ({setIsLoginModalOpen, setIsSignupModalOpen}) => {
    const [signupData, setSignUpData] = useState(initialState);
    const { email, password, password2 } = signupData;

    const [uCase, setUCase] = useState(false);
    const [num, setNum] = useState(false);
    const [sChar, setSChar] = useState(false);
    const [passLength, setPassLength] = useState(false);

    // const timesIcon = <FaTimes color="red" size={15} />;
    // const checkIcon = <BsCheck2All color="green" size={15} />;
  
    // const switchIcon = (condition) => {
    //   if (condition) {
    //     return checkIcon;
    //   }
    //   return timesIcon;
    // };

    // useEffect(() => {
    //     // Check Lower and Uppercase
    //     if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    //       setUCase(true);
    //     } else {
    //       setUCase(false);
    //     }
    //     // Check for numbers
    //     if (password.match(/([0-9])/)) {
    //       setNum(true);
    //     } else {
    //       setNum(false);
    //     }
    //     // Check for special character
    //     if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    //       setSChar(true);
    //     } else {
    //       setSChar(false);
    //     }
    //     // Check for PASSWORD LENGTH
    //     if (password.length > 5) {
    //       setPassLength(true);
    //     } else {
    //       setPassLength(false);
    //     }
    //   }, [password]);
     
  const handleSignUp = (e) => {
    setSignUpData((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }
     // Sign Up function
  const handleSignupSubmit = async(e) => {
    e.preventDefault();
    // if (!email || !password) {
    //     return toast.error("All fields are required");
    //   }
    //   if (password.length < 6) {
    //     return toast.error("Password must be up to 6 characters");
    //   }
    //   if (!email.match(validate)) {
    //     return toast.error("Please enter a valid email");
    //   }
    //   if (password !== password2) {
    //     return toast.error("Passwords do not match");
    //   }
    // Handle signup form submission
    try {
      const res = await axios.post('http://localhost:3000/api/login', signupData);
      // await axios.post("http://localhost:3000/api/verification");
      console.log(res.data)
      setIsSignupModalOpen(false)
      setIsLoginModalOpen(true);
      toast.success("Email sent")
    }catch(err) {
      console.log(err)
    }
  };

    return (
        <div className="bg-[#011335] rounded p-8 max-w-md mt-36 mx-auto text-white h-[380px]">
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
                required
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
                required
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
                required
                className="bg-[#011335] border border-white rounded h-10 focus:outline-blue-500"
              />
              </div>
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