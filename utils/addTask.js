import axios from "axios";

async function addTask(token, data) {
  try {
    const r = await axios.post(
      `http://192.168.29.170:5001/api/add-new-task`,
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
        beneficiary: data.beneficiary,
        workplace_id: data.workplace_id,
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
