interface OcorrenciaBodySubmit {
  [key: string]: string | number | boolean | Date | FormDataEntryValue | null;
  ID_Usuario: number | FormDataEntryValue,
  ID_Unidade: number | FormDataEntryValue,
  ID_Tipo: number | FormDataEntryValue,
  Prot_Energia: number | FormDataEntryValue,
  Latitude: number | FormDataEntryValue,
  Longitude: number | FormDataEntryValue,
  Relato_Sic: string | FormDataEntryValue,
  Comunicado_Sic: string | FormDataEntryValue,
  Relato_Abertura: string | FormDataEntryValue,
  Tipo_Falta: string | FormDataEntryValue,
  Hora_Ocorrencia: string | FormDataEntryValue,
  Hora_Prevista: string | FormDataEntryValue,
  Autor_Abertura: string | FormDataEntryValue,
  Autor_Ultima_Edicao: string | FormDataEntryValue,
  Endereco: string | FormDataEntryValue,
  Has_Parada: boolean | FormDataEntryValue,
  Falta_Energia: boolean | FormDataEntryValue, 
  Aberta: boolean | FormDataEntryValue,
  Data_Ultima_Edicao: Date | FormDataEntryValue | null,
  Inicio_Previsto: Date | FormDataEntryValue,
  Termino_Previsto: Date | FormDataEntryValue,
  Numero_Nr: number | FormDataEntryValue,
  Data_Criacao: number | FormDataEntryValue
}

export default OcorrenciaBodySubmit