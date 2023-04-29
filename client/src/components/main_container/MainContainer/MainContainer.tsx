import Head from 'next/head';
import { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TabBar from '../TabBar/TabBar';
import { useRouter } from 'next/router';
import SearchModal from '@/components/modals/SearchModal/SearchModal';
import LoginModal from '@/components/modals/LoginModal/LoginModal';

interface MainContainerProps {
    children: ReactNode;
    keywords: string[];
    title: string;
    page: 'home' | 'other';
}

const MainContainer = ({ children, keywords, title, page }: MainContainerProps) => {
    const { query } = useRouter()

    const queryParams = Object.keys(query)

    return (
        <>
            <Head>
                <meta name="keywords" content={[...['ivi', 'movies', 'series'], ...keywords].join(',')} />
                <title>{title}</title>
            </Head>

            <Header page={page} />

            {children}

            {queryParams.includes('ivi_search') && <SearchModal />}
            {queryParams.includes('sign-in') && <LoginModal type='sign-in' />}
            {queryParams.includes('sign-up') && <LoginModal type='sign-up' />}

            <TabBar />
            <Footer />
        </>
    );
};

export default MainContainer;
