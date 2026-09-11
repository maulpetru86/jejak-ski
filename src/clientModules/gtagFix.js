// Polyfill & safety stub for Google Analytics (gtag)
// Mencegah error 'window.gtag is not a function' saat adblocker aktif atau di environment development
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }
}

export default function () {
  return null;
}
