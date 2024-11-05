import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

class UserService {
  static async authUser(body: { email: string; password: string }) {

    console.log('baseURL')
    console.log(baseURL)
    try {
      const response = await axios.post(`${baseURL}/api/auth`, body);

      if (response.status !== 200)
        throw new Error(`Authentication failed: ${response.statusText}`);

      const data = await response.data;
      return data;
    } catch (error) {
      throw console.error("Error while authenticate user, error: ", error);
    }
  }

  static async checkFirstAcess(body: { email: string }) {
    try {
      const response = await axios.get(`${baseURL}/api/user/${body.email}`);
      return response.data;
    } catch (error) {
      console.error("Error while checking first acess, error: ", error);
    }
  }

  static async changeName(body: { employeeId: string; name: string, token: string }) {

    const route = `${baseURL}/api/employees/${body.employeeId}`;
    const params = { name: body.name }
    const headers = {
      headers: {
        Authorization: `Bearer ${body.token}`
      }
    }

    try {
      const response = await axios.put(route, params, headers);
      const data = await response.data;
      return data
    } catch (error) {
      throw console.error("Error while Updating Employee Name, error: ", error);

    }
  }
}

export default UserService;
