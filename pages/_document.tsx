import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/the-spezi-project-logo.png" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="The Spezi Project" />
        <meta
          property="og:description"
          content="A personal database and rating app for Spezi and Cola drinks. Explore my ratings and comparisons of your favorite fizzy beverages!"
        />
        <meta property="og:image" content="/the-spezi-project-logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://spezi.auch.cool" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Spezi Project" />
        <meta
          name="twitter:description"
          content="A personal database and rating app for Spezi and Cola drinks. Explore my ratings and comparisons of your favorite fizzy beverages!"
        />
        <meta name="twitter:image" content="/the-spezi-project-logo.png" />
        {/* Inter — variable weight 100-900 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-sans antialiased text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
