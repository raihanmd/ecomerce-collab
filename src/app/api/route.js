const { NextResponse } = require("next/server");

export async function GET() {
  const mainPath = "https://ecomerce-collab-raihanmd.vercel.app";
  return NextResponse.json(
    {
      endpoints: {
        GET: [
          {
            path: `${mainPath}/api/products`,
            description: "Get all necessary products limit 50: /api/products",
          },
          {
            path: `${mainPath}/api/{userName}/{slugProduct}`,
            description: "Get information detail product {slugProduct} with owner's {userName}: /api/{userName}/{slugProduct}",
          },
          {
            path: `${mainPath}/api/{userName}`,
            description: "Get information about {userName}: /api/{userName}",
          },
          {
            path: `${mainPath}/api/order/{userName}`,
            description: "Get order information about {userName}: /api/order/{userName}",
          },
          {
            path: `${mainPath}/api/cart/{userName}`,
            description: "Get cart information about {userName}: /api/order/{userName}",
          },
          {
            path: `${mainPath}/api/wishlist/{userName}`,
            description: "Get wishlist information about {userName}: /api/order/{userName}",
          },
        ],
        POST: [
          {
            path: `${mainPath}/api/login`,
            description: "Existing user login : /api/login",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              userName: "Lorem",
              password: "Ipsum",
            },
          },
          {
            path: `${mainPath}/api/register`,
            description: "Register new account: /api/register",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              firstName: "Lorem",
              lastName: "Ipsum",
              userName: "dolor sit",
              password: "amet",
              cityUser: "consectetur",
            },
          },
          {
            path: `${mainPath}/api/products`,
            description: "Add product : /api/products",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              idUser: "usr_001",
              nameProduct: "Lorem",
              priceProduct: 1000,
              categoryProduct: "Ipsum",
              descriptionProduct: "Dolor sit amet.",
              quantityProduct: 100,
            },
          },
          {
            path: `${mainPath}/api/order`,
            description: "Create Order : /api/order",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              idUser: "usr_001",
              idProduct: "prd_001",
              quantityProduct: 10,
            },
          },
          {
            path: `${mainPath}/api/cart`,
            description: "Create cart : /api/cart",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              idUser: "usr_001",
              idProduct: "prd_001",
              quantityProduct: 10,
            },
          },
          {
            path: `${mainPath}/api/wallet`,
            description: "Create wallet for free Rp.1.000.000 balance : /api/wallet",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              idUser: "usr_001",
            },
          },
          {
            path: `${mainPath}/api/checkout`,
            description: "Checkout the order : /api/checkout",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              idUser: "usr_001",
              idOrder: "ord_001",
            },
          },
          {
            path: `${mainPath}/api/wishlist`,
            description: "Create wishlist : /api/wishlist",
            header: {
              "API-Key": "API-Key",
            },
            formatBody: {
              idUser: "usr_001",
              idProduct: "prd_001",
            },
          },
        ],
      },
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      },
    }
  );
}
