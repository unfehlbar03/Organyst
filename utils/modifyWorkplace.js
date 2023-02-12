import axios from "axios";

async function modifyWorkplace(token, id, data) {
  console.log("Workplace Data", data);
  try {
    const r = await axios.post(
      `http://192.168.29.170:5001/api/workspace/${id}`,

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

export default modifyWorkplace;
