interface ocorrenciaBody {
  id_Ocorrencia: number,
  criador: string,
  unidade: string,
  tipo: string,
  data: string,
  comunicado: number,
  pm_alpha: number,
  estado: boolean,
  descricao: string,
  atualizado_por: string,
  estadoParado: boolean,
  prot_neoenergia: number
}

export default ocorrenciaBody