import React, { useEffect, useState } from "react";
import "../Course/Course.css";
import img from "../../Assets/Home/course1.jpg";
import { Link } from "react-router-dom";

const AddToCart = () => {
  const cartData = [
    {
      courseId: 1,
      image: img,
      title: "The Complete Personal Finance For Kids",
      author: "Steeve Simbert",
      price: 500,
    },
    {
      courseId: 2,
      image: img,
      title: "React JS Full Course",
      author: "Manoj Kumar",
      price: 499,
    },
    // {
    //   courseId: 3,
    //   image: img,
    //   title: "Java Springboot Tutorial",
    //   author: "Siva",
    //   price: 399,
    // },
    // {
    //   courseId: 4,
    //   image: img,
    //   title: "Java Springboot Tutorial",
    //   author: "Siva",
    //   price: 299,
    // },
  ];

  const [total, setTotal] = useState(0);
  const [totalCartItem, setTotalCartItem] = useState(0);

  useEffect(() => {
    setTotalCartItem(cartData.length);
    const calculatedTotal = cartData.reduce((acc, cart) => acc + cart.price, 0);
    setTotal(calculatedTotal);
    console.log(calculatedTotal);
  }, [cartData]);

  return (
    <div className="min-h-screen w-full bg-herobg">
      <div className="pb-10 pt-28">
        <div className="mx-11 flex gap-5 pt-5">
          <div className="container mx-auto">
            <div className="lg:flex">
              <div className="rounded-md bg-white px-10 py-10 lg:w-3/4">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="text-2xl font-semibold">My Cart</h1>
                  <h2 className="text-2xl font-semibold">
                    {totalCartItem} Items
                  </h2>
                </div>

                {/* Cart Headings */}

                <div className="mb-5 mt-10 flex">
                  <h3 className="w-2/5 text-xs font-semibold uppercase text-gray-600">
                    Product Details
                  </h3>
                  <h3 className="w-1/5 text-center  text-xs font-semibold uppercase text-gray-600">
                    Price
                  </h3>
                  <h3 className="w-1/5  text-center text-xs font-semibold uppercase text-gray-600">
                    Total
                  </h3>
                  <h3 className="w-1/5  text-center text-xs font-semibold uppercase text-gray-600">
                    Action
                  </h3>
                </div>

                {/* Cart Body */}
                {cartData.map((course, i) => (
                  <div key={i}>
                    <div className="-mx-8 flex items-center px-6 py-5 hover:bg-gray-100">
                      <div className="flex w-2/5">
                        <div className="w-20 ">
                          <img
                            className="h-24 object-contain"
                            src={course.image}
                            alt=""
                          />
                        </div>
                        <div className="ml-4 flex flex-grow flex-col justify-center">
                          <span className="text-sm font-bold">
                            {course.title}
                          </span>
                          <span className="text-xs text-red-500">
                            {course.author}
                          </span>
                        </div>
                      </div>

                      <span className="w-1/5 text-center text-sm font-semibold">
                        {course.price}.00 Rs
                      </span>
                      <span className="w-1/5 text-center text-sm font-semibold">
                        {course.price}.00 Rs
                      </span>
                      <span className="w-1/5 text-center text-sm font-semibold">
                        <button>
                          <svg
                            className="h-8 w-8 rounded-full bg-red-100 p-1 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            ></path>
                          </svg>
                        </button>
                      </span>
                    </div>
                  </div>
                ))}

                {/* Cart footer */}

                <Link
                  to={"/"}
                  className="mt-10 flex w-[180px] text-sm font-semibold text-textColor"
                >
                  <svg
                    className="mr-2 w-4 fill-current text-textColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  Continue Shopping
                </Link>
              </div>

              {/* Order Summary Card */}

              <div id="summary" className="px-8 py-10 lg:w-1/4">
                <h1 className="border-b pb-8 text-2xl font-semibold">
                  Order Summary
                </h1>
                <div className="mb-5 mt-10 flex justify-between">
                  <span className="text-sm font-semibold uppercase">
                    Items {totalCartItem}
                  </span>
                  <span className="text-sm font-semibold">
                    <span>{total}.00</span>
                  </span>
                </div>
                <div className="mt-8 border-t">
                  <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                    <span>Total cost</span>
                    <span>{total}.00</span>
                  </div>
                  <button className="w-full bg-yellow-300 py-3 text-sm font-semibold uppercase text-white hover:bg-yellow-400">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
