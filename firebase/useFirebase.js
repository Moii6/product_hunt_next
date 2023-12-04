import { useContext } from "react";
import FirebaseContext from "../firebase/context";

const useFirebase = () => {
  return useContext(FirebaseContext);
};

export default useFirebase;
