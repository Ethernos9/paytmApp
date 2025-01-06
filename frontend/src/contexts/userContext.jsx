import React, { useEffect, useState } from "react";
import { createContext } from "react";
import useFetchUser from "../hooks/useFetchUser";
import axios from "axios";
import useAccounts from "../hooks/useAccounts";
import useGetAccountDetails from "../hooks/useGetAccountDetails";


 export const userContext = createContext()

export const AppProvider =({children})=>{

  const {user, setUser, loading,setLoading, error ,setError } = useFetchUser();

  const [defaultAccount,setDefaultAccount] = useState("")

  const {accounts,setAccounts} = useAccounts();
  const [info, setInfo] = useState(null); 
    
    // const [user, setUser] = useState(null);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState
    (false); 

    const login = (userData) => {
      setUser(userData);
      setIsLoggedIn(true);
      setLoading(false)
      };
      
      const setDefAccount = async()=>{
        try {
            const response = await axios.post("http://localhost:5000/api/v2/account/set-default",
             {accountNumber} , {
              withCredentials: true, // Include credentials (cookies)
            })
            console.log("Account set as default successfully:  -------> data", response.data);
            console.log("Account set as default successfully:  ---------> data.defauktAccount", response.data.defaultAccount);
        } catch (error) {
          console.lof(error.message)
        }
      }


     

const  getAccountInfo = async(accountNumber)=> {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v2/getinfo",
      {
        accountNumber, // Correct parameter passing
      },
      {
        withCredentials: true, // Include credentials (cookies)
      }
    );
    console.log("Response ----------->", response);
    console.log("Response ----------->", response.data.account);
    return response.data.account
    // setInfo(response.data.account); // Update state with fetched data
  } catch (error) {
    console.error("Error fetching account details:", error.message);
  }

 }




    //  const getUser = async()=>{
    //     try {
    //       setLoading(true);
    //       const response = await axios.get("http://localhost:5000/api/v1/get/user", { withCredentials: true });
    //       if (response.data.success){
    //         setUser(response.data.user);
    //         setIsLoggedIn(true);
    //         setLoading(false);
    //       }
    //     } catch (error) {
    //       setError(error.response?.data?.message || "Error fetching user");
    //       setIsLoggedIn(false);
    //     }
    //     console.log("user :", user, "isLoggedIn :", isLoggedIn,"loading : ",loading )
    //     return {user, loading} 
    // }
    // const fetchUser =  async() => {
    //    const userDetails = await getUser()
    //    return userDetails;
    // }

      const logout = async () => {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/v1/user/logout", 
            {}, // No data is sent in the body
            { withCredentials: true } // Pass withCredentials as an option
          );
          // Update state after successful logout
          setUser(null);
          setIsLoggedIn(false);
          console.log("Logout response of user ---->", user);
          console.log("Logout response of log ---->", isLoggedIn);
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

       // Context value: contains state and methods
    const value = {
    user,
    isLoggedIn,
    login,
    logout,
    setIsLoggedIn,
    loading,
    error,
    accounts,
    setAccounts,
    info,
    getAccountInfo,
    setDefAccount
   
     // For error handling in components  //error: {message: "Error fetching user"}  // setError(err.response?.data?.message || "Error fetching user")
   
  };

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}

