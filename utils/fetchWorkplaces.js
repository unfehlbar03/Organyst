import axios from "axios";

async function fetchWorkplace(token) {
  try {
    const r = await axios.get(`http://20.219.16.124:5001/api/workspace/list`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
    return false;
  }
}

export default fetchWorkplace;
