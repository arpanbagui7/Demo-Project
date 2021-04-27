import { API } from "../../backend";

export const getToken = (userId, token) => {
    return fetch(`${API}payment/gettoken/${userId}/${token}/`, {
        method: "GET",
    })
    .then((response) => {
        return response.json();
    })
    .catch((err) => console.log(err));
};

export const paymentProcess = (paymentInfo, userId, token) => {
  const formData = new FormData();

  for (let name in paymentInfo) {
    formData.append(name, paymentInfo[name]);
  }
  console.log(paymentInfo);
  return fetch(`${API}payment/paymentprocess/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
