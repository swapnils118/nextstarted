"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const signUpSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    number: z.string().min(10, "Number must be atleast 10 digits"),
    confirmNumber: z.string(),
  })
  .refine((value) => value.number === value.confirmNumber, {
    message: "Numbers must match",
    path: ["confirmNumber"],
  });
type TSignUpSchema = z.infer<typeof signUpSchema>;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  // const [firstname, setFirstname] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [number, setNumber] = useState("");
  const onSubmit = async (data: TSignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center py-[300px] gap-y-2 "
    >
      <h1>Fill in the fields below</h1>
      <section className=" flex  flex-col ">
        <input
          {...register("firstname")}
          type="firstname"
          placeholder="firstname"
          className="px-4 py-2 rounded"
        />
        {errors.firstname && (
          <p className="text-red-500">{`${errors.firstname.message}`}</p>
        )}
        <input
          {...register("lastname")}
          type="lastname"
          placeholder="lastname"
          className="px-4 py-2 rounded"
        />
        {errors.lastname && (
          <p className="text-red-500">{`${errors.lastname.message}`}</p>
        )}
        <input
          {...register("number")}
          type="number"
          placeholder="phone number"
          className="px-4 py-2 rounded"
        />
        {errors.number && (
          <p className="text-red-500">{`${errors.number.message}`}</p>
        )}

        <input
          {...register("confirmNumber")}
          type="number"
          placeholder="confirm your number"
          className="px-4 py-2 rounded"
        />
        {errors.confirmNumber && (
          <p className="text-red-500">{`${errors.confirmNumber.message}`}</p>
        )}
      </section>
      <button
        disabled={isSubmitting}
        className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
