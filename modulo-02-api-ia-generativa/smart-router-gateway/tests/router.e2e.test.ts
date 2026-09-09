import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.ts";
import { config } from "../src/config.ts";
import { type LLMResponse, OpenrouterService } from "../src/openrouterService.ts";

console.assert(
  process.env.OPENROUTER_API_KEY,
  'OPENROUTER_API_KEY is not set in env variables'
);



test('routes to cheaper model by default', async () => {
  const customConfig = {
    ...config,
    provider: {
      ...config.provider,
      sort: {
        ...config.provider.sort,
        by: 'price'
      }
    }
  };
  const routerService = new OpenrouterService(customConfig);
  const app = createServer(routerService);
  const response = app.inject({
    method: 'POST',
    url: '/chat',
    body: { question: 'What is rate limit?' }
  });
  assert.equal((await response).statusCode, 200);
  const body = (await response).json() as LLMResponse;
  assert.equal(body.model, 'nex-agi/nex-n2.5-mini:free');
});


test('routes to highest throuput model by default', async () => {
  const customConfig = {
    ...config,
    provider: {
      ...config.provider,
      sort: {
        ...config.provider.sort,
        by: 'price'
      }
    }
  };
  const routerService = new OpenrouterService(customConfig);
  const app = createServer(routerService);
  const response = app.inject({
    method: 'POST',
    url: '/chat',
    body: { question: 'What is rate limit?' }
  });
  assert.equal((await response).statusCode, 200);
  const body = (await response).json() as LLMResponse;
  assert.equal(body.model, 'nex-agi/nex-n2.5-mini:free');
});
