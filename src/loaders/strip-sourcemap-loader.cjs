module.exports = function(source) {
  if (source.includes('sourceMappingURL')) {
    return source.replace(/\/\/# sourceMappingURL=.*/g, '');
  }
  return source;
};
