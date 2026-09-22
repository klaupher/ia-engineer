import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';
import { PostgresStore } from '@langchain/langgraph-checkpoint-postgres/store';
import { config } from '../config.ts';


export type MemoryService = {
  checkpoint: PostgresSaver;
  store: PostgresStore;
};

export async function createMemoryService(): Promise<MemoryService> {
  const dbUri = config.memory.dbUri;
  const store = PostgresStore.fromConnString(dbUri);
  const checkpoint = PostgresSaver.fromConnString(dbUri);

  await store.setup();
  await checkpoint.setup();

  console.log(`✅  Memory configurada: Postgres`);
  return {
    checkpoint,
    store
  };
}