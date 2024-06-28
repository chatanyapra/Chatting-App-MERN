import { useState } from 'react';
import toast from 'react-hot-toast';

interface SignupData {
    fullname: string;
    username: string;
    password: string;
    confirmPassword: string;
    gender: string;
}

function handleInputError({ fullname, username, password, confirmPassword, gender }: SignupData): boolean {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('Please fill in all fields');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Password do not match');
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }
    return true;
}

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const signup = async ({ fullname, username, password, confirmPassword, gender }: SignupData) => {
        const success = handleInputError({ fullname, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender }),
            });

            const data = await res.json();
            console.log(data);

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, signup };
}

export default useSignup;
