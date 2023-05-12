import '@/styles/nullstyle.scss';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
<<<<<<< HEAD
import { Provider, useStore } from 'react-redux';
import { setupStore } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
    const store = setupStore()

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
=======
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
>>>>>>> 25d6852ca653a153399b728c7d40629bfef28a27
}

export default appWithTranslation(App);
