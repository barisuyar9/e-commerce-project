import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import { loginUser } from "../store/actions/userActions";

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const status = useSelector((s) => s.user?.status) || "idle";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (values) => {
    const { email, password, remember } = values;

    return dispatch(loginUser({ email, password, rememberMe: remember }))
      .then(() => {
        const from = location.state?.from?.pathname || "/";
        if (from) {
          history.replace(from);
          return;
        }

        if (history.length > 1) history.goBack();
        else history.push("/");
      })
      .catch((msg) => {
        toast.error(msg || "Login failed");
      });
  };

  

  return (
    <main className="w-[90vw] md:w-[50vw] mx-auto my-20 flex flex-col gap-5 font-[Montserrat] text-[#252B42]">
      <div>
        <h1 className="text-center text-4xl font-bold">Login</h1>
        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-[#23A6F0]">
            Register
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 text-lg w-[90vw] md:w-[45vw] mx-auto"
      >
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            type="email"
            placeholder="Enter a valid email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="border border-[#E6E6E6] p-1 rounded text-base"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
            })}
            className="border border-[#E6E6E6] p-1 rounded text-base"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me */}
        <label className="flex items-center gap-2 text-base">
          <input type="checkbox" {...register("remember")} />
          <span>Remember me</span>
        </label>

        <button
          type="submit"
          disabled={isSubmitting || status === "loading"}
          className="bg-[#23A6F0] text-white font-bold py-2 rounded flex justify-center items-center w-full md:w-[15vw] mx-auto cursor-pointer hover:bg-[#2497da]"
        >
          {isSubmitting || status === "loading" ? (
            <CircularProgress size={20} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </main>
  );
}