import React from 'react';
import { AuthFormType } from '../views/AuthView';
import CustomInput from '../common/CustomInput';

interface AuthFormProps {
    setForm: (form: AuthFormType) => void;
}

const ForgotPasswordForm: React.FC<AuthFormProps> = ({ setForm }) => {
    return (
        <form className="space-y-6" action="#" method="POST">
            <CustomInput id="email" label="Email address" type="email" required />
            
            <div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Send password reset email
                </button>
            </div>

            <div className="text-sm text-center">
                <p className="text-gray-600 dark:text-gray-400">
                    Remembered your password?{' '}
                    <a href="#" onClick={(e) => { e.preventDefault(); setForm('login'); }} className="font-medium text-primary-600 hover:text-primary-500">Sign in</a>
                </p>
            </div>
        </form>
    );
};

export default ForgotPasswordForm;
