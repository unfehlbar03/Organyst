import axios from "axios";

async function forgotPassword(email, password) {
  try {
    const r = await axios.post(
      "http://20.219.16.124:5001/api/forgot-password",
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
      return false;
    }
  }
}

export default forgotPassword;
