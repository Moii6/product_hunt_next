import { initializeApp } from "firebase/app";
import firebaseConfig from "./config";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

/*class Firebase {
  constructor() {
    initializeApp(firebaseConfig);
    this.auth = getAuth();
  }

  async nuevoUsuario(nombre, email, password) {
    const usuario = await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return await updateProfile(usuario.user, { displayName: nombre });
  }
}
const firebase = new Firebase();

export default firebase;*/
