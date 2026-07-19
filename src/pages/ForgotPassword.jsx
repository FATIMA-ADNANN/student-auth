import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

import { supabase } from "../supabase";

import GlassCard from "../components/GlassCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

import "../assets/css/auth.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: "http://localhost:5173/reset-password",
        });

        if (error) {
            toast.error(error.message);
            setLoading(false);
            return;
        }

        toast.success("Password reset email sent.");
        setLoading(false);
    };

    return (
        <div className="auth-page">
            <GlassCard>

                <div className="auth-header">
                    <h1>Forgot Password</h1>
                    <p>Enter your registered email.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>

                    <InputField
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<FaEnvelope />}
                        required
                    />

                    <PrimaryButton
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </PrimaryButton>

                </form>

                <div className="auth-links">
                    <Link to="/login">
                        Back to Login
                    </Link>
                </div>

            </GlassCard>
        </div>
    );
}

export default ForgotPassword;