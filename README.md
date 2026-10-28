# Attire Aura: dresses & accessories store (Angular 21 + PrimeNG 21 UI starter)

UI only (HTML, CSS, PrimeNG). All logic is left as `// TODO` for you to build.

## Setup
Needs Node `^20.19`, `^22.12` or `>=24`.
```bash
npm install
npm start        # ng serve
```
If `npm install` complains about a version range, let npm pick matching ones:
`npm i primeng @primeuix/themes primeicons`

## What changed from the Angular 19 starter
- Full project scaffold added (`package.json`, `angular.json`, `tsconfig*`, `src/main.ts`, `public/`).
- Angular 21: zoneless by default (no `zone.js`), `provideBrowserGlobalErrorListeners()`.
- `provideAnimationsAsync()` removed (deprecated; PrimeNG 20+ doesn't need it).
- `@primeng/themes` → `@primeuix/themes`.
- Redundant `standalone: true` removed (default since v19).
- Mutable component fields are now `signal()`s so templates stay reactive without zone.js.

## Pages (routes)
`/` home · `/shop` and `/shop/:category` listing · `/product/:id` detail · `/wishlist` · `/bag` · `/checkout`

## Components
| Folder | Components |
|---|---|
| `layout/` | announcement-bar, header (nav + search toggle + badges), footer, mini-cart (bag drawer with free-delivery bar) |
| `home/` | hero, collection-tiles, product-section, perks-strip, newsletter |
| `shared/` | product-card (hover image swap, quick add, wishlist heart), color-swatches (reusable input/model), product-skeleton, empty-state |
| `pages/` | home-page, product-list-page (+ product-filters, mobile filter drawer), product-detail-page (gallery, colour, size, accordion), wishlist-page, cart-page, order-summary, checkout-page |

## Your TODO list
1. **State**: `CartService` and `WishlistService` with signals (add/remove/qty, counts, subtotal). Wire header badges, mini-cart, bag page, checkout, card hearts.
2. **Data**: replace `data/mock-data.ts` with an API service; use skeleton / empty-state / error states.
3. **Listing**: apply the filters (category, size, colour, price, sale), sort and pagination from URL query params.
4. **Detail**: load by `:id`; require a size before "Add to bag"; size guide dialog.
5. **Checkout**: Reactive Form with validation (+971 phone), place order, confirmation page.
6. **Search** from the header, **account/login**, and the **EN/AR + RTL** switch (CSS already uses logical properties).
7. **Polish**: `OnPush` on presentational components, `NgOptimizedImage`, mobile menu.
