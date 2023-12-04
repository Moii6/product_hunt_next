import React, { createContext, useEffect, useState } from "react";
import firebaseConfig from "./config";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useRouter } from "next/router";

const FirebaseContext = createContext();

const FirebaseProvider = ({ children }) => {
  const [loadImage, setLoadImage] = useState(false);
  const [percentLoad, setPercentLoad] = useState(5);
  const [alerta, setAlerta] = useState("");
  const [error, setError] = useState("");
  const [productosList, setProductosList] = useState([]);
  const [producto, setProducto] = useState({});
  const [usuario, setUsuario] = useState({});
  const router = useRouter();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage();
  const productRef = collection(db, "productos");

  let auth = getAuth();

  const nuevoUsuario = async (nombre, email, password) => {
    const usuario = await createUserWithEmailAndPassword(auth, email, password);
    return await updateProfile(usuario.user, { displayName: nombre });
  };

  const iniciarSesion = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const crearProducto = async (producto, imagen) => {
    //await setDoc(doc(db, "productos", `${producto.id}`), producto);
    const imageDet = await guardarImagen(imagen, producto.id);
    producto.imageDetails = imageDet;
    await setDoc(doc(productRef, `${producto.id}`), producto);
    setAlerta({ message: "Producto creado con exito", type: "success" });
  };

  const obtenerProducto = async (id) => {
    const productoRef = doc(db, "productos", id);
    try {
      const productoSnap = await getDoc(productoRef);
      console.log(productoSnap);
      if (productoSnap.exists()) {
        const productFormated = productFormatValues(
          productoSnap._document.data.value.mapValue.fields
        );
        console.log(productFormated);
        setError({});
        setProducto(productFormated);
      } else setError({ message: "404", type: "error" });
    } catch (error) {
      console.log(error);
    }
  };

  const updateProducto = async (producto, votos, userId) => {
    const productoUpdated = { ...producto };
    productoUpdated.votos = Number(votos);
    const votedListUpdated = [...productoUpdated.votados, userId];
    productoUpdated.votados = votedListUpdated;
    setProducto(productoUpdated);
    const productosListCopy = [...productosList];
    const listUpdated = productosListCopy.map((item) =>
      Number(item.id) === Number(producto.id) ? productoUpdated : item
    );
    setProductosList(listUpdated);
    try {
      console.log(producto.id);
      await setDoc(doc(productRef, `${producto.id}`), productoUpdated);
      setAlerta({
        message: `votos actualizados`,
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      setAlerta({
        message: `hubo un error al actuializar los votos:${error}`,
        type: "error",
      });
    }
  };

  const obtenerProductos = async () => {
    let docInfo;
    const productosSnapshot = await getDocs(productRef);
    const productos = productosSnapshot.docs.map((doc) => {
      docInfo = doc._document.data.value.mapValue.fields;
      return productFormatValues(docInfo);
    });
    console.log(productos);
    setProductosList(productos);
  };

  const obtenerProductosPorVotos = async () => {
    let docInfo;
    const qu = query(productRef, orderBy("votos", "desc"));
    const productosSnapshot = await getDocs(qu);
    const productos = productosSnapshot.docs.map((doc) => {
      docInfo = doc._document.data.value.mapValue.fields;
      return productFormatValues(docInfo);
    });
    setProductosList(productos);
  };

  const getProductsByFilter = async (filter) => {
    let docInfo;
    const qu = query(productRef, orderBy(filter, "desc"));
    const productosSnapshot = await getDocs(qu);
    const productos = productosSnapshot.docs.map((doc) => {
      docInfo = doc._document.data.value.mapValue.fields;
      return productFormatValues(docInfo);
    });
    setProductosList(productos);
  };

  const eliminarProducto = async (path, id) => {
    const copy = [...productosList];
    const listUpdated = copy.filter((item) => item.id != id);
    console.log(listUpdated);
    setProductosList(listUpdated);
    const prodRef = doc(db, "productos", `${id}`);
    try {
      await eliminarImagen(path);
      const res = await deleteDoc(prodRef);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };

  const eliminarImagen = async (refPath) => {
    const imageRef = ref(storage, `${refPath}`);

    try {
      const res = await deleteObject(imageRef);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const crearComentario = async (productoId, comentario) => {
    const productoUpdated = { ...producto };
    productoUpdated.comentarios = [...productoUpdated.comentarios, comentario];
    console.log(productoUpdated);
    setProducto(productoUpdated);
    const productosListCopy = [...productosList];
    console.log(productosList);
    const listUpdated = productosListCopy.map((item) =>
      Number(item.id) === Number(productoId) ? productoUpdated : item
    );
    setProductosList(listUpdated);
    try {
      await setDoc(doc(productRef, `${productoUpdated.id}`), productoUpdated);
      setAlerta({
        message: `Se agrego tu omentario`,
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      setAlerta({
        message: `hubo un error al actuializar los votos:${error}`,
        type: "error",
      });
    }
  };

  const productFormatValues = (docInfo) => {
    console.log(docInfo);
    let comments = docInfo.comentarios?.arrayValue;
    let voted = docInfo.votados?.arrayValue;
    let imgDet = docInfo.imageDetails?.mapValue;
    console.log(imgDet);
    if (!comments || Object.keys(comments).length === 0) comments = [];
    else {
      let commentInfo;
      comments = comments.values.map((item) => {
        commentInfo = item.mapValue.fields;
        return {
          usuarioId: commentInfo.usuarioId.stringValue,
          usuarioNombre: commentInfo.usuarioNombre.stringValue,
          creado:
            commentInfo.creado.stringValue || commentInfo.creado.integerValue,
          comentario: commentInfo.comentario.stringValue,
        };
      });
    }
    if (!comments || Object.keys(voted).length === 0) voted = [];
    else {
      voted = voted.values.map((item) => {
        return item.stringValue;
      });
    }
    return {
      id: Number(docInfo.id?.integerValue),
      nombre: docInfo.nombre?.stringValue,
      empresa: docInfo.empresa?.stringValue,
      imageDetails: {
        fullPath: imgDet.fields.fullPath.stringValue,
        refPath: imgDet.fields.refPath.stringValue,
      },
      url: docInfo.url?.stringValue,
      descripcion: docInfo.descripcion?.stringValue,
      comentarios: comments,
      votados: voted,
      votos: Number(docInfo.votos?.integerValue),
      creado: Number(docInfo.creado?.integerValue),
      creador: docInfo.creador?.stringValue,
    };
  };
  const guardarImagen = async (imagen, productId) => {
    const imgRef = `images/${productId + "-" + imagen.name}`;
    const imageRef = ref(storage, imgRef);
    let imageFullPath = "";
    try {
      await uploadBytes(imageRef, imagen);
      imageFullPath = await getDownloadURL(imageRef);
    } catch (error) {
      console.log(error);
    } finally {
      return { refPath: imgRef, fullPath: imageFullPath };
    }
  };

  /*const saveOnLocalStorage = (user) => {
    localStorage.setItem(lsKey, user);
  };
  const deleteforLocalStorage = () => {
    localStorage.removeItem(lsKey);
  };
  const getFromLocalStorage = () => {
    setUsuario(localStorage.getItem(lsKey));
  };*/
  const cerrarSesion = () => {
    signOut(auth);
    //deleteforLocalStorage();
  };

  useEffect(() => {
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuario(usuario);
      } else {
        setUsuario({});
      }
    });
  }, []);
  return (
    <FirebaseContext.Provider
      value={{
        usuario,
        auth,
        loadImage,
        percentLoad,
        alerta,
        productosList,
        producto,
        error,
        obtenerProductosPorVotos,
        getProductsByFilter,
        eliminarProducto,
        crearComentario,
        updateProducto,
        obtenerProducto,
        obtenerProductos,
        setProductosList,
        setProducto,
        setAlerta,
        nuevoUsuario,
        crearProducto,
        iniciarSesion,
        cerrarSesion,
        setLoadImage,
        setPercentLoad,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseProvider };
export default FirebaseContext;
