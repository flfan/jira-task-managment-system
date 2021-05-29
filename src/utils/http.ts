import { useAuth } from "context/auth-context";
import qs from "qs";
import * as auth from "../auth-provider";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "please relogin" });
      }

      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// type httpType = 'name' | 'age';
// type httpType2 = string | number;
// type httpType3 = 'name1' & number;
// type Person = {
//   name: string
//   age: number
// }
// type PartPerson = Partial<Person>;
// type OmitPersonAge = Omit<PartPerson,'age'>

// type httpTypeKey = keyof httpType;
// type httpType2Key = keyof httpType2;
// type httpType3Key = keyof httpType3;
// type PersonKeys = keyof Person;

// let person1: PersonKeys = 'age';
// let http3: httpTypeKey = 'anchor';
// let http1: httpType = 'age';
// let http2: httpType2 = 'age';
// console.log(http1);
// console.log(http2);
