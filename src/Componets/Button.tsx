import { ReactNode } from "react";

interface IButtonProps {
  Clicked?: () => void;
  variant: string;
  children: ReactNode;
  Clicked2?: () => void;
}

function Button({ Clicked, variant, children }: IButtonProps) {
  return (
    <button onClick={Clicked} className={`btn-${variant}`}>
      {children}
    </button>
  );
}

export default Button;
