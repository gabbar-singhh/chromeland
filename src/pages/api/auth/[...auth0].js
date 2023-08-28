import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    try {
      const loginResult = await handleLogin(req, res);

      if (loginResult === true) {
        console.log("successful ✅");
      }
    } catch (error) {
      console.error("😡Authentication error:", error);
    }
  },
});
