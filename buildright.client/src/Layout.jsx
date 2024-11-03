import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/SideBar";
import SideBarPopupItem from "./components/SideBarPopupItem";
import SideBarSubitem from "./components/SidebarSubitem";
import './components/styles/layout.css';
import { fetchData, fetchOptions } from "./services/apiService";
import { BASE_URL_CONTENT } from "./util/constants";
import Footer from "./components/Footer";

const Layout = () => {
    const [primaryServices, setPrimaryServices] = useState([]);

    useEffect(() => {
        const getPrimaryServices = async () => {
            const options = fetchOptions();
            const { status, response } = await fetchData(BASE_URL_CONTENT, 'Services/PrimaryServices', options);

            if (!status) {
                console.error(status);
            } else {
                setPrimaryServices(response.primaryServices);
            }

        }

        getPrimaryServices();
    }, []);

    return (
        <div style={{ width: '100%', overflowX: 'clip' }}>
            <div>
                <Outlet />
            </div>
            <SideBar >
                <SideBarPopupItem title="Store" description="Visit our store!" href="/store" />
                <SideBarPopupItem title="Services" description="We are dedicated to providing exceptional services:" >
                    {primaryServices.length > 0 && primaryServices.map(service => (
                        <SideBarSubitem title={service.title} description={service.description} href={service.url} key={service.title} />
                    ))}
                </SideBarPopupItem>
                <SideBarPopupItem title="Company" >
                    <SideBarSubitem title="About" href="/about" />
                    <SideBarSubitem title="Insights" href="/insights" />
                    <SideBarSubitem title="Career" href="/career" />
                    <SideBarSubitem title="Ventures" href="/ventures" />
                </SideBarPopupItem>
            </SideBar>
            <Footer />
        </div>
    )
}

export default Layout;