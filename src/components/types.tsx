// types.ts
export type RootStackParamList = {
    Login: undefined;
    Home: { userName: string, id: number, idFamilia: number };
    Cadastro1: undefined;
    Cadastro: undefined;
    CadastroFamilia: undefined;
    Despesas: { userName: string, id: number };
    AddGasto: { userName: string, id: number };
    Rendimentos: { userName: string, id: number };
    AddRendimentos: { userName: string, id: number };
    Poupancas: { userName: string, id: number };
    AddPoupanca: { userName: string, id: number };
    // Adicione outros parâmetros para outras telas conforme necessário
  };
  