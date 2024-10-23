'use client';

import { message } from 'antd';
import { type ClassValue, clsx } from 'clsx';
import Cookies from 'js-cookie';
import { isNil, pickBy } from 'lodash';
import moment from 'moment';
import { twMerge } from 'tailwind-merge';

export const normalizeProp = (
  prop: string | number | [number, number],
): string =>
  typeof prop === 'number'
    ? `${prop}px`
    : (Array.isArray(prop) && `${prop[0]}px ${prop[1]}px`) || prop.toString();

export function hasValue(value?: string | number): boolean {
  return Boolean(value);
}

export function formatDatetime(
  datetimeString: string,
  showTime = true,
): string {
  const format = showTime ? 'DD-MM-YYYY HH:mm' : 'DD-MM-YYYY';
  return moment(datetimeString).format(format);
}

export function parseListImage(images: Array<any>): Array<any> {
  if (!images || !images?.length) return [];
  const result = images.map((item) => {
    if (item.originFileObj || item.url) {
      return item;
    } else {
      const uid = item._id;
      const name = item.name;
      const url = '/' + item?.path?.origin;
      const status = 'done';
      return { uid, name, url, status };
    }
  });
  return result;
}

export function compackFilter(obj: { [key: string]: unknown }) {
  if (!obj) return {};
  return pickBy(obj, (v) => v !== null && v !== undefined && v !== '');
}

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};
export const replaceAll = ({
  str,
  find,
  replace,
}: {
  str: string;
  find: string;
  replace: string;
}) => {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

/**
 * Merges the tailwind clases (using twMerge). Conditionally removes false values
 * @param inputs The tailwind classes to merge
 * @returns className string to apply to an element or HOC
 */
export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const isBrowser = typeof window !== 'undefined';

export const getAccessTokenFromLocalStorage = () =>
  isBrowser ? JSON.parse(localStorage.getItem('accessToken') || 'null') : null;

export const getRefreshTokenFromLocalStorage = () =>
  isBrowser ? localStorage.getItem('refreshToken') : null;
export const setAccessTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem('accessToken', value);

export const setRefreshTokenToLocalStorage = (value: string) =>
  isBrowser && localStorage.setItem('refreshToken', value);
export const removeTokensFromLocalStorage = () => {
  isBrowser && localStorage.removeItem('accessToken');
  isBrowser && localStorage.removeItem('refreshToken');
};

export const groupByDay = (data: any[]) => {
  if (data?.length === 0 || isNil(data)) return [];

  const today = new Date();

  const daysAgo = (date: string): number => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const diffDays = Math.floor(
      (today.getTime() - new Date(date).getTime()) / oneDay,
    );
    return diffDays;
  };

  const groupByDaysAgo = data?.reduce<Record<number, any[]>>((acc, item) => {
    const days = daysAgo(item.created_at);
    if (!acc[days]) {
      acc[days] = [];
    }
    acc[days].push(item);
    return acc;
  }, {});

  const output: any[] = Object.keys(groupByDaysAgo).map((key) => {
    const days = parseInt(key, 10);
    let title;
    if (days === 0) {
      title = 'Hôm nay';
    } else if (days === 1) {
      title = '1 ngày trước';
    } else {
      title = `${days} ngày trước`;
    }

    return {
      title,
      data: groupByDaysAgo[days],
    };
  });

  return output;
};

export function getInitials(name: string) {
  const names = name?.trim()?.split(' ');
  const firstName = names?.[0]?.toUpperCase() ?? '';
  const lastName =
    names.length > 1 ? names?.[names.length - 1]?.toUpperCase() : '';
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

interface TMessage {
  files: any;
}
const even =
  'w-full border-b border-black/10 dark:border-gray-800/50 text-gray-800 bg-white dark:text-gray-200 group dark:bg-gray-800 hover:bg-gray-200/25 hover:text-gray-700  dark:hover:bg-gray-800 dark:hover:text-gray-200';
const odd =
  'w-full border-b border-black/10 bg-gray-50 dark:border-gray-800/50 text-gray-800 dark:text-gray-200 group bg-gray-200 dark:bg-gray-700 hover:bg-gray-200/40 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200';

export function buildTree({
  messages,
  fileMap,
  groupAll = false,
}: {
  messages: any[] | null;
  fileMap?: Record<string, any>;
  groupAll?: boolean;
}) {
  if (messages === null) {
    return null;
  }

  const messageMap: Record<string, TMessage & { children: TMessage[] }> = {};
  const rootMessages: TMessage[] = [];

  if (groupAll) {
    return messages.map((m, idx) => ({ ...m, bg: idx % 2 === 0 ? even : odd }));
  }
  if (!groupAll) {
    // Traverse the messages array and store each element in messageMap.
    messages.forEach((message) => {
      messageMap[message.message_id] = { ...message, children: [] };

      // if (message.files && fileMap) {
      //   messageMap[message.message_id].files = message.files.map((file: any) => fileMap[file.file_id ?? ''] ?? file);
      // }

      const parentMessage = messageMap[message.parent_message_id ?? ''];
      if (parentMessage) {
        parentMessage.children.push(messageMap[message.message_id]);
      } else {
        rootMessages.push(messageMap[message.message_id]);
      }
    });

    return rootMessages;
  }
}

/**
 * Insert text at the cursor position in a textarea.
 */
export function insertTextAtCursor(
  element: HTMLTextAreaElement,
  textToInsert: string,
) {
  element.focus();

  // Use the browser's built-in undoable actions if possible
  if (window.getSelection() && document.queryCommandSupported('insertText')) {
    document.execCommand('insertText', false, textToInsert);
  } else {
    console.warn('insertTextAtCursor: document.execCommand is not supported');
    const startPos = element.selectionStart;
    const endPos = element.selectionEnd;
    const beforeText = element.value.substring(0, startPos);
    const afterText = element.value.substring(endPos);
    element.value = beforeText + textToInsert + afterText;
    element.selectionStart = element.selectionEnd =
      startPos + textToInsert.length;
    const event = new Event('input', { bubbles: true });
    element.dispatchEvent(event);
  }
}

/**
 * Necessary resize helper for edge cases where paste doesn't update the container height.
 *
 1) Resetting the height to 'auto' forces the component to recalculate height based on its current content

 2) Forcing a reflow. Accessing offsetHeight will cause a reflow of the page,
    ensuring that the reset height takes effect before resetting back to the scrollHeight.
    This step is necessary because changes to the DOM do not instantly cause reflows.

 3) Reseting back to scrollHeight reads and applies the ideal height for the current content dynamically
 */
export const forceResize = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
) => {
  if (!textAreaRef.current) {
    return;
  }
  textAreaRef.current.style.height = 'auto';
  textAreaRef.current.offsetHeight;
  textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
};

/**
 * Necessary undo event helper for edge cases where undoing pasted content leaves newlines filling the previous container height.
 */
export const trimUndoneRange = (
  textAreaRef: React.RefObject<HTMLTextAreaElement>,
) => {
  if (!textAreaRef.current) {
    return;
  }
  const { value, selectionStart, selectionEnd } = textAreaRef.current;
  const afterCursor = value.substring(selectionEnd).trim();
  if (afterCursor.length) {
    return;
  }
  const beforeCursor = value.substring(0, selectionStart);
  const newValue = beforeCursor + afterCursor;
  textAreaRef.current.value = newValue;
  textAreaRef.current.setSelectionRange(selectionStart, selectionStart);
};

/**
 * Remove the "@" character from the end of the textarea's text if it's present.
 * This function ensures that the "@" is only removed if it's the last character.
 *
 * @param {HTMLTextAreaElement} textarea - The textarea element where text manipulation will occur.
 */
export function removeAtSymbolIfLast(textarea: HTMLTextAreaElement) {
  if (textarea.value.endsWith('@')) {
    textarea.value = textarea.value.slice(0, -1);
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  }

  textarea.focus();
}

export const storageHelper = {
  getToken: (): string | null => window?.localStorage.getItem('accessToken'),
  getRefreshToken: (): string | null =>
    window?.localStorage.getItem('refreshToken'),
  setToken: (token: string): void => {
    window?.localStorage.setItem('accessToken', token);
  },
  setRefreshToken: (refreshToken: string): void => {
    window?.localStorage.setItem('refreshToken', refreshToken);
  },
  removeToken: (): void => {
    window?.localStorage.removeItem('accessToken');
    // window.localStorage.removeItem('refreshToken');
  },
  resetToken: (): void => {
    window?.localStorage.removeItem('accessToken');
    // window.localStorage.removeItem('refreshToken');
  },
  getAuthorization: (): string | null => {
    return window?.localStorage.getItem('AUTHORIZATION');
  },
  setAuthorization: (sectionId: string): void => {
    window?.localStorage.setItem('AUTHORIZATION', sectionId);
  },
};

export const noopFn = () => {};

export function validateIframe(content: string): string | boolean | null {
  const hasValidIframe =
    content.includes('<iframe role="presentation" style="') &&
    content.includes('src="https://www.bing.com/images/create');

  if (!hasValidIframe) {
    return false;
  }

  const iframeRegex = /<iframe\s[^>]*?>/g;
  const iframeMatches = content.match(iframeRegex);

  if (!iframeMatches || iframeMatches.length > 1) {
    return false;
  }

  const parser = new DOMParser();
  const parsedHtml = parser.parseFromString(content, 'text/html');

  const potentiallyHarmfulTags = [
    'script',
    'img',
    'style',
    'div',
    'a',
    'input',
    'button',
    'form',
  ];
  for (const tag of potentiallyHarmfulTags) {
    const elements = parsedHtml.getElementsByTagName(tag);

    if (elements.length > 0) {
      return false;
    }
  }

  const iframes = parsedHtml.getElementsByTagName('iframe');

  if (iframes.length !== 1) {
    return false;
  }

  const iframe = iframes[0];

  // Verify role and src attributes
  const role = iframe.getAttribute('role');
  const src = iframe.getAttribute('src');

  return (
    role === 'presentation' &&
    src &&
    src.startsWith('https://www.bing.com/images/create')
  );
}

export const removeAccessToken = () => {
  Cookies.remove('accessToken', { path: '/' });
  localStorage.removeItem('accessToken');
};

// Check for microphone permission when the user clicks "Start Recording"

export const requestMicrophoneAccess = async () => {
  const permissionStatus = await navigator.permissions.query({
    name: 'microphone' as PermissionName,
  });
  let isAccess = false;
  if (permissionStatus.state === 'denied') {
    message.open({
      type: 'error',
      duration: 5,
      content: 'Vui lòng cho phép ghi âm bằng Microphone trên trình duyệt này',
    });
    isAccess = false;
  } else if (
    permissionStatus.state === 'prompt' ||
    permissionStatus.state === 'granted'
  ) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      isAccess = true;
    } catch (e) {
      message.open({
        type: 'error',
        duration: 5,
        content:
          'Vui lòng cho phép ghi âm bằng Microphone trên trình duyệt này',
      });
      isAccess = false;
    }
  }
  return isAccess;
};

export const trimValue = (str: string) => {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/\s+/g, ' ').trim();
};

export const trimObjectValues = (obj: any) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') {
    // If obj is not an object, return it as is
    return obj;
  }
  const trimmedObj: any = {};
  for (const key in obj) {
    trimmedObj[key] = trimValue(obj[key]);
  }
  return trimmedObj;
};
