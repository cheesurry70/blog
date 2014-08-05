// Add an "is-legacy" class to the body for
// browsers that don't support flexbox.
(function(body) {
  var style = body.style;
  if (!('flexBasis' in style ||
      'msFlexAlign' in style ||
      'webkitBoxDirection' in style)) {
    body.className += ' is-legacy';
  }
}(document.body));
