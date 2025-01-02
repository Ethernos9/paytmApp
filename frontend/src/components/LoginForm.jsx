import React from 'react'

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center">
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
            <h2 className='text-2xl font-semibold text-center mb-4 '>Sign in to SBI PAY</h2>
            <p className='text-center text-gray-500 mb-6'>Welcome back! Please sign in to continue</p>
            <form>
                <div>
                    <label 
                    htmlFor='name'
                    className= " block text-sm font-medium text-gray-700"
                    >Name</label>
                    <input
                        type= "text"
                        id = "name"
                        className='block w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm  focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Name'
                        required
                    />      
                </div>
                <div>
                    <label 
                    htmlFor='email'
                    className="block pt-2 text-sm font-medium text-gray-700"
                    >Email Address</label>
                    <input
                        type= "email"
                        id = "email"
                        placeholder='Email Address'
                        className='block px-4 py-2 text-sm border border-gray-300 w-full rounded-lg shadow-sm  focus:ring-blue-500 focus:border-blue-500'
                        required
                    />      
                </div>
                <div>
                    <label 
                    htmlFor='password'
                    className="block pt-2 text-sm font-medium text-gray-700"
                    >Password</label>
                    <input
                        type= "text"
                        id = "password"
                        placeholder='Password'
                        className='block px-4 py-2 text-sm border border-gray-300 w-full rounded-lg shadow-sm  focus:ring-blue-500 focus:border-blue-500'
                        required
                    />      
                </div>
                <div>
                    <label 
                    htmlFor='phoneNumber'
                    className="block pt-2 text-sm font-medium text-gray-700"
                    >Phone Number</label>
                    <input
                        type= "text"
                        id = "phoneNumber"
                        placeholder='Phone Number'
                        className='block px-4 py-2 text-sm border border-gray-300 w-full rounded-lg shadow-sm  focus:ring-blue-500 focus:border-blue-500'
                        required
                    />      
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginForm