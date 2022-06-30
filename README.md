# cropper 图片裁剪工具

**背景：**
在项目中常常都会有更换登陆人头像的需求，这个很简单直接上传一张图片展示就可以了，但是如果上传的图片需要剪裁成正方形的话就需要我们来做一些特殊的处理，通常情况下，我们可以使用 canvas 来对图片进行裁剪，但由于要考虑很多功能，自己写起来就比较麻烦，所以我们可以通过一些插件来实现

**技术**
cropper
cropper 是一款使用简单且功能强大的图片剪裁 jQuery 插件

**代码实现**

```
npm i cropper
```

```
<link rel="stylesheet" href="../node_modules/cropper/dist/cropper.css">
<script src="../node_modules/jquery/dist/jquery.js"></script>
<script src="../node_modules/cropper/dist/cropper.js"></script>
```

```
// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
// 1.2 配置选项
const options = {
  viewMode: 1, //定义裁剪器的视图模式。如果将viewMode设置为0，则裁剪框可   以延伸到画布外部，而值为1、2或3将限制裁剪框的大小为画布的大小。viewMode为2   或3会将画布限制为容器。请注意，如果画布和容器的比例相同，则2和3之间没有差别。
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
    // {
    //   width //输出画布的目标宽度
    //   height //输出画布的目标高度。
    //   minWidth //输出画布的最小目标宽度，默认值为0。
    //   minHeight //输出画布的最小目标高度，默认值为0。
    //   maxWidth //输出画布的最大目标宽度，默认值为Infinity(无穷大)。
    //   maxHeight //输出画布的最大目标高度，默认值为Infinity(无穷大)。
    // }
    .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

  console.log(dataURL);
});

```

**在 react 项目中使用**

```
npm install --save react-cropper
```

```
import Cropper from 'react-cropper'; // 引入Cropper
import 'cropperjs/dist/cropper.css'; // 引入Cropper对应的css
```

**在微信小程序中进行裁剪**
[image-cropper](https://github.com/1977474741/image-cropper/tree/master) 一款高性能的小程序图片裁剪插件

- 优势 1.功能强大。 2.性能超高超流畅，大图毫无卡顿感。 3.组件化，使用简单。 4.点击中间窗口实时查看裁剪结果。

- 初始准备

```
"usingComponents": {
   "image-cropper": "../image-cropper/image-cropper"
},
"navigationBarTitleText": "裁剪图片",
"disableScroll": true
```

- wxml 文件

```
<image-cropper id="image-cropper" limit_move="{{true}}" disable_rotate="{{true}}" width="{{width}}" height="{{height}}" imgSrc="{{src}}" bindload="cropperload" bindimageload="loadimage" bindtapcut="clickcut"></image-cropper>
```

- 简单示例

```
Page({
        data: {
            src:'',
            width:250,//宽度
            height: 250,//高度
        },
        onLoad: function (options) {
	    //获取到image-cropper实例
            this.cropper = this.selectComponent("#image-cropper");
            //开始裁剪
            this.setData({
                src:"https://raw.githubusercontent.com/1977474741/image-cropper/dev/image/code.jpg",
            });
            wx.showLoading({
                title: '加载中'
            })
        },
        cropperload(e){
            console.log("cropper初始化完成");
        },
        loadimage(e){
            console.log("图片加载完成",e.detail);
            wx.hideLoading();
            //重置图片角度、缩放、位置
            this.cropper.imgReset();
        },
        clickcut(e) {
            console.log(e.detail);
            //点击裁剪框阅览图片
            wx.previewImage({
                current: e.detail.url, // 当前显示图片的http链接
                urls: [e.detail.url] // 需要预览的图片http链接列表
            })
        },
    })
```
