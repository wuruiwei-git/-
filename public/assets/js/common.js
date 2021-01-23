// 数据管理页面的s
// 退出按钮

$('#logout').on('click', function () {
    var isConfirm = confirm('您真的要退出么');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html';
            },
            error: function () {
                alert('退出失败');
            }
        })
    }
})
// 处理日期的时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 向服务器发送请求  索要登录用户信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function (response) {
        console.log(response);
        $('.avatar').attr('src', response.avatar);
        $('.profile .name').html(response.nickName);
    }
})
