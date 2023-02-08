import axios from "axios";

async function sendNotifcation(tokens, author, type, section_name) {
  try {
    const r = await axios.post("http://20.219.16.124:5001/api/notify", {
      tokens: tokens,
      message_body: {
        title: `${type} Created`,
        subtitle: `${author} added you in ${section_name} ${type}`,
      },
    });
    console.log(r.data);
    return r.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export default sendNotifcation;
