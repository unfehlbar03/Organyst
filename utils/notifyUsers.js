import axios from "axios";

async function sendNotifcation(
  tokens,
  message_body,
  generated_by,
  users,
  path,
  start_date,
  end_date
) {
  try {
    const r = await axios.post("http://20.219.16.124:5001/api/notify", {
      tokens: tokens,
      message_body,
      generated_by,
      users,
      path: path,
      start_date,
      end_date,
    });
    console.log(r.data);
    return r.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default sendNotifcation;
