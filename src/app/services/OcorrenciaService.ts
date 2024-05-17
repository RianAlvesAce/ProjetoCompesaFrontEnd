import axios, {Axios, AxiosError, AxiosResponse} from "axios"

const api = axios.create({
  baseURL: "http://localhost:5055/"
})

class OcorrenciaService {
  static async getOcorrencias() {
    const response = api.get('/api/Ocorrencia/getOcorrencias')
      .then((response: AxiosResponse) => {
        return response.data
      })
      return await response
  }

  static async getUnidades(): Promise<{nome_unidade: string}[]> {
    const {data} = await api.get('/api/Ocorrencia/getUnidades')

    return data
  }
}

export default OcorrenciaService