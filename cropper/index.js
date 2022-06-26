/*
 * @Descripttion:
 * @version:
 * @Author: 阿鸿
 * @Date: 2022-06-16 07:27:19
 * @LastEditors: 阿鸿
 * @LastEditTime: 2022-06-26 21:52:27
 */

// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
// 1.2 配置选项
const options = {
  viewMode: 1, //定义裁剪器的视图模式。如果将viewMode设置为0，则裁剪框可以延伸到画布外部，而值为1、2或3将限制裁剪框的大小为画布的大小。viewMode为2或3会将画布限制为容器。请注意，如果画布和容器的比例相同，则2和3之间没有差别。
  dragMode: 'move', //定义的拖动模式裁剪器.canvas和容器一样，2和3没有区别。move:移动画布 crop:创建新的裁剪框（默认） none:什么也不做
  aspectRatio: 1, //定义裁剪框的固定纵横比。默认情况下，裁剪框为自由比率。
  autoCropArea: 0.5, //定义0到1之间的fA编号。定义自动裁剪区域大小（百分比）。默认0.8
  cropBoxMovable: true, //允许通过拖动移动裁剪框。默认true
  cropBoxResizable: true, //以通过拖动来调整裁剪框的大小 默认true
  background: true, //显示容器的网格背景
  movable: false, //移动图像
  zoomable: true, //是否允许放大图片
  preview: '.img-preview', //截取的图片显示在哪个容器
};

// 1.3 创建裁剪区域
$image.cropper(options);

$('#btnChooseImage').click(function () {
  $('#file').click();
});

$('#file').change(function (e) {
  if (e.target.files == 0) {
    return alert('请选择图片');
  }
  var file = e.target.files[0];
  var newImgURL = URL.createObjectURL(file);
  console.log(newImgURL);
  $image
    .cropper('destroy') // 销毁旧的裁剪区域
    .attr('src', newImgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
});

$('#btnUpload').click(function (e) {
  var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

  console.log(dataURL);
});
