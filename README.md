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
6. Forgot to mention that the UI for creating a new product is pretty bad - the product image and product links for uploading them are not really clear. They represent the product image and product where a product is assumed to be some sort of text in electronic form, such as in Gumroad.

## Show Products on the Dashboard

1. As with previous projects, create 'lib/data.js' to handle the interactions with the database. The first method will be 'getProducts' to return a list of product.
2. 'getProducts' is called in 'getServerSideProps' in 'dashboard/index.js'.

## Handle Edit Product

1. Allow the user to edit a product. Setup the edit product page at 'dashboard/product/[...id].js'. Note that this is a good bit of code for setting up a default page:

```
export default function Product() {

  return (
    <div>

    </div>
  )
}

export async function getServerSideProps(context) {

}
```

3. Add 'getProduct' to 'data.js'. As before, this will be called in 'getServerSideProps'.
4. Pass 'product' as a prop to 'Product'.
5. Check the session and setup as usual. As in the last tutorial, 'next' has been updated such that in the code where we redirect to '/setup', we also need to return a null page (whereas before, we just continued on).
6. The endpoint handler is 'api/edit'.

## Create the Frontend

1. Here we will focus on the single product page, and the list of products in the user profile. Those 2 are interlinked, from the profile you can navigate to a single product, and vice versa.
2. Add a “View” link into the dashboard so we can see how products look in the frontend, e.g. what regular users see - the link will point to the URL '/product/<ID>'.
3. Add the link to 'pages/dashboard/index.js'.
4. Create the file 'pages/product/[id].js' for the new 'View' page. In this page we link to '/profile/<USER ID>' - so we also need to create the page '/pages/profile/[id].js'. This page shows the list of products sold by this user.
5. The new profile page needs 'getUser' - add that to data.js. We could also refactor how products are returned in the Profile page - since getUser returns the list of products, getServerSideProps doesn't really need to call 'getProducts'. Then, when iterating over the products, you would use 'user.products' and 'user.products.map...'. Remove 'products' from the props returned from 'getServerSideProps' and as input into Profile....

## Showcase Authors and Products

1. We will currently show the 'top' 3 items from the database. Once we put 'sales' in place, we will show the top 3 items sold.
2. In 'index.js', we show the products as we did on the 'profile' page.
3. Refactor 'getProducts' to accept a 'take' option.
