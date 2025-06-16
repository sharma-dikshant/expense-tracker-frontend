import { redirect } from "react-router";
import { getLoginUser } from "../services/apiExpenses";

export async function protectedLoader() {
  try {
    const response = await getLoginUser();
    return response;
  } catch (error) {
    if (error.code === "ERR_NETWORK") {
      alert("Network Error!");
      return redirect("/");
    } else if (error.status === 400) {
      alert("Please login to continue!");
      return redirect("/auth");
    }
    alert("something went wrong");
    return redirect("/");
  }
}
