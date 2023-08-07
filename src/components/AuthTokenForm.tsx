import { useDispatch } from "react-redux";
import { TokenForm } from "./shared/TokenForm/TokenForm";
import { addToken } from "../store/slices/authSlice";

export const AuthTokenForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (token: string) => {
    dispatch(addToken(token));
  };
  return (
    <TokenForm
      addToken={handleSubmit}
      titleForm="Введите ключ API iexCloud"
      textButton="save token"
    />
  );
};
