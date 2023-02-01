import axios from "axios";

async function removeTask(token, id) {
  try {
    const r = await axios.delete(
      `http://20.219.16.124:5001/api/delete-task/${id}`,
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
    } else {
      e.response;
    }
  }
}

export default removeTask;
