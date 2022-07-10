# Digital Download

This week's project is to create a digit download app similar to Esty or Gumroad.
- home page that lists the products on sale.
- clicking a product will show bring up the product details on it's own page.
- users can checkout products to purchase.
- a dashboard will show sales or purchases.

## Initial Setup

1. Initial setup of Next.js and NextAuth.js is the same as prior weeks. The completed project for reference is here: https://github.com/flaviocopes/bootcamp-2022-week-13-digital-downloads
2. Setup Prisma as before, and add tables for digit-download.
3. The site for generating secrets isn't working at the moment - TBD get a new secret:
```
https://generate-secret.vercel.app/32
```

## Data Model

The data model additional includes a Product and Purchases table.
