import h from "vhtml";

export default class BaseLayout {
  data(): Record<string, unknown> {
    return { title: "535's Place", styles: ["base.css"] };
  }

  render({
    content,
    eleventy,
    scripts,
    section,
    styles,
    title,
  }: {
    content: string;
    scripts: Array<string>;
    styles: Array<string>;
  } & Record<string, unknown>) {
    // @ts-expect-error
    const generator = <meta name="generator" content={eleventy.generator} />;

    const scriptsBlock = (scripts ?? []).map((src) => (
      <script type="module" src={`/scripts/${src}`} />
    ));

    const stylesBlock = (styles ?? []).map((href) => (
      <link rel="stylesheet" href={`/styles/${href}`} />
    ));

    return (
      // Directives don't work in JSX.
      "<!doctype html>" +
      (
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <title>
              {title}
              {section ? " — " + section : ""} — There You Are
            </title>
            {/* <link rel="canonical" href="TODO"> */}
            {generator}
            {/* <meta name="description" content="TODO"/> */}
            <meta property="og:title" content="There You Are" />
            <meta property="og:locale" content="en_US" />
            {/* <meta property="og:description" content="TODO"/> */}
            {/* <meta property="og:url" content="TODO"/> */}
            <meta property="og:site_name" content="There You Are" />
            <meta property="og:type" content="website" />
            {/* <meta name="twitter:card" content="summary"/> */}
            {/* <meta property="twitter:title" content="TODO"/> */}
            {/* <link type="application/atom+xml" rel="alternate" href="/blog.xml" title="There You Are"/> */}

            {/*
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
            */}
            {scriptsBlock}
            {stylesBlock}
          </head>

          <body>
            <header id="page-header">
              <div class="content-container">
                <p style="background: #ccc; margin: 0 0 0 auto;">
                  There You Are
                </p>
              </div>
            </header>

            <main dangerouslySetInnerHTML={{ __html: content }} />

            <aside id="rail">
              <figure>
                <img
                  src="/avatars/bluecat.svg"
                  alt="a blue, hand-drawn cat face"
                />
                <figcaption>Ben "535" Blank</figcaption>
              </figure>

              <nav>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/about">About</a>
                  </li>
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                </ul>
              </nav>
            </aside>

            <footer id="page-footer">
              <p class="content-container">Some stuff here.</p>
            </footer>
          </body>
        </html>
      )
    );
  }
}
