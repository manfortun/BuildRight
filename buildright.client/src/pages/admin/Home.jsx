import { useEffect, useState } from "react";
import { AdminRender } from "../../Renderer";
import Page from "../../components/Page";
import PromoBar from "../../components/PromoBar";
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

    return (
        <Page>
            {landingPage && landingPage.length > 0 && landingPage.map(page => AdminRender(page))}

            {landingPage.promotions && landingPage.promotions.length > 0 && (
                <PromoBar image={landingPage.promotions[0].image} clickable={landingPage.promotions[0].isClickable} />
            )}
        </Page>
    )
}

export default Home;