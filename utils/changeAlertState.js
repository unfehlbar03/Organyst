import axios from "axios";

async function changeAlertStatus(id, token) {
  try {
    const r = await axios.patch(
      `http://20.219.16.124:5001/api/alert/${id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return r.data;
  } catch (e) {
    if (e.response && e.response.data) {
      return e.response.data;
    }
    return false;
  }
}

export default changeAlertStatus;
