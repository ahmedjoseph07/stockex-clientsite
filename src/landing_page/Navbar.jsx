import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Navbar = () => {


  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track login status

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setIsLoggedIn(false);  // If no token, the user is logged out
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "https://stockex-backend.onrender.com",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          setIsLoggedIn(true);  // Set logged-in status
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          setIsLoggedIn(false);  // Invalidate login status if the response is not valid
          navigate("/login");
        }
      }
    };
    verifyCookie();
  }, [cookies, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    setIsLoggedIn(false);  // Update login status to false
    navigate("/");
    window.location.reload();
  };

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://stockex-backend.onrender.com/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setIsLoggedIn(true);  // Mark user as logged in
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      password: "",
    });
  };

  return (
    <div>

      <nav className="bg-white border-gray-200 dark:bg-gray-900 border-b-2 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6 ">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className=''><i className="fa-solid fa-chart-simple"></i></span>
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white flex items-center text-green-500">StockEx</span>
          </Link>
          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            { isLoggedIn ? (
                <Link to="http://stockex-dashboard.vercel.app">Dashboard</Link>
            ) : (
                <span>Dashboard (Login Required)</span>
            )}
              {/* <li>
                <Link to="/dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Dashboard</Link>
              </li> */}
              <li>
                <Link to="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" aria-current="page" >Home</Link>
              </li>
              <li>
                <Link to="/about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >About</Link>
              </li>
              <li>
                <Link to="/products" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Products</Link>
              </li>
              <li>
                <Link to="/pricing" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Pricing</Link>
              </li>
              <li>
                <Link to="/support" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" >Support</Link>
              </li>
              { isLoggedIn ? (
                <a className="cursor-pointer bg-red-400 text-black p-2 " onClick={Logout}>Logout</a>
            ) : (
                <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="bg-green-500 p-2" >Login</button>
            )}
              {/* <button type="button" data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-7 py-2 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                Login
              </button> */}
            </ul>
          </div>
        </div>
      </nav>
      <ToastContainer />


      <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Log in to your Account
              </h3>
              <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email"
                    name="email" value={email} placeholder="Enter your email" onChange={handleOnChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                  <input type="password" value={password} name="password"  id="password" onChange={handleOnChange} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"/>
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                  </div>
                  <a href="#" className="text-sm text-green-700 hover:underline dark:text-green-500">Lost Password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Login</button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered? <a href="https://stockex-clientsite.vercel.app/signup" className="text-green-700 hover:underline dark:text-green-500">Create account</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Navbar
