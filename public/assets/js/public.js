// 数据展示页面的公共文件
// 处理日期的时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
// 向服务器发送请求  索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random/',
    success: function (response) {
        // console.log(response);
        var randomTpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <p class="title">{{$value.title}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
        </li>
        {{/each}}
      `;
        var html = template.render(randomTpl, { data: response });
        // console.log(html);
        $('#randomBox').html(html);
    }
})


// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    // 获取浏览器后面的查询参数
    //substr() 截取字符串不需要？
    //split()将字符串按照某一个分隔符进行分割
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        // console.log(paramsAry[i].split('='));
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }

    }
    return -1;
}


// 向服务器端发送请求  索要最新评论数据
$.ajax({
    type: 'get',
    url: '/comments/lasted/',
    success: function (response) {
        // console.log(response);
        var commentTpl = `
        {{each data}}
        <li>
            <a href="javascript:;">
            <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
            </div>
            <div class="txt">
                <p>
                <span>{{$value.author.nickName}}</span>{{$imports.formateData($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
            </div>
            </a>
        </li>
      {{/each}}
        `;
        var html = template.render(commentTpl, { data: response })
        // console.log(html);
        $('#commentBox').html(html);
    }
})

// 先服务器端发送请求数据 索要文章列表数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        // console.log(response);
        var navTpl = `
        {{each data}}
        <li>
            <a href="list.html?categoryId={{$value._id}}">
                <i class="fa {{$value.className}}"></i>{{$value.title}}
            </a> 
        </li>
        {{/each}}
        `;
        var html = template.render(navTpl, { data: response });
        $("#navBox").html(html);
        $("#topNavBox").html(html);
    }
})

// 获取搜素表单  并为其添加表单提交事件
$('.search form').on('submit', function () {
    // 获取用户在表单中输入的关键字
    var keys = $(this).find('.keys').val();
    // 跳转到搜索结果页面 并将用户搜索的关键字传递到搜索结果页面
    location.href = "/search.html?key=" + keys
    // 阻止表单默认提交行为
    return false;

})