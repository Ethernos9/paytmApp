// import React, { useContext, useState } from 'react'
// import { userContext } from '../contexts/userContext'
// import NavBar from '../components/NavBar';
// import { useNavigate } from 'react-router-dom';
// const Dashboard = () => {
//    const {user,loading} = useContext(userContext)
//    const {accounts} =  useContext(userContext);
//    const navigate = useNavigate()
//    if (!user && !loading ) {
//     navigate("/");
//   }
//   else if (!user && loading) {
//     // If user is not available and loading is true, display a loader
//     return <div>Loading.............................</div>
//   }


//   return (

//     <div>
//       <NavBar />
//       <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-white">
//         <main className="px-8 py-6">
//           <h1 className="text-4xl font-semibold mb-4">Welcome Back, 👋</h1>
//           <p className="mb-8">This is your financial overview report</p>

//           <button
//             onClick={() => setShowBalance(!showBalance)}
//             className="mb-4 px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition duration-300"
//           >
//             {showBalance ? 'Hide Balance' : 'Show Balance'}
//           </button>

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <div
//               className={`bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105 ${!showBalance && 'hidden'}`}
//             >
//               <h2 className="text-xl font-semibold">Balance</h2>
//               <p>May 08 - Jun 07, 2024</p>
//               <h3 className="text-3xl font-bold mt-2">₹0</h3>
//               <p className="text-red-500">0% from last period</p>
//             </div>

//             <div className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
//               <h2 className="text-xl font-semibold">Credited</h2>
//               <p>May 08 - Jun 07, 2024</p>
//               <h3 className="text-3xl font-bold mt-2">₹2220</h3>
//               <p className="text-green-500">5% from last period</p>
//             </div>

//             <div className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
//               <h2 className="text-xl font-semibold">Debited</h2>
//               <p>May 08 - Jun 07, 2024</p>
//               <h3 className="text-3xl font-bold mt-2">₹220</h3>
//               <p className="text-red-500">1% from last period</p>
//             </div>
//           </div>

//           <section className="mt-8">
//             <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
//             <div className="bg-white text-black p-4 rounded-lg shadow-md">
//               <div
//                 className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
//               >
//                 <div>John</div>
//                 <div>₹2000</div>
//                 <div className="text-green-500">Credited</div>
//               </div>
//               <div
//                 className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
//               >
//                 <div>Alex</div>
//                 <div>₹2000</div>
//                 <div className="text-red-500">Debited</div>
//               </div>
//               <div
//                 className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
//               >
//                 <div>Steve</div>
//                 <div>₹2000</div>
//                 <div className="text-green-500">Credited</div>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Dashboard







import React, { useContext, useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../contexts/userContext';

const Dashboard = () => {
    const {user,loading} = useContext(userContext)
    const {accounts} =  useContext(userContext);
    const [info, setInfo] = useState(null);
    const [accountNumber, setAccountNumber] = useState("");
    const navigate = useNavigate()
    console.log("accounts", accounts)
    console.log("user", user)

    if (user && !accounts){
        navigate("/create/account")
        
    }
    if (!user && !loading ) {
        navigate("/");
      }
      else if (!user && loading) {
        // If user is not available and loading is true, display a loader
        return <div>Loading.............................</div>
      }
    
      useEffect(() => {
        const accountDetails = async (accountNumber) => {
          console.log("Inside getInfo");
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
            setInfo(response.data.account); // Update state with fetched data
          } catch (error) {
            console.error("Error fetching account details:", error.message);
          }
        };
    
        accountDetails("6591699264"); // Pass the account number directly
      }, [accountNumber]); 
  
      const onChange = (e)=>{
           setAccountNumber(e.target.value)
      }

  const handleTransactionHover = (type) => {
    const creditedDiv = document.getElementById('credited-div');
    const debitedDiv = document.getElementById('debited-div');

    if (type === 'Credited') {
      creditedDiv.classList.add('scale-110', 'z-10');
      debitedDiv.classList.remove('scale-110', 'z-10');
    } else if (type === 'Debited') {
      debitedDiv.classList.add('scale-110', 'z-10');
      creditedDiv.classList.remove('scale-110', 'z-10');
    } else {
      creditedDiv.classList.remove('scale-110', 'z-10');
      debitedDiv.classList.remove('scale-110', 'z-10');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen text-white">
        <main className="px-8 py-6">
          <h1 className="text-4xl font-semibold mb-4">Welcome Back, {`${user?.name}`}👋</h1>
          <p className="mb-8">This is your financial overview report</p>

                  <select className="mb-4 px-4 py-2 bg-white text-black rounded shadow hover:bg-gray-200 transition duration-300">
                      <option>Select Bank Account</option>
                      {accounts.map((account, index) => (
                          <option onChange={onChange} key={index}>{account.accountNumber}</option>
                      ))}
                  </select>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
              <h2 className="text-xl font-semibold">Balance</h2>
              <p>May 08 - Jun 07, 2024</p>
              <h3 className="text-3xl font-bold mt-2">₹0</h3>
              <p className="text-red-500">0% from last period</p>
            </div>

            <div id="credited-div" className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
              <h2 className="text-xl font-semibold">Credited</h2>
              <p>May 08 - Jun 07, 2024</p>
              <h3 className="text-3xl font-bold mt-2">₹2220</h3>
              <p className="text-green-500">5% from last period</p>
            </div>

            <div id="debited-div" className="bg-white text-black p-4 rounded-lg shadow-md transition-transform duration-500 transform hover:scale-105">
              <h2 className="text-xl font-semibold">Debited</h2>
              <p>May 08 - Jun 07, 2024</p>
              <h3 className="text-3xl font-bold mt-2">₹220</h3>
              <p className="text-red-500">1% from last period</p>
            </div>
          </div>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
            <div className="bg-white text-black p-4 rounded-lg shadow-md">
              <div
                onMouseEnter={() => handleTransactionHover('Credited')}
                onMouseLeave={() => handleTransactionHover('')}
                className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
              >
                <div>John</div>
                <div>₹2000</div>
                <div className="text-green-500">Credited</div>
              </div>
              <div
                onMouseEnter={() => handleTransactionHover('Debited')}
                onMouseLeave={() => handleTransactionHover('')}
                className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
              >
                <div>Alex</div>
                <div>₹2000</div>
                <div className="text-red-500">Debited</div>
              </div>
              <div
                onMouseEnter={() => handleTransactionHover('Credited')}
                onMouseLeave={() => handleTransactionHover('')}
                className="grid grid-cols-3 gap-4 border-b pb-2 mb-2 transition-transform duration-300 hover:translate-z-10 hover:scale-105 hover:shadow-lg"
              >
                <div>Steve</div>
                <div>₹2000</div>
                <div className="text-green-500">Credited</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
