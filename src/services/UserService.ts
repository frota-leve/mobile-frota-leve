import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

class UserService {
  static async authUser(body: { email: string; password: string }) {
    const response = await axios.post(`${baseURL}/api/auth`, body);
    const data = await response.data;
    return data;
  }

  static async checkFirstAcess(body: { email: string }) {
    const { data } = await axios.get(`${baseURL}/api/user/${body.email}`);
    return data;
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
