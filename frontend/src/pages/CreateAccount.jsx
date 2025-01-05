// import React, { useContext ,useState,useEffect} from "react";
// import NavBar from "../components/NavBar";
// import useFetchUser from "../hooks/useFetchUser";
// import { userContext } from "../contexts/userContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios"

// const CreateAccount = () => {
//   const { user, loading, logout, error, } = useContext(userContext);
//   const navigate = useNavigate();
//   const [accountType, setAccountType] = useState("");
//   const [balance, setBalance] = useState(500);
//   const [error, setError] = useState(null);

//   const handleAccountChange = (e)=>{
//     setAccountType(e.target.value)
//   }
//   const handleBalanceChange = (e)=>{
//     setBalance(e.target.value)
//   }


//   // Redirect to home if the user is not logged in
//   useEffect(() => {
//     if (!user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/v2/create/account",
//         {
//           accountType,
//           balance,
//         }
//       );
//       console.log("Account created successfully:", response.data);
//     } catch (err) {
//       console.error("Error creating account:", err.message);
//       setError(err.message);
//     }
//   };
//   if (error) {
//     return <div className="text-red-500 text-center">{error}</div>;
//   }
//   if (loading){
//     return <div>Loading...</div>
//   }


//   return (
//     <div className="">
//        <NavBar/>
  
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
//           Create New Account
//         </h2>
//         <form>
//           {/* Account Type Field */}
//           <div className="mb-5">
//             <label
//               htmlFor="accountType"
//               className="block text-gray-700 font-semibold mb-2"
//             >
//               Account Type
//             </label>
//             <select
//               id="accountType"
//               onChange = {handleAccountChange}
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             >
//               <option value="personal">Savings</option>
//               <option value="business">Current</option>
//             </select>
//           </div>

//           {/* Balance Field */}
//           <div className="mb-5">
//             <label
//               htmlFor="balance"
//               className="block text-gray-700 font-semibold mb-2"
//             >
//               Initial Balance
//             </label>
//             <input
//               type="number"
//               id="balance"
//               onChange= {handleBalanceChange}
//               placeholder="Enter initial balance"
//               className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
//           >
//             Create Account
//           </button>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default CreateAccount;

import React, { useContext, useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { userContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const { user, loading } = useContext(userContext);
  const navigate = useNavigate();
  const[account,setAccount]  = useState([])
  const [accountType, setAccountType] = useState("Savings");
  const [balance, setBalance] = useState(100);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Handle account type change
  const handleAccountChange = (e) => {
    setAccountType(e.target.value);
  };


  // Handle balance change
  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };
  
  // Redirect to home if the user is not logged in

    if (!user && !loading ) {
      navigate("/");
    }
    else if (!user && loading) {
      // If user is not available and loading is true, display a loader
      return <div>Loading.............................</div>
    }


  // Send accountType and balance in the POST request
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi there ")
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v2/create/account",
        {
          accountType,
          balance,
        },  { withCredentials: true }
      );
      console.log("Account created successfully:", response);
      console.log("Account created successfully:", response.data.success);
      console.log("Account created successfully:", response.data.account);
     
      if (response.data.success){
        setMessage(response?.data?.message)
        console.log("Account created successfully----->:", response.data.message);
        console.log(message)
        setAccount(response?.data?.account)

        navigate("/dashboard")
      
      }
   
    } catch (err) {
      console.error("Error creating account:", err.message);
      setError(err.message);
    }
  };



  return (
    <div>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Create New Account
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Account Type Field */}
            <div className="mb-5">
              <label
                htmlFor="accountType"
                className="block text-gray-700 font-semibold mb-2"
              >
                Account Type
              </label>
              <select
                id="accountType"
                onChange={handleAccountChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Savings">Savings</option>
                <option value="Current">Current</option>
              </select>
            </div>

            {/* Balance Field */}
            <div className="mb-5">
              <label
                htmlFor="balance"
                className="block text-gray-700 font-semibold mb-2"
              >
                Initial Balance
              </label>
              <input
                type="number"
                id="balance"
                value={balance}
                onChange={handleBalanceChange}
                placeholder="Enter initial balance"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
