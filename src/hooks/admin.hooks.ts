import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const CreateProducts = () => {
  const { mutate, isError, isPending } = useMutation({
    mutationKey: ["products"],
    mutationFn: async (payload: any) => {
      return await axios.post("http://localhost:8000/products", payload);
    }, onSuccess: (data) => {
      console.log(data);
      alert("Product added successfully")
    }, onError: () => {
      console.log("Error occured in create product")
    }
  })
  return { mutate, isError, isPending };
}