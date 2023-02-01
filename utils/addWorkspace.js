import axios from "axios";

async function addWorkplace(token, data) {
  try {
    const r = await axios.post(
      `http://192.168.29.171:5001/api/workspace/create`,
      {
        name: data.name,
        description: data.description,
        members: data.members,
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
      return e.response.data;
    } else {
      e.response;
    }
  }
}

export default addWorkplace;
