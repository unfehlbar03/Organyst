import axios from "axios";

async function getWorkplace(token, id) {
  console.log("TKN=>", token, "ID", id);
  try {
    const r = await axios.get(
      `http://192.168.29.170:5001/api/workspace/${id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return r.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default getWorkplace;
