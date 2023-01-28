import axios from "axios";

async function switchWorkplace(token, workspace) {
  try {
    const r = await axios.post(
      `http://20.219.16.124:5001/api/profile/workspace/switch`,
      {
        workspace,
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

export default switchWorkplace;
