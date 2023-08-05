import { setupServer } from "msw/node";
import { rest } from 'msw';

export function createServer(handlerConfig) {
  const headers = handlerConfig.map((config) => {
    return rest[config.method](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });
  const server = setupServer(...headers);

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
}
