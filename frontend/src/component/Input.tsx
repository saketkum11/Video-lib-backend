import React from "react";

type Props = {
  className: string;
  placeholder: string;
  children?: React.ReactNode;
  type: string;
};

const Input = (props: Props): React.JSX.Element => {
  return (
    <>
      <input {...props} />
    </>
  );
};

export default Input;
