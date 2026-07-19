import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaSignOutAlt, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

import { supabase } from "../supabase";

import GlassCard from "../components/GlassCard";
import PrimaryButton from "../components/PrimaryButton";

import "../assets/css/auth.css";

function Dashboard() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function getUser() {

            const {

                data: { user }

            } = await supabase.auth.getUser();

            if (!user) {

                navigate("/login");

                return;

            }

            setUser(user);

            setLoading(false);

        }

        getUser();

    }, [navigate]);

    const handleLogout = async () => {

        const { error } = await supabase.auth.signOut();

        if (error) {

            toast.error(error.message);

            return;

        }

        toast.success("Logged Out Successfully");

        navigate("/login");

    };

    if (loading) {

        return (

            <div className="auth-page">

                <GlassCard>

                    <h2>Loading...</h2>

                </GlassCard>

            </div>

        );

    }

    return (

        <div className="auth-page">

            <GlassCard>

                <div className="auth-header">

                    <h1>Dashboard</h1>

                    <p>

                        Welcome to Student Portal

                    </p>

                </div>

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >

                    <FaUser
                        size={70}
                        color="#5C5C99"
                    />

                    <h3
                        style={{
                            marginTop: "20px"
                        }}
                    >
                        {user?.email}
                    </h3>

                </div>

                <PrimaryButton
                    onClick={() => navigate("/registration")}
                >

                    <FaUserGraduate
                        style={{
                            marginRight: "10px"
                        }}
                    />

                    Student Registration

                </PrimaryButton>

                <div style={{ marginTop: "20px" }}>

                    <PrimaryButton
                        onClick={handleLogout}
                    >

                        <FaSignOutAlt
                            style={{
                                marginRight: "10px"
                            }}
                        />

                        Logout

                    </PrimaryButton>

                </div>

            </GlassCard>

        </div>

    );

}

export default Dashboard;