import axios from "axios";

const closeTask = async (id, token) => {
  console.log("Token,=>", token);
  try {
    const r = await axios.patch(
      `http://20.219.16.124:5001/api/close-task/${id}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );
    return r.data;
  } catch (e) {
    console.log("Error", e);
    if (e.response && e.response.data) {
      return e.response.data;
    }
    return false;
  }
};

export default closeTask;
