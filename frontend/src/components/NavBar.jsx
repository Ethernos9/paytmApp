// import React from 'react';

// const NavBar = () => {
//   return (
//     <nav className="bg-blue-600 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center p-2">
//         {/* Logo Section */}
//         <div className="text-2xl font-bold">Logo</div>

//         {/* Navigation Links */}
//         <div className="hidden md:flex space-x-7">
//           <a href="#" className="hover:text-gray-200 transition">Account</a>
//           <a href="#" className="hover:text-gray-200 transition">Transfer</a>
//           <a href="#" className="hover:text-gray-200 transition">About Us</a>
//           <a href="#" className="hover:text-gray-200 transition">Contact Us</a>
//         </div>

//         {/* Profile Section */}
//         <div className="hidden md:block">
//           <button className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition">
//             Profile
//           </button>
//         </div>

//         {/* Mobile Menu (Optional) */}
//         <div className="md:hidden">
//           <button className="text-white focus:outline-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16m-7 6h7"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;























// import React, { useState } from "react";

// const NavBar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState("");

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
//       {/* Left Section - Logo */}
//       <div className="flex items-center space-x-2">
//         <span className="text-2xl font-bold">SBI</span>
//       </div>

//       {/* Middle Section - Nav Links */}
//       <div className="hidden md:flex items-center space-x-8">
//         <a href="#account" className="hover:text-gray-300">
//           User Registration
//         </a>
//         <a href="#send-money" className="hover:text-gray-300">
//           Services
//         </a>
//         <a href="#self-transfer" className="hover:text-gray-300">
//           Contacts
//         </a>
//         <a href="#transactions" className="hover:text-gray-300">
//           FAQs
//         </a>
//       </div>

//       {/* Right Section - Profile and Logout */}
//       <div className="hidden md:flex items-center space-x-6">

//         {user ?
//        <a href="#profile" className="hover:text-gray-300">
//             Profile 
//           </a>}
//            :
//           <button className=" text-white py-1 px-4 rounded">
//             Login 
//           </button>
//          

//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button
//           type="button"
//           className="text-white focus:outline-none"
//           onClick={toggleMobileMenu}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-blue-700 text-white transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//       >
//         <div className="p-6 flex justify-between items-center">
//           <div className="text-2xl font-bold">SBI</div>
//           <button
//             type="button"
//             className="text-white focus:outline-none"
//             onClick={toggleMobileMenu}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="mt-4 flex flex-col items-center space-y-4 px-6">
//           <a href="#account" className="hover:text-gray-300 text-center">
//             User Registration
//           </a>
//           <a href="#send-money" className="hover:text-gray-300 text-center">
//             Services
//           </a>
//           <a href="#self-transfer" className="hover:text-gray-300 text-center">
//             Contacts
//           </a>
//           <a href="#transactions" className="hover:text-gray-300 text-center">
//             FAQs
//           </a>
//         </div>
//         <div className="mt-6 px-6">
//           {user ?
               //<a
//               href="#profile"
//               className="hover:text-gray-300 block text-left mb-4"
//             >
//               Profile

//             </a>
//              :
// 
// 
// 
//  <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full">
//             Login
//           </button> 

//             
//           }


//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;







































































// import React, { useState } from "react";

// const NavBar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
//       {/* Left Section - Logo */}
//       <div className="flex items-center space-x-2">
//         <img
//           src="/sbi-logo.png" // Replace with your logo path
//           alt="SBI Logo"
//           className="h-8 w-8"
//         />
//         <span className="text-2xl font-bold">SBI</span>
//       </div>

//       {/* Middle Section - Nav Links */}
//       <div className="hidden md:flex items-center space-x-8">
//         <a href="#account" className="group hover:text-gray-300">
//           Account
//           <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//         </a>
//         <a href="#send-money" className="group hover:text-gray-300">
//           Send Money
//           <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//         </a>
//         <a href="#self-transfer" className="group hover:text-gray-300">
//           Self Transfer
//           <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//         </a>
//         <a href="#transactions" className="group hover:text-gray-300">
//           Transactions
//           <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//         </a>
//       </div>

//       {/* Right Section - Profile and Logout */}
//       <div className="hidden md:flex items-center space-x-6">
//         <a href="#profile" className="hover:text-gray-300">
//           Profile
//         </a>
//         <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
//           Logout
//         </button>
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button
//           type="button"
//           className="text-white focus:outline-none"
//           onClick={toggleMobileMenu}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white text-blue-600 transform transition-transform duration-300 shadow-lg ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-6 flex justify-between items-center">
//           <div className="text-2xl font-bold text-blue-600">SBI</div>
//           <button
//             type="button"
//             className="text-blue-600 focus:outline-none"
//             onClick={toggleMobileMenu}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="mt-4 flex flex-col items-center space-y-6 px-6">
//           <a
//             href="#account"
//             className="group text-center text-lg font-medium hover:text-blue-500"
//           >
//             Account
//             <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//           </a>
//           <a
//             href="#send-money"
//             className="group text-center text-lg font-medium hover:text-blue-500"
//           >
//             Send Money
//             <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//           </a>
//           <a
//             href="#self-transfer"
//             className="group text-center text-lg font-medium hover:text-blue-500"
//           >
//             Self Transfer
//             <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//           </a>
//           <a
//             href="#transactions"
//             className="group text-center text-lg font-medium hover:text-blue-500"
//           >
//             Transactions
//             <span className="block h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
//           </a>
//         </div>
//         <div className="mt-6 px-6">
//           <a
//             href="#profile"
//             className="block text-lg font-medium text-blue-600 hover:text-blue-500 mb-4"
//           >
//             Profile
//           </a>
//           <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full">
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;




import React, { useState } from "react";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    image: "https://via.placeholder.com/40", // Replace with user image URL
  });

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDialog = () => {
    setIsProfileDialogOpen(!isProfileDialogOpen);
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">SBI</span>
      </div>

      {/* Middle Section - Nav Links */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#account" className="relative group">
          User Registration
          <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#send-money" className="relative group">
          Services
          <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#self-transfer" className="relative group">
          Contacts
          <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
        </a>
        <a href="#transactions" className="relative group">
          FAQs
          <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
        </a>
      </div>

      {/* Right Section - Profile and Login */}
      <div className="hidden md:flex items-center space-x-6">
        {user ? (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleProfileDialog}
          >
            <img
              src={user.image}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <span>{user.name}</span>
          </div>
        ) : (
          <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          type="button"
          className="text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SBI</div>
          <button
            type="button"
            className="text-gray-600 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-4 px-6">
          <a href="#account" className="text-center">
            User Registration
          </a>
          <a href="#send-money" className="text-center">
            Services
          </a>
          <a href="#self-transfer" className="text-center">
            Contacts
          </a>
          <a href="#transactions" className="text-center">
            FAQs
          </a>
        </div>
        <div className="mt-6 px-6">
          {user ? (
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleProfileDialog}
            >
              <img
                src={user.image}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
              />
              <span>{user.name}</span>
            </div>
          ) : (
            <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full">
              Login
            </button>
          )}
        </div>
      </div>

      {/* Profile Dialog */}
      {isProfileDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-blue-600">Profile</h2>
              <button
                className="text-gray-600 focus:outline-none"
                onClick={toggleProfileDialog}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                View Profile
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 rounded">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;












































// TODO : Latest Account


// import React, { useState } from "react";

// const NavBar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [user, setUser] = useState("John Doe");
//   const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const toggleProfileDialog = () => {
//     setIsProfileDialogOpen(!isProfileDialogOpen);
//   };

//   return (
//     <nav className="bg-blue-600 text-white py-4 px-6 flex items-center justify-between">
//       {/* Left Section - Logo */}
//       <div className="flex items-center space-x-2">
//         <span className="text-2xl font-bold">SBI</span>
//       </div>

//       {/* Middle Section - Nav Links */}
//       <div className="hidden md:flex items-center space-x-8">
//         <a href="#account" className="hover:text-gray-300 transition-colors">
//           User Registration
//         </a>
//         <a href="#send-money" className="hover:text-gray-300 transition-colors">
//           Services
//         </a>
//         <a href="#self-transfer" className="hover:text-gray-300 transition-colors">
//           Contacts
//         </a>
//         <a href="#transactions" className="hover:text-gray-300 transition-colors">
//           FAQs
//         </a>
//         {user && (
//           <a
//             href="#profile"
//             onClick={toggleProfileDialog}
//             className="hover:text-gray-300 flex items-center space-x-2 cursor-pointer"
//           >
//             <img
//               src="https://via.placeholder.com/30"
//               alt="User Avatar"
//               className="w-6 h-6 rounded-full"
//             />
//             <span>Profile</span>
//           </a>
//         )}
//       </div>

//       {/* Right Section - Profile/Login */}
//       <div className="hidden md:flex items-center space-x-6">
//         {user ? (
//           <a
//             href="#profile"
//             onClick={toggleProfileDialog}
//             className="hover:text-gray-300 flex items-center space-x-2 cursor-pointer"
//           >
//             <img
//               src="https://via.placeholder.com/30"
//               alt="User Avatar"
//               className="w-6 h-6 rounded-full"
//             />
//             <span>Profile</span>
//           </a>
//         ) : (
//           <button className="text-white py-1 px-4 rounded">Login</button>
//         )}
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button
//           type="button"
//           className="text-white focus:outline-none"
//           onClick={toggleMobileMenu}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-56 bg-blue-700 text-white transform transition-transform duration-300 ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-6 flex justify-between items-center">
//           <div className="text-2xl font-bold">SBI</div>
//           <button
//             type="button"
//             className="text-white focus:outline-none"
//             onClick={toggleMobileMenu}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         <div className="mt-4 flex flex-col items-center space-y-4 px-6">
//           <a
//             href="#account"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             User Registration
//           </a>
//           <a
//             href="#send-money"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             Services
//           </a>
//           <a
//             href="#self-transfer"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             Contacts
//           </a>
//           <a
//             href="#transactions"
//             className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//           >
//             FAQs
//           </a>
//           {user ? (
//             <a
//               href="#profile"
//               onClick={toggleProfileDialog}
//               className="hover:text-gray-300 text-center transition-transform transform hover:scale-105"
//             >
//               Profile
//             </a>
//           ) : (
//             <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full">
//               Login
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Profile Dialog */}
//       {isProfileDialogOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-80">
//             <h3 className="text-lg font-bold mb-4">Profile</h3>
//             <p className="text-gray-700 mb-4">Name: {user}</p>
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full mb-2"
//               onClick={() => {
//                 setUser("");
//                 toggleProfileDialog();
//               }}
//             >
//               Logout
//             </button>
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded w-full"
//               onClick={toggleProfileDialog}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default NavBar;
