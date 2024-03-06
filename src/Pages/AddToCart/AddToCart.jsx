import React, { useContext, useEffect, useState } from "react";
import "../Course/Course.css";
import { Link, useNavigate } from "react-router-dom";
import { del, get, post } from "../../ApiCall/ApiCall";
import { cartContext } from "../../Context/CartContext";
import { authContext } from "../../Context/AuthContext";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

const AddToCart = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  const [isApiLoading, setApiLoading] = useState(false);
  const [isDeleteLoading, setDeleteLoading] = useState(false);
  const [clickedItemId, setClickedItem] = useState("");
  const [cartLoading, setCartLoading] = useState(true);

  const { userId, token } = useContext(authContext);
  const {
    cartData,
    total,
    setTotal,
    totalCartItem,
    setTotalCartItem,
    setCartUpdated,
    cartUpdated,
    setCartData,
  } = useContext(cartContext);

  const successNotify = (msg) =>
    toast.success(msg, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const appToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        console.log("Get the Cart data API working");
        if (appToken) {
          const refreshedToken = await checkAndRefreshToken(
            JSON.parse(appToken),
          );
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${refreshedToken}`,
              userId: userId,
            },
          };

          const res = await get("/user/getCartByUserId", config);
          if (res.data.length > 0) {
            setCartLoading(false);
            setCartData(res.data);
            console.log(res.data.length);
            localStorage.setItem("cartItems", res.data.length);
          } else {
            navigate("/");
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCartData();
  }, [cartUpdated]);

  const handleDelete = async (ID) => {
    console.log(ID);
    try {
      const refreshedToken = await checkAndRefreshToken(JSON.parse(appToken));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshedToken}`,
          cartId: ID,
        },
      };

      const res = await del("/user/deleteCartById", config);
      if (Boolean(res)) {
        setDeleteLoading(false);
      }
      successNotify("Successfully Deleted!");
      setCartUpdated(!cartUpdated);
      console.log("del response", res.data);
      localStorage.setItem("cartItems", res.data.length);
      setCartData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const PaymentHandler = async (total, orderID, OrderKey) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    if (!res) {
      alert("You are offline!");
      return;
    } else {
      setApiLoading(false);
    }

    const options = {
      // key: "rzp_test_9x1DYeY8MIVVTO",
      key: `${OrderKey}`,
      currency: "INR",
      amount: total * 100,
      name: "KraysInfotech",
      description: "Thanks for Purchasing",
      orderID: orderID,
      // handler: function (response) {
      //   alert(response.razorpay_payment_id);
      //   alert("Payment Success");
      // },

      // prefill: {
      //   name: whose payment details ,
      // },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const checkout = async () => {
    setApiLoading(true);
    const checkoutApi = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = {
        amount: total,
        customerName: localStorage.getItem("Current User"),
        email: localStorage.getItem("email"),
        phoneNumber: "9089786789",
      };

      const res = await post("/auth/createOrder", data, config);
      if (res.status === 200 && res.data) {
        const orderID = res.data.razorpayOrderId;
        const OrderKey = res.data.secretId;
        PaymentHandler(total, orderID, OrderKey);
      }
    };
    checkoutApi();
  };

  const handleSubmit = (ID) => {
    setClickedItem(ID);
    console.log("submited", ID);
    setDeleteLoading(true);
    handleDelete(ID);
  };

  return (
    <div className="min-h-screen w-full bg-herobg">
      {cartLoading === false ? (
        <div className="pb-10 pt-20 lg:pt-28">
          <div className="flex gap-5 lg:mx-11">
            <div className="container mx-auto">
              <div className="lg:flex">
                <div className="rounded-md bg-white px-4 py-10 sm:px-10 lg:w-[65%]">
                  <div className=" flex justify-between border-b pb-8">
                    <h1 className="dayOne text-2xl font-semibold text-textColor">
                      My Cart
                    </h1>
                    <h2 className="dayOne text-2xl font-semibold text-textColor">
                      {totalCartItem} Items
                    </h2>
                  </div>

                  {/* Cart Headings */}

                  <div className="mb-5 mt-10 flex">
                    <h3 className="w-3/5 text-xs font-semibold uppercase text-textColor sm:text-[15px]">
                      Product Details
                    </h3>
                    <h3 className="w-1/5 text-center  text-xs font-semibold uppercase text-textColor sm:text-[15px]">
                      Price
                    </h3>

                    <h3 className="w-1/5  text-center text-xs font-semibold uppercase text-textColor sm:text-[15px]">
                      Action
                    </h3>
                  </div>

                  {/* Cart Body */}
                  {cartData &&
                    cartData.map((course, i) => (
                      <div key={i} className="py-3 lg:py-2">
                        <div className=" -mx-8 flex cursor-pointer items-center rounded-md px-6 py-2 hover:bg-coursebg hover:text-white lg:py-2">
                          <div className="flex w-3/5 items-center">
                            <div className=" ">
                              <img
                                className="min-w-[70px] sm:max-w-[100px]"
                                src={course.thumbNail}
                                alt=""
                              />
                            </div>
                            <div className="ml-4  flex min-w-[100px] max-w-[250px] flex-grow flex-col justify-center  text-textColor sm:min-w-0">
                              <Link
                                to={`/coursedetails/${course.courseId}`}
                                className="hover:text-blue-600 hover:underline"
                              >
                                <span className="  text-xs font-bold sm:text-sm">
                                  {course.title}
                                  {/* {course.title.length > 15
                                ? `${course.title.substring(0, 60)}...`
                                : course.title} */}
                                </span>
                              </Link>

                              <span className="text-[10px] text-textLightColor sm:text-xs">
                                {course.authorName}
                              </span>
                            </div>
                          </div>

                          <span className="w-1/5 text-center text-xs font-semibold text-textColor sm:text-sm">
                            {course.price} .Rs
                          </span>

                          <span className="w-1/5 text-center text-sm font-semibold">
                            <button onClick={() => handleSubmit(course.cartId)}>
                              {isDeleteLoading === true &&
                              clickedItemId === course.cartId ? (
                                <span className="flex w-[100px] items-center justify-center object-cover">
                                  <Loader
                                    color={"#334455"}
                                    height={"25%"}
                                    width={"25%"}
                                  />
                                </span>
                              ) : (
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
                              )}
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

                <div
                  id="summary"
                  className="rounded-t-md bg-white px-8 py-10 lg:fixed lg:right-10 lg:top-28 lg:min-h-screen lg:w-1/4"
                >
                  <h1 className="dayOne border-b pb-8 text-2xl font-semibold text-textColor">
                    Order Summary
                  </h1>
                  <div className="mb-5 mt-10 flex justify-between text-textColor">
                    <span className="text-sm font-semibold uppercase">
                      Items {totalCartItem}
                    </span>
                    <span className="text-sm font-semibold">
                      <span>{total}.00</span>
                    </span>
                  </div>
                  <div className="mb-5 mt-10 flex justify-between text-textColor">
                    <span className="text-sm font-semibold uppercase">Tax</span>
                    <span className="text-sm font-semibold">
                      {/* <span>{total}.00</span> */}
                      <span>13%</span>
                    </span>
                  </div>
                  <div className="mt-8 border-t text-textColor lg:absolute lg:bottom-36 lg:mt-0 lg:w-[80%]">
                    <div className="flex justify-between py-6 text-sm font-semibold uppercase">
                      <span>Total cost</span>
                      <span>{(total * 13) / 100 + total}</span>
                    </div>
                    <button
                      type="submit"
                      // onClick={() => PaymentHandler(total)}
                      onClick={() => checkout()}
                      className="dayOne w-full rounded-md bg-yellow-300 py-3 text-sm font-semibold uppercase text-white hover:bg-yellow-400"
                    >
                      {isApiLoading === true ? (
                        <div className="flex items-center justify-center">
                          <Loader
                            color={"#FFFFFF"}
                            height={"3%"}
                            width={"5%"}
                          />
                        </div>
                      ) : (
                        "Checkout"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex h-screen w-full items-center justify-center sm:hidden">
            <Loader color={"#334456"} height={"10%"} width={"10%"} />
          </div>
          <div className="hidden h-screen w-full items-center justify-center sm:flex">
            <Loader color={"#334456"} height={"4%"} width={"4%"} />
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        data-testid="toast"
      />
    </div>
  );
};

export default AddToCart;
