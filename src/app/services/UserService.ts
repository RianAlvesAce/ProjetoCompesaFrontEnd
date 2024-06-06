import axios, {Axios, AxiosError, AxiosResponse} from "axios"

const api = axios.create({
  baseURL: "http://localhost:5055/"
})

class UserService {
  static async login(userNick: string, userPass: string) {
    const response = api.get(`/api/User/login?UserNick=${userNick}&UserPass=${userPass}`)
      .then((response: AxiosResponse) => {
        return {
          token: response.data.token,
          status: response.status
        }
      }) 
      .catch((err: AxiosError<any>) => {
        console.log('deu erro aqui')
        return {
          msg: err.response?.data.msg,
          status: err.response?.status
        }
      })

    return await response
  }
}

export default UserService