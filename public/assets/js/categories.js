// 当添加分类表单发生提交事件的时候
$('#addCategory').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // console.log(formData);
    // 向服务器端发送请求  添加分类
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    });
    // 阻止表单默认提交
    return false;
});



// 发送ajax请求  向服务器端索要的分类列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        // 将服务器端返回的数据和HTML模板进行【拼接
        var html = template('categoryListTpl', { data: response });
        // console.log(html);
        // 将拼接好的内容放到页面中
        $('#categotyBox').html(html);
    }
})

// 为编辑按钮添加点击事件
$('#categotyBox').on('click', '.edit', function() {

    //    获取要修改的分类数据id
    var id = $(this).attr('data-id');
    // 根据id获取分类数据的详细信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            // console.log(response);
            var html = template('modifyCategoryTpl', response);
            // console.log(html);
            $('#formBox').html(html);
        }
    })
})

// 当修改分类数据表单发生提交事件
$('#formBox').on('submit', '#modifyCategory', function() {
    // 获取管理员在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的分类id
    var id = $(this).attr('data-id');
    // 发送ajax请求 修改分类数据
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    })

    // 阻止表单默认提交
    return false;
})

// 当点击删除按钮被点击时
$('#categotyBox').on('click', '.delete', function() {
    if (confirm('您真的要执行删除操作么')) {
        // 获取删除的分类id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求删除分类id
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})