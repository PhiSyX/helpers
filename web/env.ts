export const { userAgent } = navigator;

export const isAndroid: boolean = userAgent.indexOf("android") > 0;
export const isIOS: boolean = /iphone|ipad|ipod|ios/.test(userAgent);

export const isMobile: boolean = isAndroid || isIOS;
export const isHttps: boolean = location.protocol.indexOf("https") === 0;
