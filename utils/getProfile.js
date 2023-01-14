import axios from "axios";

async function getProfile(token, id) {
  try {
    const r = await axios.get(`http://20.219.16.124:5001/api/profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
