# Quickshot
A tabletop one shot generator
[Demo](https://tabletop-one-shot.vercel.app/)

## Local dev setup
1. `npm i`
2. `nx serve ttos`

### Code Packages
This project is built using internal packages (monorepo), powered by [Nx](https://nx.dev).
#### Application Package
- [/apps/ttos](/apps/ttos) Main web application, wrote in [NextJS](https://nextjs.org/docs) (v13's app router style). Contains React [Page](/apps/ttos/app/) component(s) and [API](/apps/ttos/app/api/) routes.
#### Library Packages
- [@components-layout](/libs/components-layout) Custom React component library. Contains highly reusable React **Non-Page styling** components.
- [@components-react-oneshot](/libs/components-react-oneshot) Custom React components unique to our one-shot application. Contains highly reusable React **Non-Page** components.
- [@helper](/libs/helper) Various helper functions for both client and server
- [@static](/libs/static) Various standard and app-specific static data variables
