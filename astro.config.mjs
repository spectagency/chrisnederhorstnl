import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { loopbaan } from './src/data/loopbaan.ts';

/**
 * Zet elke markdown-tabel in een <div class="tablewrap">. Die wrapper scrollt
 * horizontaal, zodat een brede tabel de hele pagina niet meesleept op mobiel.
 */
function rehypeTableWrap() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        walk(child);
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['tablewrap'] },
            children: [child],
          };
        }
        return child;
      });
    };
    walk(tree);
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://www.chrisnederhorst.nl',
  output: 'static',
  // Eén canonieke URL-vorm voor de hele site: zonder sluitende slash. Dat is wat
  // elke interne link al gebruikte; de canonical, de JSON-LD-`@id`'s (via abs()
  // in src/lib/schema.ts) en de sitemap hieronder volgen diezelfde vorm.
  // `vercel.json` zet `trailingSlash: false` en stuurt /pagina/ met een 308 naar
  // /pagina, zodat er niet twee URL's zijn die allebei 200 geven.
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    // De sitemap-integratie volgt `trailingSlash` hierboven, dus de URL's komen
    // er zonder sluitende slash uit — gelijk aan de canonical op elke pagina.
    sitemap(),
  ],
  markdown: {
    // Vult {{jarenBeddenvak}} en de andere loopbaan-plaatshouders in de body van
    // elk markdownbestand. Zie src/data/loopbaan.ts.
    remarkPlugins: [loopbaan.remarkPlugin],
    rehypePlugins: [rehypeTableWrap],
  },
});
