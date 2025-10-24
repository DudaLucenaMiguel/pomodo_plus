import { useUsuarios } from "./hooks/useUsuarios";

export default function App() {
  const { data, loading, error } = useUsuarios({ limit: 10 });

  if (loading) return <p>Carregando…</p>;
  if (error)   return <p>Erro: {error}</p>;
  if (!data || data.length === 0) return <p>Sem registros.</p>;

  return (
    <div style={{ padding: 16 }}>
      <h1>Usuários</h1>
      <ul>
        {data.map((u) => (
          <li key={u.id || u.email}>{u.nome ?? u.email ?? JSON.stringify(u)}</li>
        ))}
      </ul>
    </div>
  );
}
