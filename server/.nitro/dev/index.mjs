import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import destr from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, getHeader, appendResponseHeader, sendRedirect, proxyRequest, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, setResponseHeaders, setResponseStatus, send, createError, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, readBody, getQuery as getQuery$1 } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/h3@1.15.5/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1, $fetch as $fetch$1 } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/ufo@1.6.3/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/unstorage@1.17.4_@netlify+blobs@9.1.2_db0@0.3.4_better-sqlite3@11.10.0__ioredis@5.9.2/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/unstorage@1.17.4_@netlify+blobs@9.1.2_db0@0.3.4_better-sqlite3@11.10.0__ioredis@5.9.2/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import consola, { createConsola } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/youch-core@0.3.3/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/youch@4.1.0-beta.13/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/source-map@0.7.6/node_modules/source-map/source-map.js';
import process$1 from 'node:process';
import { jwtVerify, SignJWT } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/jose@6.1.3/node_modules/jose/dist/webapi/index.js';
import { Server } from 'node:http';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { query } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/@anthropic-ai+claude-agent-sdk@0.2.11_zod@3.25.76/node_modules/@anthropic-ai/claude-agent-sdk/sdk.mjs';
import { StreamableHTTPServerTransport } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/@modelcontextprotocol+sdk@1.25.2_hono@4.11.4_zod@3.25.76/node_modules/@modelcontextprotocol/sdk/dist/esm/server/streamableHttp.js';
import { z } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/zod@3.25.76/node_modules/zod/index.js';
import { McpServer } from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/@modelcontextprotocol+sdk@1.25.2_hono@4.11.4_zod@3.25.76/node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js';
import cloudbase from 'file:///Users/scott/Documents/%E9%BB%91%E5%AE%A2%E6%9D%BE%E6%AF%94%E8%B5%9B/newsnow/node_modules/.pnpm/@cloudbase+node-sdk@3.17.0/node_modules/@cloudbase/node-sdk/dist/index.js';

const serverAssets = [{"baseName":"server","dir":"/Users/scott/Documents/黑客松比赛/newsnow/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/scott/Documents/黑客松比赛/newsnow/server"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/scott/Documents/黑客松比赛/newsnow/server"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/scott/Documents/黑客松比赛/newsnow/server/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/scott/Documents/黑客松比赛/newsnow/server/.nitro/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/scott/Documents/黑客松比赛/newsnow/server/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: undefined,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
const goHeader = "x-nitro-go";
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    const goAhead = !!routeRules.headers?.[goHeader] || getHeader(event, goHeader);
    if (!goAhead) {
      if (routeRules.redirect) {
        let target = routeRules.redirect.to;
        if (target.endsWith("/**")) {
          let targetPath = event.path;
          const strpBase = routeRules.redirect._redirectStripBase;
          if (strpBase) {
            targetPath = withoutBase(targetPath, strpBase);
          }
          target = joinURL(target.slice(0, -3), targetPath);
        } else if (event.path.includes("?")) {
          const query = getQuery(event.path);
          target = withQuery(target, query);
        }
        appendResponseHeader(event, goHeader, "true");
        return sendRedirect(event, target, routeRules.redirect.statusCode);
      }
      if (routeRules.proxy) {
        let target = routeRules.proxy.to;
        if (target.endsWith("/**")) {
          let targetPath = event.path;
          const strpBase = routeRules.proxy._proxyStripBase;
          if (strpBase) {
            targetPath = withoutBase(targetPath, strpBase);
          }
          target = joinURL(target.slice(0, -3), targetPath);
        } else if (event.path.includes("?")) {
          const query = getQuery(event.path);
          target = withQuery(target, query);
        }
        return proxyRequest(event, target, {
          fetch: ctx.localFetch,
          headers: {
            [goHeader]: "true",
            ...routeRules.proxy.headers
          },
          ...routeRules.proxy
        });
      }
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const plugins = [
  
];

const logger = createConsola({
  level: 4,
  formatOptions: {
    columns: 80,
    colors: true,
    compact: false,
    date: true
  }
});

const _1Va1YH = defineEventHandler(async (event) => {
  var _a, _b;
  const url = getRequestURL(event);
  if (!url.pathname.startsWith("/api")) return;
  if (["JWT_SECRET", "G_CLIENT_ID", "G_CLIENT_SECRET"].find((k) => !process$1.env[k])) {
    event.context.disabledLogin = true;
    if (["/api/s", "/api/proxy", "/api/latest", "/api/mcp", "/api/chat"].every((p) => !url.pathname.startsWith(p)))
      throw createError({ statusCode: 506, message: "Server not configured, disable login" });
  } else {
    if (["/api/s", "/api/me"].find((p) => url.pathname.startsWith(p))) {
      const token = (_b = (_a = getHeader(event, "Authorization")) == null ? void 0 : _a.replace(/Bearer\s*/, "")) == null ? void 0 : _b.trim();
      if (token) {
        try {
          const { payload } = await jwtVerify(token, new TextEncoder().encode(process$1.env.JWT_SECRET));
          if (payload == null ? void 0 : payload.id) {
            event.context.user = {
              id: payload.id,
              type: payload.type
            };
          }
        } catch {
          if (url.pathname.startsWith("/api/me"))
            throw createError({ statusCode: 401, message: "JWT verification failed" });
          else logger.warn("JWT verification failed");
        }
      } else if (url.pathname.startsWith("/api/me")) {
        throw createError({ statusCode: 401, message: "JWT verification failed" });
      }
    }
  }
});

const _lazy_VPRf2K = () => Promise.resolve().then(function () { return chat_post$1; });
const _lazy_v08LzA = () => Promise.resolve().then(function () { return enableLogin$1; });
const _lazy_WYlZxg = () => Promise.resolve().then(function () { return latest$1; });
const _lazy_cy84EE = () => Promise.resolve().then(function () { return login$1; });
const _lazy_ONLk8m = () => Promise.resolve().then(function () { return mcp_post$1; });
const _lazy_oQ4Fw4 = () => Promise.resolve().then(function () { return index$3; });
const _lazy_bvJPsu = () => Promise.resolve().then(function () { return sync$1; });
const _lazy_a1jDth = () => Promise.resolve().then(function () { return github$1; });
const _lazy_fHHtH6 = () => Promise.resolve().then(function () { return entire_post$1; });
const _lazy_o_8ohj = () => Promise.resolve().then(function () { return index$1; });

const handlers = [
  { route: '', handler: _1Va1YH, lazy: false, middleware: true, method: undefined },
  { route: '/api/chat', handler: _lazy_VPRf2K, lazy: true, middleware: false, method: "post" },
  { route: '/api/enable-login', handler: _lazy_v08LzA, lazy: true, middleware: false, method: undefined },
  { route: '/api/latest', handler: _lazy_WYlZxg, lazy: true, middleware: false, method: undefined },
  { route: '/api/login', handler: _lazy_cy84EE, lazy: true, middleware: false, method: undefined },
  { route: '/api/mcp', handler: _lazy_ONLk8m, lazy: true, middleware: false, method: "post" },
  { route: '/api/me', handler: _lazy_oQ4Fw4, lazy: true, middleware: false, method: undefined },
  { route: '/api/me/sync', handler: _lazy_bvJPsu, lazy: true, middleware: false, method: undefined },
  { route: '/api/oauth/github', handler: _lazy_a1jDth, lazy: true, middleware: false, method: undefined },
  { route: '/api/s/entire', handler: _lazy_fHHtH6, lazy: true, middleware: false, method: "post" },
  { route: '/api/s', handler: _lazy_o_8ohj, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

class ClaudeAgentService {
  /**
   * 发送消息并获取流式响应
   */
  async *sendMessage(message) {
    const q = query({
      prompt: message,
      options: {
        model: "claude-sonnet-4-5-20250929",
        systemPrompt: this.getSystemPrompt()
      }
    });
    for await (const msg of q) {
      if (msg.type === "assistant") {
        const text = msg.message.content.filter((block) => block.type === "text").map((block) => block.text).join("");
        if (text) {
          yield text;
        }
      }
    }
  }
  /**
   * 获取系统提示词
   */
  getSystemPrompt() {
    return `\u4F60\u662F\u4E00\u4E2A\u4E13\u4E1A\u7684\u5199\u4F5C\u52A9\u624B\uFF0C\u4E13\u95E8\u5E2E\u52A9\u7528\u6237\u4F18\u5316\u65F6\u4E8B\u8BC4\u8BBA\u6587\u7AE0\u3002\u4F60\u7684\u4EFB\u52A1\u662F\uFF1A

1. **\u5185\u5BB9\u4F18\u5316**: \u5E2E\u52A9\u6539\u8FDB\u6587\u7AE0\u7684\u8868\u8FBE\u3001\u903B\u8F91\u548C\u7ED3\u6784
2. **\u98CE\u683C\u5EFA\u8BAE**: \u6839\u636E\u7528\u6237\u559C\u597D\u63D0\u4F9B\u5199\u4F5C\u98CE\u683C\u5EFA\u8BAE
3. **\u4E8B\u5B9E\u6838\u67E5**: \u63D0\u9192\u7528\u6237\u6CE8\u610F\u4E8B\u5B9E\u51C6\u786E\u6027
4. **\u521B\u610F\u6FC0\u53D1**: \u5728\u7528\u6237\u5361\u4F4F\u65F6\u63D0\u4F9B\u5199\u4F5C\u7075\u611F

\u8BF7\u7528\u53CB\u597D\u3001\u4E13\u4E1A\u7684\u8BED\u6C14\u4E0E\u7528\u6237\u4EA4\u6D41\uFF0C\u5E76\uFF1A
- \u63D0\u4F9B\u5177\u4F53\u53EF\u884C\u7684\u5EFA\u8BAE
- \u89E3\u91CA\u4F60\u7684\u5EFA\u8BAE\u7406\u7531
- \u5C0A\u91CD\u7528\u6237\u7684\u521B\u4F5C\u610F\u56FE
- \u7528\u4E2D\u6587\u56DE\u590D

\u5982\u679C\u7528\u6237\u8BE2\u95EE\u65B0\u95FB\u4E8B\u4EF6\u6216\u9700\u8981\u4FE1\u606F\uFF0C\u4F60\u53EF\u4EE5\u5EFA\u8BAE\u7528\u6237\u4F7F\u7528\u65B0\u95FB\u4E2D\u5FC3\u83B7\u53D6\u6700\u65B0\u4FE1\u606F\u3002`;
  }
}
let agentServiceInstance = null;
function getClaudeAgentService() {
  if (!agentServiceInstance) {
    agentServiceInstance = new ClaudeAgentService();
  }
  return agentServiceInstance;
}

const chat_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { noteId, message } = body;
    if (!noteId || !message || typeof message !== "string") {
      throw createError({
        statusCode: 400,
        message: "Invalid request: noteId and message are required"
      });
    }
    setResponseHeaders(event, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive"
    });
    const agentService = getClaudeAgentService();
    const stream = agentService.sendMessage(message);
    for await (const chunk of stream) {
      event.node.res.write(`data: ${JSON.stringify({ chunk })}

`);
    }
    event.node.res.write("data: [DONE]\n\n");
    event.node.res.end();
  } catch (error) {
    console.error("Chat API error:", error);
    if (!event.node.res.headersSent) {
      throw createError({
        statusCode: 500,
        message: error.message || "Internal server error"
      });
    } else {
      event.node.res.write(`data: ${JSON.stringify({ error: error.message })}

`);
      event.node.res.end();
    }
  }
});

const chat_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: chat_post
});

const enableLogin = defineEventHandler(async () => {
  return {
    enable: true,
    url: `https://github.com/login/oauth/authorize?client_id=${process$1.env.G_CLIENT_ID}`
  };
});

const enableLogin$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: enableLogin
});

const latest = defineEventHandler(async () => {
  return {
    v: Version
  };
});

const latest$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: latest
});

const login = defineEventHandler(async (event) => {
  sendRedirect(event, `https://github.com/login/oauth/authorize?client_id=${process$1.env.G_CLIENT_ID}`);
});

const login$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: login
});

var version = "0.0.39";
const packageJSON = {
	version: version};

var v2ex = {
	redirect: "v2ex-share",
	name: "V2EX",
	column: "tech",
	home: "https://v2ex.com/",
	color: "slate",
	interval: 600000,
	title: "最新分享"
};
var zhihu = {
	name: "知乎",
	type: "hottest",
	column: "china",
	home: "https://www.zhihu.com",
	color: "blue",
	interval: 600000
};
var weibo = {
	title: "实时热搜",
	name: "微博",
	type: "hottest",
	column: "china",
	home: "https://weibo.com",
	color: "red",
	interval: 120000
};
var zaobao = {
	name: "联合早报",
	type: "realtime",
	desc: "来自第三方网站: 早晨报",
	column: "world",
	home: "https://www.zaobao.com",
	color: "red",
	interval: 1800000
};
var coolapk = {
	title: "今日最热",
	name: "酷安",
	type: "hottest",
	column: "tech",
	home: "https://coolapk.com",
	color: "green",
	interval: 600000
};
var mktnews = {
	redirect: "mktnews-flash",
	name: "MKTNews",
	column: "finance",
	home: "https://mktnews.net",
	color: "indigo",
	interval: 120000,
	title: "快讯"
};
var wallstreetcn = {
	redirect: "wallstreetcn-quick",
	name: "华尔街见闻",
	type: "realtime",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 300000,
	title: "快讯"
};
var douyin = {
	name: "抖音",
	type: "hottest",
	column: "china",
	home: "https://www.douyin.com",
	color: "gray",
	interval: 600000
};
var hupu = {
	title: "主干道热帖",
	name: "虎扑",
	type: "hottest",
	column: "china",
	home: "https://hupu.com",
	color: "red",
	interval: 600000
};
var tieba = {
	title: "热议",
	name: "百度贴吧",
	type: "hottest",
	column: "china",
	home: "https://tieba.baidu.com",
	color: "blue",
	interval: 600000
};
var toutiao = {
	name: "今日头条",
	type: "hottest",
	column: "china",
	home: "https://www.toutiao.com",
	color: "red",
	interval: 600000
};
var ithome = {
	name: "IT之家",
	type: "realtime",
	column: "tech",
	home: "https://www.ithome.com",
	color: "red",
	interval: 600000
};
var thepaper = {
	title: "热榜",
	name: "澎湃新闻",
	type: "hottest",
	column: "china",
	home: "https://www.thepaper.cn",
	color: "gray",
	interval: 1800000
};
var sputniknewscn = {
	name: "卫星通讯社",
	column: "world",
	home: "https://sputniknews.cn",
	color: "orange",
	interval: 600000
};
var cankaoxiaoxi = {
	name: "参考消息",
	column: "world",
	home: "https://china.cankaoxiaoxi.com",
	color: "red",
	interval: 1800000
};
var pcbeta = {
	redirect: "pcbeta-windows11",
	name: "远景论坛",
	type: "realtime",
	column: "tech",
	home: "https://bbs.pcbeta.com",
	color: "blue",
	interval: 300000,
	title: "Win11"
};
var cls = {
	redirect: "cls-telegraph",
	name: "财联社",
	type: "realtime",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 300000,
	title: "电报"
};
var xueqiu = {
	redirect: "xueqiu-hotstock",
	name: "雪球",
	type: "hottest",
	column: "finance",
	home: "https://xueqiu.com",
	color: "blue",
	interval: 120000,
	title: "热门股票"
};
var gelonghui = {
	title: "事件",
	name: "格隆汇",
	type: "realtime",
	column: "finance",
	home: "https://www.gelonghui.com",
	color: "blue",
	interval: 120000
};
var fastbull = {
	redirect: "fastbull-express",
	name: "法布财经",
	type: "realtime",
	column: "finance",
	home: "https://www.fastbull.cn",
	color: "emerald",
	interval: 120000,
	title: "快讯"
};
var solidot = {
	name: "Solidot",
	column: "tech",
	home: "https://solidot.org",
	color: "teal",
	interval: 3600000
};
var hackernews = {
	name: "Hacker News",
	type: "hottest",
	column: "tech",
	home: "https://news.ycombinator.com/",
	color: "orange",
	interval: 600000
};
var producthunt = {
	name: "Product Hunt",
	type: "hottest",
	column: "tech",
	home: "https://www.producthunt.com/",
	color: "red",
	interval: 600000
};
var github$2 = {
	redirect: "github-trending-today",
	name: "Github",
	type: "hottest",
	column: "tech",
	home: "https://github.com/",
	color: "gray",
	interval: 600000,
	title: "Today"
};
var bilibili = {
	redirect: "bilibili-hot-search",
	name: "哔哩哔哩",
	type: "hottest",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 600000,
	title: "热搜"
};
var kuaishou = {
	name: "快手",
	type: "hottest",
	disable: "cf",
	column: "china",
	home: "https://www.kuaishou.com",
	color: "orange",
	interval: 600000
};
var kaopu = {
	name: "靠谱新闻",
	desc: "不一定靠谱，多看多思考",
	column: "world",
	home: "https://kaopu.news/",
	color: "gray",
	interval: 1800000
};
var jin10 = {
	name: "金十数据",
	type: "realtime",
	column: "finance",
	home: "https://www.jin10.com",
	color: "blue",
	interval: 600000
};
var baidu = {
	name: "百度热搜",
	type: "hottest",
	column: "china",
	home: "https://www.baidu.com",
	color: "blue",
	interval: 600000
};
var nowcoder = {
	name: "牛客",
	type: "hottest",
	column: "china",
	home: "https://www.nowcoder.com",
	color: "blue",
	interval: 600000
};
var sspai = {
	name: "少数派",
	type: "hottest",
	column: "tech",
	home: "https://sspai.com",
	color: "red",
	interval: 600000
};
var juejin = {
	name: "稀土掘金",
	type: "hottest",
	column: "tech",
	home: "https://juejin.cn",
	color: "blue",
	interval: 600000
};
var ifeng = {
	title: "热点资讯",
	name: "凤凰网",
	type: "hottest",
	column: "china",
	home: "https://www.ifeng.com",
	color: "red",
	interval: 600000
};
var chongbuluo = {
	redirect: "chongbuluo-latest",
	name: "虫部落",
	column: "china",
	home: "https://www.chongbuluo.com/forum.php?mod=guide&view=newthread",
	color: "green",
	interval: 1800000,
	title: "最新"
};
var douban = {
	title: "热门电影",
	name: "豆瓣",
	type: "hottest",
	column: "china",
	home: "https://www.douban.com",
	color: "green",
	interval: 600000
};
var steam = {
	title: "在线人数",
	name: "Steam",
	type: "hottest",
	column: "world",
	home: "https://store.steampowered.com",
	color: "blue",
	interval: 600000
};
var tencent = {
	redirect: "tencent-hot",
	name: "腾讯新闻",
	type: "hottest",
	column: "china",
	home: "https://news.qq.com/tag/aEWqxLtdgmQ=",
	color: "blue",
	interval: 1800000,
	title: "综合早报"
};
var freebuf = {
	title: "网络安全",
	name: "Freebuf",
	type: "hottest",
	column: "china",
	home: "https://www.freebuf.com/",
	color: "green",
	interval: 600000
};
var qqvideo = {
	redirect: "qqvideo-tv-hotsearch",
	name: "腾讯视频",
	type: "hottest",
	column: "china",
	home: "https://v.qq.com/channel/tv",
	color: "blue",
	interval: 1800000,
	title: "热搜榜"
};
var iqiyi = {
	redirect: "iqiyi-hot-ranklist",
	name: "爱奇艺",
	type: "hottest",
	column: "china",
	home: "https://www.iqiyi.com",
	color: "green",
	interval: 1800000,
	title: "热播榜"
};
const _sources = {
	v2ex: v2ex,
	"v2ex-share": {
	name: "V2EX",
	column: "tech",
	home: "https://v2ex.com/",
	color: "slate",
	interval: 600000,
	title: "最新分享"
},
	zhihu: zhihu,
	weibo: weibo,
	zaobao: zaobao,
	coolapk: coolapk,
	mktnews: mktnews,
	"mktnews-flash": {
	name: "MKTNews",
	column: "finance",
	home: "https://mktnews.net",
	color: "indigo",
	interval: 120000,
	title: "快讯"
},
	wallstreetcn: wallstreetcn,
	"wallstreetcn-quick": {
	name: "华尔街见闻",
	type: "realtime",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 300000,
	title: "快讯"
},
	"wallstreetcn-news": {
	name: "华尔街见闻",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 1800000,
	title: "最新"
},
	"wallstreetcn-hot": {
	name: "华尔街见闻",
	type: "hottest",
	column: "finance",
	home: "https://wallstreetcn.com/",
	color: "blue",
	interval: 1800000,
	title: "最热"
},
	"36kr": {
	redirect: "36kr-quick",
	name: "36氪",
	type: "realtime",
	column: "tech",
	home: "https://36kr.com",
	color: "blue",
	interval: 600000,
	title: "快讯"
},
	"36kr-quick": {
	name: "36氪",
	type: "realtime",
	column: "tech",
	home: "https://36kr.com",
	color: "blue",
	interval: 600000,
	title: "快讯"
},
	"36kr-renqi": {
	name: "36氪",
	type: "hottest",
	column: "tech",
	home: "https://36kr.com",
	color: "blue",
	interval: 600000,
	title: "人气榜"
},
	douyin: douyin,
	hupu: hupu,
	tieba: tieba,
	toutiao: toutiao,
	ithome: ithome,
	thepaper: thepaper,
	sputniknewscn: sputniknewscn,
	cankaoxiaoxi: cankaoxiaoxi,
	pcbeta: pcbeta,
	"pcbeta-windows11": {
	name: "远景论坛",
	type: "realtime",
	column: "tech",
	home: "https://bbs.pcbeta.com",
	color: "blue",
	interval: 300000,
	title: "Win11"
},
	cls: cls,
	"cls-telegraph": {
	name: "财联社",
	type: "realtime",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 300000,
	title: "电报"
},
	"cls-depth": {
	name: "财联社",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 600000,
	title: "深度"
},
	"cls-hot": {
	name: "财联社",
	type: "hottest",
	column: "finance",
	home: "https://www.cls.cn",
	color: "red",
	interval: 600000,
	title: "热门"
},
	xueqiu: xueqiu,
	"xueqiu-hotstock": {
	name: "雪球",
	type: "hottest",
	column: "finance",
	home: "https://xueqiu.com",
	color: "blue",
	interval: 120000,
	title: "热门股票"
},
	gelonghui: gelonghui,
	fastbull: fastbull,
	"fastbull-express": {
	name: "法布财经",
	type: "realtime",
	column: "finance",
	home: "https://www.fastbull.cn",
	color: "emerald",
	interval: 120000,
	title: "快讯"
},
	"fastbull-news": {
	name: "法布财经",
	column: "finance",
	home: "https://www.fastbull.cn",
	color: "emerald",
	interval: 1800000,
	title: "头条"
},
	solidot: solidot,
	hackernews: hackernews,
	producthunt: producthunt,
	github: github$2,
	"github-trending-today": {
	name: "Github",
	type: "hottest",
	column: "tech",
	home: "https://github.com/",
	color: "gray",
	interval: 600000,
	title: "Today"
},
	bilibili: bilibili,
	"bilibili-hot-search": {
	name: "哔哩哔哩",
	type: "hottest",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 600000,
	title: "热搜"
},
	"bilibili-hot-video": {
	name: "哔哩哔哩",
	type: "hottest",
	disable: "cf",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 600000,
	title: "热门视频"
},
	"bilibili-ranking": {
	name: "哔哩哔哩",
	type: "hottest",
	disable: "cf",
	column: "china",
	home: "https://www.bilibili.com",
	color: "blue",
	interval: 1800000,
	title: "排行榜"
},
	kuaishou: kuaishou,
	kaopu: kaopu,
	jin10: jin10,
	baidu: baidu,
	nowcoder: nowcoder,
	sspai: sspai,
	juejin: juejin,
	ifeng: ifeng,
	chongbuluo: chongbuluo,
	"chongbuluo-latest": {
	name: "虫部落",
	column: "china",
	home: "https://www.chongbuluo.com/forum.php?mod=guide&view=newthread",
	color: "green",
	interval: 1800000,
	title: "最新"
},
	"chongbuluo-hot": {
	name: "虫部落",
	type: "hottest",
	column: "china",
	home: "https://www.chongbuluo.com/forum.php?mod=guide&view=hot",
	color: "green",
	interval: 1800000,
	title: "最热"
},
	douban: douban,
	steam: steam,
	tencent: tencent,
	"tencent-hot": {
	name: "腾讯新闻",
	type: "hottest",
	column: "china",
	home: "https://news.qq.com/tag/aEWqxLtdgmQ=",
	color: "blue",
	interval: 1800000,
	title: "综合早报"
},
	freebuf: freebuf,
	qqvideo: qqvideo,
	"qqvideo-tv-hotsearch": {
	name: "腾讯视频",
	type: "hottest",
	column: "china",
	home: "https://v.qq.com/channel/tv",
	color: "blue",
	interval: 1800000,
	title: "热搜榜"
},
	iqiyi: iqiyi,
	"iqiyi-hot-ranklist": {
	name: "爱奇艺",
	type: "hottest",
	column: "china",
	home: "https://www.iqiyi.com",
	color: "green",
	interval: 1800000,
	title: "热播榜"
}
};

const description = Object.entries(_sources).filter(([_, source]) => {
  if (source.redirect) {
    return false;
  }
  return true;
}).map(([id, source]) => {
  return source.title ? `${source.name}-${source.title} id is ${id}` : `${source.name} id is ${id}`;
}).join(";");

function getServer() {
  const server = new McpServer(
    {
      name: "NewsNow",
      version: packageJSON.version
    },
    { capabilities: { logging: {} } }
  );
  server.tool(
    "get_hotest_latest_news",
    `get hotest or latest news from source by {id}, return {count: 10} news.`,
    {
      id: z.string().describe(`source id. e.g. ${description}`),
      count: z.any().default(10).describe("count of news to return.")
    },
    async ({ id, count }) => {
      const res = await $fetch(`/api/s?id=${id}`);
      return {
        content: res.items.slice(0, count).map((item) => {
          return {
            text: `[${item.title}](${item.url})`,
            type: "text"
          };
        })
      };
    }
  );
  server.server.onerror = console.error.bind(console);
  return server;
}

const mcp_post = defineEventHandler(async (event) => {
  const req = event.node.req;
  const res = event.node.res;
  const server = getServer();
  try {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: void 0 });
    transport.onerror = console.error.bind(console);
    await server.connect(transport);
    await transport.handleRequest(req, res, await readBody(event));
    res.on("close", () => {
      transport.close();
      server.close();
    });
    return res;
  } catch (e) {
    console.error(e);
    return {
      jsonrpc: "2.0",
      error: {
        code: -32603,
        message: "Internal server error"
      },
      id: null
    };
  }
});

const mcp_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: mcp_post
});

const index$2 = defineEventHandler(() => {
  return {
    hello: "world"
  };
});

const index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$2
});

const CLOUDBASE_ENV_ID = process$1.env.CLOUDBASE_ENV_ID || "dreammate-0grv5fzr79f3b0e0";
const app = cloudbase.init({
  env: CLOUDBASE_ENV_ID
});
const db = app.rdb();
function isCloudBaseEnabled$1() {
  return !!process$1.env.CLOUDBASE_ENV_ID;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
class UserTable {
  constructor(db) {
    __publicField$1(this, "db");
    __publicField$1(this, "useCloudBase");
    this.db = db;
    this.useCloudBase = isCloudBaseEnabled$1();
  }
  async init() {
    if (this.useCloudBase) {
      logger.success(`init user table (CloudBase MySQL)`);
      return;
    }
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS user (
        id TEXT PRIMARY KEY,
        email TEXT,
        data TEXT,
        type TEXT,
        created INTEGER,
        updated INTEGER
      );
    `).run();
    await this.db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_user_id ON user(id);
    `).run();
    logger.success(`init user table`);
  }
  async addUser(id, email, type) {
    const u = await this.getUser(id);
    const now = Date.now();
    if (this.useCloudBase) {
      if (!u) {
        const { error } = await this.db.from("user").insert({ id, email, data: "", type, created: now, updated: now });
        if (error) throw new Error(`add user ${id} failed: ${error.message}`);
        logger.success(`add user ${id}`);
      } else if (u.email !== email && u.type !== type) {
        const { error } = await this.db.from("user").update({ email, updated: now }).eq("id", id);
        if (error) throw new Error(`update user ${id} failed: ${error.message}`);
        logger.success(`update user ${id} email`);
      } else {
        logger.info(`user ${id} already exists`);
      }
    } else {
      if (!u) {
        await this.db.prepare(`INSERT INTO user (id, email, data, type, created, updated) VALUES (?, ?, ?, ?, ?, ?)`).run(id, email, "", type, now, now);
        logger.success(`add user ${id}`);
      } else if (u.email !== email && u.type !== type) {
        await this.db.prepare(`UPDATE user SET email = ?, updated = ? WHERE id = ?`).run(email, now, id);
        logger.success(`update user ${id} email`);
      } else {
        logger.info(`user ${id} already exists`);
      }
    }
  }
  async getUser(id) {
    if (this.useCloudBase) {
      const { data, error } = await this.db.from("user").select("id, email, data, created, updated").eq("id", id).single();
      if (error) {
        if (error.message.includes("fetch")) return void 0;
        throw new Error(`get user ${id} failed: ${error.message}`);
      }
      return data;
    } else {
      return await this.db.prepare(`SELECT id, email, data, created, updated FROM user WHERE id = ?`).get(id);
    }
  }
  async setData(key, value, updatedTime = Date.now()) {
    if (this.useCloudBase) {
      const { error } = await this.db.from("user").update({ data: value, updated: updatedTime }).eq("id", key);
      if (error) throw new Error(`set user ${key} data failed: ${error.message}`);
    } else {
      const state = await this.db.prepare(
        `UPDATE user SET data = ?, updated = ? WHERE id = ?`
      ).run(value, updatedTime, key);
      if (!state.success) throw new Error(`set user ${key} data failed`);
    }
    logger.success(`set ${key} data`);
  }
  async getData(id) {
    if (this.useCloudBase) {
      const { data, error } = await this.db.from("user").select("data, updated").eq("id", id).single();
      if (error || !data) throw new Error(`user ${id} not found: ${error == null ? void 0 : error.message}`);
      logger.success(`get ${id} data`);
      return { data: data.data, updated: data.updated };
    } else {
      const row = await this.db.prepare(`SELECT data, updated FROM user WHERE id = ?`).get(id);
      if (!row) throw new Error(`user ${id} not found`);
      logger.success(`get ${id} data`);
      return row;
    }
  }
  async deleteUser(key) {
    if (this.useCloudBase) {
      const { error } = await this.db.from("user").delete().eq("id", key);
      if (error) throw new Error(`delete user ${key} failed: ${error.message}`);
    } else {
      const state = await this.db.prepare(`DELETE FROM user WHERE id = ?`).run(key);
      if (!state.success) throw new Error(`delete user ${key} failed`);
    }
    logger.success(`delete user ${key}`);
  }
}

const sync = defineEventHandler(async (event) => {
  try {
    const { id } = event.context.user;
    const db$1 = isCloudBaseEnabled$1() ? db : useDatabase();
    const userTable = new UserTable(db$1);
    if (process$1.env.INIT_TABLE !== "false") await userTable.init();
    if (event.method === "GET") {
      const { data, updated } = await userTable.getData(id);
      return {
        data: data ? JSON.parse(data) : void 0,
        updatedTime: updated
      };
    } else if (event.method === "POST") {
      const body = await readBody(event);
      verifyPrimitiveMetadata(body);
      const { updatedTime, data } = body;
      await userTable.setData(id, JSON.stringify(data), updatedTime);
      return {
        success: true,
        updatedTime
      };
    }
  } catch (e) {
    logger.error(e);
    throw createError({
      statusCode: 500,
      message: e instanceof Error ? e.message : "Internal Server Error"
    });
  }
});

const sync$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: sync
});

const myFetch = $fetch$1.create({
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
  },
  timeout: 1e4,
  retry: 3
});

const github = defineEventHandler(async (event) => {
  const db$1 = isCloudBaseEnabled$1() ? db : useDatabase();
  const userTable = new UserTable(db$1);
  if (process$1.env.INIT_TABLE !== "false") await userTable.init();
  const response = await myFetch(
    `https://github.com/login/oauth/access_token`,
    {
      method: "POST",
      body: {
        client_id: process$1.env.G_CLIENT_ID,
        client_secret: process$1.env.G_CLIENT_SECRET,
        code: getQuery$1(event).code
      },
      headers: {
        accept: "application/json"
      }
    }
  );
  const userInfo = await myFetch(`https://api.github.com/user`, {
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `token ${response.access_token}`,
      // 必须有 user-agent，在 cloudflare worker 会报错
      "User-Agent": "NewsNow App"
    }
  });
  const userID = String(userInfo.id);
  await userTable.addUser(userID, userInfo.notification_email || userInfo.email, "github");
  const jwtToken = await new SignJWT({
    id: userID,
    type: "github"
  }).setExpirationTime("60d").setProtectedHeader({ alg: "HS256" }).sign(new TextEncoder().encode(process$1.env.JWT_SECRET));
  const params = new URLSearchParams({
    login: "github",
    jwt: jwtToken,
    user: JSON.stringify({
      avatar: userInfo.avatar_url,
      name: userInfo.name
    })
  });
  return sendRedirect(event, `/?${params.toString()}`);
});

const github$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: github
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class Cache {
  constructor(db) {
    __publicField(this, "db");
    __publicField(this, "useCloudBase");
    this.db = db;
    this.useCloudBase = isCloudBaseEnabled();
  }
  async init() {
    if (this.useCloudBase) {
      logger.success(`init cache table (CloudBase MySQL)`);
      return;
    }
    await this.db.prepare(`
      CREATE TABLE IF NOT EXISTS cache (
        id TEXT PRIMARY KEY,
        updated INTEGER,
        data TEXT
      );
    `).run();
    logger.success(`init cache table`);
  }
  async set(key, value) {
    const now = Date.now();
    if (this.useCloudBase) {
      const { data: existing } = await this.db.from("cache").select("id").eq("id", key).single();
      if (existing) {
        const { error } = await this.db.from("cache").update({ data: JSON.stringify(value), updated: now }).eq("id", key);
        if (error) throw new Error(`set ${key} cache failed: ${error.message}`);
      } else {
        const { error } = await this.db.from("cache").insert({ id: key, data: JSON.stringify(value), updated: now });
        if (error) throw new Error(`set ${key} cache failed: ${error.message}`);
      }
    } else {
      await this.db.prepare(
        `INSERT OR REPLACE INTO cache (id, data, updated) VALUES (?, ?, ?)`
      ).run(key, JSON.stringify(value), now);
    }
    logger.success(`set ${key} cache`);
  }
  async get(key) {
    if (this.useCloudBase) {
      const { data, error } = await this.db.from("cache").select("id, data, updated").eq("id", key).single();
      if (error) {
        if (error.message.includes("fetch")) return void 0;
        throw new Error(`get ${key} cache failed: ${error.message}`);
      }
      if (!data) return void 0;
      logger.success(`get ${key} cache`);
      return {
        id: data.id,
        updated: data.updated,
        items: JSON.parse(data.data)
      };
    } else {
      const row = await this.db.prepare(`SELECT id, data, updated FROM cache WHERE id = ?`).get(key);
      if (row) {
        logger.success(`get ${key} cache`);
        return {
          id: row.id,
          updated: row.updated,
          items: JSON.parse(row.data)
        };
      }
    }
    return void 0;
  }
  async getEntire(keys) {
    var _a;
    if (this.useCloudBase) {
      const { data, error } = await this.db.from("cache").select("id, data, updated").in("id", keys);
      if (error) throw new Error(`get entire cache failed: ${error.message}`);
      if (data && data.length > 0) {
        logger.success(`get entire (...) cache`);
        return data.map((row) => ({
          id: row.id,
          updated: row.updated,
          items: JSON.parse(row.data)
        }));
      }
      return [];
    } else {
      const keysStr = keys.map((k) => `id = '${k}'`).join(" or ");
      const res = await this.db.prepare(`SELECT id, data, updated FROM cache WHERE ${keysStr}`).all();
      const rows = (_a = res.results) != null ? _a : res;
      if (rows == null ? void 0 : rows.length) {
        logger.success(`get entire (...) cache`);
        return rows.map((row) => ({
          id: row.id,
          updated: row.updated,
          items: JSON.parse(row.data)
        }));
      }
      return [];
    }
  }
  async delete(key) {
    if (this.useCloudBase) {
      const { error } = await this.db.from("cache").delete().eq("id", key);
      if (error) throw new Error(`delete ${key} cache failed: ${error.message}`);
    } else {
      return await this.db.prepare(`DELETE FROM cache WHERE id = ?`).run(key);
    }
  }
}
async function getCacheTable() {
  try {
    if (process$1.env.CLOUDBASE_ENV_ID) {
      if (process$1.env.ENABLE_CACHE === "false") return;
      const cacheTable2 = new Cache(cloudBaseDb);
      if (process$1.env.INIT_TABLE !== "false") await cacheTable2.init();
      return cacheTable2;
    }
    const sqliteDb = useDatabase();
    if (process$1.env.ENABLE_CACHE === "false") return;
    const cacheTable = new Cache(sqliteDb);
    if (process$1.env.INIT_TABLE !== "false") await cacheTable.init();
    return cacheTable;
  } catch (e) {
    logger.error("failed to init database ", e);
  }
}

const sources$1 = _sources;

const entire_post = defineEventHandler(async (event) => {
  try {
    const { sources: _ } = await readBody(event);
    const cacheTable = await getCacheTable();
    const ids = _ == null ? void 0 : _.filter((k) => sources$1[k]);
    if ((ids == null ? void 0 : ids.length) && cacheTable) {
      const caches = await cacheTable.getEntire(ids);
      const now = Date.now();
      return caches.map((cache) => ({
        status: "cache",
        id: cache.id,
        items: cache.items,
        updatedTime: now - cache.updated < sources$1[cache.id].interval ? now : cache.updated
      }));
    }
  } catch {
  }
});

const entire_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: entire_post
});

const getters = {};

const index = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const query = getQuery$1(event);
    const latest = query.latest !== void 0 && query.latest !== "false";
    let id = query.id;
    const isValid = (id2) => !id2 || !sources$1[id2] || !getters[id2];
    if (isValid(id)) {
      const redirectID = (_b = (_a = sources$1) == null ? void 0 : _a[id]) == null ? void 0 : _b.redirect;
      if (redirectID) id = redirectID;
      if (isValid(id)) throw new Error("Invalid source id");
    }
    const cacheTable = await getCacheTable();
    const now = Date.now();
    let cache;
    if (cacheTable) {
      cache = await cacheTable.get(id);
      if (cache) {
        if (now - cache.updated < sources$1[id].interval) {
          return {
            status: "success",
            id,
            updatedTime: now,
            items: cache.items
          };
        }
        if (now - cache.updated < TTL) {
          if (!latest || !event.context.disabledLogin && !event.context.user) {
            return {
              status: "cache",
              id,
              updatedTime: cache.updated,
              items: cache.items
            };
          }
        }
      }
    }
    try {
      const newData = (await getters[id]()).slice(0, 30);
      if (cacheTable && newData.length) {
        if (event.context.waitUntil) event.context.waitUntil(cacheTable.set(id, newData));
        else await cacheTable.set(id, newData);
      }
      logger.success(`fetch ${id} latest`);
      return {
        status: "success",
        id,
        updatedTime: now,
        items: newData
      };
    } catch (e) {
      if (cache) {
        return {
          status: "cache",
          id,
          updatedTime: cache.updated,
          items: cache.items
        };
      } else {
        throw e;
      }
    }
  } catch (e) {
    logger.error(e);
    throw createError({
      statusCode: 500,
      message: e instanceof Error ? e.message : "Internal Server Error"
    });
  }
});

const index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index
});
//# sourceMappingURL=index.mjs.map
