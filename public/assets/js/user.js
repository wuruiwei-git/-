// 添加用户功能
// 当表单发生提交行为的时候
$('#userForm').on('submit', function() {
    // 获取用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送客户端请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            // 刷新页面
            location.reload();
        },
        error: function() {
            alert('用户添加失败');
        }
    })



    // 阻止表单默认提交
    return;
})


// 用户选择文件的时候    使用事件委托的方法处理
$("#modifyBox").on('change', '#avatar', function() {
    // files属性是一个列表，无论一次性一个还是多个都是一个列表
    // console.log(this.files[0]);
    // 用户选择文件
      // 创建空的FormData表单对象           
    var  formData  =  new  FormData();             // 将用户选择文件追加到fromData表单对象中       
    formData.append('avatar',  this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            // console.log(response);

            // 实现头像预览功能

            // 返回值{avatar: "\uploads\upload_20d80ad88053a1d19aff3ecf7e29ab28.png"}
            // attr获取自定义属性
            $('#preview').attr('src', response[0].avatar)
                // 将图片提交给服务器端   设置一个隐藏域用来接收地址
            $('#hiddenAvater').val(response[0].avatar)

        }

    })
})

// 向服务器端发送请求  索要用户列表数据
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        // console.log(response);
        // 使用模板引擎将数据和HTML字符串进行拼接
        var html = template('userTpl', {
            data: response
        });
        // 将拼接好的字符串显示在页面上
        $('#userBox').html(html);
    }
})

// 通过实践委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
    // 获取被点击的用户id值
    var id = $(this).attr('data-id');
    // alert(id);
    // 根据id获取用户的详细信息
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyTpl', response)
                // console.log(html);
            $('#modifyBox').html(html);
        }
    })
})

// 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    // serialize字符串拼接
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // console.log(formData);
    // 获取要修改的那个用户的id
    var id = $(this).attr('data-id');
    // 发送请求  修改用户信息
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            // console.log(response);
            // 修改用户信息成功从新加载页面
            location.reload();

        }
    });
    // 阻止表单默认提交
    return false;
})

// 当删除按钮被点击的时候
$('#userBox').on('click', '.delete', function() {
    // 如果管理员确认要删除用户
    if (confirm('您真的要删除用户么？')) {
        // 获取到即将要删除的用户id
        var id = $(this).attr('data-id');
        // 向服务器端发送请求  删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }
        })
    }


})

// 获取全选按钮
var selectAll = $('#selectAll');
// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当全选按钮发生改变时
selectAll.on('change', function() {
    // 获取到全选按钮的当前状态
    // 获取固有属性   使用attr获取不到  attr是获取自定义属性的
    var status = $(this).prop('checked');
    if (status) {
        // 显示批量修改按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }




    // 获取所有用户
    $('#userBox').find('input').prop('checked', status)
})

// 当用户前面的复选框状态发生改变时
$('#userBox').on('change', '.userStatus', function() {
    // 获取到所有的用户  在所有的用户中过滤出选中的用户
    // 判断选中用户数量和所有用户的数量是否一致
    // 如果一致  就说明所有的用户都是选中的
    // 否则  就是有用户没有被选中
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        // alert('全选');
        // 全选按钮添加选中
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
        // alert('不全选');  
    }

    // 如果选中的复选框的数量大于0  就说明有选中的复选框
    if (inputs.filter(':checked').length > 0) {
        // 显示批量修改按钮
        deleteMany.show();
    } else {
        // 隐藏批量删除按钮
        deleteMany.hide();
    }
})

// 为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    // 获取选中的用户
    var checkedUser = $('#userBox').find('input').filter(':checked');
    // 循环复选框  从复选框元素的身上获取data-id属性值
    checkedUser.each(function(index, element) {
        // element是原生的js需要使用$(element)将他转换成jquery对象
        ids.push($(element).attr('data-id'));
    });
    // console.log(ids);

    if (confirm('您真的要进行批量删除操作么？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    }


    // 数组下面有一个方法join()可以把数组中的某一个元素用某一个符号进行连接，连接后的结果就是字符串

})