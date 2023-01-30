---
title: Resurrecting five35.com
content-tags:
- 11ty
- fluff
- meta
---

Though I had picked up the domain name five35.com years ago, I had never really
done anything with it and, after a hosting change a while back, the site was
completely in shambles. But now, I had the time and motivation to *do* something
about it, so I set about turning it into a place where I could post things I
wrote. (For example, this very article!)

## First attempt: Jekyll

For what would be a pretty straightforward blog site, an
[<abbr title="static site generator">SSG</abbr>][ssg] was appealing.
[GitHub Pages][github-pages] seemed a natural fit — it's no-cost hosting for
static pages, has builtin support for [Jekyll][jekyll] (a popular SSG), and I
was already a GitHub user. I quickly threw together a placeholder site and,
after some minor hiccups with DNS[^dns-hiccup] and filenames beginning with a
dot, the site was online!

Next, it was time to make it feel a little more like home, with a custom theme.
I [found one that looked like a good place to start][chirpy], but things quickly
started to break down. Chirpy required a newer version of Jekyll than GitHub
Pages provided. In fact, the version of Ruby it uses is old enough that getting
it to run on my Linux laptop was a real hassle due to OpenSSL versions. Even
worse, getting that version of Ruby to run in a [mock GitHubPages
environment][act] was enough trouble that I finally just threw in the towel;
trying to use that theme with the GitHub Pages build process simply wasn't worth
it.

Fortunately, there's not just an alternative, but a pretty fun one: GitHub
Actions. In fact, there's even a [beta option for building your Pages site
useing Actions][pages-actions]. But migrating to Actions didn't just free me
from the versions of Ruby and Jekyll used by the existing build process, it gave
me the option of using basically any SSG I wanted!

## Take two: Eleventy

My first thought was to simply upgrade to Jekyll 4 and keep going, but that
still had the potential for me to reach a point where I couldn't continue
customizing without learning Ruby. I started to compare various SSGs, but one
already had its hooks in me — I've been following [Zach Leatherman's
blog][zachleat] for several years and had been hearing about Eleventy [since its
inception][eleventy-first]. Reading about it had certainly piqued my curiosity,
but I never had need of a static site — until now!

Conveniently, [Eleventy][eleventy] is also written in JavaScript, possibly *the*
lanugage I'm most familiar with. That means no level of customization is out of
my reach! (In theory, at least.) And while Eleventy's community hasn't had as
much time to grow as Jekyll's, it's also very enthusiastic and has created a
wide variety of [themes][eleventy-themes] (often called
[starters][eleventy-starters] by the 11ty community). Because I was interested
in getting into the nuts-and-bolts of Eleventy, however, I decided to opt for
the "from scratch" experience and simply take inspiration from starters I liked.

[^dns-hiccup]:
    Quick tip — if you set up a CNAME record (say, a "www." redirect), be sure
    to point it directly to your ".github.io" domain, **not** your custom domain
    name!

[act]: https://github.com/nektos/act
[chirpy]: https://chirpy.cotes.page/
[eleventy]: https://www.11ty.dev/
[eleventy-first]: https://www.zachleat.com/web/eleventy-tutorial-level-1/
[eleventy-starters]: https://www.google.com/search?q=eleventy+starters
[eleventy-themes]: https://www.google.com/search?q=eleventy+themes
[github-pages]: https://pages.github.com/
[jekyll]: https://jekyllrb.com/
[pages-actions]: https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/
[ssg]: https://en.wikipedia.org/wiki/Static_site_generator
[zachleat]: https://zachleat.com/
