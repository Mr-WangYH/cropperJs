/*
 * @Descripttion:
 * @version:
 * @Author: 阿鸿
 * @Date: 2022-06-26 23:38:43
 * @LastEditors: 阿鸿
 * @LastEditTime: 2022-06-30 07:33:19
 */
// 图片裁剪

window.onload = function () {
  // 上传图片
  var canvas = document.getElementById('myCan');
  var imgFile = $('#imgFile');
  var demoImg = $('#demoImg');
  var ctx = canvas.getContext('2d');
  imgFile.change(function () {
    var file = imgFile[0].files[0];
    var reader = new FileReader(); //FileReader接口提供了读取文件的方法和包含读取结果的事件模型
    console.log(reader);
    reader.onload = function (e) {
      //onload文件读取成功完成时触发
      console.log(e);
      demoImg.attr('src', e.target.result);
    };
    reader.readAsDataURL(file); //将文件读取为 DataURL
  });

  // 位移选裁框
  var dragDiv = $('#chooseBox');
  dragDiv.mousedown(function (e) {
    var oleft = $(this).position().left;
    var otop = $(this).position().top;
    var X = e.pageX - oleft;
    var Y = e.pageY - otop;
    $(document).mousemove(function (e) {
      var left = e.pageX - X;
      var top = e.pageY - Y;
      if (left <= 0) {
        left = 0;
      } else if (left >= $('#demoBox').outerWidth(true) - dragDiv.outerWidth(true)) {
        left = $('#demoBox').outerWidth(true) - dragDiv.outerWidth(true);
      }

      if (top <= 0) {
        top = 0;
      } else if (top >= $('#demoBox').outerHeight(true) - dragDiv.outerHeight(true)) {
        top = $('#demoBox').outerHeight(true) - dragDiv.outerHeight(true);
      }

      dragDiv.css({
        left: left,
        top: top,
      });
    });
  });
  $(document).mouseup(function () {
    $(this).unbind('mousemove');
  });

  // 裁剪
  function cut() {
    var sx = dragDiv.position().left;
    var sy = dragDiv.position().top;
    var img = document.getElementById('demoImg');
    ctx.drawImage(img, sx, sy, 150, 150, 0, 0, 150, 150);
  }

  $('#cut').click(function () {
    ctx.clearRect(0, 0, 150, 150);
    cut();
  });
};
