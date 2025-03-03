import React, { useState, useEffect } from 'react';
import { account } from './config/appwrite'; // ✅ Correct Import

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(null);

    // ✅ Check if a user is already logged in
    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
                setMessage(`Welcome back, ${currentUser.email}`);
            } catch (error) {
                setUser(null);
            }
        };
        checkUser();
    }, []);

    // ✅ Logout Function
    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            setMessage('Logged out successfully.');
        } catch (error) {
            setMessage('Logout failed: ' + error.message);
        }
    };

    // ✅ Auto Register & Login Function
    const handleLogin = async (e) => {
        e.preventDefault();

        // 🔴 Prevent login if the user is already logged in
        if (user) {
            setMessage('You are already logged in. Please logout first.');
            return;
        }

        try {
            // ✅ Try logging in
            await account.createEmailPasswordSession(email, password);
            setMessage('Login Successful!');
            setUser(await account.get()); // ✅ Fetch user details after login
        } catch (error) {
            // ✅ If user not found, create a new account
            if (error.message.includes("Invalid credentials")) {
                try {
                    await account.create('unique()', email, password);
                    await account.createEmailPasswordSession(email, password);
                    setMessage('User Registered & Logged In Successfully!');
                    setUser(await account.get()); // ✅ Fetch user details after registration
                } catch (registerError) {
                    setMessage('Registration Failed: ' + registerError.message);
                }
            } else {
                setMessage('Login Failed: ' + error.message);
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>{user ? "Welcome" : "Login / Auto Register"}</h2>

            {user ? (
                <div>
                    <p>Logged in as: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br /><br />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br /><br />
                    <button type="submit">Login / Register</button>
                </form>
            )}

            <p>{message}</p>
        </div>
    );
};

export default Login;
