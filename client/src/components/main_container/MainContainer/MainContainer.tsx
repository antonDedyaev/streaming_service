import Head from 'next/head';
import { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TabBar from '../TabBar/TabBar';

interface MainContainerProps {
    children: ReactNode;
    keywords: string[];
    title: string;
    page: 'home' | 'other';
}

const MainContainer = ({ children, keywords, title, page }: MainContainerProps) => {
    return (
        <>
            <Head>
                <meta name="keywords" content={[...['ivi', 'movies', 'series'], ...keywords].join(',')} />
                <title>{title}</title>
            </Head>

            <Header page={page} />

            {children}

            <TabBar />
            <Footer />
        </>
    );
};

export default MainContainer;
