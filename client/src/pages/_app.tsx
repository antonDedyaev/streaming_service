import '@/styles/nullstyle.scss';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import { appWithTranslation } from 'next-i18next';

function App({ Component, pageProps }: AppProps) {
    const store = setupStore();

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
export default appWithTranslation(App);
