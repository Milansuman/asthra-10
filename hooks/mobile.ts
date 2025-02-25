'use client';

const mobileRegex =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;

export function isMobileDevice(): boolean {
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  const isMobileWidth = window.innerWidth <= 768;

  const hasTouchScreen =
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore
    navigator.msMaxTouchPoints > 0;

  if (mobileRegex.test(userAgent)) {
    return true;
  }

  if (isMobileWidth && hasTouchScreen) {
    return true;
  }

  return false;
}
