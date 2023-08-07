import { useAppDispatch } from "../../hooks/reduxHooks";
import { removeToken } from "../../store/slices/authSlice";
import { Button } from "../Button/Button";
import styles from "./HeaderLayout.module.css";

export const HeaderLayout = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.root}>
      <h1 className={styles.logo}>iexCloudApp</h1>
      <Button
        type="button"
        onClick={() => dispatch(removeToken())}
        className={styles.button}
      >
        remove token
      </Button>
    </div>
  );
};
