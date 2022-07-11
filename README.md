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

## Implement Authentication and the Dashboard

1. As in Week 12, we'll put the login portion of the app in 'components/Heading'. Include the new page in 'index.js'.
2. The dashboard page resides at 'pages/dashboard/index.j' since there will be other pages under the 'dashboard' URL. As before, if there is no user name, we redirect to the 'setup' page.
3. Add the '/page/setup.js' page with the typical setup form. This will use the endpoint handler at '/api/setup.js'. When the POST is finished, we redirect the user back to '/dashboard'.
4. The last bit here is add a bit more content to the 'dashboard' page.
