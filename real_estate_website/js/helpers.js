const hbs = require('express-handlebars');

var handle = hbs.create({
    helpers: {
        eachOne: function(context, options) {
            var ret = "";
            
              for(var i=1, j=context.length; i<j; i++) {
                ret = ret + options.fn(context[i]);
              }
            
              return ret;
        }
    }
});

module.exports = {handle};

