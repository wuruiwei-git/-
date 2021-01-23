// 当管理员选择文件的时候
$('#file').on('change', function () {
    // 用户选择到的文件
    var file = this.files[0];
    // 创建formData对象实现二进制文件上传
    var formdata = new FormData();
    // 将管理员选择到的文件添加到formData对象中
    formdata.append('image', file);
    // 向服务器端发送请求  实现图片上传
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formdata,
        // 禁止处理formdata这个参数的格式
        processData: false,
        // 告诉不要再内部设置contentType这个值
        contentType: false,
        success: function (response) {
            // console.log(response);
            $('#image').val(response[0].image)
        }
    })

})



// 当轮播图发生表单提交行为的时候
$('#slidesFrom').on('submit', function () {
    // 获取管理员在表单输入的内容
    var formData = $(this).serialize();
    // 向服务器发送请求  添加轮播图数据
    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false;
})


// 向服务器发送请求  索要图片轮播列表数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (response) {
        console.log(response);
        var html = template('slidesTpl', { data: response })
        // console.log(html);
        $('#slidesBox').html(html)

    }
})


// 当删除按钮被点击时 
$('#slidesBox').on('click', '.delete', function () {
    if (confirm('您真的要进行删除操作么？')) {
        // 获取管理员要删除的轮播图ID
        var id = $(this).attr('data-id');
        // 向服务器发送请求  实现数据轮播删除功能
        $.ajax({
            type: 'delete',
            url: '/slides/' + id,
            success: function () {
                location.reload();
            }
        })

    }
})