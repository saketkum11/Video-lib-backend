import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { fromData } from "../types/allTypes";
import Input from "../component/Input";
import Button from "../component/Button";
import { Link } from "react-router-dom";
type Inputs = {};

const Signup = () => {
  const [formData, setFormData] = useState<fromData>({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
    coverImage: "",
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  return (
    <div className="flex flex-col   m-auto max-w-xs">
      <h2 className="font-medium text-[2rem] mt-28 text-center">Register</h2>
      <form className="mt-10 flex flex-col gap-2" onSubmit={handleSubmit()}>
        <div>
          <label htmlFor="" className="block text-sm mb-2 ml-4">
            FullName
          </label>
          <Input
            className="text-base font-normal border border-black rounded-[1.25rem] py-2 px-6 w-full"
            type="text"
            placeholder="eg:saket123"
          />
        </div>
        <div>
          <label htmlFor="" className="block mb-2 ml-4">
            Email
          </label>
          <Input
            className="text-base font-normal border border-black rounded-[1.25rem] py-2 px-6 w-full"
            placeholder="eg:saket123"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="" className="block mb-2 ml-4">
            username
          </label>
          <Input
            className="text-base font-normal border border-black rounded-[1.25rem] py-2 px-6 w-full"
            placeholder="eg : saket11"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="" className="block mb-2 ml-4">
            Password
          </label>
          <Input
            className="text-base font-normal border border-black rounded-[1.25rem] py-2 px-6 w-full"
            placeholder="eg:saket123"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="" className="block mb-2 ml-4">
            Avatar
          </label>
          <Input
            className="text-base font-normal "
            placeholder="Upload image"
            type="file"
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            className="mt-20 py-4 bg-black rounded-3xl text-white px-20 font-semibold text-xl"
          >
            Register
          </Button>
        </div>
        <div className="text-center">
          <Link to="/login">
            <p>
              Creat New Account? <span className="font-bold">Login</span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
