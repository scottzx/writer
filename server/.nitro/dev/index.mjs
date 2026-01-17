import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import destr from 'file:///Users/zac/writer/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, getHeader, appendResponseHeader, sendRedirect, proxyRequest, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, setResponseHeaders, setResponseStatus, send, createError, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getRouterParam, readBody, getQuery as getQuery$1 } from 'file:///Users/zac/writer/node_modules/.pnpm/h3@1.15.5/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file:///Users/zac/writer/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1, $fetch as $fetch$1 } from 'file:///Users/zac/writer/node_modules/.pnpm/ofetch@1.5.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///Users/zac/writer/node_modules/.pnpm/node-mock-http@1.0.4/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery } from 'file:///Users/zac/writer/node_modules/.pnpm/ufo@1.6.3/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/zac/writer/node_modules/.pnpm/unstorage@1.17.4_@netlify+blobs@9.1.2_db0@0.3.4_better-sqlite3@11.10.0__ioredis@5.9.2/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/zac/writer/node_modules/.pnpm/unstorage@1.17.4_@netlify+blobs@9.1.2_db0@0.3.4_better-sqlite3@11.10.0__ioredis@5.9.2/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///Users/zac/writer/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///Users/zac/writer/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/zac/writer/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///Users/zac/writer/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///Users/zac/writer/node_modules/.pnpm/unctx@2.5.0/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/zac/writer/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import path, { resolve, dirname, join } from 'node:path';
import consola, { createConsola } from 'file:///Users/zac/writer/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///Users/zac/writer/node_modules/.pnpm/youch-core@0.3.3/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///Users/zac/writer/node_modules/.pnpm/youch@4.1.0-beta.13/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///Users/zac/writer/node_modules/.pnpm/source-map@0.7.6/node_modules/source-map/source-map.js';
import process$1 from 'node:process';
import { jwtVerify, SignJWT } from 'file:///Users/zac/writer/node_modules/.pnpm/jose@6.1.3/node_modules/jose/dist/webapi/index.js';
import { Server } from 'node:http';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { query } from 'file:///Users/zac/writer/node_modules/.pnpm/@anthropic-ai+claude-agent-sdk@0.2.11_zod@3.25.76/node_modules/@anthropic-ai/claude-agent-sdk/sdk.mjs';
import fs, { readFileSync } from 'node:fs';
import { StreamableHTTPServerTransport } from 'file:///Users/zac/writer/node_modules/.pnpm/@modelcontextprotocol+sdk@1.25.2_hono@4.11.4_zod@3.25.76/node_modules/@modelcontextprotocol/sdk/dist/esm/server/streamableHttp.js';
import { z } from 'file:///Users/zac/writer/node_modules/.pnpm/zod@3.25.76/node_modules/zod/index.js';
import { McpServer } from 'file:///Users/zac/writer/node_modules/.pnpm/@modelcontextprotocol+sdk@1.25.2_hono@4.11.4_zod@3.25.76/node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js';
import cloudbase from 'file:///Users/zac/writer/node_modules/.pnpm/@cloudbase+node-sdk@3.17.0/node_modules/@cloudbase/node-sdk/dist/index.js';
import * as cheerio from 'file:///Users/zac/writer/node_modules/.pnpm/cheerio@1.1.2/node_modules/cheerio/dist/esm/index.js';

const serverAssets = [{"baseName":"server","dir":"/Users/zac/writer/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/zac/writer/server"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/zac/writer/server"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/zac/writer/server/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/zac/writer/server/.nitro/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/Users/zac/writer/server/.data/kv"}));

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

const _V87m28 = defineEventHandler(async (event) => {
  var _a, _b;
  const url = getRequestURL(event);
  if (!url.pathname.startsWith("/api")) return;
  const hasLoginConfig = ["JWT_SECRET", "G_CLIENT_ID", "G_CLIENT_SECRET"].every((k) => process$1.env[k]);
  if (!hasLoginConfig) {
    event.context.disabledLogin = true;
    return;
  }
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
});

const _8AmuCW = defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (!url.pathname.startsWith("/api")) return;
  const userId = getHeader(event, "X-User-ID");
  if (userId) {
    const isValidUserId = /^user_\w+$/.test(userId);
    if (isValidUserId) {
      event.context.user = {
        id: userId,
        type: "anonymous"
      };
    }
  }
});

const _lazy_mQNcn2 = () => Promise.resolve().then(function () { return chat_post$1; });
const _lazy_74XVif = () => Promise.resolve().then(function () { return enableLogin$1; });
const _lazy_hJ0DaI = () => Promise.resolve().then(function () { return latest$1; });
const _lazy_GeB1U0 = () => Promise.resolve().then(function () { return analyzeStyle_post$1; });
const _lazy_a2wrpq = () => Promise.resolve().then(function () { return login$1; });
const _lazy_vFIxAv = () => Promise.resolve().then(function () { return mcp_post$1; });
const _lazy_7VWM6S = () => Promise.resolve().then(function () { return index$5; });
const _lazy_7tIM6q = () => Promise.resolve().then(function () { return sync$1; });
const _lazy_trImoS = () => Promise.resolve().then(function () { return github$2; });
const _lazy_Z1ZM3y = () => Promise.resolve().then(function () { return _id_$1; });
const _lazy_2ZQdi7 = () => Promise.resolve().then(function () { return index$3; });
const _lazy_6A9iR4 = () => Promise.resolve().then(function () { return entire_post$1; });
const _lazy_cVqqoA = () => Promise.resolve().then(function () { return index$1; });

const handlers = [
  { route: '', handler: _V87m28, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _8AmuCW, lazy: false, middleware: true, method: undefined },
  { route: '/api/chat', handler: _lazy_mQNcn2, lazy: true, middleware: false, method: "post" },
  { route: '/api/enable-login', handler: _lazy_74XVif, lazy: true, middleware: false, method: undefined },
  { route: '/api/latest', handler: _lazy_hJ0DaI, lazy: true, middleware: false, method: undefined },
  { route: '/api/library/analyze-style', handler: _lazy_GeB1U0, lazy: true, middleware: false, method: "post" },
  { route: '/api/login', handler: _lazy_a2wrpq, lazy: true, middleware: false, method: undefined },
  { route: '/api/mcp', handler: _lazy_vFIxAv, lazy: true, middleware: false, method: "post" },
  { route: '/api/me', handler: _lazy_7VWM6S, lazy: true, middleware: false, method: undefined },
  { route: '/api/me/sync', handler: _lazy_7tIM6q, lazy: true, middleware: false, method: undefined },
  { route: '/api/oauth/github', handler: _lazy_trImoS, lazy: true, middleware: false, method: undefined },
  { route: '/api/projects/:id', handler: _lazy_Z1ZM3y, lazy: true, middleware: false, method: undefined },
  { route: '/api/projects', handler: _lazy_2ZQdi7, lazy: true, middleware: false, method: undefined },
  { route: '/api/s/entire', handler: _lazy_6A9iR4, lazy: true, middleware: false, method: "post" },
  { route: '/api/s', handler: _lazy_cVqqoA, lazy: true, middleware: false, method: undefined }
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
  /**
   * 使用自定义 prompt 发送消息并获取流式响应
   */
  async *sendMessageWithPrompt(prompt, systemPrompt) {
    const q = query({
      prompt,
      options: {
        model: "claude-sonnet-4-5-20250929",
        systemPrompt: systemPrompt || "\u4F60\u662F\u4E00\u4F4D\u4E13\u4E1A\u7684\u5199\u4F5C\u98CE\u683C\u5206\u6790\u4E13\u5BB6\u3002\u8BF7\u7528\u4E2D\u6587\u56DE\u590D\u3002"
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
  const hasLoginConfig = process$1.env.G_CLIENT_ID && process$1.env.G_CLIENT_SECRET && process$1.env.JWT_SECRET;
  return {
    enable: !!hasLoginConfig,
    url: hasLoginConfig ? `https://github.com/login/oauth/authorize?client_id=${process$1.env.G_CLIENT_ID}` : null
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

const analyzeStyle_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { articles } = body;
    if (!articles || articles.length < 10) {
      throw createError({
        statusCode: 400,
        message: "\u81F3\u5C11\u9700\u8981 10 \u7BC7\u6587\u7AE0\u624D\u80FD\u5206\u6790\u5199\u4F5C\u98CE\u683C"
      });
    }
    let promptTemplate;
    try {
      promptTemplate = readFileSync(
        join(process.cwd(), "server/prompts/writing-style-prompt.txt"),
        "utf-8"
      );
    } catch {
      promptTemplate = getDefaultPrompt();
    }
    const articlesText = articles.map((a, i) => `### \u6587\u7AE0 ${i + 1}: ${a.title}

${stripHtml(a.content).slice(0, 2e3)}`).join("\n\n---\n\n");
    const prompt = promptTemplate.replace("{articles}", articlesText);
    const agentService = getClaudeAgentService();
    let fullResponse = "";
    for await (const chunk of agentService.sendMessageWithPrompt(prompt)) {
      fullResponse += chunk;
    }
    const jsonMatch = fullResponse.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[1]);
      return result;
    }
    try {
      return JSON.parse(fullResponse);
    } catch {
      return {
        summary: {
          persona: "\u5206\u6790\u5B8C\u6210\uFF0C\u4F46\u672A\u80FD\u63D0\u53D6\u7ED3\u6784\u5316\u6570\u636E",
          syntaxRhythm: ["\u8BF7\u91CD\u65B0\u5206\u6790"],
          lexicon: ["\u8BF7\u91CD\u65B0\u5206\u6790"],
          tone: "\u5F85\u5206\u6790",
          structure: {
            opening: "\u5F85\u5206\u6790",
            ending: "\u5F85\u5206\u6790"
          }
        },
        fullAnalysis: fullResponse
      };
    }
  } catch (error) {
    console.error("Writing style analysis error:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "\u5206\u6790\u5931\u8D25"
    });
  }
});
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}
function getDefaultPrompt() {
  return `\u4F60\u662F\u4E00\u4F4D\u7CBE\u901A\u6587\u672C\u5206\u6790\u7684"\u6CD5\u533B\u8BED\u8A00\u5B66\u5BB6\u548C\u98CE\u683C\u6A21\u4EFF\u5927\u5E08"\u3002\u8BF7\u5206\u6790\u4EE5\u4E0B\u6587\u7AE0\uFF0C\u63D0\u53D6\u4F5C\u8005\u7684\u5199\u4F5C\u98CE\u683C\u3002

\u8BF7\u8FD4\u56DE JSON \u683C\u5F0F\uFF1A
{
  "summary": {
    "persona": "\u4E00\u53E5\u8BDD\u5B9A\u4E49\u6587\u98CE",
    "syntaxRhythm": ["\u53E5\u5F0F\u6307\u4EE41", "\u53E5\u5F0F\u6307\u4EE42"],
    "lexicon": ["\u7528\u8BCD\u6307\u4EE41", "\u7528\u8BCD\u6307\u4EE42"],
    "tone": "\u60C5\u7EEA\u57FA\u8C03",
    "structure": {
      "opening": "\u5F00\u5934\u98CE\u683C",
      "ending": "\u7ED3\u5C3E\u98CE\u683C"
    }
  },
  "fullAnalysis": "\u5B8C\u6574\u7684\u98CE\u683C\u5206\u6790 Markdown"
}

\u5F85\u5206\u6790\u6587\u7AE0\uFF1A

{articles}`;
}

const analyzeStyle_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: analyzeStyle_post
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

var v2ex$1 = {
	redirect: "v2ex-share",
	name: "V2EX",
	column: "tech",
	home: "https://v2ex.com/",
	color: "slate",
	interval: 600000,
	title: "最新分享"
};
var zhihu$1 = {
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
var ithome$1 = {
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
var hackernews$1 = {
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
var github$3 = {
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
var linuxdo = {
	redirect: "linuxdo-latest",
	name: "Linux.do",
	column: "tech",
	home: "https://linux.do",
	color: "green",
	interval: 600000,
	title: "最新"
};
var ghxi = {
	name: "果核剥壳",
	column: "tech",
	home: "https://www.ghxi.com",
	color: "teal",
	interval: 600000
};
var smzdm = {
	name: "什么值得买",
	type: "hottest",
	column: "china",
	home: "https://www.smzdm.com",
	color: "red",
	interval: 600000
};
const _sources = {
	v2ex: v2ex$1,
	"v2ex-share": {
	name: "V2EX",
	column: "tech",
	home: "https://v2ex.com/",
	color: "slate",
	interval: 600000,
	title: "最新分享"
},
	zhihu: zhihu$1,
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
	ithome: ithome$1,
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
	hackernews: hackernews$1,
	producthunt: producthunt,
	github: github$3,
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
},
	linuxdo: linuxdo,
	"linuxdo-latest": {
	name: "Linux.do",
	column: "tech",
	home: "https://linux.do",
	color: "green",
	interval: 600000,
	title: "最新"
},
	"linuxdo-hot": {
	name: "Linux.do",
	type: "hottest",
	column: "tech",
	home: "https://linux.do",
	color: "green",
	interval: 600000,
	title: "最热"
},
	ghxi: ghxi,
	smzdm: smzdm
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

const index$4 = defineEventHandler(() => {
  return {
    hello: "world"
  };
});

const index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$4
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

const github$1 = defineEventHandler(async (event) => {
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

const github$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: github$1
});

let ProjectFileSystem$1 = class ProjectFileSystem {
  getBasePath() {
    return `${process$1.env.HOME}/hacktour`;
  }
  getUserProjectsPath(userId) {
    return `${this.getBasePath()}/${userId}/projects`;
  }
  getProjectPath(userId, projectId) {
    return `${this.getUserProjectsPath(userId)}/${projectId}`;
  }
  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
  async createProject(userId, projectId, note) {
    const projectPath = this.getProjectPath(userId, projectId);
    this.ensureDir(projectPath);
    const metaPath = path.join(projectPath, "meta.json");
    const meta = {
      id: note.id,
      title: note.title,
      folderId: note.folderId || null,
      tags: note.tags || [],
      status: note.status || "draft",
      wordCount: note.wordCount || 0,
      createdAt: note.createdAt || Date.now(),
      updatedAt: note.updatedAt || Date.now(),
      lastAutoSave: note.lastAutoSave || null
    };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    const contentPath = path.join(projectPath, "index.md");
    const content = this.htmlToMarkdown(note.content || "");
    fs.writeFileSync(contentPath, content);
  }
  async readProject(userId, projectId) {
    const projectPath = this.getProjectPath(userId, projectId);
    if (!fs.existsSync(projectPath)) {
      return null;
    }
    try {
      const metaPath = path.join(projectPath, "meta.json");
      const contentPath = path.join(projectPath, "index.md");
      const metaContent = fs.readFileSync(metaPath, "utf-8");
      const mdContent = fs.readFileSync(contentPath, "utf-8");
      const meta = JSON.parse(metaContent);
      return {
        ...meta,
        content: this.markdownToHtml(mdContent)
      };
    } catch (error) {
      console.error("Error reading project:", error);
      return null;
    }
  }
  async updateProject(userId, projectId, note) {
    await this.createProject(userId, projectId, note);
  }
  async deleteProject(userId, projectId) {
    const projectPath = this.getProjectPath(userId, projectId);
    if (fs.existsSync(projectPath)) {
      fs.rmSync(projectPath, { recursive: true, force: true });
    }
  }
  projectExists(userId, projectId) {
    const projectPath = this.getProjectPath(userId, projectId);
    return fs.existsSync(projectPath);
  }
  htmlToMarkdown(html) {
    let md = html;
    md = md.replace(/<script[^>]*>.*?<\/script>/gis, "");
    md = md.replace(/<style[^>]*>.*?<\/style>/gis, "");
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
    md = md.replace(/<br\s*\/?>/gi, "\n");
    md = md.replace(/<[^>]+>/g, "");
    md = md.replace(/&nbsp;/g, " ");
    md = md.replace(/&lt;/g, "<");
    md = md.replace(/&gt;/g, ">");
    md = md.replace(/&amp;/g, "&");
    return md.trim();
  }
  markdownToHtml(md) {
    let html = md;
    html = html.replace(/&/g, "&amp;");
    html = html.replace(/</g, "&lt;");
    html = html.replace(/>/g, "&gt;");
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\n/g, "<br />");
    return html;
  }
};
const projectFileSystem$1 = new ProjectFileSystem$1();
const _id_ = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.user) == null ? void 0 : _a.id;
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: User ID not found"
    });
  }
  const projectId = getRouterParam(event, "id");
  if (!projectId) {
    throw createError({
      statusCode: 400,
      message: "Project ID is required"
    });
  }
  if (!/^[a-f0-9-]+$/.test(projectId)) {
    throw createError({
      statusCode: 400,
      message: "Invalid project ID format"
    });
  }
  const method = event.method;
  try {
    if (method === "GET") {
      const project = await projectFileSystem$1.readProject(userId, projectId);
      if (!project) {
        throw createError({
          statusCode: 404,
          message: "Project not found"
        });
      }
      return {
        success: true,
        data: project
      };
    }
    if (method === "PUT") {
      const body = await readBody(event);
      if (!body || typeof body !== "object") {
        throw createError({
          statusCode: 400,
          message: "Invalid request body"
        });
      }
      if (!projectFileSystem$1.projectExists(userId, projectId)) {
        throw createError({
          statusCode: 404,
          message: "Project not found"
        });
      }
      await projectFileSystem$1.updateProject(userId, projectId, body);
      return {
        success: true,
        data: { id: projectId, ...body }
      };
    }
    if (method === "DELETE") {
      if (!projectFileSystem$1.projectExists(userId, projectId)) {
        throw createError({
          statusCode: 404,
          message: "Project not found"
        });
      }
      await projectFileSystem$1.deleteProject(userId, projectId);
      return {
        success: true,
        message: "Project deleted successfully"
      };
    }
    throw createError({
      statusCode: 405,
      message: "Method not allowed"
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Project API error:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error"
    });
  }
});

const _id_$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: _id_
});

class ProjectFileSystem {
  getBasePath() {
    return `${process$1.env.HOME}/hacktour`;
  }
  getUserProjectsPath(userId) {
    return `${this.getBasePath()}/${userId}/projects`;
  }
  getProjectPath(userId, projectId) {
    return `${this.getUserProjectsPath(userId)}/${projectId}`;
  }
  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
  async createProject(userId, projectId, note) {
    const projectPath = this.getProjectPath(userId, projectId);
    this.ensureDir(projectPath);
    const metaPath = path.join(projectPath, "meta.json");
    const meta = {
      id: note.id,
      title: note.title,
      folderId: note.folderId || null,
      tags: note.tags || [],
      status: note.status || "draft",
      wordCount: note.wordCount || 0,
      createdAt: note.createdAt || Date.now(),
      updatedAt: note.updatedAt || Date.now(),
      lastAutoSave: note.lastAutoSave || null
    };
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    const contentPath = path.join(projectPath, "index.md");
    const content = this.htmlToMarkdown(note.content || "");
    fs.writeFileSync(contentPath, content);
  }
  async readProject(userId, projectId) {
    const projectPath = this.getProjectPath(userId, projectId);
    if (!fs.existsSync(projectPath)) {
      return null;
    }
    try {
      const metaPath = path.join(projectPath, "meta.json");
      const contentPath = path.join(projectPath, "index.md");
      const metaContent = fs.readFileSync(metaPath, "utf-8");
      const mdContent = fs.readFileSync(contentPath, "utf-8");
      const meta = JSON.parse(metaContent);
      return {
        ...meta,
        content: this.markdownToHtml(mdContent)
      };
    } catch (error) {
      console.error("Error reading project:", error);
      return null;
    }
  }
  async updateProject(userId, projectId, note) {
    await this.createProject(userId, projectId, note);
  }
  async deleteProject(userId, projectId) {
    const projectPath = this.getProjectPath(userId, projectId);
    if (fs.existsSync(projectPath)) {
      fs.rmSync(projectPath, { recursive: true, force: true });
    }
  }
  async listProjects(userId) {
    const projectsPath = this.getUserProjectsPath(userId);
    if (!fs.existsSync(projectsPath)) {
      return [];
    }
    try {
      const projectDirs = fs.readdirSync(projectsPath, { withFileTypes: true });
      const projects = [];
      for (const dir of projectDirs) {
        if (dir.isDirectory()) {
          const project = await this.readProject(userId, dir.name);
          if (project) {
            projects.push(project);
          }
        }
      }
      return projects.sort((a, b) => b.updatedAt - a.updatedAt);
    } catch (error) {
      console.error("Error listing projects:", error);
      return [];
    }
  }
  projectExists(userId, projectId) {
    const projectPath = this.getProjectPath(userId, projectId);
    return fs.existsSync(projectPath);
  }
  htmlToMarkdown(html) {
    let md = html;
    md = md.replace(/<script[^>]*>.*?<\/script>/gis, "");
    md = md.replace(/<style[^>]*>.*?<\/style>/gis, "");
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n");
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n");
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n");
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n");
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n");
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n");
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**");
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**");
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*");
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*");
    md = md.replace(/<s[^>]*>(.*?)<\/s>/gi, "~~$1~~");
    md = md.replace(/<strike[^>]*>(.*?)<\/strike>/gi, "~~$1~~");
    md = md.replace(/<del[^>]*>(.*?)<\/del>/gi, "~~$1~~");
    md = md.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, "```\n$1\n```\n\n");
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, "`$1`");
    md = md.replace(/<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)");
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, "![$2]($1)");
    md = md.replace(/<img[^>]*src=["']([^"']*)["'][^>]*>/gi, "![]($1)");
    md = md.replace(/<ul[^>]*>/gi, "");
    md = md.replace(/<\/ul>/gi, "\n");
    md = md.replace(/<ol[^>]*>/gi, "");
    md = md.replace(/<\/ol>/gi, "\n");
    md = md.replace(/<li[^>]*>/gi, "- ");
    md = md.replace(/<\/li>/gi, "\n");
    md = md.replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n");
    md = md.replace(/<br\s*\/?>/gi, "\n");
    md = md.replace(/<div[^>]*>(.*?)<\/div>/gi, "$1\n");
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, "> $1\n\n");
    md = md.replace(/<hr\s*\/?>/gi, "---\n\n");
    md = md.replace(/\n{3,}/g, "\n\n");
    md = md.replace(/<[^>]+>/g, "");
    md = md.replace(/&nbsp;/g, " ");
    md = md.replace(/&lt;/g, "<");
    md = md.replace(/&gt;/g, ">");
    md = md.replace(/&amp;/g, "&");
    md = md.replace(/&quot;/g, '"');
    md = md.replace(/&#39;/g, "'");
    return md.trim();
  }
  markdownToHtml(md) {
    let html = md;
    html = html.replace(/&/g, "&amp;");
    html = html.replace(/</g, "&lt;");
    html = html.replace(/>/g, "&gt;");
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, "<pre><code>$2</code></pre>");
    html = html.replace(/^###### (.*$)/gm, "<h6>$1</h6>");
    html = html.replace(/^##### (.*$)/gm, "<h5>$1</h5>");
    html = html.replace(/^#### (.*$)/gm, "<h4>$1</h4>");
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/~~(.*?)~~/g, "<del>$1</del>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
    html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");
    html = html.replace(/^---$/gm, "<hr />");
    html = html.replace(/^- (.*$)/gm, "<li>$1</li>");
    html = html.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");
    html = html.replace(/\n\n/g, "</p><p>");
    html = html.replace(/\n/g, "<br />");
    html = `<p>${html}</p>`;
    html = html.replace(/<p><\/p>/g, "");
    html = html.replace(/<p>(<h[1-6]>)/g, "$1");
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
    html = html.replace(/<p>(<pre>)/g, "$1");
    html = html.replace(/(<\/pre>)<\/p>/g, "$1");
    html = html.replace(/<p>(<blockquote>)/g, "$1");
    html = html.replace(/(<\/blockquote>)<\/p>/g, "$1");
    return html;
  }
}
const projectFileSystem = new ProjectFileSystem();
const index$2 = defineEventHandler(async (event) => {
  var _a;
  const userId = (_a = event.context.user) == null ? void 0 : _a.id;
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized: User ID not found"
    });
  }
  const isValidUserId = /^user_\w+$/.test(userId);
  if (!isValidUserId) {
    throw createError({
      statusCode: 400,
      message: "Invalid user ID format"
    });
  }
  const method = event.method;
  try {
    if (method === "GET") {
      const projects = await projectFileSystem.listProjects(userId);
      return {
        success: true,
        data: projects
      };
    }
    if (method === "POST") {
      const body = await readBody(event);
      if (!body || typeof body !== "object") {
        throw createError({
          statusCode: 400,
          message: "Invalid request body"
        });
      }
      const projectId = body.id || crypto.randomUUID();
      const newNote = {
        id: projectId,
        title: body.title || "\u672A\u547D\u540D\u6587\u6863",
        content: body.content || "",
        folderId: body.folderId || null,
        tags: body.tags || [],
        status: body.status || "draft",
        wordCount: body.wordCount || 0,
        createdAt: body.createdAt || Date.now(),
        updatedAt: body.updatedAt || Date.now(),
        lastAutoSave: body.lastAutoSave || null
      };
      if (!/^[a-f0-9-]+$/.test(projectId)) {
        throw createError({
          statusCode: 400,
          message: "Invalid project ID format"
        });
      }
      if (projectFileSystem.projectExists(userId, projectId)) {
        throw createError({
          statusCode: 409,
          message: "Project already exists"
        });
      }
      await projectFileSystem.createProject(userId, projectId, newNote);
      return {
        success: true,
        data: newNote
      };
    }
    throw createError({
      statusCode: 405,
      message: "Method not allowed"
    });
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    console.error("Projects API error:", error);
    throw createError({
      statusCode: 500,
      message: error.message || "Internal server error"
    });
  }
});

const index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: index$2
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

const sources = _sources;

const entire_post = defineEventHandler(async (event) => {
  try {
    const { sources: _ } = await readBody(event);
    const cacheTable = await getCacheTable();
    const ids = _ == null ? void 0 : _.filter((k) => sources[k]);
    if ((ids == null ? void 0 : ids.length) && cacheTable) {
      const caches = await cacheTable.getEntire(ids);
      const now = Date.now();
      return caches.map((cache) => ({
        status: "cache",
        id: cache.id,
        items: cache.items,
        updatedTime: now - cache.updated < sources[cache.id].interval ? now : cache.updated
      }));
    }
  } catch {
  }
});

const entire_post$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: entire_post
});

function defineSource(source) {
  return source;
}

var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND; // English locales

var MS = 'millisecond';
var S = 'second';
var MIN = 'minute';
var H = 'hour';
var D = 'day';
var W = 'week';
var M = 'month';
var Q = 'quarter';
var Y = 'year';
var DATE = 'date';
var FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ssZ';
var INVALID_DATE_STRING = 'Invalid Date'; // regex

var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;

// English [en]
// We don't need weekdaysShort, weekdaysMin, monthsShort in en.js locale
const en = {
  name: 'en',
  weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
  months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
  ordinal: function ordinal(n) {
    var s = ['th', 'st', 'nd', 'rd'];
    var v = n % 100;
    return "[" + n + (s[(v - 20) % 10] || s[v] || s[0]) + "]";
  }
};

var padStart = function padStart(string, length, pad) {
  var s = String(string);
  if (!s || s.length >= length) return string;
  return "" + Array(length + 1 - s.length).join(pad) + string;
};

var padZoneStr = function padZoneStr(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return "" + (negMinutes <= 0 ? '+' : '-') + padStart(hourOffset, 2, '0') + ":" + padStart(minuteOffset, 2, '0');
};

var monthDiff = function monthDiff(a, b) {
  // function from moment.js in order to keep the same result
  if (a.date() < b.date()) return -monthDiff(b, a);
  var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month());
  var anchor = a.clone().add(wholeMonthDiff, M);
  var c = b - anchor < 0;
  var anchor2 = a.clone().add(wholeMonthDiff + (c ? -1 : 1), M);
  return +(-(wholeMonthDiff + (b - anchor) / (c ? anchor - anchor2 : anchor2 - anchor)) || 0);
};

var absFloor = function absFloor(n) {
  return n < 0 ? Math.ceil(n) || 0 : Math.floor(n);
};

var prettyUnit$1 = function prettyUnit(u) {
  var special = {
    M: M,
    y: Y,
    w: W,
    d: D,
    D: DATE,
    h: H,
    m: MIN,
    s: S,
    ms: MS,
    Q: Q
  };
  return special[u] || String(u || '').toLowerCase().replace(/s$/, '');
};

var isUndefined = function isUndefined(s) {
  return s === undefined;
};

const U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit$1,
  u: isUndefined
};

var L = 'en'; // global locale

var Ls = {}; // global loaded locale

Ls[L] = en;
var IS_DAYJS = '$isDayjsObject'; // eslint-disable-next-line no-use-before-define

var isDayjs = function isDayjs(d) {
  return d instanceof Dayjs || !!(d && d[IS_DAYJS]);
};

var parseLocale = function parseLocale(preset, object, isLocal) {
  var l;
  if (!preset) return L;

  if (typeof preset === 'string') {
    var presetLower = preset.toLowerCase();

    if (Ls[presetLower]) {
      l = presetLower;
    }

    if (object) {
      Ls[presetLower] = object;
      l = presetLower;
    }

    var presetSplit = preset.split('-');

    if (!l && presetSplit.length > 1) {
      return parseLocale(presetSplit[0]);
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l = name;
  }

  if (!isLocal && l) L = l;
  return l || !isLocal && L;
};

var dayjs = function dayjs(date, c) {
  if (isDayjs(date)) {
    return date.clone();
  } // eslint-disable-next-line no-nested-ternary


  var cfg = typeof c === 'object' ? c : {};
  cfg.date = date;
  cfg.args = arguments; // eslint-disable-line prefer-rest-params

  return new Dayjs(cfg); // eslint-disable-line no-use-before-define
};

var wrapper$1 = function wrapper(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset // todo: refactor; do not use this.$offset in you code

  });
};

var Utils = U; // for plugin use

Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper$1;

var parseDate = function parseDate(cfg) {
  var date = cfg.date,
      utc = cfg.utc;
  if (date === null) return new Date(NaN); // null is invalid

  if (Utils.u(date)) return new Date(); // today

  if (date instanceof Date) return new Date(date);

  if (typeof date === 'string' && !/Z$/i.test(date)) {
    var d = date.match(REGEX_PARSE);

    if (d) {
      var m = d[2] - 1 || 0;
      var ms = (d[7] || '0').substring(0, 3);

      if (utc) {
        return new Date(Date.UTC(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms));
      }

      return new Date(d[1], m, d[3] || 1, d[4] || 0, d[5] || 0, d[6] || 0, ms);
    }
  }

  return new Date(date); // everything else
};

var Dayjs = /*#__PURE__*/function () {
  function Dayjs(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg); // for plugin

    this.$x = this.$x || cfg.x || {};
    this[IS_DAYJS] = true;
  }

  var _proto = Dayjs.prototype;

  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.init();
  };

  _proto.init = function init() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  } // eslint-disable-next-line class-methods-use-this
  ;

  _proto.$utils = function $utils() {
    return Utils;
  };

  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };

  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };

  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };

  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };

  _proto.$g = function $g(input, get, set) {
    if (Utils.u(input)) return this[get];
    return this.set(set, input);
  };

  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1000);
  };

  _proto.valueOf = function valueOf() {
    // timezone(hour) * 60 * 60 * 1000 => ms
    return this.$d.getTime();
  };

  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;

    // startOf -> endOf
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);

    var instanceFactory = function instanceFactory(d, m) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m, d) : new Date(_this.$y, m, d), _this);
      return isStartOf ? ins : ins.endOf(D);
    };

    var instanceFactorySet = function instanceFactorySet(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply( // eslint-disable-line prefer-spread
      _this.toDate('s'), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };

    var $W = this.$W,
        $M = this.$M,
        $D = this.$D;
    var utcPad = "set" + (this.$u ? 'UTC' : '');

    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);

      case M:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);

      case W:
        {
          var weekStart = this.$locale().weekStart || 0;
          var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
          return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
        }

      case D:
      case DATE:
        return instanceFactorySet(utcPad + "Hours", 0);

      case H:
        return instanceFactorySet(utcPad + "Minutes", 1);

      case MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);

      case S:
        return instanceFactorySet(utcPad + "Milliseconds", 3);

      default:
        return this.clone();
    }
  };

  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };

  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;

    // private set
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? 'UTC' : '');
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (_int - this.$W) : _int;

    if (unit === M || unit === Y) {
      // clone is for badMutable plugin
      var date = this.clone().set(DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name) this.$d[name](arg);

    this.init();
    return this;
  };

  _proto.set = function set(string, _int2) {
    return this.clone().$set(string, _int2);
  };

  _proto.get = function get(unit) {
    return this[Utils.p(unit)]();
  };

  _proto.add = function add(number, units) {
    var _this2 = this,
        _C$MIN$C$H$C$S$unit;

    number = Number(number); // eslint-disable-line no-param-reassign

    var unit = Utils.p(units);

    var instanceFactorySet = function instanceFactorySet(n) {
      var d = dayjs(_this2);
      return Utils.w(d.date(d.date() + Math.round(n * number)), _this2);
    };

    if (unit === M) {
      return this.set(M, this.$M + number);
    }

    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }

    if (unit === D) {
      return instanceFactorySet(1);
    }

    if (unit === W) {
      return instanceFactorySet(7);
    }

    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1; // ms

    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };

  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };

  _proto.format = function format(formatStr) {
    var _this3 = this;

    var locale = this.$locale();
    if (!this.isValid()) return locale.invalidDate || INVALID_DATE_STRING;
    var str = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var $H = this.$H,
        $m = this.$m,
        $M = this.$M;
    var weekdays = locale.weekdays,
        months = locale.months,
        meridiem = locale.meridiem;

    var getShort = function getShort(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str)) || full[index].slice(0, length);
    };

    var get$H = function get$H(num) {
      return Utils.s($H % 12 || 12, num, '0');
    };

    var meridiemFunc = meridiem || function (hour, minute, isLowercase) {
      var m = hour < 12 ? 'AM' : 'PM';
      return isLowercase ? m.toLowerCase() : m;
    };

    var matches = function matches(match) {
      switch (match) {
        case 'YY':
          return String(_this3.$y).slice(-2);

        case 'YYYY':
          return Utils.s(_this3.$y, 4, '0');

        case 'M':
          return $M + 1;

        case 'MM':
          return Utils.s($M + 1, 2, '0');

        case 'MMM':
          return getShort(locale.monthsShort, $M, months, 3);

        case 'MMMM':
          return getShort(months, $M);

        case 'D':
          return _this3.$D;

        case 'DD':
          return Utils.s(_this3.$D, 2, '0');

        case 'd':
          return String(_this3.$W);

        case 'dd':
          return getShort(locale.weekdaysMin, _this3.$W, weekdays, 2);

        case 'ddd':
          return getShort(locale.weekdaysShort, _this3.$W, weekdays, 3);

        case 'dddd':
          return weekdays[_this3.$W];

        case 'H':
          return String($H);

        case 'HH':
          return Utils.s($H, 2, '0');

        case 'h':
          return get$H(1);

        case 'hh':
          return get$H(2);

        case 'a':
          return meridiemFunc($H, $m, true);

        case 'A':
          return meridiemFunc($H, $m, false);

        case 'm':
          return String($m);

        case 'mm':
          return Utils.s($m, 2, '0');

        case 's':
          return String(_this3.$s);

        case 'ss':
          return Utils.s(_this3.$s, 2, '0');

        case 'SSS':
          return Utils.s(_this3.$ms, 3, '0');

        case 'Z':
          return zoneStr;
      }

      return null;
    };

    return str.replace(REGEX_FORMAT, function (match, $1) {
      return $1 || matches(match) || zoneStr.replace(':', '');
    }); // 'ZZ'
  };

  _proto.utcOffset = function utcOffset() {
    // Because a bug at FF24, we're rounding the timezone offset around 15 minutes
    // https://github.com/moment/moment/pull/1871
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };

  _proto.diff = function diff(input, units, _float) {
    var _this4 = this;

    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    var diff = this - that;

    var getMonth = function getMonth() {
      return Utils.m(_this4, that);
    };

    var result;

    switch (unit) {
      case Y:
        result = getMonth() / 12;
        break;

      case M:
        result = getMonth();
        break;

      case Q:
        result = getMonth() / 3;
        break;

      case W:
        result = (diff - zoneDelta) / MILLISECONDS_A_WEEK;
        break;

      case D:
        result = (diff - zoneDelta) / MILLISECONDS_A_DAY;
        break;

      case H:
        result = diff / MILLISECONDS_A_HOUR;
        break;

      case MIN:
        result = diff / MILLISECONDS_A_MINUTE;
        break;

      case S:
        result = diff / MILLISECONDS_A_SECOND;
        break;

      default:
        result = diff; // milliseconds

        break;
    }

    return _float ? result : Utils.a(result);
  };

  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M).$D;
  };

  _proto.$locale = function $locale() {
    // get locale object
    return Ls[this.$L];
  };

  _proto.locale = function locale(preset, object) {
    if (!preset) return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName) that.$L = nextLocaleName;
    return that;
  };

  _proto.clone = function clone() {
    return Utils.w(this.$d, this);
  };

  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };

  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };

  _proto.toISOString = function toISOString() {
    // ie 8 return
    // new Dayjs(this.valueOf() + this.$d.getTimezoneOffset() * 60000)
    // .format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    return this.$d.toISOString();
  };

  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };

  return Dayjs;
}();

var proto = Dayjs.prototype;
dayjs.prototype = proto;
[['$ms', MS], ['$s', S], ['$m', MIN], ['$H', H], ['$W', D], ['$M', M], ['$y', Y], ['$D', DATE]].forEach(function (g) {
  proto[g[1]] = function (input) {
    return this.$g(input, g[0], g[1]);
  };
});

dayjs.extend = function (plugin, option) {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, Dayjs, dayjs);
    plugin.$i = true;
  }

  return dayjs;
};

dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;

dayjs.unix = function (timestamp) {
  return dayjs(timestamp * 1e3);
};

dayjs.en = Ls[L];
dayjs.Ls = Ls;
dayjs.p = {};

var REGEX_VALID_OFFSET_FORMAT = /[+-]\d\d(?::?\d\d)?/g;
var REGEX_OFFSET_HOURS_MINUTES_FORMAT = /([+-]|\d\d)/g;

function offsetFromString$1(value) {
  if (value === void 0) {
    value = '';
  }

  var offset = value.match(REGEX_VALID_OFFSET_FORMAT);

  if (!offset) {
    return null;
  }

  var _ref = ("" + offset[0]).match(REGEX_OFFSET_HOURS_MINUTES_FORMAT) || ['-', 0, 0],
      indicator = _ref[0],
      hoursOffset = _ref[1],
      minutesOffset = _ref[2];

  var totalOffsetInMinutes = +hoursOffset * 60 + +minutesOffset;

  if (totalOffsetInMinutes === 0) {
    return 0;
  }

  return indicator === '+' ? totalOffsetInMinutes : -totalOffsetInMinutes;
}

const utcPlugin = (function (option, Dayjs, dayjs) {
  var proto = Dayjs.prototype;

  dayjs.utc = function (date) {
    var cfg = {
      date: date,
      utc: true,
      args: arguments
    }; // eslint-disable-line prefer-rest-params

    return new Dayjs(cfg); // eslint-disable-line no-use-before-define
  };

  proto.utc = function (keepLocalTime) {
    var ins = dayjs(this.toDate(), {
      locale: this.$L,
      utc: true
    });

    if (keepLocalTime) {
      return ins.add(this.utcOffset(), MIN);
    }

    return ins;
  };

  proto.local = function () {
    return dayjs(this.toDate(), {
      locale: this.$L,
      utc: false
    });
  };

  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    if (cfg.utc) {
      this.$u = true;
    }

    if (!this.$utils().u(cfg.$offset)) {
      this.$offset = cfg.$offset;
    }

    oldParse.call(this, cfg);
  };

  var oldInit = proto.init;

  proto.init = function () {
    if (this.$u) {
      var $d = this.$d;
      this.$y = $d.getUTCFullYear();
      this.$M = $d.getUTCMonth();
      this.$D = $d.getUTCDate();
      this.$W = $d.getUTCDay();
      this.$H = $d.getUTCHours();
      this.$m = $d.getUTCMinutes();
      this.$s = $d.getUTCSeconds();
      this.$ms = $d.getUTCMilliseconds();
    } else {
      oldInit.call(this);
    }
  };

  var oldUtcOffset = proto.utcOffset;

  proto.utcOffset = function (input, keepLocalTime) {
    var _this$$utils = this.$utils(),
        u = _this$$utils.u;

    if (u(input)) {
      if (this.$u) {
        return 0;
      }

      if (!u(this.$offset)) {
        return this.$offset;
      }

      return oldUtcOffset.call(this);
    }

    if (typeof input === 'string') {
      input = offsetFromString$1(input);

      if (input === null) {
        return this;
      }
    }

    var offset = Math.abs(input) <= 16 ? input * 60 : input;
    var ins = this;

    if (keepLocalTime) {
      ins.$offset = offset;
      ins.$u = input === 0;
      return ins;
    }

    if (input !== 0) {
      var localTimezoneOffset = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
      ins = this.local().add(offset + localTimezoneOffset, MIN);
      ins.$offset = offset;
      ins.$x.$localOffset = localTimezoneOffset;
    } else {
      ins = this.utc();
    }

    return ins;
  };

  var oldFormat = proto.format;
  var UTC_FORMAT_DEFAULT = 'YYYY-MM-DDTHH:mm:ss[Z]';

  proto.format = function (formatStr) {
    var str = formatStr || (this.$u ? UTC_FORMAT_DEFAULT : '');
    return oldFormat.call(this, str);
  };

  proto.valueOf = function () {
    var addedOffset = !this.$utils().u(this.$offset) ? this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset()) : 0;
    return this.$d.valueOf() - addedOffset * MILLISECONDS_A_MINUTE;
  };

  proto.isUTC = function () {
    return !!this.$u;
  };

  proto.toISOString = function () {
    return this.toDate().toISOString();
  };

  proto.toString = function () {
    return this.toDate().toUTCString();
  };

  var oldToDate = proto.toDate;

  proto.toDate = function (type) {
    if (type === 's' && this.$offset) {
      return dayjs(this.format('YYYY-MM-DD HH:mm:ss:SSS')).toDate();
    }

    return oldToDate.call(this);
  };

  var oldDiff = proto.diff;

  proto.diff = function (input, units, _float) {
    if (input && this.$u === input.$u) {
      return oldDiff.call(this, input, units, _float);
    }

    var localThis = this.local();
    var localInput = dayjs(input).local();
    return oldDiff.call(localThis, localInput, units, _float);
  };
});

var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
}; // Cache time-zone lookups from Intl.DateTimeFormat,
// as it is a *very* slow method.

var dtfCache = {};

var getDateTimeFormat = function getDateTimeFormat(timezone, options) {
  if (options === void 0) {
    options = {};
  }

  var timeZoneName = options.timeZoneName || 'short';
  var key = timezone + "|" + timeZoneName;
  var dtf = dtfCache[key];

  if (!dtf) {
    dtf = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: timeZoneName
    });
    dtfCache[key] = dtf;
  }

  return dtf;
};

const timezonePlugin = (function (o, c, d) {
  var defaultTimezone;

  var makeFormatParts = function makeFormatParts(timestamp, timezone, options) {
    if (options === void 0) {
      options = {};
    }

    var date = new Date(timestamp);
    var dtf = getDateTimeFormat(timezone, options);
    return dtf.formatToParts(date);
  };

  var tzOffset = function tzOffset(timestamp, timezone) {
    var formatResult = makeFormatParts(timestamp, timezone);
    var filled = [];

    for (var i = 0; i < formatResult.length; i += 1) {
      var _formatResult$i = formatResult[i],
          type = _formatResult$i.type,
          value = _formatResult$i.value;
      var pos = typeToPos[type];

      if (pos >= 0) {
        filled[pos] = parseInt(value, 10);
      }
    }

    var hour = filled[3]; // Workaround for the same behavior in different node version
    // https://github.com/nodejs/node/issues/33027

    /* istanbul ignore next */

    var fixedHour = hour === 24 ? 0 : hour;
    var utcString = filled[0] + "-" + filled[1] + "-" + filled[2] + " " + fixedHour + ":" + filled[4] + ":" + filled[5] + ":000";
    var utcTs = d.utc(utcString).valueOf();
    var asTS = +timestamp;
    var over = asTS % 1000;
    asTS -= over;
    return (utcTs - asTS) / (60 * 1000);
  }; // find the right offset a given local time. The o input is our guess, which determines which
  // offset we'll pick in ambiguous cases (e.g. there are two 3 AMs b/c Fallback DST)
  // https://github.com/moment/luxon/blob/master/src/datetime.js#L76


  var fixOffset = function fixOffset(localTS, o0, tz) {
    // Our UTC time is just a guess because our offset is just a guess
    var utcGuess = localTS - o0 * 60 * 1000; // Test whether the zone matches the offset for this ts

    var o2 = tzOffset(utcGuess, tz); // If so, offset didn't change and we're done

    if (o0 === o2) {
      return [utcGuess, o0];
    } // If not, change the ts by the difference in the offset


    utcGuess -= (o2 - o0) * 60 * 1000; // If that gives us the local time we want, we're done

    var o3 = tzOffset(utcGuess, tz);

    if (o2 === o3) {
      return [utcGuess, o2];
    } // If it's different, we're in a hole time.
    // The offset has changed, but the we don't adjust the time


    return [localTS - Math.min(o2, o3) * 60 * 1000, Math.max(o2, o3)];
  };

  var proto = c.prototype;

  proto.tz = function (timezone, keepLocalTime) {
    if (timezone === void 0) {
      timezone = defaultTimezone;
    }

    var oldOffset = this.utcOffset();
    var date = this.toDate();
    var target = date.toLocaleString('en-US', {
      timeZone: timezone
    });
    var diff = Math.round((date - new Date(target)) / 1000 / 60);
    var offset = -Math.round(date.getTimezoneOffset() / 15) * 15 - diff;
    var isUTC = !Number(offset);
    var ins;

    if (isUTC) {
      // if utcOffset is 0, turn it to UTC mode
      ins = this.utcOffset(0, keepLocalTime);
    } else {
      ins = d(target, {
        locale: this.$L
      }).$set(MS, this.$ms).utcOffset(offset, true);

      if (keepLocalTime) {
        var newOffset = ins.utcOffset();
        ins = ins.add(oldOffset - newOffset, MIN);
      }
    }

    ins.$x.$timezone = timezone;
    return ins;
  };

  proto.offsetName = function (type) {
    // type: short(default) / long
    var zone = this.$x.$timezone || d.tz.guess();
    var result = makeFormatParts(this.valueOf(), zone, {
      timeZoneName: type
    }).find(function (m) {
      return m.type.toLowerCase() === 'timezonename';
    });
    return result && result.value;
  };

  var oldStartOf = proto.startOf;

  proto.startOf = function (units, startOf) {
    if (!this.$x || !this.$x.$timezone) {
      return oldStartOf.call(this, units, startOf);
    }

    var withoutTz = d(this.format('YYYY-MM-DD HH:mm:ss:SSS'), {
      locale: this.$L
    });
    var startOfWithoutTz = oldStartOf.call(withoutTz, units, startOf);
    return startOfWithoutTz.tz(this.$x.$timezone, true);
  };

  d.tz = function (input, arg1, arg2) {
    var parseFormat = arg2 && arg1;
    var timezone = arg2 || arg1 || defaultTimezone;
    var previousOffset = tzOffset(+d(), timezone);

    if (typeof input !== 'string') {
      // timestamp number || js Date || Day.js
      return d(input).tz(timezone);
    }

    var localTs = d.utc(input, parseFormat).valueOf();

    var _fixOffset = fixOffset(localTs, previousOffset, timezone),
        targetTs = _fixOffset[0],
        targetOffset = _fixOffset[1];

    var ins = d(targetTs).utcOffset(targetOffset);
    ins.$x.$timezone = timezone;
    return ins;
  };

  d.tz.guess = function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  d.tz.setDefault = function (timezone) {
    defaultTimezone = timezone;
  };
});

// eslint-disable-next-line import/prefer-default-export
var t = function t(format) {
  return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (_, a, b) {
    return a || b.slice(1);
  });
};
var englishFormats = {
  LTS: 'h:mm:ss A',
  LT: 'h:mm A',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D, YYYY',
  LLL: 'MMMM D, YYYY h:mm A',
  LLLL: 'dddd, MMMM D, YYYY h:mm A'
};
var u = function u(formatStr, formats) {
  return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (_, a, b) {
    var B = b && b.toUpperCase();
    return a || formats[b] || englishFormats[b] || t(formats[B]);
  });
};

var formattingTokens = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
var match1 = /\d/; // 0 - 9

var match2 = /\d\d/; // 00 - 99

var match3 = /\d{3}/; // 000 - 999

var match4 = /\d{4}/; // 0000 - 9999

var match1to2 = /\d\d?/; // 0 - 99

var matchSigned = /[+-]?\d+/; // -inf - inf

var matchOffset = /[+-]\d\d:?(\d\d)?|Z/; // +00:00 -00:00 +0000 or -0000 +00 or Z

var matchWord = /\d*[^-_:/,()\s\d]+/; // Word

var locale = {};

var parseTwoDigitYear = function parseTwoDigitYear(input) {
  input = +input;
  return input + (input > 68 ? 1900 : 2000);
};

function offsetFromString(string) {
  if (!string) return 0;
  if (string === 'Z') return 0;
  var parts = string.match(/([+-]|\d\d)/g);
  var minutes = +(parts[1] * 60) + (+parts[2] || 0);
  return minutes === 0 ? 0 : parts[0] === '+' ? -minutes : minutes; // eslint-disable-line no-nested-ternary
}

var addInput = function addInput(property) {
  return function (input) {
    this[property] = +input;
  };
};

var zoneExpressions = [matchOffset, function (input) {
  var zone = this.zone || (this.zone = {});
  zone.offset = offsetFromString(input);
}];

var getLocalePart = function getLocalePart(name) {
  var part = locale[name];
  return part && (part.indexOf ? part : part.s.concat(part.f));
};

var meridiemMatch = function meridiemMatch(input, isLowerCase) {
  var isAfternoon;
  var _locale = locale,
      meridiem = _locale.meridiem;

  if (!meridiem) {
    isAfternoon = input === (isLowerCase ? 'pm' : 'PM');
  } else {
    for (var i = 1; i <= 24; i += 1) {
      // todo: fix input === meridiem(i, 0, isLowerCase)
      if (input.indexOf(meridiem(i, 0, isLowerCase)) > -1) {
        isAfternoon = i > 12;
        break;
      }
    }
  }

  return isAfternoon;
};

var expressions = {
  A: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, false);
  }],
  a: [matchWord, function (input) {
    this.afternoon = meridiemMatch(input, true);
  }],
  Q: [match1, function (input) {
    this.month = (input - 1) * 3 + 1;
  }],
  S: [match1, function (input) {
    this.milliseconds = +input * 100;
  }],
  SS: [match2, function (input) {
    this.milliseconds = +input * 10;
  }],
  SSS: [match3, function (input) {
    this.milliseconds = +input;
  }],
  s: [match1to2, addInput('seconds')],
  ss: [match1to2, addInput('seconds')],
  m: [match1to2, addInput('minutes')],
  mm: [match1to2, addInput('minutes')],
  H: [match1to2, addInput('hours')],
  h: [match1to2, addInput('hours')],
  HH: [match1to2, addInput('hours')],
  hh: [match1to2, addInput('hours')],
  D: [match1to2, addInput('day')],
  DD: [match2, addInput('day')],
  Do: [matchWord, function (input) {
    var _locale2 = locale,
        ordinal = _locale2.ordinal;

    var _input$match = input.match(/\d+/);

    this.day = _input$match[0];
    if (!ordinal) return;

    for (var i = 1; i <= 31; i += 1) {
      if (ordinal(i).replace(/\[|\]/g, '') === input) {
        this.day = i;
      }
    }
  }],
  w: [match1to2, addInput('week')],
  ww: [match2, addInput('week')],
  M: [match1to2, addInput('month')],
  MM: [match2, addInput('month')],
  MMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var monthsShort = getLocalePart('monthsShort');
    var matchIndex = (monthsShort || months.map(function (_) {
      return _.slice(0, 3);
    })).indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  MMMM: [matchWord, function (input) {
    var months = getLocalePart('months');
    var matchIndex = months.indexOf(input) + 1;

    if (matchIndex < 1) {
      throw new Error();
    }

    this.month = matchIndex % 12 || matchIndex;
  }],
  Y: [matchSigned, addInput('year')],
  YY: [match2, function (input) {
    this.year = parseTwoDigitYear(input);
  }],
  YYYY: [match4, addInput('year')],
  Z: zoneExpressions,
  ZZ: zoneExpressions
};

function correctHours(time) {
  var afternoon = time.afternoon;

  if (afternoon !== undefined) {
    var hours = time.hours;

    if (afternoon) {
      if (hours < 12) {
        time.hours += 12;
      }
    } else if (hours === 12) {
      time.hours = 0;
    }

    delete time.afternoon;
  }
}

function makeParser(format) {
  format = u(format, locale && locale.formats);
  var array = format.match(formattingTokens);
  var length = array.length;

  for (var i = 0; i < length; i += 1) {
    var token = array[i];
    var parseTo = expressions[token];
    var regex = parseTo && parseTo[0];
    var parser = parseTo && parseTo[1];

    if (parser) {
      array[i] = {
        regex: regex,
        parser: parser
      };
    } else {
      array[i] = token.replace(/^\[|\]$/g, '');
    }
  }

  return function (input) {
    var time = {};

    for (var _i = 0, start = 0; _i < length; _i += 1) {
      var _token = array[_i];

      if (typeof _token === 'string') {
        start += _token.length;
      } else {
        var _regex = _token.regex,
            _parser = _token.parser;
        var part = input.slice(start);

        var match = _regex.exec(part);

        var value = match[0];

        _parser.call(time, value);

        input = input.replace(value, '');
      }
    }

    correctHours(time);
    return time;
  };
}

var parseFormattedInput = function parseFormattedInput(input, format, utc, dayjs) {
  try {
    if (['x', 'X'].indexOf(format) > -1) return new Date((format === 'X' ? 1000 : 1) * input);
    var parser = makeParser(format);

    var _parser2 = parser(input),
        year = _parser2.year,
        month = _parser2.month,
        day = _parser2.day,
        hours = _parser2.hours,
        minutes = _parser2.minutes,
        seconds = _parser2.seconds,
        milliseconds = _parser2.milliseconds,
        zone = _parser2.zone,
        week = _parser2.week;

    var now = new Date();
    var d = day || (!year && !month ? now.getDate() : 1);
    var y = year || now.getFullYear();
    var M = 0;

    if (!(year && !month)) {
      M = month > 0 ? month - 1 : now.getMonth();
    }

    var h = hours || 0;
    var m = minutes || 0;
    var s = seconds || 0;
    var ms = milliseconds || 0;

    if (zone) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms + zone.offset * 60 * 1000));
    }

    if (utc) {
      return new Date(Date.UTC(y, M, d, h, m, s, ms));
    }

    var newDate;
    newDate = new Date(y, M, d, h, m, s, ms);

    if (week) {
      newDate = dayjs(newDate).week(week).toDate();
    }

    return newDate;
  } catch (e) {
    return new Date(''); // Invalid Date
  }
};

const customParseFormat = (function (o, C, d) {
  d.p.customParseFormat = true;

  if (o && o.parseTwoDigitYear) {
    parseTwoDigitYear = o.parseTwoDigitYear;
  }

  var proto = C.prototype;
  var oldParse = proto.parse;

  proto.parse = function (cfg) {
    var date = cfg.date,
        utc = cfg.utc,
        args = cfg.args;
    this.$u = utc;
    var format = args[1];

    if (typeof format === 'string') {
      var isStrictWithoutLocale = args[2] === true;
      var isStrictWithLocale = args[3] === true;
      var isStrict = isStrictWithoutLocale || isStrictWithLocale;
      var pl = args[2];

      if (isStrictWithLocale) {
        pl = args[2];
      }

      locale = this.$locale();

      if (!isStrictWithoutLocale && pl) {
        locale = d.Ls[pl];
      }

      this.$d = parseFormattedInput(date, format, utc, d);
      this.init();
      if (pl && pl !== true) this.$L = this.locale(pl).$L; // use != to treat
      // input number 1410715640579 and format string '1410715640579' equal
      // eslint-disable-next-line eqeqeq

      if (isStrict && date != this.format(format)) {
        this.$d = new Date('');
      } // reset global locale to make parallel unit test


      locale = {};
    } else if (format instanceof Array) {
      var len = format.length;

      for (var i = 1; i <= len; i += 1) {
        args[1] = format[i - 1];
        var result = d.apply(this, args);

        if (result.isValid()) {
          this.$d = result.$d;
          this.$L = result.$L;
          this.init();
          break;
        }

        if (i === len) this.$d = new Date('');
      }
    } else {
      oldParse.call(this, cfg);
    }
  };
});

var MILLISECONDS_A_YEAR = MILLISECONDS_A_DAY * 365;
var MILLISECONDS_A_MONTH = MILLISECONDS_A_YEAR / 12;
var durationRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
var unitToMS = {
  years: MILLISECONDS_A_YEAR,
  months: MILLISECONDS_A_MONTH,
  days: MILLISECONDS_A_DAY,
  hours: MILLISECONDS_A_HOUR,
  minutes: MILLISECONDS_A_MINUTE,
  seconds: MILLISECONDS_A_SECOND,
  milliseconds: 1,
  weeks: MILLISECONDS_A_WEEK
};

var isDuration = function isDuration(d) {
  return d instanceof Duration;
}; // eslint-disable-line no-use-before-define


var $d;
var $u;

var wrapper = function wrapper(input, instance, unit) {
  return new Duration(input, unit, instance.$l);
}; // eslint-disable-line no-use-before-define


var prettyUnit = function prettyUnit(unit) {
  return $u.p(unit) + "s";
};

var isNegative = function isNegative(number) {
  return number < 0;
};

var roundNumber = function roundNumber(number) {
  return isNegative(number) ? Math.ceil(number) : Math.floor(number);
};

var absolute = function absolute(number) {
  return Math.abs(number);
};

var getNumberUnitFormat = function getNumberUnitFormat(number, unit) {
  if (!number) {
    return {
      negative: false,
      format: ''
    };
  }

  if (isNegative(number)) {
    return {
      negative: true,
      format: "" + absolute(number) + unit
    };
  }

  return {
    negative: false,
    format: "" + number + unit
  };
};

var Duration = /*#__PURE__*/function () {
  function Duration(input, unit, locale) {
    var _this = this;

    this.$d = {};
    this.$l = locale;

    if (input === undefined) {
      this.$ms = 0;
      this.parseFromMilliseconds();
    }

    if (unit) {
      return wrapper(input * unitToMS[prettyUnit(unit)], this);
    }

    if (typeof input === 'number') {
      this.$ms = input;
      this.parseFromMilliseconds();
      return this;
    }

    if (typeof input === 'object') {
      Object.keys(input).forEach(function (k) {
        _this.$d[prettyUnit(k)] = input[k];
      });
      this.calMilliseconds();
      return this;
    }

    if (typeof input === 'string') {
      var d = input.match(durationRegex);

      if (d) {
        var properties = d.slice(2);
        var numberD = properties.map(function (value) {
          return value != null ? Number(value) : 0;
        });
        this.$d.years = numberD[0];
        this.$d.months = numberD[1];
        this.$d.weeks = numberD[2];
        this.$d.days = numberD[3];
        this.$d.hours = numberD[4];
        this.$d.minutes = numberD[5];
        this.$d.seconds = numberD[6];
        this.calMilliseconds();
        return this;
      }
    }

    return this;
  }

  var _proto = Duration.prototype;

  _proto.calMilliseconds = function calMilliseconds() {
    var _this2 = this;

    this.$ms = Object.keys(this.$d).reduce(function (total, unit) {
      return total + (_this2.$d[unit] || 0) * unitToMS[unit];
    }, 0);
  };

  _proto.parseFromMilliseconds = function parseFromMilliseconds() {
    var $ms = this.$ms;
    this.$d.years = roundNumber($ms / MILLISECONDS_A_YEAR);
    $ms %= MILLISECONDS_A_YEAR;
    this.$d.months = roundNumber($ms / MILLISECONDS_A_MONTH);
    $ms %= MILLISECONDS_A_MONTH;
    this.$d.days = roundNumber($ms / MILLISECONDS_A_DAY);
    $ms %= MILLISECONDS_A_DAY;
    this.$d.hours = roundNumber($ms / MILLISECONDS_A_HOUR);
    $ms %= MILLISECONDS_A_HOUR;
    this.$d.minutes = roundNumber($ms / MILLISECONDS_A_MINUTE);
    $ms %= MILLISECONDS_A_MINUTE;
    this.$d.seconds = roundNumber($ms / MILLISECONDS_A_SECOND);
    $ms %= MILLISECONDS_A_SECOND;
    this.$d.milliseconds = $ms;
  };

  _proto.toISOString = function toISOString() {
    var Y = getNumberUnitFormat(this.$d.years, 'Y');
    var M = getNumberUnitFormat(this.$d.months, 'M');
    var days = +this.$d.days || 0;

    if (this.$d.weeks) {
      days += this.$d.weeks * 7;
    }

    var D = getNumberUnitFormat(days, 'D');
    var H = getNumberUnitFormat(this.$d.hours, 'H');
    var m = getNumberUnitFormat(this.$d.minutes, 'M');
    var seconds = this.$d.seconds || 0;

    if (this.$d.milliseconds) {
      seconds += this.$d.milliseconds / 1000;
      seconds = Math.round(seconds * 1000) / 1000;
    }

    var S = getNumberUnitFormat(seconds, 'S');
    var negativeMode = Y.negative || M.negative || D.negative || H.negative || m.negative || S.negative;
    var T = H.format || m.format || S.format ? 'T' : '';
    var P = negativeMode ? '-' : '';
    var result = P + "P" + Y.format + M.format + D.format + T + H.format + m.format + S.format;
    return result === 'P' || result === '-P' ? 'P0D' : result;
  };

  _proto.toJSON = function toJSON() {
    return this.toISOString();
  };

  _proto.format = function format(formatStr) {
    var str = formatStr || 'YYYY-MM-DDTHH:mm:ss';
    var matches = {
      Y: this.$d.years,
      YY: $u.s(this.$d.years, 2, '0'),
      YYYY: $u.s(this.$d.years, 4, '0'),
      M: this.$d.months,
      MM: $u.s(this.$d.months, 2, '0'),
      D: this.$d.days,
      DD: $u.s(this.$d.days, 2, '0'),
      H: this.$d.hours,
      HH: $u.s(this.$d.hours, 2, '0'),
      m: this.$d.minutes,
      mm: $u.s(this.$d.minutes, 2, '0'),
      s: this.$d.seconds,
      ss: $u.s(this.$d.seconds, 2, '0'),
      SSS: $u.s(this.$d.milliseconds, 3, '0')
    };
    return str.replace(REGEX_FORMAT, function (match, $1) {
      return $1 || String(matches[match]);
    });
  };

  _proto.as = function as(unit) {
    return this.$ms / unitToMS[prettyUnit(unit)];
  };

  _proto.get = function get(unit) {
    var base = this.$ms;
    var pUnit = prettyUnit(unit);

    if (pUnit === 'milliseconds') {
      base %= 1000;
    } else if (pUnit === 'weeks') {
      base = roundNumber(base / unitToMS[pUnit]);
    } else {
      base = this.$d[pUnit];
    }

    return base || 0; // a === 0 will be true on both 0 and -0
  };

  _proto.add = function add(input, unit, isSubtract) {
    var another;

    if (unit) {
      another = input * unitToMS[prettyUnit(unit)];
    } else if (isDuration(input)) {
      another = input.$ms;
    } else {
      another = wrapper(input, this).$ms;
    }

    return wrapper(this.$ms + another * (isSubtract ? -1 : 1), this);
  };

  _proto.subtract = function subtract(input, unit) {
    return this.add(input, unit, true);
  };

  _proto.locale = function locale(l) {
    var that = this.clone();
    that.$l = l;
    return that;
  };

  _proto.clone = function clone() {
    return wrapper(this.$ms, this);
  };

  _proto.humanize = function humanize(withSuffix) {
    return $d().add(this.$ms, 'ms').locale(this.$l).fromNow(!withSuffix);
  };

  _proto.valueOf = function valueOf() {
    return this.asMilliseconds();
  };

  _proto.milliseconds = function milliseconds() {
    return this.get('milliseconds');
  };

  _proto.asMilliseconds = function asMilliseconds() {
    return this.as('milliseconds');
  };

  _proto.seconds = function seconds() {
    return this.get('seconds');
  };

  _proto.asSeconds = function asSeconds() {
    return this.as('seconds');
  };

  _proto.minutes = function minutes() {
    return this.get('minutes');
  };

  _proto.asMinutes = function asMinutes() {
    return this.as('minutes');
  };

  _proto.hours = function hours() {
    return this.get('hours');
  };

  _proto.asHours = function asHours() {
    return this.as('hours');
  };

  _proto.days = function days() {
    return this.get('days');
  };

  _proto.asDays = function asDays() {
    return this.as('days');
  };

  _proto.weeks = function weeks() {
    return this.get('weeks');
  };

  _proto.asWeeks = function asWeeks() {
    return this.as('weeks');
  };

  _proto.months = function months() {
    return this.get('months');
  };

  _proto.asMonths = function asMonths() {
    return this.as('months');
  };

  _proto.years = function years() {
    return this.get('years');
  };

  _proto.asYears = function asYears() {
    return this.as('years');
  };

  return Duration;
}();

var manipulateDuration = function manipulateDuration(date, duration, k) {
  return date.add(duration.years() * k, 'y').add(duration.months() * k, 'M').add(duration.days() * k, 'd').add(duration.hours() * k, 'h').add(duration.minutes() * k, 'm').add(duration.seconds() * k, 's').add(duration.milliseconds() * k, 'ms');
};

const duration = (function (option, Dayjs, dayjs) {
  $d = dayjs;
  $u = dayjs().$utils();

  dayjs.duration = function (input, unit) {
    var $l = dayjs.locale();
    return wrapper(input, {
      $l: $l
    }, unit);
  };

  dayjs.isDuration = isDuration;
  var oldAdd = Dayjs.prototype.add;
  var oldSubtract = Dayjs.prototype.subtract;

  Dayjs.prototype.add = function (value, unit) {
    if (isDuration(value)) {
      return manipulateDuration(this, value, 1);
    }

    return oldAdd.bind(this)(value, unit);
  };

  Dayjs.prototype.subtract = function (value, unit) {
    if (isDuration(value)) {
      return manipulateDuration(this, value, -1);
    }

    return oldSubtract.bind(this)(value, unit);
  };
});

const isSameOrBefore = (function (o, c) {
  c.prototype.isSameOrBefore = function (that, units) {
    return this.isSame(that, units) || this.isBefore(that, units);
  };
});

const weekday = (function (o, c) {
  var proto = c.prototype;

  proto.weekday = function (input) {
    var weekStart = this.$locale().weekStart || 0;
    var $W = this.$W;
    var weekday = ($W < weekStart ? $W + 7 : $W) - weekStart;

    if (this.$utils().u(input)) {
      return weekday;
    }

    return this.subtract(weekday, 'day').add(input, 'day');
  };
});

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
function words() {
  return [
    {
      startAt: dayjs(),
      regExp: /^(?:今[天日]|to?day?)(.*)/
    },
    {
      startAt: dayjs().subtract(1, "days"),
      regExp: /^(?:昨[天日]|y(?:ester)?day?)(.*)/
    },
    {
      startAt: dayjs().subtract(2, "days"),
      regExp: /^(?:前天|(?:the)?d(?:ay)?b(?:eforeyesterda)?y)(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(1)) ? dayjs().weekday(1).subtract(1, "week") : dayjs().weekday(1),
      regExp: /^(?:周|星期)一(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(2)) ? dayjs().weekday(2).subtract(1, "week") : dayjs().weekday(2),
      regExp: /^(?:周|星期)二(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(3)) ? dayjs().weekday(3).subtract(1, "week") : dayjs().weekday(3),
      regExp: /^(?:周|星期)三(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(4)) ? dayjs().weekday(4).subtract(1, "week") : dayjs().weekday(4),
      regExp: /^(?:周|星期)四(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(5)) ? dayjs().weekday(5).subtract(1, "week") : dayjs().weekday(5),
      regExp: /^(?:周|星期)五(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(6)) ? dayjs().weekday(6).subtract(1, "week") : dayjs().weekday(6),
      regExp: /^(?:周|星期)六(.*)/
    },
    {
      startAt: dayjs().isSameOrBefore(dayjs().weekday(7)) ? dayjs().weekday(7).subtract(1, "week") : dayjs().weekday(7),
      regExp: /^(?:周|星期)[天日](.*)/
    },
    {
      startAt: dayjs().add(1, "days"),
      regExp: /^(?:明[天日]|y(?:ester)?day?)(.*)/
    },
    {
      startAt: dayjs().add(2, "days"),
      regExp: /^(?:[后後][天日]|(?:the)?d(?:ay)?a(?:fter)?t(?:omrrow)?)(.*)/
    }
  ];
}
const patterns = [
  {
    unit: "years",
    regExp: /(\d+)(?:年|y(?:ea)?rs?)/
  },
  {
    unit: "months",
    regExp: /(\d+)(?:[个個]?月|months?)/
  },
  {
    unit: "weeks",
    regExp: /(\d+)(?:周|[个個]?星期|weeks?)/
  },
  {
    unit: "days",
    regExp: /(\d+)(?:天|日|d(?:ay)?s?)/
  },
  {
    unit: "hours",
    regExp: /(\d+)(?:[个個]?(?:小?时|[時点點])|h(?:(?:ou)?r)?s?)/
  },
  {
    unit: "minutes",
    regExp: /(\d+)(?:分[鐘钟]?|m(?:in(?:ute)?)?s?)/
  },
  {
    unit: "seconds",
    regExp: /(\d+)(?:秒[鐘钟]?|s(?:ec(?:ond)?)?s?)/
  }
];
const patternSize = Object.keys(patterns).length;
function toDate(date) {
  return date.toLowerCase().replace(/(^an?\s)|(\san?\s)/g, "1").replace(/几|幾/g, "3").replace(/[\s,]/g, "");
}
function toDurations(matches) {
  const durations = {};
  let p = 0;
  for (const m of matches) {
    for (; p <= patternSize; p++) {
      const match = patterns[p].regExp.exec(m);
      if (match) {
        durations[patterns[p].unit] = match[1];
        break;
      }
    }
  }
  return durations;
}
function parseRelativeDate(date, timezone = "UTC") {
  var _a;
  if (date === "\u521A\u521A") return /* @__PURE__ */ new Date();
  const theDate = toDate(date);
  const matches = theDate.match(/\D*\d+(?![:\-/]|(a|p)m)\D+/g);
  const offset = dayjs.duration({ hours: (dayjs().tz(timezone).utcOffset() - dayjs().utcOffset()) / 60 });
  if (matches) {
    const lastMatch = matches.pop();
    if (lastMatch) {
      const beforeMatches = /(.*)(?:前|ago)$/.exec(lastMatch);
      if (beforeMatches) {
        matches.push(beforeMatches[1]);
        return dayjs().subtract(dayjs.duration(toDurations(matches))).toDate();
      }
      const afterMatches = /(?:^in(.*)|(.*)[后後])$/.exec(lastMatch);
      if (afterMatches) {
        matches.push((_a = afterMatches[1]) != null ? _a : afterMatches[2]);
        return dayjs().add(dayjs.duration(toDurations(matches))).toDate();
      }
      matches.push(lastMatch);
    }
    const firstMatch = matches.shift();
    if (firstMatch) {
      for (const w of words()) {
        const wordMatches = w.regExp.exec(firstMatch);
        if (wordMatches) {
          matches.unshift(wordMatches[1]);
          return dayjs.tz(w.startAt.set("hour", 0).set("minute", 0).set("second", 0).set("millisecond", 0).add(dayjs.duration(toDurations(matches))).add(offset), timezone).toDate();
        }
      }
    }
  } else {
    for (const w of words()) {
      const wordMatches = w.regExp.exec(theDate);
      if (wordMatches) {
        return dayjs.tz(`${w.startAt.add(offset).format("YYYY-MM-DD")} ${/a|pm$/.test(wordMatches[1]) ? wordMatches[1].replace(/a|pm/, " $&") : wordMatches[1]}`, timezone).toDate();
      }
    }
  }
  return date;
}

const ithome = defineSource(async () => {
  const response = await myFetch("https://www.ithome.com/list/");
  const $ = cheerio.load(response);
  const $main = $("#list > div.fl > ul > li");
  const news = [];
  $main.each((_, el) => {
    const $el = $(el);
    const $a = $el.find("a.t");
    const url = $a.attr("href");
    const title = $a.text();
    const date = $(el).find("i").text();
    if (url && title && date) {
      const isAd = (url == null ? void 0 : url.includes("lapin")) || ["\u795E\u5238", "\u4F18\u60E0", "\u8865\u8D34", "\u4EAC\u4E1C"].find((k) => title.includes(k));
      if (!isAd) {
        news.push({
          url,
          title,
          id: url,
          pubDate: parseRelativeDate(date, "Asia/Shanghai").valueOf()
        });
      }
    }
  });
  return news.sort((m, n) => n.pubDate > m.pubDate ? 1 : -1);
});

const zhihu = defineSource({
  zhihu: async () => {
    const url = "https://www.zhihu.com/api/v3/feed/topstory/hot-list-web?limit=20&desktop=true";
    const res = await myFetch(url);
    return res.data.map((k) => {
      var _a, _b;
      return {
        id: (_b = (_a = k.target.link.url.match(/(\d+)$/)) == null ? void 0 : _a[1]) != null ? _b : k.target.link.url,
        title: k.target.title_area.text,
        extra: {
          info: k.target.metrics_area.text,
          hover: k.target.excerpt_area.text
        },
        url: k.target.link.url
      };
    });
  }
});

const share = defineSource(async () => {
  const res = await Promise.all(["create", "ideas", "programmer", "share"].map((k) => myFetch(`https://www.v2ex.com/feed/${k}.json`)));
  return res.map((k) => k.items).flat().map((k) => {
    var _a;
    return {
      id: k.id,
      title: k.title,
      extra: {
        date: (_a = k.date_modified) != null ? _a : k.date_published
      },
      url: k.url
    };
  }).sort((m, n) => m.extra.date < n.extra.date ? 1 : -1);
});
const v2exSource = defineSource({
  "v2ex": share,
  "v2ex-share": share
});

const trending = defineSource(async () => {
  const baseURL = "https://github.com";
  const html = await myFetch("https://github.com/trending?spoken_language_code=");
  const $ = cheerio.load(html);
  const $main = $("main .Box div[data-hpc] > article");
  const news = [];
  $main.each((_, el) => {
    const a = $(el).find(">h2 a");
    const title = a.text().replace(/\n+/g, "").trim();
    const url = a.attr("href");
    const star = $(el).find("[href$=stargazers]").text().replace(/\s+/g, "").trim();
    const desc = $(el).find(">p").text().replace(/\n+/g, "").trim();
    if (url && title) {
      news.push({
        url: `${baseURL}${url}`,
        title,
        id: url,
        extra: {
          info: `\u2730 ${star}`,
          hover: desc
        }
      });
    }
  });
  return news;
});
const github = defineSource({
  "github": trending,
  "github-trending-today": trending
});

const hackernews = defineSource(async () => {
  const baseURL = "https://news.ycombinator.com";
  const html = await myFetch(baseURL);
  const $ = cheerio.load(html);
  const $main = $(".athing");
  const news = [];
  $main.each((_, el) => {
    const a = $(el).find(".titleline a").first();
    const title = a.text();
    const id = $(el).attr("id");
    const score = $(`#score_${id}`).text();
    const url = `${baseURL}/item?id=${id}`;
    if (url && id && title) {
      news.push({
        url,
        title,
        id,
        extra: {
          info: score
        }
      });
    }
  });
  return news;
});

const v2ex = v2exSource.v2ex || v2exSource["v2ex-share"];
const getters = {
  "ithome": ithome,
  "zhihu": zhihu,
  "v2ex": v2ex,
  "v2ex-share": v2exSource["v2ex-share"] || v2ex,
  "github": github,
  "github-trending-today": github,
  "hackernews": hackernews
};

const index = defineEventHandler(async (event) => {
  var _a, _b;
  try {
    const query = getQuery$1(event);
    const latest = query.latest !== void 0 && query.latest !== "false";
    let id = query.id;
    const isValid = (id2) => !id2 || !sources[id2] || !getters[id2];
    if (isValid(id)) {
      const redirectID = (_b = (_a = sources) == null ? void 0 : _a[id]) == null ? void 0 : _b.redirect;
      if (redirectID) id = redirectID;
      if (isValid(id)) throw new Error("Invalid source id");
    }
    const cacheTable = await getCacheTable();
    const now = Date.now();
    let cache;
    if (cacheTable) {
      cache = await cacheTable.get(id);
      if (cache) {
        if (now - cache.updated < sources[id].interval) {
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
      const rawData = (await getters[id]()).slice(0, 30);
      if (cacheTable && rawData.length) {
        if (event.context.waitUntil) event.context.waitUntil(cacheTable.set(id, rawData));
        else await cacheTable.set(id, rawData);
      }
      logger.success(`fetch ${id} latest`);
      return {
        status: "success",
        id,
        updatedTime: now,
        items: rawData
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
