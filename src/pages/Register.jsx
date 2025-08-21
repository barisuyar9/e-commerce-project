import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";


import { useDispatch, useSelector } from "react-redux";
import { fetchRolesIfNeeded } from "../store/thunks/clientThunks";

export default function Register() {
  const history = useHistory();
  const dispatch = useDispatch();

  
  const roles = useSelector((s) => s.client.roles);

  
  const storeRoleId = roles.find((r) => r.code === "store")?.id ?? null;
  const customerRoleId = roles.find((r) => r.code === "customer")?.id ?? null;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue, 
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      role_id: "", 
    },
  });

  const selectedRole = watch("role_id");

  
  useEffect(() => {
    dispatch(fetchRolesIfNeeded());
  }, [dispatch]);

  
  useEffect(() => {

    if (!watch("role_id") && customerRoleId) {
      setValue("role_id", String(customerRoleId));
    }
  }, [customerRoleId, setValue, watch]);

  const onSubmit = async (data) => {
    if (data.password !== data.passwordConfirm) {
      toast.error("Passwords do not match!");
      return;
    }

  
    const roleIdNum = Number(data.role_id);

    let payload = {
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: roleIdNum,
    };

   
    if (roleIdNum === storeRoleId) {
      payload.store = {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.tax_no,
        bank_account: data.bank_account,
      };
    }

    try {
      await axiosInstance.post("/signup", payload);
      reset();
      toast.success(
        "You need to click the link in your email to activate your account!"
      );
      history.goBack();
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-auto h-12 w-12 bg-indigo-500 rounded-full flex items-center justify-center">
          <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Already a member?{" "}
          <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-sm py-8 px-6 shadow-2xl rounded-lg border border-white/20">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-100">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                  })}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            
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
                  placeholder="At least 8 characters with special chars"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                      message: "Must include upper, lower, number, and special char",
                    },
                  })}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            
            <div>
              <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-100">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="passwordConfirm"
                  type="password"
                  placeholder="Re-enter your password"
                  {...register("passwordConfirm", {
                    required: "Please confirm your password",
                  })}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                />
              </div>
              {errors.passwordConfirm && (
                <p className="mt-1 text-sm text-red-400">{errors.passwordConfirm.message}</p>
              )}
            </div>

            
            <div>
              <label htmlFor="role_id" className="block text-sm font-medium text-gray-100">
                Role
              </label>
              <div className="mt-2">
                <select
                  id="role_id"
                  {...register("role_id", { required: "Role is required" })}
                  className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                >
                  <option value="" className="text-gray-900">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={String(role.id)} className="text-gray-900">
                      {role.code === "customer"
                        ? "Customer"
                        : role.code === "store"
                        ? "Store"
                        : "Admin"}
                    </option>
                  ))}
                </select>
              </div>
              {errors.role_id && (
                <p className="mt-1 text-sm text-red-400">{errors.role_id.message}</p>
              )}
            </div>

            
            {Number(selectedRole) === storeRoleId && (
              <div className="space-y-6 border-t border-white/20 pt-6">
                <h3 className="text-lg font-medium text-white">Store Information</h3>
                
                <div>
                  <label htmlFor="store_name" className="block text-sm font-medium text-gray-100">
                    Store Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="store_name"
                      placeholder="Enter store name"
                      {...register("store_name", {
                        required: "Store name is required",
                        minLength: { value: 3, message: "At least 3 characters" },
                      })}
                      className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.store_name && (
                    <p className="mt-1 text-sm text-red-400">{errors.store_name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="store_phone" className="block text-sm font-medium text-gray-100">
                    Store Phone
                  </label>
                  <div className="mt-2">
                    <input
                      id="store_phone"
                      placeholder="Enter store phone"
                      {...register("store_phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^\+[1-9]{1}[0-9]{7,11}$/,
                          message: "Invalid mobile number",
                        },
                      })}
                      className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.store_phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.store_phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="tax_no" className="block text-sm font-medium text-gray-100">
                    Store Tax ID
                  </label>
                  <div className="mt-2">
                    <input
                      id="tax_no"
                      placeholder="Format: TXXXXVXXXXXX"
                      {...register("tax_no", {
                        required: "Tax ID is required",
                        pattern: {
                          value: /^T\d{4}V\d{6}$/,
                          message: "Format TXXXXVXXXXXX",
                        },
                      })}
                      className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.tax_no && (
                    <p className="mt-1 text-sm text-red-400">{errors.tax_no.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="bank_account" className="block text-sm font-medium text-gray-100">
                    Store Bank Account (IBAN)
                  </label>
                  <div className="mt-2">
                    <input
                      id="bank_account"
                      placeholder="Enter IBAN"
                      {...register("bank_account", {
                        required: "Bank account is required",
                        pattern: { value: /^TR\d{24}$/, message: "Invalid IBAN" },
                      })}
                      className="block w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm"
                    />
                  </div>
                  {errors.bank_account && (
                    <p className="mt-1 text-sm text-red-400">{errors.bank_account.message}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress size={16} style={{ color: 'white' }} />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}