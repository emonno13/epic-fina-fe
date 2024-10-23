/* eslint-disable @next/next/no-script-in-document */
import Document, { Html, Main, Head, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const googleAnalyticCode = process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_CODE;
    return (
      <Html>
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticCode}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', '${googleAnalyticCode}');`,
            }}
          />
          <script type="text/javascript" src="https://cdn.stringee.com/sdk/web/latest/stringee-web-sdk.min.js"></script>
          <script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js"></script>
          <script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-analytics.js"></script>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
          />
          <script src="https://b2b.meeymap.com/sdk/meeymap.js"></script>
          <link rel="icon" href="/assets/images/fina_title_bar_icon.png" type="image/icon type"></link>
        </Head>
        <body>
          <Main/>
          <NextScript/>
        </body>
        <script src="https://sp.zalo.me/plugins/sdk.js"></script>
        {/* <script id="650a3bc99c88980ff9a7d817" src="https://dashboard.chatfuel.com/integration/entry-point.js" async defer></script> */}
      </Html>
    );
  }
}

export default MyDocument;
