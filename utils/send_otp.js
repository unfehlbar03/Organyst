import axios from "axios";

async function sendOtp(email) {
  try {
    const r = await axios.post(`http://20.219.16.124:5001/api/send-otp`, {
      email,
    });

    return r.data;
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      return e.response.data;
    }
    return false;
  }
}

export default sendOtp;
