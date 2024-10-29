import { useEffect, useState } from "react";
import ArrayDisplay from "../../components/ArrayDisplay";
import Footer from "../../components/Footer";
import Page from "../../components/Page";
import PictureHeroWithTitle from "../../components/PictureHeroWithTitle";
import PromoBar from "../../components/PromoBar";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import ServiceHighlightTitle from "../../components/ServiceHighlightTitle";
import { fetchData, fetchOptions } from "../../services/apiService";
import { BASE_URL_CONTENT } from "../../util/constants";
import ServiceHighlightTitleWithLink from "../../components/ServiceHighlightTitleWithLink";

const Home = () => {
    const [landingPage, setLandingPage] = useState({});

    useEffect(() => {

        const getLandingPage = async () => {
            const options = fetchOptions();
            const { status, response } = await fetchData(BASE_URL_CONTENT, 'Services/LandingPage', options);

            if (!status) {
                console.error(response);
            }

            setLandingPage(response);
            console.log(response);
        }

        getLandingPage();
    }, []);

    return (
        <Page>

            {landingPage.promotions && landingPage.promotions.length > 0 && (
                <PromoBar content={landingPage.promotions[0].title} clickable={landingPage.promotions[0].isClickable} />
            )}

            <Section>
                <PictureHeroWithTitle src="/assets/hero.jpg" alt="This is the picture hero" textColor="white" />
            </Section>

            {landingPage.primaryServices && (
                <Section>
                    <SectionTitle label="Our Services" />
                    <ArrayDisplay>
                        {landingPage.primaryServices.map(service => {
                            if (service.isClickable) {
                                return <ServiceHighlightTitleWithLink key={service.title} label={service.title} href={service.url} />;
                            } else {
                                return <ServiceHighlightTitle key={service.title} label={service.title} />;
                            }
                        })}
                    </ArrayDisplay>
                </Section>
            )}

            {landingPage.usps && (
                <Section>
                    <SectionTitle label="Why choose us?" />
                    <ArrayDisplay>
                        {landingPage.usps.map(usp => (
                            <ServiceHighlightTitle key={usp.id} label={usp.title} description={usp.description} clickable={usp.isClickable} />
                        ))}
                    </ArrayDisplay>
                </Section>
            )}


            <Footer />

        </Page>
    )
};

export default Home;