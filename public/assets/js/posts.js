// 向服务器端发送请求  获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        // console.log(response);
        var html = template('postsTpl', response);
        $('#postsBox').html(html);
        var page = template('pageTpl', response)
        $('#page').html(page);
    }
})

// 处理日期的时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 分页
/* <li><a href="javascript:;" onclick="changePage({{$value}})">{{$value}}</a></li> */

function changePage(page) {
    // alert(page);
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            // console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page);
        }
    })
}


// 向服务器端发送请求  索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        console.log(response);
        var html = template('categoryTpl', { data: response });
        // console.log(html);
        $('#categoryBox').html(html);

    }
})

// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function () {
    // 获取到管理员选择的过滤条件
    var formData = $(this).serialize();
    console.log(formData);
    // 向服务器发送请求  根据条件索要文章列表数据
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            // console.log(response);
            var html = template('postsTpl', response);
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page);
        }
    })
    // 阻止表单默认提交
    return false;
})


// 当删除按钮被点击时
$("#postsBox").on('click', '.delete', function () {
    // 弹出删除确认框  和管理员确认是否要进行删除操作
    if (confirm('您真的要进行删除操作么？')) {
        // 获取管理员要删除的文章id
        var id = $(this).attr('data-id');
        //    向服务器端发送请求  执行删除操作
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})
