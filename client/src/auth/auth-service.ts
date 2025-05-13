import $api, { setHeader } from "../axios-setup";
import { credentials } from "./auth-types";
export default new (class AuthService {
  async SignUp(credentials: credentials) {
    const userData = (await $api.post("/signup", { ...credentials })).data.user;
    const response = await this.login({
      email: credentials.email,
      username: credentials.username,
      password: credentials.password,
      passwordSub: credentials.password
    });
    console.log(response)
    localStorage.setItem("token", response.token);
    localStorage.setItem("role", response.role);
    setHeader();
  }

  async login(inputValue: credentials) {
    const {token, role} = (await $api.post("/login", inputValue)).data;
    return {token, role};
  }
})();
