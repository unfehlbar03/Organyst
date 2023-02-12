import axios from "axios";

async function getProfile(token, id) {
  console.log("TOKEN", token, id);
  try {
    const r = await axios.get(`http://192.168.29.170:5001/api/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile Response", r.data);
    return r.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      return e.response.data;
    }
    return false;
  }
}

export default getProfile;
