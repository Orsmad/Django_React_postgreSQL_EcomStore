import axios from "axios";
import { MY_SERVER } from "../../env";
import Profile from "../../models/Profile";

export function login(data: any) {
  return new Promise<{ data: "" }>((resolve) =>
    axios
      .post(MY_SERVER + "api/auth/login/", data)
      .then((res) => resolve({ data: res.data }))
  );
}
export function register(data: any) {
  return new Promise<{ data: "" }>((resolve) =>
    axios
      .post(MY_SERVER + "api/auth/register/", data)
      .then((res) => resolve({ data: res.data }))
  );
}
