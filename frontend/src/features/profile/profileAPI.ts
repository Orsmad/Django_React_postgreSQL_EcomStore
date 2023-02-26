import axios from "axios";
import { MY_SERVER } from "../../env";
import Profile from "../../models/Profile";
import { getToken } from "../../utils/token";

// @ts-ignore
// const token =JSON.parse(localStorage.getItem(["token"]) || "");
const token = getToken();
console.log(token);

// if (typeof token === 'string') {
//     const parse = JSON.parse(token) // ok

export function deleteProfile() {
  return new Promise<{ data: Profile }>((resolve) =>
    axios
      .delete(MY_SERVER + "api/profiles/")
      .then((res) => resolve({ data: res.data }))
  );
}

export function updateProile(profile: any) {
  return new Promise<{ data: Profile }>((resolve) =>
    axios
      .put(MY_SERVER + "api/profiles/", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}

export function getProfile() {
  return new Promise<{ data: Profile }>((resolve) =>
    axios
      .get(MY_SERVER + "api/profiles/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => resolve({ data: res.data }))
  );
}
