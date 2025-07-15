import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaUserPlus } from "react-icons/fa6";
import { FcBusinessman, FcSurvey } from "react-icons/fc";
//import { useAuth } from "../context/AuthContext";

const Header = () => {
  //const { user } = useAuth();
  const user = false;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClick = () => navigate("/dashboard");

  const isDashboard = pathname === "/dashboard";

  return (
    <header className="flex items-center justify-between border-b border-[#f0f2f5] px-10 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#111418]">
          <FcSurvey size={24} />
          <h2 className="text-lg font-bold tracking-tight">
            <Link to="/">Tech Notes</Link>
          </h2>
        </div>
        {user && !isDashboard && (
          <button title="Go to Dashboard" onClick={onGoHomeClick}>
            Dashboard
          </button>
        )}
      </div>

      <div className="flex items-center gap-8">
        {!user ? (
          <div className="flex gap-2">
            <Link to="/login">
              <button className="flex items-center gap-2 px-2.5 h-10 bg-[#f0f2f5] text-sm font-bold rounded-lg">
                <FaUser />
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="flex items-center gap-2 px-2.5 h-10 bg-[#f0f2f5] text-sm font-bold rounded-lg">
                <FaUserPlus />
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="rounded-full size-10 overflow-hidden">
              <FcBusinessman size={28} />
            </div>
            <span className="text-sm font-medium">Welcome, {user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
