import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/users/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            setUser(user);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="font-inter flex flex-col items-center p-6 rounded-lg text-white max-w-5xl mx-auto">
            <div
                className={`p-6 flex flex-row justify-between outline outline-1 outline-white/50 mt-5 rounded-xl bg-gradient-to-r from-indigo-800
                      to-violet-600 mx-auto drop-shadow-2xl relative gap-y-4`}
            >
                <form onSubmit={handleSubmit}>
                    <h2 className='text-xl'>login</h2>
                    <div>
                        <input
                            className="rounded-xl p-2 mt-3 mb-2 text-indigo-900"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <input
                            className="rounded-xl p-2 text-indigo-900"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex justify-end w-full mt-3">
                        <div className="bg-fuchsia-500 p-1 px-4 rounded-xl hover:bg-fuchsia-600">
                            <button type="submit">submit</button>
                        </div>
                    </div>
                    <div className="flex justify-end w-full mt-2 -mr-2">
                        <div className="text-xs p-1 px-4 rounded-xl hover:text-fuchsia-300">
                            <p>no account? create one</p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );


};

export default LoginForm;
