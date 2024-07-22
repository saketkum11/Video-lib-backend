import React from "react";

type Props = {
  className: string;
  children: React.ReactNode;
  type: string;
};

const Button: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
export default Button;
