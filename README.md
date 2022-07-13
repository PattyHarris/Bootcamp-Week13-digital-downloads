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

## Create a New Product

1. Add a button on the dashboard page to enable a user to create a product.
2. We are not actually using a 'button', but a link for the 'new product' page.
3. Add a 'dashboard/new.js' for the new product page. Ideally, this would be called something better, but since we're using next.js...Here we're using FormData since we're sending along an image (otherwise, we'd use JSON as we did in 'setup.js'). It also means the endpoint is handled differently than that for the setup endpoint. Here we also need to install next-connect and multiparty:

```
npm install next-connect@0.12.2 multiparty
```

Note the version we're using - the latest version is a total re-write and is not backwards compatible.

4. Create a file 'lib/upload.js' to handle the file uploads. With this file we als need to install the AWS upload file helpers:

```
npm install aws-sdk
```

5. And finally create the 'api/new.js' file to handle the new product endpoint. Item to node is that the price is multiplied by 100 to avoid rounding errors.
