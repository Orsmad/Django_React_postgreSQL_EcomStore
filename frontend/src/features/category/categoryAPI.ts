import axios from "axios";
import { MY_SERVER } from "../../env";
import Category from "../../models/Category";

export function getAllCategories() {
  return new Promise<{ data: Category[] }>((resolve) =>
    axios
      .get(MY_SERVER + "api/categories/")
      .then((res) => resolve({ data: res.data }))
  );
}

export function getCategoryID(id: number) {
  return new Promise<{ data: Category }>((resolve) =>
    axios
      .get(MY_SERVER + "api/categories/" + id)
      .then((res) => resolve({ data: res.data }))
  );
}
