// Force disable heavy WebGL on Mobile browsers to prevent memory crashes
if (typeof window !== "undefined" && window.innerWidth <= 1024) {
  const originalGetContext = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    if (type === 'webgl' || type === 'webgl2') {
      return null; // Teleports phone directly past heavy 3D memory leaks
    }
    return originalGetContext.apply(this, [type, ...args]);
  };
}