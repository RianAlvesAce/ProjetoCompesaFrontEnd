import axios, {Axios, AxiosError, AxiosResponse} from "axios"
import OcorrenciaBodySubmit from "../interfaces/OcorrenciaBodySubmit"
import UnidadeQuant from "../interfaces/UnidadeQuant"

const api = axios.create({
  baseURL: "http://localhost:5055/"
})

interface TipoInterface {
  id: number,
  name: string,
}

class OcorrenciaService {

  body: OcorrenciaBodySubmit

  constructor(body: OcorrenciaBodySubmit) {
    this.body = body
  }

  static async getOcorrencias() {
    const response = api.get('/api/Ocorrencia/getOcorrencias')
      .then((response: AxiosResponse) => {
        return response.data
      })
      return await response
  }

  async postOcorrencia() {
    console.log(this.body)
    const response = await api.post('api/Ocorrencia/postOcorrencia', this.body)

    return response.data
  }

  static async getUnidades(): Promise<{iD_Unidade: number, nome_unidade: string, endereco: string, latitude: number, longitude: number}[]> {
    const {data} = await api.get('/api/Ocorrencia/getUnidades')
    return data
  }
  
  static async getUnidadesQuant(): Promise<UnidadeQuant[]> {
    const {data} = await api.get('api/Ocorrencia/GetUnidadeCount')
    return data
  }

  static async getTipos(): Promise<TipoInterface[]> {
    const {data} = await api.get('/api/Ocorrencia/getTipos')
    return data
  }

  static async getLatLong(endereco: string): Promise<{lat: number, lon: number, name: string}> {
    const response = axios.get(`https://nominatim.openstreetmap.org/search?q=${endereco}&format=json&limit=1`)
      .then((response) => {
        console.log(response.data)
        return {
          lat: Number(response.data[0].lat),
          lon: Number(response.data[0].lon),
          name: response.data[0].display_name.split(',').slice(0,1).concat(response.data[0].display_name.split(',').slice(2,3)).join(',')
        }
      });
    
      return await response;
  }
}

export default OcorrenciaService