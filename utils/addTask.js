import axios from "axios";

async function addTask(token, data) {
  try {
    const r = await axios.post(
      `http://20.219.16.124:5001/api/add-new-task`,
      {
        taskname: data.name,
        subject: data.subject,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        endTime: data.endTime,
        priority: data.priority,
        createdBy: data._id,
        followers: data.followers,
        leader: data.leader,
        beneficiary: "63a6ac9a4816e11620c655b9",
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

export default addTask;
