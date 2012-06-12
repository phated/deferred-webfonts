define([
  'dojo/_base/lang',
  'dojo/_base/Deferred',
  '/libs/webfonts/webfont.js' // Adds global WebFont namespace
], function(lang, Deferred){

  // TODO: deferred on each font loaded????
  return function(family, url){
    var deferred = new Deferred();
    // If family is a string, wrap in array
    if(lang.isString(family)){
      family = [ family ];
    }
    // If url is a string, wrap in array
    if(lang.isString(url)){
      url = [ url ];
    }
    if(lang.isArray(family) && lang.isArray(url)){
      // Load Fonts
      WebFont.load({
        custom: {
          families: family,
          urls: url
        },
        active: function(){
          deferred.resolve({
            success: true,
            error: null
          });
        },
        inactive: function(){
          deferred.reject({
            success: false,
            error: 'Font not loaded'
          });
        }
      });
    } else {
      // If family and url are not arrays, reject it
      deferred.reject({
        success: false,
        error: 'Not a valid family or url'
      });
    }
    return deferred;
  };
});