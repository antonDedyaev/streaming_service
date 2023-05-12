import '@/styles/nullstyle.scss';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider, useStore } from 'react-redux';
import { setupStore } from "../store/store";

export default function App({ Component, pageProps }: AppProps) {
    const store = setupStore()

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
