import axios from "axios";

async function signup(fullname, designation, orgainization, fathername, password, mobile, email, aadhar, dob) {
   try {
      const r = await axios.post(
         `http://20.219.16.124:5001/api/register`, //edit the url to local ip of current host
         {
            fullname: fullname,
            designation: designation,
            orgainization: orgainization,
            fathername: fathername,
            password: password,
            mobile: mobile,
            email: email,
            aadhar: aadhar,
            dateofbirth: dob,
         }
      );

      return r.data;
   } catch (e) {
      if (e.response && e.response.data) {
         return e.response.data;
      }
      return false;
   }
}

export default signup;
