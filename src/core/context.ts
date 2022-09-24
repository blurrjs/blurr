import type { Emitter } from 'event-emitter';

class BaseContext {
  req: Request;
  res: Response | null;

  public params: any;

  // HTTP-related metadata
  readonly method: string;
  readonly path: string;
  readonly host: string;
  readonly headers: Request['headers'];
  readonly url: URL;

  private eventHandler!: Emitter;

  constructor(req: Request) {
    this.req = req;

    const url = new URL(req.url);
    this.method = req.method;

    this.path = url.pathname;
    this.host = url.host;
    this.headers = req.headers;
    this.url = url;

    this.res = null;
    this.req.blob();
  }
}

export class Context extends BaseContext {
  constructor(req: Request) {
    super(req);
  }

  public get secure(): boolean {
    return this.url.protocol === 'https' || this.url.protocol === 'wss';
  }

  // Methods to parse the JSON response returned and convert into valid `Request` object.
  // Ref: `dev/DESIGN.md`
}
