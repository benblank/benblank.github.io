# Layout / style design notes

## General principles

* golden ratio good
  * e.g. content:navbar widths should ≅ 1.6…:1
  * also maybe top/header/intro area and main body when scrolled to the top?
* Hick's Law
  * more choices = more time to decide
  * too many choices = nevermind
* Fitt's Law
  * time to click scales with log2(distance/width)
    * linear distance, without regard to axes
    * width of the target area *along the distance line*
  * the "prime pixel" is where the cursor already is
    * there is limited control over the prime pixel when opening menus or
      navigating from page to page
* gestalt design
  * proximity: things which are close and have matching spacing form groups
  * similarity: things with matching attributes (size, color, shape) form groups
  * closure?: we fill in gaps
  * symmetry: balancing/mirroring look good, even when imperfect
  * common fate?: matching movement forms groups
  * continuity?: something something dotted lines?
* negative space
  * chunks of emptiness become their own things
  * a balance of positive and negative space can look tidy
* people don't "read", they "scan"
  * paragraphs should lead with their premise/topic?
  * callouts (boxes, images, code blocks with backgrounds, etc.) pull attention
    from text

## Specific design elements

* front/landing page content?
  * general "about" stuff, plus links to recent blog posts?
  * should it have a navbar?
* dark/light/dark/light columns?
  * dark background in left margin, light main column, dark navbar, light right
    margin
    * for different color margins, sharp horizontal gradient for page
      background?
    * medium brigtness top/header/intro area to tie it together
* should articles have blurbs?
  * short paragraph (sentence?) called out between title and body
  * can be used for contentful links
  * 11ty uses the "gray-matter" package; could use excerpts, perhaps?
* use shapes (icons) for blog post categories?
  * can be incorporated into lists of contentful links, a la list markers
  * what about multicategory posts (e.g. game programming)?
* should there be a top/header/intro area?
  * what would go there?
  * how tall should it be?
    * should it shorten/collapse when scrolled?
