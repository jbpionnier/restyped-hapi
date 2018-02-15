import { Request, ResponseToolkit, RouteOptions, Server } from 'hapi'
import { RestypedBase, RestypedRoute } from 'restyped'

export interface TypedRequest<T extends RestypedRoute> extends Request {
  payload: T['body']
  params: T['params']
  query: T['query']
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'HEAD' | 'DELETE' | 'OPTIONS'

export default function RestypedRouter<APIDef extends RestypedBase>(server: Server) {
  return function route<Path extends keyof APIDef, Method extends HTTPMethod>(options: {
    method: Method
    path: Path
    vhost?: string | string[]
    rules?: object
    options?: RouteOptions
    handler(
      request: TypedRequest<APIDef[Path][Method]>,
      h: ResponseToolkit,
    ): Promise<APIDef[Path][Method]['response']> | Promise<void>
  }) {
    server.route({ ...options, method: options.method as any })
  }
}
