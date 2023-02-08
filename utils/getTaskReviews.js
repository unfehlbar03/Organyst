import axios from "axios";

const getTaskReviews = async (token, id) => {
  try {
    const r = await axios.get(
      `http://20.219.16.124:5001/api/task/${id}/reviews`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return r.data.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default getTaskReviews;
