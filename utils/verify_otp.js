import axios from "axios";

async function verifyOtp(otp, email) {
  try {
    const r = await axios.post(`http://20.219.16.124:5001/api/validate-otp`, {
      otp,
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

export default verifyOtp;
