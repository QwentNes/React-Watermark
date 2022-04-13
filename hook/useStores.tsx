import { useContext } from "react";
import { StoreContext } from "../store/";

export const useStores = () => useContext(StoreContext);
