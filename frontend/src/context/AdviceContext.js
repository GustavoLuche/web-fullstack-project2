// frontend/src/constex/AdviceContext.js

import React, { createContext, useReducer, useContext, useEffect } from "react";
import {
  searchAdviceByTerm,
  searchAdviceByTermRoute,
  insertAdvice,
} from "../services/adviceService";

// Estrutura inicial do estado
const initialState = {
  adviceList: [],
  error: null,
  isLoading: false,
  searchTerm: "",
  currentPage: 1,
  searchPerformed: false,
  itemsPerPage: 5,
  showHomePage: true,
  showInsertionPage: false,
  showSearchPage: false,
  showNotificationPage: false,
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
const SET_SHOW_HOME_PAGE = "SET_SHOW_HOME_PAGE";
const SET_SHOW_INSERTION_PAGE = "SET_SHOW_INSERTION_PAGE";
const SET_SHOW_SEARCH_PAGE = "SET_SHOW_SEARCH_PAGE";
const SET_SHOW_NOTIFICATION_PAGE = "SET_SHOW_NOTIFICATION_PAGE";

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
    case SET_SHOW_HOME_PAGE:
      return { ...state, showHomePage: action.payload };
    case SET_SHOW_INSERTION_PAGE:
      return { ...state, showInsertionPage: action.payload };
    case SET_SHOW_SEARCH_PAGE:
      return { ...state, showSearchPage: action.payload };
    case SET_SHOW_NOTIFICATION_PAGE:
      return { ...state, showNotificationPage: action.payload };
    default:
      return state;
  }
}

// Provedor do contexto que fornece o estado e funções de atualização
export function AdviceContextProvider({ children }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  useEffect(() => {
    resetState();
  }, [
    state.showHomePage,
    state.showInsertionPage,
    state.showSearchPage,
    state.showNotificationPage,
  ]);

  // Função para buscar conselhos com base no termo
  const searchAdviceByTermWithContext = async (term) => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true });
      dispatch({ type: SET_SEARCH_TERM, payload: term });

      if (state.showSearchPage) {
        const adviceData = await searchAdviceByTermRoute(term);
        dispatch({ type: SET_ADVICE_LIST, payload: adviceData });
      } else {
        const adviceData = await searchAdviceByTerm(term);
        dispatch({ type: SET_ADVICE_LIST, payload: adviceData });
      }

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

  // Função para mudar o estado da página
  const changePage = (pageName) => {
    dispatch({ type: SET_SHOW_HOME_PAGE, payload: pageName === "home" });
    dispatch({
      type: SET_SHOW_INSERTION_PAGE,
      payload: pageName === "insertion",
    });
    dispatch({ type: SET_SHOW_SEARCH_PAGE, payload: pageName === "search" });
    dispatch({
      type: SET_SHOW_NOTIFICATION_PAGE,
      payload: pageName === "notification",
    });
  };

  // Função para inserir um novo conselho
  const insertAdviceWithContext = async (adviceText) => {
    try {
      dispatch({ type: SET_IS_LOADING, payload: true });
      const insertedAdvice = await insertAdvice(adviceText);
      console.log("Inserido com sucesso: ", insertedAdvice);
      dispatch({ type: SET_ERROR, payload: null });
    } catch (error) {
      dispatch({ type: SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: SET_IS_LOADING, payload: false });
    }
  };

  // Função para redefinir o estado
  const resetState = () => {
    dispatch({ type: SET_SEARCH_TERM, payload: "" });
    dispatch({ type: SET_SEARCH_PERFORMED, payload: false });
    dispatch({ type: SET_ERROR, payload: null });
  };

  return (
    <AdviceContext.Provider
      value={{
        state,
        searchAdviceByTerm: searchAdviceByTermWithContext,
        handlePageChange,
        changePage,
        insertAdvice: insertAdviceWithContext,
        resetState,
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
