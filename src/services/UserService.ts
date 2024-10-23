import axios from "axios";

const baseURL = "http://localhost:8080";

class UserService {
  static async authUser(body: { email: string; password: string }) {
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

  static async changeName(body: { id: string, newName: string }) {
    try {
      const response = await axios.put(`${baseURL}/api/CHANGE-EMPLOYER-NAME`, body)
      const data = await response.data;
    } catch (error) {
      throw console.error("Error while updating employe name, error: ", error);

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
}

export default UserService;
