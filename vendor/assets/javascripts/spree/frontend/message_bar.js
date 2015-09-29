var messageBarShow;
(function(){
  messageBarShow = function(msg, style) {
    var msgBar = $('#message-bar');
    msgBar.text(msg);
    msgBar.removeClass().addClass(style);
    msgBar.finish().slideDown(500).delay(5000).slideUp(500);
  };
}());