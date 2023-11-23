import React, { createContext, useReducer, useContext } from "react";
import { searchAdviceByTerm } from "../services/adviceService";

// Estrutura inicial do estado
const initialState = {
  adviceList: [],
  error: null,
  isLoading: false,
  searchTerm: "",
  currentPage: 1,
  searchPerformed: false,
  itemsPerPage: 5,
};

// Criação do contexto
const AdviceContext = createContext();

// Definindo os tipos de ação para usar com useReducer
const SET_ADVICE_LIST = "SET_ADVICE_LIST";
const SET_ERROR = "SET_ERROR";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_SEARCH_PERFORMED = "SET_SEARCH_PERFORMED";

// Função de redução para atualizar o estado com base em ações
function searchReducer(state, action) {
  switch (action.type) {
    case SET_ADVICE_LIST:
      return { ...state, adviceList: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    case SET_SEARCH_PERFORMED:
      return { ...state, searchPerformed: action.payload };
    default:
      return state;
  }
}

// Provedor do contexto que fornece o estado e funções de atualização
export function AdviceContextProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  // Função para buscar conselhos com base no termo
  const searchAdviceByTermWithContext = async (term) => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true });
      dispatch({ type: SET_SEARCH_TERM, payload: term });

      const adviceData = await searchAdviceByTerm(term);
      dispatch({ type: SET_ADVICE_LIST, payload: adviceData });
      dispatch({ type: SET_ERROR, payload: null });
      dispatch({ type: SET_SEARCH_PERFORMED, payload: true });
    } catch (error) {
      dispatch({ type: SET_ADVICE_LIST, payload: [] });
      dispatch({ type: SET_ERROR, payload: error.message });
      dispatch({ type: SET_SEARCH_PERFORMED, payload: false });
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: false });
      dispatch({ type: SET_CURRENT_PAGE, payload: 1 });
    }
  };

  // Função para lidar com a mudança de página
  const handlePageChange = (pageNumber) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: pageNumber });
  };

  return (
    <AdviceContext.Provider
      value={{
        state,
        searchAdviceByTerm: searchAdviceByTermWithContext,
        handlePageChange,
      }}
    >
      {children}
    </AdviceContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useAdviceContext() {
  const context = useContext(AdviceContext);
  if (!context) {
    throw new Error(
      "useAdviceContext must be used within a AdviceContextProvider"
    );
  }
  return context;
}
