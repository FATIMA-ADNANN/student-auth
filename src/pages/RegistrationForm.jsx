import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { supabase } from "../supabase";
import { sendEmails } from "../email";

import "../assets/css/RegistrationForm.css";

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

        // Get logged in user

        const {

            data: { user }

        } = await supabase.auth.getUser();

        if (!user) {

            toast.error("Please login first.");

            setLoading(false);

            return;

        }

        // Save registration

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

        // Send Emails

        const emailSent = await sendEmails(formData);

        if (!emailSent) {

            toast.error("Registration saved but email could not be sent.");

        }

        else {

            toast.success("Registration submitted successfully!");

        }

        setLoading(false);

        navigate("/dashboard");

    };

    return (

        <div className="registration-page">

            <div className="glass-card">

                <h1>Student Registration</h1>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        name="full_name"

                        placeholder="Full Name"

                        value={formData.full_name}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="father_name"

                        placeholder="Father Name"

                        value={formData.father_name}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={formData.email}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="phone"

                        placeholder="Phone Number"

                        value={formData.phone}

                        onChange={handleChange}

                        required

                    />

                    <input

                        type="text"

                        name="course"

                        placeholder="Course"

                        value={formData.course}

                        onChange={handleChange}

                        required

                    />

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                            ?

                            "Submitting..."

                            :

                            "Submit Registration"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default RegistrationForm;