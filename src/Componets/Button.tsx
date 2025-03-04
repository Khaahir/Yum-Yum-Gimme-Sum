import { ReactNode } from "react";

interface IButtonProps {
  Clicked?: () => void;
  NewPage?: () => void;
  variant: string;
  children: ReactNode;
}

function Button({ Clicked, variant, children }: IButtonProps) {
  return (
    <button onClick={Clicked} className={`btn-${variant}`}>
      {children}
    </button>
  );
}

export default Button;
