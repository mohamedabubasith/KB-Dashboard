import React from 'react';
import { AuthFormType } from '../views/AuthView';
import CustomInput from '../common/CustomInput';

interface AuthFormProps {
    setForm: (form: AuthFormType) => void;
    onLogin: () => void;
}

const LoginForm: React.FC<AuthFormProps> = ({ setForm, onLogin }) => {
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    }
    return (
        <form className="space-y-6" onSubmit={handleLogin}>
            <CustomInput id="email" label="Email address" type="email" required defaultValue="user@example.com" />
            <CustomInput id="password" label="Password" type="password" required defaultValue="password" />

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">Remember me</label>
                </div>

                <div className="text-sm">
                    <a href="#" onClick={(e) => { e.preventDefault(); setForm('forgot-password'); }} className="font-medium text-primary-600 hover:text-primary-500">Forgot your password?</a>
                </div>
            </div>

            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Sign in
                </button>
            </div>

            <div className="text-sm text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); setForm('signup'); }} className="font-medium text-primary-600 hover:text-primary-500">Sign up</a>
                </p>
            </div>
        </form>
    );
};

export default LoginForm;
