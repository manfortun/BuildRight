import { useEffect, useState } from "react";
import ArrayDisplay from "../../components/ArrayDisplay";
import Page from "../../components/Page";
import PictureHeroWithTitle from "../../components/PictureHeroWithTitle";
import PromoBar from "../../components/PromoBar";
import Section from "../../components/Section";
import SectionTitle from "../../components/SectionTitle";
import ServiceHighlightTitle from "../../components/ServiceHighlightTitle";
import ServiceHighlightTitleWithLink from "../../components/ServiceHighlightTitleWithLink";
import { fetchData, fetchOptions } from "../../services/apiService";
import { BASE_URL_CONTENT } from "../../util/constants";
import ImageWithLink from "../../components/ImageWithLink";
import SlantedArrayDisplay from "../../components/SlantedArrayDisplay";
import SlantedArrayDisplayItem from "../../components/SlantedArrayDisplayItem";

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
        }

        getLandingPage();
    }, []);

    return (
        <Page>

            <PictureHeroWithTitle src="hero.jpg" alt="This is the picture hero" textColor="white" />


            {landingPage.promotions && landingPage.promotions.length > 0 && (
                <PromoBar image={landingPage.promotions[0].image} clickable={landingPage.promotions[0].isClickable} />
            )}

            {landingPage.primaryServices && (
                <Section>
                    <SectionTitle label="Our Services" />
                    <ArrayDisplay noOfColumns="6" gap="0px">
                        {landingPage.primaryServices.map(service => {
                            if (service.isClickable) {
                                return <ServiceHighlightTitleWithLink key={service.title} label={service.title} href={service.url} height="400px" backgroundSrc="hero.jpg"/>;
                            } else {
                                return <ServiceHighlightTitle key={service.title} label={service.title} />;
                            }
                        })}
                    </ArrayDisplay>
                </Section>
            )}

            {landingPage.usps && (
                <Section backgroundColor="#f9f9f9">
                    <SectionTitle label="Why choose us?" />
                    <ArrayDisplay>
                        {landingPage.usps.map(usp => (
                            <ServiceHighlightTitle key={usp.id} label={usp.title} description={usp.description} clickable={usp.isClickable} />
                        ))}
                    </ArrayDisplay>
                </Section>
            )}

            {landingPage.partners && (
                <Section >
                    <SectionTitle label="Our Business Partners" />
                    <ArrayDisplay>
                        {landingPage.partners.map(partner => (
                            <ImageWithLink title={partner.title} src={partner.image} link={partner.url} />
                        )) }
                    </ArrayDisplay>
                </Section>
            ) }
        </Page>
    )
};

export default Home;