'use client';

import { removeAccessToken } from '@utils';

/* eslint-disable */
/**
 * Copyright (C) 2016 Maxime Petazzoni <maxime.petazzoni@bulix.org>.
 * All rights reserved.
 */

interface SSEOptions {
  headers?: { [key: string]: string };
  payload?: string;
  method?: string;
  withCredentials?: boolean;
}

interface SSEEvent {
  id: string | null;
  retry: string | null;
  data: string;
  event: string;
}

class SSE {
  INITIALIZING: number = -1;
  CONNECTING: number = 0;
  OPEN: number = 1;
  CLOSED: number = 2;

  url: string;
  headers: { [key: string]: string };
  payload: string;
  method: string;
  withCredentials: boolean;
  FIELD_SEPARATOR: string = ':';
  listeners: { [key: string]: Array<(e: CustomEvent) => void> };
  xhr: XMLHttpRequest | null = null;
  readyState: number = this.INITIALIZING;
  progress: number = 0;
  chunk: string = '';
  private _retry: any;

  constructor(url: string, options?: SSEOptions) {
    this.url = url;
    options = options || {};
    this.headers = options.headers || {};
    this.payload = options.payload !== undefined ? options.payload : '';
    this.method = options.method || (this.payload ? 'POST' : 'GET');
    this.withCredentials = !!options.withCredentials;
    this.listeners = {};
  }

  addEventListener(type: string, listener: (e: CustomEvent) => void) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }

    if (!this.listeners[type].includes(listener)) {
      this.listeners[type].push(listener);
    }
  }

  removeEventListener(type: string, listener: (e: CustomEvent) => void) {
    if (!this.listeners[type]) {
      return;
    }

    this.listeners[type] = this.listeners[type].filter((element) => element !== listener);
    if (this.listeners[type].length === 0) {
      delete this.listeners[type];
    }
  }

  dispatchEvent(e: CustomEvent) {
    if (!e) return true;

    (e as any).source = this;

    const onHandler = `on${e.type}`;
    if (Object.prototype.hasOwnProperty.call(this, onHandler)) {
      (this as any)[onHandler](e);
      if (e.defaultPrevented) {
        return false;
      }
    }

    if (this.listeners[e.type]) {
      return this.listeners[e.type].every((callback) => {
        callback(e);
        return !e.defaultPrevented;
      });
    }

    return true;
  }

  private _setReadyState(state: number) {
    const event = new CustomEvent('readystatechange') as any;
    event.readyState = state;
    this.readyState = state;
    this.dispatchEvent(event);
  }

  private _onStreamFailure(e: ProgressEvent<XMLHttpRequestEventTarget>) {
    const event = new CustomEvent('error') as any;
    event.data = (e.currentTarget as XMLHttpRequest)?.response;
    this.dispatchEvent(event);
    this.close();
  }

  private _onStreamAbort(e: ProgressEvent) {
    this.dispatchEvent(new CustomEvent('abort'));
    this.close();
  }

  private async _onStreamProgress(e: ProgressEvent<XMLHttpRequestEventTarget>) {
    if (!this.xhr) return;

    if (this.xhr.status === 401 && !this._retry) {
      window.dispatchEvent(new CustomEvent('tokenExpired', { detail: '' }));
      console.log('401 sse');
      removeAccessToken();
      window.location.reload();
    } else if (this.xhr.status !== 200) {
      this._onStreamFailure(e);
      return;
    }

    if (this.readyState === this.CONNECTING) {
      this.dispatchEvent(new CustomEvent('open'));
      this._setReadyState(this.OPEN);
    }

    const data = this.xhr.responseText.substring(this.progress);
    this.progress += data.length;

    data.split(/(\r\n|\r|\n){2}/g).forEach((part) => {
      if (part.trim().length === 0) {
        this.dispatchEvent(this._parseEventChunk(this.chunk.trim()) as any);
        this.chunk = '';
      } else {
        this.chunk += part;
      }
    });
  }

  private _onStreamLoaded(e: ProgressEvent<XMLHttpRequestEventTarget>) {
    this._onStreamProgress(e);
    this.dispatchEvent(this._parseEventChunk(this.chunk) as any);
    this.chunk = '';
  }

  /**
   * Parse a received SSE event chunk into a constructed event object.
   */

  private _parseEventChunk(chunk: string): CustomEvent | null {
    if (!chunk || chunk.length === 0) return null;

    const e: SSEEvent = { id: null, retry: null, data: '', event: 'message' };
    chunk.split(/\n|\r\n|\r/).forEach((line) => {
      line = line.trimRight();
      const index = line.indexOf(this.FIELD_SEPARATOR);
      if (index <= 0) return;

      const field = line.substring(0, index);
      if (!(field in e)) return;

      const value = line.substring(index + 1).trimLeft();
      if (field === 'data') {
        e[field] += value;
      } else {
        (e as any)[field] = value;
      }
    });

    const event = new CustomEvent(e.event);
    (event as any).data = e.data;
    (event as any).id = e.id;
    return event;
  }

  private _checkStreamClosed() {
    if (this.xhr?.readyState === XMLHttpRequest.DONE) {
      this._setReadyState(this.CLOSED);
    }
  }

  stream() {
    this._setReadyState(this.CONNECTING);

    this.xhr = new XMLHttpRequest();
    this.xhr.addEventListener('progress', this._onStreamProgress.bind(this));
    this.xhr.addEventListener('load', this._onStreamLoaded.bind(this));
    this.xhr.addEventListener('readystatechange', this._checkStreamClosed.bind(this));
    this.xhr.addEventListener('error', this._onStreamFailure.bind(this));
    this.xhr.addEventListener('abort', this._onStreamAbort.bind(this));
    this.xhr.open(this.method, this.url);
    Object.keys(this.headers).forEach((header) => {
      this.xhr?.setRequestHeader(header, this.headers[header]);
    });
    this.xhr.withCredentials = this.withCredentials;
    this.xhr.send(this.payload);
  }

  close() {
    if (this.readyState === this.CLOSED) return;

    this.xhr?.abort();
    this.xhr = null;
    this._setReadyState(this.CLOSED);
  }
}

export { SSE };
