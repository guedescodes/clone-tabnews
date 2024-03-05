import database from "infra/database.js";

export default async function status(request, response) {
  const updateAt = new Date().toISOString();

  //versao do postgress
  const dbVersionResult = await database.query("SHOW server_version;");
  const dbVersion = dbVersionResult.rows[0].server_version;

  //quantidade de conexoes maximas utilizadas,
  const dbMaxConnectionsResult = await database.query("SHOW max_connections;");
  const dbMaxConnections = dbMaxConnectionsResult.rows[0].max_connections;

  //quantas conexoes estao sendo usadas
  const databaseName = process.env.POSTGRES_DB;
  //console.log(`Banco de dados selecionado ${databaseName}`);
  const dbOpenedConnectionsResult = await database.query({
    text: `SELECT count(*):: int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  //("SELECT count(*):: int FROM pg_stat_activity WHERE datname = 'local_db'");
  const dbOpenedConnections = dbOpenedConnectionsResult.rows[0].count;

  const statusCompleted = {
    updated_at: updateAt,
    dependencies: {
      database: {
        version: dbVersion,
        max_connections: parseInt(dbMaxConnections),
        opened_connections: dbOpenedConnections,
      },
    },
  };

  response.status(200).json(statusCompleted);
}
