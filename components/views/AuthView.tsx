import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignupForm';
import ForgotPasswordForm from '../auth/ForgotPasswordForm';

export type AuthFormType = 'login' | 'signup' | 'forgot-password';

interface AuthViewProps {
    onLogin: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
    const [form, setForm] = useState<AuthFormType>('login');

    const renderForm = () => {
        switch (form) {
            case 'login':
                return <LoginForm setForm={setForm} onLogin={onLogin} />;
            case 'signup':
                return <SignupForm setForm={setForm} />;
            case 'forgot-password':
                return <ForgotPasswordForm setForm={setForm} />;
            default:
                return <LoginForm setForm={setForm} onLogin={onLogin} />;
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white">
                    GenAI Platform
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    {form === 'login' && 'Sign in to your account'}
                    {form === 'signup' && 'Create a new account'}
                    {form === 'forgot-password' && 'Reset your password'}
                </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default AuthView;
