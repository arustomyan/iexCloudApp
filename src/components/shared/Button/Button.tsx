import styles from "./Button.module.css";
import cl from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      className={cl(className, styles.button)}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
