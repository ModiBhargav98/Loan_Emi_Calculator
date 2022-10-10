import axios from "axios";
const LOAN_API_URL = "http://localhost:4000";

class LoanServices {
  LoginUser(Detail) {
    console.log(Detail);
    return axios.post(LOAN_API_URL + "/user-login", Detail);
  }
  AddEmiDetails(userId,data) {
    console.log(data);
    return axios.put(LOAN_API_URL + "/loan-emi/" + userId, data);
  }
  getEmiDetails(userId){
    return axios.get(LOAN_API_URL + "/get-emi-details/" + userId);
  }
}
export default new LoanServices();
