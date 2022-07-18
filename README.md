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

## Accept Payments

1. We're using Stripe, and particular Stripe Payments. See the tutorial for rationale and potential problems.
2. First, sign up for a Stripe account.
3. From the tutorial, here's how the process works (edited):
   1. When the user clicks the Purchase button on a product, we check if they are logged in.
   2. We then create a checkout session server-side and provide a success URL that will be the URL where people are sent, on our site, after the payment was successful. This will be the URL '/purchases.
   3. Then we redirect to the checkout on the Stripe server.
   4. After the payment is made, Stripe redirects the user to the success URL and sends us a confirmation via a webhook. A webhook is a POST request made by Stripe to our API.
   5. We’ll have an endpoint that receives this payment confirmation, and adds the purchase in the database.
4. Start by installing the 'stripe' modules:

```
npm install stripe raw-body
```

5. Add the secret and key from the Stripe developer's console into the .env file.
6. Since our site is running locally, we need to use the Stripe CLI in order to tell stripe how to connect to use.

```
brew install stripe/stripe-cli/stripe
```

7. From the terminal, login into Strip:

```
> strip login
```

This brings up a web page where you need to 'allow access'.

8.  Once you've completed the above, from the terminal:

```
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

This command will return a webhook signing secret code, which you’ll need to put in the '.env' file:

```
STRIPE_WEBHOOK_SECRET=whsec_SOMETHING
```

9.  In pages/product/[id].js, refactor to check the logged in user status as usual. Show 'Download' instead of 'Purchase' if the product is free. Also check whether the product is owned by the logged in user - in that case, we show that the user is the owner.
10. Handle the Download button:

    1.  Add an 'onClick' handler that will send a POST to '/api/download'.
    2.  Add an endpoint handler for 'pages/api/download.js'.
    3.  Flavio uses the following in 'download.js' - this generates an error for me:

    ```
    export default async (req, res) => {
        ...
    }
    ```

    This can be fixed with a change to eslintrc (although not clear what at this point), but it's better to do this anyway:

    ```
    const download = async (req, res) => {
        ...
    }
    export default download;
    ```

    4. As part of the download, an entry is added to the Purchase table.
    5. After the download is complete, the user is redirected back to the dashboard which shows the purchases and downloads made by the user. Along with this we need to add 'getPurchases' to data.js.
    6. List the purchases and downloads in 'pages/dashboard/index.js' - add 'getPurchases' to data.js.
    7. There's a couple of bugs here at this point - (1) in 'pages/product/[id].js', we use the router to push on the dashboard, but haven't yet imported the library or defined 'router'. (2) The tailwind in 'dashboard/index.js' uses the following in 2 places - the impact of this is that when the screen is as big as it can get on my mac, the buttons become messed up. If I remove the xl:w-1/3 it works fine. Also, it works fine if the screen is just a bit smaller - weird.

    ```
            <div
                className="border flex justify-between w-full md:w-2/3 xl:w-1/3 mx-auto px-4 my-2 py-5 "
                key={index}
              >
    ```

    EDIT: Playing around again - can't seem to make it happen with the xl:w-1/3 put back in....hmmm.

    8. It's a bit tricky to purchase something from another user - you need to logout and then login with another email. From the second email, post some products. Then, logout of the second email and then login with the first email. Right now, the last products added are shown first (with no way to list more) - so now, using the first email, you can 'download' a free product.

11. Handle the Purchase button:
    1.  In 'pages/product/[id].js', if the product is NOT free, send a POST request to '/api/stripe/session' with the details of the product to purchase.
    2.  To handle the endpoint, create the file 'stripe/session.js'. Here we pass a success and cancel URL destination, so Stripe knows where to send us after the transaction (to our dashboard).
        - Once the transaction is initialized, we store its session ID in the Purchase table, as unpaid, and finally we return to the client the Stripe session ID in sessionID - this is a bit muddled at the moment....
        - I think what Flavio is trying to say is that we must capture the Stripe session ID so that later we can send the user to payment....
    3.  In 'pages/product/[id].js', we need to add access to the stripe payment library in a 'script' tag. There's a note in the tutorial about using 'async' to prevent some next.js error.
    4.  In the onClick handler for Purchase, after the session ID is stored and returned (in 'data'), use the Stripe frontend library with the Stripe session ID to redirect the person to Stripe checkout.
        - Ran into a 500 error at this point since my account didn't have a "name" setup.
        - I somehow had a Stripe account setup - not sure how, but there was no "name".
12. Implement the webhook:
    1.  Add a page for 'pages/api/stripe/webhook.js' - this is the URL we passed to Stripe in the CLI.
    2.  This part isn't explained well, but essentially we're using the session ID given to us prior and upon success, set 'paid' to true and clear the session ID. Probably best to find another article on how this works.
    3.  This code runs in the background....
    4.  The main thing is that we're using the 'raw-body' module to pull the data from the response and that we get an event = 'check.session.completed' where we can pull out the session ID. That session ID is used to update the the data (e.g. paid).
    5.  Lastly we send a 'received' back to stripe to let them know we received the request.
    6.  And it works! From the video, enter a fake email (e.g. fake-email@gmail.com), fake credit card (e.g. 4242 4242 4242 4242), fake date (e.g. 3/44) - after clicking the purchase button, you are redirected back to the dashboard which shows your purchases.

## Handle Already Purchased

1. Add 'alreadyPurchased' to data.js. Note that this function uses 'findMany' since the data used in the 'where' clause are not marked as primary keys.
2. In 'pages/product/[id].js', refactor 'getServerSideProps' to check whether the item has already been purchased.
