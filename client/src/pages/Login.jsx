import React from 'react';
// import './Login.css'; // Ensures the CSS file is imported

// function Login() {
//     return (<></>
//     );
//   }

// export default Login;

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h4 className="text-2xl font-bold text-gray-900 mb-4">Login</h4>
          {data ? (
            <p>
              Success! You may now head{' '}
              <Link to="/" className="text-indigo-600 hover:text-indigo-900">
                back to the homepage.
              </Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;
