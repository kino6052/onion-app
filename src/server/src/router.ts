type Handler = (
  req: Request,
  params: Record<string, string>
) => Promise<Response>;

class Router {
  private routes: { method: string; path: RegExp; handler: Handler }[] = [];

  on(method: string, path: string, handler: Handler) {
    console.warn({ method, path });
    const pathRegex = new RegExp(
      `^${path.replace(/:(\w+)/g, "(?<$1>[^/]+)").replace(/\*/g, ".*")}$`
    );
    this.routes.push({ method, path: pathRegex, handler });
  }

  async handle(req: Request): Promise<Response> {
    console.warn({ req: req.body });
    const url = new URL(req.url);
    for (const route of this.routes) {
      const match = url.pathname.match(route.path);
      if (match && req.method === route.method) {
        const params = Object.entries(match.groups || {}).reduce(
          (acc, [key, value]) => {
            acc[key] = value;
            return acc;
          },
          {} as Record<string, string>
        );
        const response = await route.handler(req, params);
        return response;
      }
    }
    return new Response("Not Found", { status: 404 });
  }
}

export const router = new Router();
