import googleLogo from "../../../icons/google-logo.svg"
import css from "./GoogleAuthBtn.module.css";
import { motion } from "framer-motion";

export default function GoogleAuthBtn() {
  return (
    <div className={css.wrapper}>
      <p className={css.separator}>or</p>
      <motion.a
        whileTap={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        href="https://aquatrack-api-crcb.onrender.com/api/users/google"
        className={css.googleBtn}
      >
        <img src={googleLogo} className={css.googleIcon} />
        <p>Sign in with Google</p>
      </motion.a>
    </div>
  );
}
