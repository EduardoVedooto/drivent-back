import { getConnection } from "typeorm";
import { createCacheClient, cacheClient } from "../../src/cache";

function getEntities() {
  const entities = [];

  const connection = getConnection();

  for (const entityInfo of connection.entityMetadatas) {
    entities.push({ name: entityInfo.name, tableName: entityInfo.tableName });
  }

  return entities;
}

export async function clearDatabase() {
  const entities = getEntities();
  const connection = getConnection();

  for (const entity of entities) {
    try {
      await connection.query(`DELETE FROM "${entity.tableName}"`);
    } catch {
      // se não deu pra rodar delete na tabela por chave estrangeira, jogo pro final do array pra tentar de novo no futuro
      entities.push(entity);
    }
  }

  await createCacheClient();
  const client = cacheClient();
  await client.flushdb();
}

export async function endConnection() {
  await getConnection().close();
}
