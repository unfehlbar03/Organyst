import axios from "axios";

async function editProfile(token, data) {
  try {
    const r = await axios.put(
      `http://20.219.16.124:5001/api/profileupdate`,
      {
        fullname: data.name,
        organization: data.organization,
        mobile: data.mobile,
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

export default editProfile;
