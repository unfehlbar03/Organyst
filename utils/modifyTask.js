import axios from "axios";

async function modifyTask(token, data, id) {
  try {
    const r = await axios.post(
      `http://20.219.16.124:5001/api/task/update/${id}`,
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

export default modifyTask;
