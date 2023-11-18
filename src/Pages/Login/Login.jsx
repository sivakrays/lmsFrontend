import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { useMyContext } from "../../Context/AuthContext";
import "./Login.css";

const Login = () => {
  // const { login } = useContext(useMyContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      label: "Email",
      type: "email",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      label: "Password",
      type: "text",
      errorMsg:
        "Password must contain 8 characters including one special character and one number",
      required: true,
      pattern: `^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8}$`,
    },
  ];
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login successfull", values);
    const data = JSON.stringify(values);
    // login(data);
  };
  return (
    <div className="imageBg flex h-screen w-full items-center justify-center bg-herobg px-1">
      <div className="boxShadow flex  h-auto w-96 flex-col rounded-md border-2 border-[#334456bf] bg-[#FFF7E0]  p-5">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="text-text text-center text-3xl uppercase">Login</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[inputs.name]}
              onChange={handleChange}
            />
          ))}

          <div className="mt-6 sm:col-span-7">
            <button
              type="submit"
              className="mt-4 w-full rounded-md bg-yellow-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              LOGIN
            </button>
          </div>
        </form>
        <div className="mt-8">
          <p>
            {" "}
            If you don't have an account? Please{" "}
            <span className="text-center text-blue-600 underline">
              <Link to="/signup">signup</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
