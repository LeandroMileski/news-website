import useSWR from "swr";

async function fetchAPI() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function Home() {
  return (
    <>
      <h1>Welcome to the Home Page</h1>

      <UpdateAt />
      <div>
        <DatabaseStatus />
      </div>
    </>
  );
}

function UpdateAt() {
  const { isLoading, data } = useSWR("status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updateAtText = "Loading...";
  if (!isLoading && data) {
    updateAtText = new Date(data.updated_at).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
    });
  }
  return <div>Última atualização: {updateAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("status", fetchAPI, {
    refreshInterval: 2000,
  });
  let databaseStatusText = "Loading...";
  if (!isLoading && data) {
    databaseStatusText = (
      <>
        <div>Version:{data.dependencies.database.version}</div>
        <div>Max connections:{data.dependencies.database.max_connections}</div>
        <div>
          Open connections:{data.dependencies.database.used_connections}
        </div>
      </>
    );
  }
  return (
    <>
      <h1>Database</h1>
      <>{databaseStatusText}</>
    </>
  );
}
