import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import { supabase } from "../supabase";

import GlassCard from "../components/GlassCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

import "../assets/css/auth.css";

function Login() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        email: "",
        password: ""

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({

            email: formData.email.trim(),

            password: formData.password

        });

        if (error) {

            toast.error(error.message);

            setLoading(false);

            return;

        }

        toast.success("Login Successful");

        setLoading(false);

        navigate("/dashboard");

    };

    return (

        <div className="auth-page">

            <GlassCard>

                <div className="auth-header">

                    <h1>Welcome Back</h1>

                    <p>

                        Login to your student account

                    </p>

                </div>

                <form

                    className="auth-form"

                    onSubmit={handleSubmit}

                >

                    <InputField

                        type="email"

                        name="email"

                        placeholder="Email"

                        icon={<FaEnvelope />}

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />

                    <InputField

                        type="password"

                        name="password"

                        placeholder="Password"

                        icon={<FaLock />}

                        value={formData.password}

                        onChange={handleChange}

                        required

                    />

                    <div
                        style={{
                            textAlign: "right",
                            marginTop: "15px"
                        }}
                    >

                        <Link
                            to="/forgot-password"
                            style={{
                                textDecoration: "none"
                            }}
                        >

                            Forgot Password?

                        </Link>

                    </div>

                    <PrimaryButton

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Logging In..."

                                : "Login"

                        }

                    </PrimaryButton>

                </form>

                <div className="auth-links">

                    <p>

                        Don't have an account?

                        {" "}

                        <Link to="/">

                            Create Account

                        </Link>

                    </p>

                </div>

            </GlassCard>

        </div>

    );

}

export default Login;