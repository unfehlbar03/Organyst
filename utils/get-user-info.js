import axios from "axios";

async function getUser(token) {
  try {
    const r = await axios.get(`http://20.219.16.124:5001/api/user-info`, {
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

export default getUser;
