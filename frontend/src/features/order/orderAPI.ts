import axios from "axios";
import { MY_SERVER } from "../../env";
import Order from "../../models/Order";
import OrderDetail, { OrderDetailSeri } from "../../models/OrderDetail";
import { getToken } from "../../utils/token";
const token = getToken();

export function getAllOrders() {
  console.log("!!!!!!", token);
  return new Promise<{ data: Order[] }>((resolve) =>
    axios
      .get(MY_SERVER + "api/orders/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
export function postOrder(order: OrderDetailSeri[]) {
  return new Promise<{ data: OrderDetail[] }>((resolve) =>
    axios
      .post(MY_SERVER + "api/orders/", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
