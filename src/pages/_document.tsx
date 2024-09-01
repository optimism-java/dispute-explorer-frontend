import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en" className="dark h-full">
        <Head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <Script strategy="lazyOnload">
            {`<!-- Google Tag Manager -->
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WQPWX345');
<!-- End Google Tag Manager -->`}
          </Script>
        </Head>
        <body
          className={`
        h-full
        bg-background-light
        text-content-light
        dark:bg-background-dark
        dark:text-content-dark
        `}
        >
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WQPWX345"
              height="0"
              width="0"
              className=""
              // style="display:none;visibility:hidden"
            ></iframe>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
