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
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mx-auto h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center">
          <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Register here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white/10 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-lg border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100">
                Email Address
              </label>
              <div className="mt-2">
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
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                {...register("remember")}
                className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500 bg-white/5 border-white/20"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-100">
                Remember me
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || status === "loading"}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || status === "loading" ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress size={16} style={{ color: 'white' }} />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}