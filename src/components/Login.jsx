import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Login = () => {
  const [type, setType] = useState("login");
  const [globalError, setGlobalError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    reset();
    setGlobalError("");
  }, [type, reset]);

  const onSubmit = async (data) => {
    setGlobalError("");

    if (type === "register") {
      try {
        const response = await axios.post(
          "http://68.183.74.14:4005/api/users/",
          data
        );

        console.log(response.data);
      } catch (error) {
        setGlobalError("Incorect data. Please try again or log in");
        console.error(error);
      }
    } else {
      try {
        const response = await axios.get(
          "http://68.183.74.14:4005/api/users/current/",
          {
            headers: {
              Authorization:
                "Basic " + btoa(`${data.username}:${data.password}`),
            },
          }
        );

        localStorage.setItem(
          "EmailSenderAppUserData",
          JSON.stringify({ ...response.data, password: data.password })
        );

        console.log(response.data);
      } catch (error) {
        setGlobalError("Incorrect data. Please try again or register");
        console.error(error);
      }
    }
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
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            className="border border-black rounded-sm p-2"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
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

        {globalError && <p className="text-red-500 text-xs">{globalError}</p>}
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
