import Head from 'next/head';
import { ReactNode } from 'react';
import Navbar from '../menu/Navbar/Navbar';

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

            <Navbar page={page} />

            {children}
        </>
    );
};

export default MainContainer;
