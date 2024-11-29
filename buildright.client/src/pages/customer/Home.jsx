import { useEffect, useState } from "react";
import Page from "../../components/Page";
import PromoBar from "../../components/PromoBar";
import { ComponentMap } from "../../components/maps/componentMap";
import { getLayout } from "../../services/layoutService";

const Home = () => {
    const [landingPage, setLandingPage] = useState([]);

    useEffect(() => {
        const init = async () => {
            const layout = await getLayout('home');
            if (layout) setLandingPage(layout);
        };

        init();
    }, []);

    if (!landingPage) return <div>Please wait...</div>

    const Render = (data) => {
        let children = [];

        if (data.children && data.children.length > 0) {
            children = data.children.map(c => { return Render(c) });
        }

        const { type, ...props } = data;
        const updatedProps = {
            ...props,
            children: children
        };
        const Component = ComponentMap[type] || null;
        return Component ? <Component {...updatedProps} /> : <div>Component not found...</div>;
    }

    return (
        <Page>
            {landingPage && landingPage.length > 0 && landingPage.map(page => Render(page))}

            {landingPage.promotions && landingPage.promotions.length > 0 && (
                <PromoBar image={landingPage.promotions[0].image} clickable={landingPage.promotions[0].isClickable} />
            )}
        </Page>
    )
};

export default Home;