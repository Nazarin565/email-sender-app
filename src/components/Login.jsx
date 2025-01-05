// import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Login = () => {
  const [type, setType] = useState("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      login: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    reset();
  }, [type, reset]);

  const onSubmit = async (data) => {
    console.log(data);
    // if (type === "register") {
    //   try {
    //     const response = await axios.post(
    //       "http://68.183.74.14:4005/api/users/",
    //       data
    //     );

    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   try {
    //     const response = await axios.get(
    //       "http://68.183.74.14:4005/api/users/current/"
    //     );

    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  return (
    <div className="border border-black p-20 m-2 flex flex-col gap-4 w-[460px]">
      <h2 className="text-3xl text-center">
        {type === "login" ? "Log in" : "Register"}
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="on"
        className="flex flex-col gap-2"
      >
        <div className="flex flex-col">
          <label htmlFor="login">Login:</label>
          <input
            id="login"
            type="text"
            placeholder="Enter your login"
            className="border border-black rounded-sm p-2"
            {...register("login", {
              required: "Login is required",
            })}
          />
          {errors.login && (
            <p className="text-red-500">{errors.login.message}</p>
          )}
        </div>

        {type === "register" && (
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="border border-black rounded-sm p-2"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: regexEmail,
                  message: "Please provide valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
        )}

        <div className="flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="border border-black rounded-sm p-2"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Min length is 8",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button className="bg-blue-600 text-white mt-2">
          {type === "login" ? "Log in" : "Register"}
        </button>
      </form>

      <p className="font-poppins text-main text-center">
        {type === "login" ? "Don’t have an account yet? " : "Have an account? "}
        <a
          href="#"
          className="inline text-primary-blue"
          onClick={() => setType(type === "login" ? "register" : "login")}
        >
          {type === "login" ? "Create one" : "Log in"}
        </a>
      </p>
    </div>
  );
};
