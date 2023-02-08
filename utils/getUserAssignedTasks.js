import axios from "axios";

const getUserAssignedTasks = async (token, id) => {
  console.log(id);
  try {
    const r = await axios.get(`http://20.219.16.124:5001/api/task-list/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return r.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      return e.response.data;
    }
  }
};

export default getUserAssignedTasks;
