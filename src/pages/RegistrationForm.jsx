import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBook
} from "react-icons/fa";
import toast from "react-hot-toast";

import { supabase } from "../supabase";

import GlassCard from "../components/GlassCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";

import "../assets/css/auth.css";

function RegistrationForm() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState(null);

    const [formData, setFormData] = useState({

        full_name: "",

        father_name: "",

        email: "",

        phone: "",

        dob: "",

        gender: "",

        cnic: "",

        address: "",

        course: "",

        qualification: ""

    });

    useEffect(() => {

        async function loadUser() {

            const {

                data: { user }

            } = await supabase.auth.getUser();

            if (!user) {

                navigate("/login");

                return;

            }

            setUser(user);

            setFormData(prev => ({
                ...prev,
                email: user.email
            }));

        }

        loadUser();

    }, [navigate]);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        // Prevent duplicate registration

        const { data: existing } = await supabase

            .from("students")

            .select("*")

            .eq("user_id", user.id)

            .maybeSingle();

        if (existing) {

            toast.error("You have already submitted the form.");

            setLoading(false);

            return;

        }

        const { error } = await supabase

            .from("students")

            .insert({

                user_id: user.id,

                ...formData

            });

        if (error) {

            toast.error(error.message);

            setLoading(false);

            return;

        }

        toast.success("Registration Submitted Successfully!");

        setLoading(false);

        navigate("/dashboard");

    };

    return (

        <div className="auth-page">

            <GlassCard>

                <div className="auth-header">

                    <h1>Student Registration</h1>

                    <p>

                        Complete your registration form

                    </p>

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

                        icon={<FaUser />}

                        required

                    />

                    <InputField

                        name="father_name"

                        placeholder="Father Name"

                        value={formData.father_name}

                        onChange={handleChange}

                        icon={<FaUser />}

                        required

                    />

                    <InputField

                        type="email"

                        name="email"

                        placeholder="Email"

                        value={formData.email}

                        onChange={handleChange}

                        icon={<FaEnvelope />}

                        required

                    />

                    <InputField

                        name="phone"

                        placeholder="Phone Number"

                        value={formData.phone}

                        onChange={handleChange}

                        icon={<FaPhone />}

                        required

                    />

                    <InputField

                        type="date"

                        name="dob"

                        value={formData.dob}

                        onChange={handleChange}

                        required

                    />

                    <div className="input-container">

                        <select

                            className="custom-input"

                            name="gender"

                            value={formData.gender}

                            onChange={handleChange}

                            required

                        >

                            <option value="">Select Gender</option>

                            <option value="Male">Male</option>

                            <option value="Female">Female</option>

                        </select>

                    </div>

                    <InputField

                        name="cnic"

                        placeholder="CNIC"

                        value={formData.cnic}

                        onChange={handleChange}

                        required

                    />

                    <InputField

                        name="address"

                        placeholder="Address"

                        value={formData.address}

                        onChange={handleChange}

                        icon={<FaMapMarkerAlt />}

                        required

                    />

                    <InputField

                        name="course"

                        placeholder="Course"

                        value={formData.course}

                        onChange={handleChange}

                        icon={<FaBook />}

                        required

                    />

                    <InputField

                        name="qualification"

                        placeholder="Qualification"

                        value={formData.qualification}

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