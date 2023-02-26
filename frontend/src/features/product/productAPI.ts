import axios from "axios";
import { MY_SERVER } from "../../env";
import Product from "../../models/Product";

export function addProduct(stu: Product) {
  return new Promise<{ data: Product }>((resolve) =>
    axios.post(MY_SERVER, stu).then((res) => resolve({ data: res.data }))
  );
}

export function getProductByID(id: string) {
  return new Promise<{ data: Product }>((resolve) =>
    axios
      .get(MY_SERVER + "api/products/get/" + id)
      .then((res) => resolve({ data: res.data }))
  );
}
export function getAllProductsByID(id: string) {
  return new Promise<{ data: Product[] }>((resolve) =>
    axios
      .get(MY_SERVER + "api/products/categories/" + id)
      .then((res) => resolve({ data: res.data }))
  );
}
export function getAllProducts() {
  return new Promise<{ data: Product[] }>((resolve) =>
    axios
      .get(MY_SERVER + "api/products/all/")
      .then((res) => resolve({ data: res.data }))
  );
}
