import Input from "../component/Input";
import Button from "../component/Button";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { fromData } from "../types/allTypes";
import { useState } from "react";
type Props = {};
const Login = (props: Props) => {
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
      <h2 className="font-medium text-[2rem] mt-28 text-center">Login</h2>
      <form className="mt-10 flex flex-col gap-2" onSubmit={handleSubmit()}>
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
            type="password"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="mt-20 py-4 bg-black rounded-3xl text-white px-20 font-semibold text-xl"
          >
            Login
          </Button>
        </div>
        <div className="text-center">
          <Link to="/">
            <p>
              Creat New Account? <span className="font-bold">Register</span>
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Login;
