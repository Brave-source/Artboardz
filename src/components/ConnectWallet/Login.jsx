import { logUserFailure, logUserStart, logUserSuccess } from "@/store/redux-slices/userSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = ({setIsSignupModalOpen, setIsLoginModalOpen, setIsOpen}) => {
    const dispatch = useDispatch();
    const [loggedInData, setLoggedInData] = useState({});

    const handleLoggedIn = (e) => {
        setLoggedInData((prev) => ({...prev, [e.target.name]: e.target.value}))
      }

    // Logged In function
  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    // Handle login form submission
    dispatch(logUserStart())
    try{
       const res = await axios.put('http://localhost:3000/api/login', loggedInData);
       console.log(res.data)
       dispatch(logUserSuccess(res.data))
       setIsSignupModalOpen(false)
       setIsLoginModalOpen(false);
       setIsOpen(false);
    }catch(err) {
      console.log(err)
      dispatch(logUserFailure())
    }
  };

    return (
        <div className="bg-[#011335] rounded p-8 max-w-md mt-36 mx-auto text-white h-[360px]">
        <h2 className="text-lg font-semibold mb-4 text-center">Email Login</h2>
        {/* Login form goes here */}
        <form onSubmit={handleLoginSubmit}>
          {/* Login form fields */}
          <div className="flex gap-2 flex-col w-full">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleLoggedIn}
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
              onChange={handleLoggedIn}
              required
              className="bg-[#011335] px-3 border border-white rounded h-10 focus:outline-blue-500"
            />
          </div>
    
          <div className="grid grid-cols-2 gap-4 mt-4">
            <button  className="w-full m-auto h-[35px] px-2 bg-transparent border border-1 border-white text-white rounded rounded-lg hover:bg-[#6E028F]" type="button" onClick={() => setIsLoginModalOpen(false)}>
              Cancel
            </button>
            <button 
            className="w-full m-auto  px-2 h-[35px] bg-[#6E028F] border border-1 border-white text-white rounded rounded-md hover:bg-transparent" 
            type="submit">Login</button>
          </div>
        </form>
      </div>
    )
}

export default Login;