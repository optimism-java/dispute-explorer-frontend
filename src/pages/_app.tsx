import "../styles/global.css";
import "@upstash/feedback/index.css";

import type { AppProps as NextAppProps } from "next/app";
import { ThemeProvider, useTheme } from "next-themes";
import Head from "next/head";
import { SkeletonTheme } from "react-loading-skeleton";
import AppLayout from "@/components/AppLayout/AppLayout";
import { useIsMounted } from "@/hooks/useIsMounted";
import Script from "next/script";

const App = ({ Component, pageProps }: NextAppProps) => {
  const { resolvedTheme } = useTheme();

  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <SkeletonTheme
      baseColor={resolvedTheme === "dark" ? "#434672" : "#EADEFD"}
      highlightColor={resolvedTheme === "dark" ? "#7D80AB" : "#E2CFFF"}
    >
      <Head>
        <title>Super Proof</title>
        <meta name="description" content="Super proof" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-3NB8M7WDPX"
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3NB8M7WDPX');
        `}
      </Script>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      {/* <FeedbackWidget />
          {env.NEXT_PUBLIC_VERCEL_ANALYTICS_ENABLED && <Analytics />} */}
    </SkeletonTheme>
  );
};

const AppWrapper = (props: NextAppProps) => {
  return (
    <ThemeProvider attribute="class">
      <App {...props} />
    </ThemeProvider>
  );
};

export default AppWrapper;
