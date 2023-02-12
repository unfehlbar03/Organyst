import axios from "axios";

async function fetchUsersTokens(ids) {
  try {
    const r = await axios.post(`http://20.219.16.124:5001/api/tokens`, {
      users: ids,
    });
    return r.data;
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = fetchUsersTokens;
