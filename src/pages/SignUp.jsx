import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import toast from "react-hot-toast";

import { supabase } from "../supabase";

import GlassCard from "../components/GlassCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

import "../assets/css/auth.css";

function Signup() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        username: "",
        email: "",
        password: "",
        confirmPassword: ""

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

        const username = formData.username.trim();
        const email = formData.email.trim().toLowerCase();

        // Username & Email cannot be same

        if (username.toLowerCase() === email) {

            toast.error("Username and Email cannot be the same.");

            setLoading(false);

            return;

        }

        // Password Match

        if (formData.password !== formData.confirmPassword) {

            toast.error("Passwords do not match.");

            setLoading(false);

            return;

        }

        // Password Length

        if (formData.password.length < 8) {

            toast.error("Password must be at least 8 characters.");

            setLoading(false);

            return;

        }

        // Username already exists

        const { data: existingUser } = await supabase

            .from("profiles")

            .select("username")

            .eq("username", username)

            .maybeSingle();

        if (existingUser) {

            toast.error("Username already exists.");

            setLoading(false);

            return;

        }

        // Create Account

        const {

            data,
            error

        } = await supabase.auth.signUp({

            email,

            password: formData.password

        });

        if (error) {

            toast.error(error.message);

            setLoading(false);

            return;

        }

        // Save username in profiles table

        if (data.user) {

            const { error: profileError } =  await supabase.auth.signUp({
            email,
            password
        });

            if (profileError) {

                toast.error(profileError.message);

                setLoading(false);

                return;

            }

        }

        toast.success(

            "Account created successfully! Please verify your email."

        );

        setLoading(false);

        navigate("/login");

    };

    return (

        <div className="auth-page">

            <GlassCard>

                <div className="auth-header">

                    <h1>Create Account</h1>

                    <p>

                        Create your student account

                    </p>

                </div>

                <form

                    className="auth-form"

                    onSubmit={handleSubmit}

                >

                    <InputField

                        name="username"

                        placeholder="Username"

                        icon={<FaUser />}

                        value={formData.username}

                        onChange={handleChange}

                        required

                    />

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

                    <InputField

                        type="password"

                        name="confirmPassword"

                        placeholder="Confirm Password"

                        icon={<FaLock />}

                        value={formData.confirmPassword}

                        onChange={handleChange}

                        required

                    />

                    <PrimaryButton

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Creating Account..."

                                : "Create Account"

                        }

                    </PrimaryButton>

                </form>

                <div className="auth-links">

                    <p>

                        Already have an account?

                        {" "}

                        <Link to="/login">

                            Login

                        </Link>

                    </p>

                </div>

            </GlassCard>

        </div>

    );

}

export default Signup;