import '/styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
//INTERNAL IMPORT
import { NavBar, Footer } from "../components/componentsindex";

import { NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

const MyApp = ({Component, pageProps }) =>(
<div>
    <NFTMarketplaceProvider>
    <NavBar/>
    <Component {...pageProps} />
    <Footer />
    </NFTMarketplaceProvider>
    <Analytics />
</div>
);

export default MyApp; 