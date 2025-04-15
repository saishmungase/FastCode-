import axios from "axios";

// res.status(200).send({
//     message : "Success",
//     token : token
// });
// utils/signUp.ts

type signUpTypes = {
  name: string;
  email: string;
  password: string;
};

const signUp = async ({ name, email, password }: signUpTypes) => {
  const response = await axios.post('http://localhost:3000/api/user/signup', {
    name,
    email,
    password,
  });

  if (response.data.message !== 'Success') {
    return {
        message : "Failed"
    }
  }

  localStorage.setItem('user-token', response.data.token);
  return response.data;
};

export default signUp;
