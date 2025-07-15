import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashLayout;
