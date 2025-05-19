import useSWR from "swr";

async function fetchAPI() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function Home() {
  return (
    <>
      <h1>Welcome to the Status Page</h1>

      <UpdateAt />
      <div>
        <PostgresVersion />
      </div>
      <div>
        <MaxConnections />
      </div>
      <div>
        <ActiveConnections />
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

//versao postgres
function PostgresVersion() {
  const { isLoading, data } = useSWR("postgresVersion", fetchAPI, {
    refreshInterval: 2000,
  });

  let versionText = "Loading...";
  if (!isLoading && data) {
    versionText = data.dependencies.database.version;
  }
  return <>PostgresVersion: {versionText}</>;
}

//quantidade de conexoes maximas
function MaxConnections() {
  const { isLoading, data } = useSWR("maxConnections", fetchAPI, {
    refreshInterval: 2000,
  });
  let maxConnectionsText = "Loading...";
  if (!isLoading && data) {
    maxConnectionsText = data.dependencies.database.max_connections;
  }
  return <>MaxConnections: {maxConnectionsText}</>;
}

//quantidade de conexoes ativas
function ActiveConnections() {
  const { isLoading, data } = useSWR("activeConnections", fetchAPI, {
    refreshInterval: 2000,
  });
  let activeConnectionsText = "Loading...";
  if (!isLoading && data) {
    activeConnectionsText = data.dependencies.database.used_connections;
  }
  return <>ActiveConnections: {activeConnectionsText}</>;
}
