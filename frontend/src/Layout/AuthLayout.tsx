import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-black w-full min-h-screen flex justify-center items-center">
        <h1 className=" text-white text-9xl ">Let's Do</h1>
      </div>
      <div className="max-w-screen-sm mx-auto bg-white w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
