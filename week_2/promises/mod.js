var obj = {
   find : function(query, callback) {
       setTimeout(function() {
           if (!query) {
               callback("bad value");
           }
           callback(null, "abc")
       }, 20);
   }
}
