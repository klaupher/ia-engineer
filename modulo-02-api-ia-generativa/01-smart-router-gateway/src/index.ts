import { config } from "./config.ts";
import { OpenrouterService } from "./openrouterService.ts";
import { createServer } from "./server.ts";


const routerService = new OpenrouterService(config);
const app = createServer(routerService);

await app.listen({ port: 3000, host: '0.0.0.0' });
console.log('server running at 3000');

// app.inject({
//   method: 'POST',
//   url: '/chat',
//   body: { question: 'What is the smaller country in Europe !' }
// }).then(response => {
//   console.log('Response Status', response.statusCode);
//   console.log('Response body', response.body);
// });
