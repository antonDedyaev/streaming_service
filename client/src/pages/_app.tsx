import '@/styles/nullstyle.scss';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import { appWithTranslation } from 'next-i18next';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

function App({ Component, pageProps }: AppProps<{ session: Session }>) {
    const store = setupStore();
    return (
        <SessionProvider session={pageProps.session}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SessionProvider>
    );
}
export default appWithTranslation(App);
