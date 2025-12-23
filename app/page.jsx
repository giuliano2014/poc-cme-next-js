import dynamic from 'next/dynamic';
// import Banner from "@/components/banner"
import { getClient } from '@/lib/apollo-client';
import { GET_HOME_PAGE_DATA } from '@/lib/queries';

const ProductSlider = dynamic(() => import('@/components/ProductSlider'), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const Header = dynamic(() => import('@/components/Header'), {
    loading: () => <div className="h-32 animate-pulse bg-gray-100" />
});

const Essentials = dynamic(() => import('@/components/Essentials'), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const MultiRowSlider = dynamic(() => import('@/components/MultiRowSlider'), {
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />
});

const Shipping = dynamic(() => import('@/components/Shipping'), {
    loading: () => <div className="h-32 animate-pulse bg-gray-100" />
});

const Reassurance = dynamic(() => import('@/components/Reassurance'), {
    loading: () => <div className="h-32 animate-pulse bg-gray-100" />
});

const Support = dynamic(() => import('@/components/Support'), {
    loading: () => <div className="h-32 animate-pulse bg-gray-100" />
});

const InfoSection = dynamic(() => import('@/components/InfoSection'), {
    loading: () => <div className="h-32 animate-pulse bg-gray-100" />
});

async function getHomePageData() {
    try {
        const { data } = await getClient().query({
            query: GET_HOME_PAGE_DATA,
            context: {
                fetchOptions: {
                    next: { revalidate: 300 } // Cache de 5 minutes
                }
            }
        });
        return data?.getHomePageData || null;
    } catch (error) {
        console.error('[v0] Error fetching GraphQL:', error);
        return null;
    }
}

export default async function Home() {
    const homeData = await getHomePageData();

    return (
        <div className="mb-8">
            {/* <Banner header={homeData?.header} /> */}
            <Header header={homeData?.header} meta={homeData?.meta} />
            <ProductSlider productSlider={homeData?.product_slider} />
            <Essentials essentials={homeData?.essentials} />
            <MultiRowSlider parentSelection={homeData?.parent_selection} />
            <Shipping deliveryInfo={homeData?.delivery_info} />
            <Reassurance reassurance={homeData?.reassurance} />
            <Support support={homeData?.support} />
            <InfoSection information={homeData?.information} />
        </div>
    );
}
