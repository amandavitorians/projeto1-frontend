import React from "react";
import { Container, Typography, Box } from "@mui/material";
import SearchForm from "./components/SearchForm";
import ResultList from "./components/ResultList";
import ErrorMessage from "./components/ErrorMessage";
import { useAppContext } from "./contexts/AppContext";
import { searchCats } from "./api";

export default function App() {
  const { state, dispatch } = useAppContext();
  const { query, loading, error } = state;

  async function performSearch(q, limit = 12) {
    dispatch({ type: "SET_QUERY", payload: { q, limit } });
    dispatch({ type: "FETCH_START" });
    try {
      const data = await searchCats({ q, limit });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message || "Erro na requisição" });
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h4">Projeto 1 - SPA React</Typography>
        <Typography variant="subtitle1">Consumindo API pública (The Cat API)</Typography>
      </Box>

      <SearchForm onSearch={performSearch} loading={loading} />
      {error && <ErrorMessage message={error} />}
      <ResultList />
    </Container>
  );
}