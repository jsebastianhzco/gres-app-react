// layouts/MainLayout.jsx
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import ImportantInfo from "../components/ImportantInfo.jsx";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />

      <div id="layoutSidenav">
        <Sidebar />
     
        <div id="layoutSidenav_content">
          <main className="forms-container">
             <div className="info-container">
               <ImportantInfo/>
             </div>
               
        
            <div className="container-fluid px-4">
              <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;