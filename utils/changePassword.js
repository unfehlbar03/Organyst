import axios from "axios";

async function changePassword(token, currentPassword, password, confirmPassword) {
  try {
    const r = await axios.put(
      "http://20.219.16.124:5001/api/changepassword",
      {
        currentPass: currentPassword,
        password,
        confirmPassword,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      console.log(e.response.data);
      return false;
    }
  }
}

export default changePassword;
