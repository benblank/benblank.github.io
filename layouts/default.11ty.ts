export default class DefaultLayout {
  data(): Record<string, unknown> {
    return { title: "535's Place" };
  }

  render({ content, eleventy, section, title }: Record<string, unknown>) {
    // @ts-expect-error
    const { generator } = eleventy;

    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>${title}${section ? " — " + section : ""} — There You Are</title>
          <!--<link rel="canonical" href="TODO">-->
          <meta name="generator" content="${generator}">
          <meta property="og:title" content="There You Are">
          <meta property="og:locale" content="en_US">
          <!--<meta name="description" content="TODO">-->
          <!--<meta property="og:description" content="TODO">-->
          <!--<meta property="og:url" content="TODO">-->
          <meta property="og:site_name" content="There You Are">
          <meta property="og:type" content="website">
          <!--<meta name="twitter:card" content="summary">-->
          <!--<meta property="twitter:title" content="TODO">-->
          <!--<link type="application/atom+xml" rel="alternate" href="/blog.xml" title="There You Are">-->

          <!--
          <script type="application/ld+json">
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "description": "TODO",
              "headline": "There You Are",
              "name": "There You Are",
              "url": "https://five35.com/"
            }
          </script>
          -->
          </head>

        <body>
          <header>
            <p>There You Are</p>
            <!--<nav>...</nav>-->
          </header>

          <main>
            ${content}
          </main>

          <footer>
            <p>Some stuff here.</p>
          </footer>
        </body>
      </html>
    `;
  }
}
