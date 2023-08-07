import { FC, useState } from "react";
import style from "./TokenForm.module.css";
import { Button } from "../Button/Button";

interface TokenFormProps {
  addToken: (value: string) => void;
  titleForm: string;
  textButton: string;
}

export const TokenForm: FC<TokenFormProps> = ({
  addToken,
  titleForm,
  textButton,
}) => {
  const [value, setValue] = useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addToken(value);
  };

  return (
    <div className={style.root}>
      <h2 className={style.title}>{titleForm}</h2>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="token"
          placeholder="API key"
          className={style.input}
          value={value}
          onChange={handleChange}
        />
        <Button className={style.button} type="submit">
          {textButton}
        </Button>
      </form>
    </div>
  );
};
