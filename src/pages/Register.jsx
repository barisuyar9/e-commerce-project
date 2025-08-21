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
    <main className="w-[90vw] md:w-[50vw] mx-auto my-20 flex flex-col gap-5 font-[Montserrat] text-[#252B42]">
      <div>
        <h1 className="text-center text-4xl font-bold">Register</h1>
        <p className="text-center">
          Already a member?{" "}
          <Link to="/login" className="text-[#23A6F0]">
            Log in
          </Link>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 text-lg w-[90vw] md:w-[45vw] mx-auto"
      >
       
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full Name*</label>
          <input
            id="name"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            className="border border-[#E6E6E6] p-1 rounded text-base"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

     
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

       
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            type="password"
            placeholder="At least 8 characters including upper, lower, number, special char"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "At least 8 characters" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                message: "Must include upper, lower, number, and special char",
              },
            })}
            className="border border-[#E6E6E6] p-1 rounded text-base"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

    
        <div className="flex flex-col gap-2">
          <label htmlFor="passwordConfirm">Confirm Password*</label>
          <input
            id="passwordConfirm"
            type="password"
            placeholder="Re-enter your password"
            {...register("passwordConfirm", {
              required: "Please confirm your password",
            })}
            className="border border-[#E6E6E6] p-1 rounded text-base"
          />
          {errors.passwordConfirm && (
            <p className="text-red-500">{errors.passwordConfirm.message}</p>
          )}
        </div>

      
        <div className="flex flex-col gap-2">
          <label htmlFor="role_id">Role*</label>
          <select
            id="role_id"
            {...register("role_id", { required: "Role is required" })}
            className="border border-[#E6E6E6] p-1 rounded text-base"
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={String(role.id)}>
                {role.code === "customer"
                  ? "Customer"
                  : role.code === "store"
                  ? "Store"
                  : "Admin"}
              </option>
            ))}
          </select>
          {errors.role_id && (
            <p className="text-red-500">{errors.role_id.message}</p>
          )}
        </div>

        
        {Number(selectedRole) === storeRoleId && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="store_name">Store Name*</label>
              <input
                id="store_name"
                placeholder="Enter store name"
                {...register("store_name", {
                  required: "Store name is required",
                  minLength: { value: 3, message: "At least 3 characters" },
                })}
                className="border border-[#E6E6E6] p-1 rounded text-base"
              />
              {errors.store_name && (
                <p className="text-red-500">{errors.store_name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="store_phone">Store Phone*</label>
              <input
                id="store_phone"
                placeholder="Enter store phone "
                {...register("store_phone", {
                  required: "Phone is required",

                  pattern: {
                    value: /^\+[1-9]{1}[0-9]{7,11}$/,
                    message: "Invalid mobile number",
                  },
                })}
                className="border border-[#E6E6E6] p-1 rounded text-base"
              />
              {errors.store_phone && (
                <p className="text-red-500">{errors.store_phone.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tax_no">Store Tax ID*</label>
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
                className="border border-[#E6E6E6] p-1 rounded text-base"
              />
              {errors.tax_no && (
                <p className="text-red-500">{errors.tax_no.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="bank_account">Store Bank Account (IBAN)*</label>
              <input
                id="bank_account"
                placeholder="Enter IBAN"
                {...register("bank_account", {
                  required: "Bank account is required",
                  pattern: { value: /^TR\d{24}$/, message: "Invalid IBAN" },
                })}
                className="border border-[#E6E6E6] p-1 rounded text-base"
              />
              {errors.bank_account && (
                <p className="text-red-500">{errors.bank_account.message}</p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#23A6F0] text-white font-bold py-2 rounded flex justify-center items-center w-full md:w-[15vw] mx-auto cursor-pointer hover:bg-[#2497da]"
        >
          {isSubmitting ? <CircularProgress /> : "Register"}
        </button>
      </form>
    </main>
  );
}