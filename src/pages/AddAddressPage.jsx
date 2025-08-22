// src/pages/AddAddressPage.jsx
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "../api/axiosInstance";
import { fetchAddresses } from "../store/thunks/addressThunk";

export default function AddAddressPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      name: "",
      surname: "",
      phone: "",
      city: "",
      district: "",
      neighborhood: "",
      address: "",
    },
  });

  const onSubmit = async (data) => {
   
    await axiosInstance.post("/user/address", {
      title: data.title,
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      city: data.city,
      district: data.district,
      neighborhood: data.neighborhood,
      address: data.address,
    });

   
    await dispatch(fetchAddresses());
    history.replace("/checkout");
  };

  return (
    <main className="w-[90vw] max-w-[800px] mx-auto py-10 font-[Montserrat] text-[#252B42]">
      <h1 className="text-3xl font-bold mb-6">Add New Address</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 border border-[#E6E6E6] rounded-xl"
      >
        
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Address Title</label>
          <input
            className="border border-[#E6E6E6] rounded px-3 py-2"
            placeholder="Home / Office ..."
            {...register("title", { required: "Required", minLength: 2 })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Name</label>
            <input
              className="border border-[#E6E6E6] rounded px-3 py-2"
              {...register("name", { required: "Required", minLength: 2 })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Surname</label>
            <input
              className="border border-[#E6E6E6] rounded px-3 py-2"
              {...register("surname", { required: "Required", minLength: 2 })}
            />
            {errors.surname && (
              <span className="text-red-500 text-sm">
                {errors.surname.message}
              </span>
            )}
          </div>
        </div>

        
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Phone</label>
          <input
            className="border border-[#E6E6E6] rounded px-3 py-2"
            placeholder="+90..."
            {...register("phone", {
              required: "Required",
             
              minLength: 7,
            })}
          />
          {errors.phone && (
            <span className="text-red-500 text-sm">{errors.phone.message}</span>
          )}
        </div>

        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold">City</label>
            <select
              className="border border-[#E6E6E6] rounded px-3 py-2"
              {...register("city", { required: "Required" })}
            >
              <option value="">Select...</option>
              <option value="istanbul">Istanbul</option>
              <option value="ankara">Ankara</option>
              <option value="izmir">Izmir</option>
            </select>
            {errors.city && (
              <span className="text-red-500 text-sm">
                {errors.city.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">District</label>
            <input
              className="border border-[#E6E6E6] rounded px-3 py-2"
              {...register("district", { required: "Required", minLength: 2 })}
            />
            {errors.district && (
              <span className="text-red-500 text-sm">
                {errors.district.message}
              </span>
            )}
          </div>
        </div>

        
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Neighborhood</label>
          <input
            className="border border-[#E6E6E6] rounded px-3 py-2"
            {...register("neighborhood", {
              required: "Required",
              minLength: 2,
            })}
          />
          {errors.neighborhood && (
            <span className="text-red-500 text-sm">
              {errors.neighborhood.message}
            </span>
          )}
        </div>

       
        <div className="flex flex-col gap-1">
          <label className="font-semibold">Address</label>
          <textarea
            rows={4}
            className="border border-[#E6E6E6] rounded px-3 py-2"
            placeholder="Street, building, no..."
            {...register("address", { required: "Required", minLength: 5 })}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>

        
        <div className="flex justify-between">
          <button
            type="button"
            className="border border-[#E6E6E6] px-4 py-2 rounded hover:bg-gray-50 cursor-pointer"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#23A6F0] text-white font-bold py-2 px-4 rounded hover:bg-[#2497da] disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting ? <CircularProgress size={20} /> : "Save Address"}
          </button>
        </div>
      </form>
    </main>
  );
}