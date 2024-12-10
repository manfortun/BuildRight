import { useEffect, useState } from "react";
import CategorizedItemArrayDisplay from "../../components/CategorizedItemArrayDisplay";
import Page from "../../components/Page";
import PromoBar from "../../components/PromoBar";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import { fetchData, fetchOptions } from "../../services/apiService";
import { BASE_URL_CONTENT } from "../../util/constants";

const Store = () => {
    const [activePromos, setActivePromos] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);

    useEffect(() => {
        getActivePromotions();
        getNewArrivals();
    }, []);

    const getActivePromotions = async () => {
        const options = fetchOptions();
        const { status, response } = await fetchData(BASE_URL_CONTENT, 'Promo', options);

        if (!status) {
            console.error(status);
        } else {
            setActivePromos(response.promotions);
        }
    }

    const getNewArrivals = async () => {
        const options = fetchOptions();
        const { status, response } = await fetchData(BASE_URL_CONTENT, 'Products/NewArrivals', options);

        if (!status) {
            console.error(status);
        } else {
            setNewArrivals(response.products);
        }
    }

    return (
        <Page>

            {activePromos && activePromos.length > 0 && activePromos.map(promo => (
                <PromoBar clickable={promo.clickable} key={promo.title} image={promo.image} />
            ))}

            {newArrivals?.length > 0 && (
                <Section>
                    <SectionTitle label="New Arrivals" />
                    <CategorizedItemArrayDisplay items={newArrivals} />
                </Section>
            )}

        </Page>
    )
}

export default Store;