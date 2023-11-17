import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { useMyContext } from "../../Context/AuthContext";
import "./Signup.css";

const Signup = () => {
  const { signUp } = useMyContext();
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputs = [
    {
      id: 1,
      name: "fullname",
      label: "Full Name",
      type: "text",
      errorMsg: "Please enter correct name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      label: "Email",
      type: "email",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      label: "Password",
      type: "password",
      errorMsg:
        "Password must contain 8 characters including one special character and one number",
      pattern: `^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmpassword",
      label: "Confirm Paasword",
      type: "password",
      errorMsg: "Password does not matched",
      pattern: values.password,
      required: true,
    },
  ];
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handle submit called");
    if (values !== "") {
      console.log("Signup successfull", values);
      const data = JSON.stringify(values);
      console.log("Data from signup", data);
      signUp(values);
    }
  };
  return (
    <div className="imageBg flex  w-full items-center justify-center bg-herobg px-1 pt-20">
      <div className="boxShadow mb-10  flex h-auto w-96 flex-col rounded-md border-2 border-[#334456bf]  bg-[#FFF7E0] p-5 md:mt-20">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="text-text text-center text-3xl uppercase">Signup</h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[inputs.name]}
              onChange={handleChange}
            />
          ))}

          <div class="mt-6 sm:col-span-7">
            <button
              type="submit"
              class="mt-4 w-full rounded-md bg-yellow-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              SIGNUP
            </button>
          </div>
        </form>
        <div className="mt-8 w-full">
          <p>
            Already have an account? Please{" "}
            <span className="text-center text-blue-600 underline">
              <Link to="/login">login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
