// ==UserScript==
// @name        vk-image
// @namespace   mugiseyebrows.ru
// @include     https://vk.com/*
// @include     http://vk.com/*
// @version     1
// @grant       GM_xmlhttpRequest
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery-noty/2.3.5/packaged/jquery.noty.packaged.min.js
// ==/UserScript==

var showMessage, saveImage, gm_ajax;

var config = {
  pass: 'qwerty',
  host: '127.0.0.1'
}

gm_ajax = function(opts) {
  var data, k, ref, v;
  if (opts.url == null) {
    console.log('gm_ajax error: set url');
    return;
  }
  if (opts.method == null) {
    opts.method = 'GET';
  }
  if (opts.data == null) {
    opts.data = '';
  }
  if ($.isPlainObject(opts.data)) {
    data = [];
    ref = opts.data;
    for (k in ref) {
      v = ref[k];
      data.push(k + '=' + encodeURIComponent(v));
    }
    opts.data = data.join('&');
  }
  if (opts.success == null) {
    opts.success = function() {
      return console.log('ajax succeeded for url ' + opts.url);
    };
  }
  if (opts.error == null) {
    opts.error = function() {
      return console.log('ajax error for url ' + opts.url);
    };
  }
  opts.headers = {};
  if (opts.data.length > 0) {
    opts.headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
  }
  return GM_xmlhttpRequest({
    method: opts.method,
    url: opts.url,
    data: opts.data,
    headers: opts.headers,
    onload: function(response) {
      return opts.success(response.responseText);
    },
    onerror: opts.error
  });
};


showMessage = function(msg) {
  noty({text:msg,layout:'topRight',theme:'relax',timeout:500});
};

saveImage = function() {
  var src;
  if ($('#layer_wrap').css('display') !== 'block') {
    return;
  }
  src = $('#pv_open_original').attr('href');
  if (src == null) {
    return;
  }
  showMessage('saving...');
  gm_ajax({
    method: 'POST',
    url: 'http://' + config['host'] + '/vk-image/',
    data: {
      src: src,
      pass: config['pass']
    },
    success: function(data) {
      
      if ($('#pv_like_icon').css('opacity') < 1) {
        $('#pv_like_icon').click();
        console.log('liked');
      }
      
      return showMessage(data);
    }
  });
};

$(document).ready(function(){
   $('body').on('keypress',function(e) {
    if (e.key == '*') {
      return saveImage();
    }
  });
});
