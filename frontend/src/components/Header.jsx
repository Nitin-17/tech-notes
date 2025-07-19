import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaUserPlus } from "react-icons/fa6";
import { FcBusinessman, FcSurvey } from "react-icons/fc";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { FaRightFromBracket } from "react-icons/fa6";

const Header = () => {
  // Uncomment and use your actual auth context if available, otherwise 'user' will be false
  // const { user } = useAuth();
  const user = true;

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    console.log("Sending back");

    if (isSuccess) {
      console.log("Sending back");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const onGoHomeClick = () => navigate("/dashboard");

  const isDashboard = pathname === "/dashboard";

  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Error: {error.data?.message}</p>;

  const logoutButton = (
    <button
      className="flex items-center gap-2 px-2.5 h-10 bg-[#f0f2f5] text-sm font-bold rounded-lg"
      title="Logout"
      onClick={sendLogout}
    >
      <FaRightFromBracket />
      Logout
    </button>
  );

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
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="rounded-full size-10 overflow-hidden">
              <FcBusinessman size={28} />
            </div>
            {/* If 'user' object has a 'name' property, display it */}
            <span className="text-sm font-medium">
              Welcome, {user.name || "User"}
            </span>
            {logoutButton} {/* Add the logout button here */}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
