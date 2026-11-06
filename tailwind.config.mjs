/** @type {import('tailwindcss').Config} */

// Deze config bevat bewust géén eigen kleur- of maatwaarden. De enige bron is
// het :root-blok bovenin src/styles/global.css; hieronder staan alleen verwijzingen.
// Zo kan een waarde niet op twee plekken uit elkaar lopen — precies de fout die
// je pas weken later ziet, omdat de meeste schermen er nog goed uitzien.
//
// De site zelf gebruikt vrijwel geen Tailwind-utilities (alleen `self-start` op
// de homepage); de opmaak komt uit de semantische klassen in global.css. Wat
// Tailwind hier wél levert is de preflight-reset, waar die stylesheet op bouwt.
// Deze theme-uitbreiding staat er dus voor het geval je alsnog een utility wilt
// gebruiken — dan pakt die vanzelf de juiste merkwaarde.
//
// Let op: opacity-modifiers (`bg-accent/50`) werken niet op een var()-waarde.
// Heb je die nodig, geef dat ene token dan als losse RGB-kanalen op.
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        card: 'var(--card)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
          faint: 'var(--ink-faint)',
        },
        line: {
          DEFAULT: 'var(--line)',
          soft: 'var(--line-soft)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          deep: 'var(--accent-deep)',
          soft: 'var(--accent-soft)',
          line: 'var(--accent-line)',
          on: 'var(--on-accent)',
        },
        mint: 'var(--mint)',
        amber: {
          DEFAULT: 'var(--amber)',
          soft: 'var(--amber-soft)',
        },
      },
      fontFamily: {
        disp: 'var(--disp)',
        sans: 'var(--sans)',
      },
      maxWidth: {
        shell: 'var(--shell)',
        wrap: 'var(--wrap)',
        reading: 'var(--reading)',
      },
      // Geen DEFAULT: dat zou de betekenis van het kale `rounded` veranderen.
      borderRadius: {
        card: 'var(--r)',
        block: 'var(--r-lg)',
        hero: 'var(--r-hero)',
      },
      boxShadow: {
        dd: 'var(--shadow-dd)',
        drawer: 'var(--shadow-drawer)',
        sheet: 'var(--shadow-sheet)',
        float: 'var(--shadow-float)',
      },
    },
  },
  plugins: [],
};
