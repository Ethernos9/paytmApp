
import React, { useState } from "react";

 function LoginForm({ currentPath }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/user/login",
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         await fetchUser();
//         window.location.href = "/dashboard";
//       } else {
//         setError(response.data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Login failed, please try again.");
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/user/getUser",
//         { withCredentials: true }
//       );

//       if (response.data.success) {
//         setUserName(response.data.userName);
//       }
//     } catch (err) {
//       console.error("Error fetching user:", err);
//       setError("Failed to fetch user data.");
//     }
//   };

  return (
    <div className="pt-12">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Sign in to SBIPay
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {currentPath !== "/login"
              ? "Welcome back! Please sign in to continue"
              : "Get Started! Create a new Account"}
          </p>

          <button className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-md px-4 py-2 mb-4 shadow-sm hover:shadow-md transition-shadow">
            <img
              src="./logo2.png"
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <form onSubmit={()=>{}}>
            {currentPath !== "/login" && (
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  UserName
                </label>
                <input
                  type="text"
                  id="userName"
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Username"
                  required
                />
              </div>
            )}
            <label
              htmlFor="email"
              className="block pt-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Email address"
              required
            />
            <label
              htmlFor="password"
              className="pt-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}

          {currentPath === "/signup" ? (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                  Login
                </a>
              </p>
            </div>
          ) : (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">
                Don’t have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default LoginForm