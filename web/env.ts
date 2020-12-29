// @ts-ignore
export const { userAgent } = window.navigator;

export const isAndroid: boolean = userAgent.indexOf("android") > 0;
export const isIOS: boolean = /iphone|ipad|ipod|ios/.test(userAgent);

export const isMobile: boolean = isAndroid || isIOS;
