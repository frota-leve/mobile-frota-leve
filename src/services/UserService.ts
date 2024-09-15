class UserService {
  static async authUser(body: { email: string; password: string }) {
    try {
      const response = await fetch(`http://localhost:8080/auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: body.email,
          password: body.password,
        }),
      });

      if (!response.ok)
        throw new Error(`Authentication failed: ${response.statusText}`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error while authenticate user, error: ", error);
    }
  }
}

export default UserService;
