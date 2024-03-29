import axios from "axios";

const createReview = async (token, review, id) => {
  console.log(token, review, id);
  try {
    const r = await axios.post(
      `http://192.168.29.170:5001/api/task/review`,
      {
        review,
        id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return r.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default createReview;
