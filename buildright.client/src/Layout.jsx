import { Outlet } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";
import { useContext } from "react";
import SideBar from "./components/SideBar";

const Layout = () => {
    const taskBarHeight = 4;

    return (
        <div style={{ height: '100vh', width: '100%', overflowY: 'auto', overflowX: 'clip' }}>
            <SideBar >
                This is the sidebar
            </SideBar>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;