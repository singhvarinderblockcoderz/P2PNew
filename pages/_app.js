import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "@wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, provider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <SSRProvider>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} modalSize="compact">
            <Head>
              <meta
                key="deScription"
                property="og:deScription"
                content="P2P"
              />
              <meta
                property="og:image"
                key="image"
                style={{ width: "100%" }}
                content=""
              />
              <link rel="icon" type="image/x-icon" style={{ width: "100%" }} />
            </Head>

            <Component {...pageProps} />
            {/* <Footer /> */}
            <Script
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
              crossOrigin="anonymous"
            ></Script>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
              integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/fontawesome.min.css"
              integrity="sha512-RvQxwf+3zJuNwl4e0sZjQeX7kUa3o82bDETpgVCH2RiwYSZVDdFJ7N/woNigN/ldyOOoKw8584jM4plQdt8bhA=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/v5-font-face.min.css"
              integrity="sha512-FrptovHG4M5T2rAIxvIeTsv3z3luk7BF7WEYdUkTB8VtkqD+8ZYlVPpJgIGqWK65sxuom0q6/lpXpBu43CdaPg=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.min.css"
              integrity="sha512-5PV92qsds/16vyYIJo3T/As4m2d8b6oWYfoqV+vtizRB6KhF1F9kYzWzQmsO6T3z3QG2Xdhrx7FQ+5R1LiQdUA=="
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
            />

            <Script
              src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"
              integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3"
              crossorigin="anonymous"
            ></Script>
            <Script
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js"
              integrity="sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD"
              crossorigin="anonymous"
            ></Script>
          </RainbowKitProvider>
        </WagmiConfig>
      </SSRProvider>
    </SessionProvider>
  );
}

export default MyApp;
