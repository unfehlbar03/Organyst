import axios from "axios";

const submitTaskByDocument = async (id, token, file) => {
  const data = new FormData();
  data.append("document", file);
  data.append("taskId", id);

  try {
    const r = await axios.post(
      `http://20.219.16.124:5001/api/complete-task`,
      data,

      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export default submitTaskByDocument;
