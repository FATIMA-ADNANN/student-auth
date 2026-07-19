import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { supabase } from "../supabase";
import { sendEmails } from "../email";

import GlassCard from "../components/GlassCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

import "../assets/css/auth.css";

function RegistrationForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        full_name: "",
        father_name: "",
        email: "",
        phone: "",
        course: ""

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

        const {

            data: { user }

        } = await supabase.auth.getUser();

        if (!user) {

            toast.error("Please login first.");

            setLoading(false);

            return;

        }

        const { error } = await supabase

            .from("students")

            .insert({

                user_id: user.id,

                full_name: formData.full_name,

                father_name: formData.father_name,

                email: formData.email,

                phone: formData.phone,

                course: formData.course

            });

        if (error) {

            toast.error(error.message);

            setLoading(false);

            return;

        }

        const emailSent = await sendEmails(formData);

        if (emailSent) {

            toast.success("Registration submitted successfully!");

        }

        else {

            toast.error("Registration saved, but emails could not be sent.");

        }

        setLoading(false);

        navigate("/dashboard");

    };

    return (

        <div className="auth-page">

            <GlassCard>

                <div className="auth-header">

                    <h1>Student Registration</h1>

                    <p>Complete your registration details</p>

                </div>

                <form

                    className="auth-form"

                    onSubmit={handleSubmit}

                >

                    <InputField

                        name="full_name"

                        placeholder="Full Name"

                        value={formData.full_name}

                        onChange={handleChange}

                        required

                    />

                    <InputField

                        name="father_name"

                        placeholder="Father Name"

                        value={formData.father_name}

                        onChange={handleChange}

                        required

                    />

                    <InputField

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />

                    <InputField

                        name="phone"

                        placeholder="Phone Number"

                        value={formData.phone}

                        onChange={handleChange}

                        required

                    />

                    <InputField

                        name="course"

                        placeholder="Course"

                        value={formData.course}

                        onChange={handleChange}

                        required

                    />

                    <PrimaryButton

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Submitting..."

                                : "Submit Registration"

                        }

                    </PrimaryButton>

                </form>

            </GlassCard>

        </div>

    );

}

export default RegistrationForm;