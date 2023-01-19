import axios from "axios";

async function forgotPassword(email, password) {
  console.log(email, password);
  try {
    const r = await axios.post(
      "http://192.168.29.170:5002/api/forgot-password",
      {
        email,
        password,
      }
    );

    return r.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      console.log(e);
      console.log(e.response.data);
      return false;
    }
  }
}

export default forgotPassword;
