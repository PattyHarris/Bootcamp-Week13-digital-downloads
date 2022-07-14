// Returns a list of products for a given 'author'.
export const getProducts = async (options, prisma) => {
  const data = {
    where: {},
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  };

  if (options.author) {
    data.where.author = {
      id: options.author,
    };
  }

  if (options.take) {
    data.take = options.take
  }

  const products = await prisma.product.findMany(data);

  return products;
};

// Return the details of a product.
export const getProduct = async (id, prisma) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });

  return product;
};

// Return the list of products sold by this user.
export const getUser = async (id, prisma) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
