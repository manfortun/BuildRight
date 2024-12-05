import { useEffect, useState } from "react";
import AdminRenderer from "../../AdminRenderer";
import Page from "../../components/Page";
import PromoBar from "../../components/PromoBar";
import { getLayout } from "../../services/layoutService";

const Home = () => {
    const [page, setPage] = useState([]);

    useEffect(() => {
        const init = async () => {
            const layout = await getLayout('home');
            if (layout) setPage(layout);
        };

        init();
    }, []);

    if (!page) return <div>Please wait...</div>

    return (
        <Page>
            {page && page.length > 0 && page.map(props => <AdminRenderer {...props} />) }

            {page.promotions && page.promotions.length > 0 && (
                <PromoBar image={page.promotions[0].image} clickable={page.promotions[0].isClickable} />
            )}
        </Page>
    )
}

export default Home;