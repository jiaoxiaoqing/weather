/*
* @Author: Administrator
* @Date:   2018-03-31 09:10:55
* @Last Modified by:   Administrator
* @Last Modified time: 2018-04-11 16:16:42
*/
// var weather;
// // 请求吕梁市天气数据
// $.ajax({
// 	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=吕梁",
// 	dataType:"jsonp",
// 	type:"get",
// 	success:function(obj){
// 		// console.log(obj);
// 		weather=obj.data.weather;
// 		// console.log(obj);
// 	}
// })

var city;
$.ajax({
    url:"https://www.toutiao.com/stream/widget/local_weather/city/",
    dataType:"jsonp",
    type:"get",
    success:function(obj){
        city=obj.data;
        renderCity(city);
        console.log(city);
    }
})
function renderCity(city){
    for ( var m in city){
        // console.log(m);
        // console.log(city[m]);
        // 创建元素
        var hotcity=document.createElement("div");
        //添加类名
        hotcity.className="hotcity";
        hotcity.innerHTML=m;
        //插入到页面中
        //获取父元素
        var hotcity_box=document.querySelector(".hotcity_box");
        hotcity_box.appendChild(hotcity);


        // 创建hotcitys_box
        var hotUl = document.createElement('ul');
        hotUl.className = 'hotcitys_box';
        hotcity_box.appendChild(hotUl);

        for (var n in city[m]){
            // console.log(n);
            var hotcitys=document.createElement("li");
            hotcitys.className="hotcitys";
            hotcitys.innerHTML=n;

            hotUl.appendChild(hotcitys);       
        }       
     }
}
// 渲染数据的函数  函数名
function updata(weather){
	// 渲染城市名称
    var city_name=document.querySelector(".city");
    city_name.innerHTML=weather.city_name;

    // 渲染当前温度
    var temperature=document.querySelector(".temperature");
    temperature.innerHTML=weather.current_temperature+"°";

    // 渲染当前天气情况
    var weather_text=document.querySelector(".weather_text");
    weather_text.innerHTML=weather.current_condition;

    // 渲染今天最高气温
    var dat_high_temperature=document.querySelector("#dat_high_temperature");
    dat_high_temperature.innerHTML=weather.dat_high_temperature;

    // 渲染今天最低气温
    var dat_low_temperature=document.querySelector("#dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature+"°";

    // 渲染今天天气情况
    var bottom_text=document.querySelector(".bottom_text");
    bottom_text.innerHTML=weather.day_condition;

    // 渲染今天icon
    var sun=document.querySelector(".sun");
    sun.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;

    // 渲染明天最高气温
    var tomorrow_high_temperature=document.querySelector("#tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;

    // 渲染明天最低气温
    var tomorrow_low_temperature=document.querySelector("#tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature+"°";

    // 渲染明天天气情况
    var tomorrow_condition=document.querySelector("#tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;

    // 渲染明天icon
    var img2=document.querySelector(".img2");
    img2.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;
    // 声明变量是字符串类型
    var str="";
    // 循坏 es6 模板字符串
    weather.hourly_forecast.forEach((item,index)=>{
        // console.log(item,index);
        str=str+`
        <div class="now">
                <h2 class="now_time">${item.hour}:00</h2>
                <div class="now_icon" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
                <h2 class="now_temp">${item.temperature}°</h2>
        </div>
        `
    })
    $(".wrap").html(str);
    // 数组类型的对象 i代表数组下标
    // weather.hourly_forecast[i] 代表数组中的每一个元素
    // for(var i in weather.hourly_forecast){
    // 	// console.log(i)
    // 	// 创建now元素
    // 	// 1、创建div
    // 	var now=document.createElement("div");
    // 	// 2、添加类名
    // 	now.className="now";
    // 	// 3、插入到页面中
    // 	// 获取父元素
    // 	var wrap=document.querySelector(".wrap");
    // 	// 将now插入到页面中
    // 	wrap.appendChild(now);
    
    // 	// 创建时间元素
    // 	var h2 =document.createElement("h2");
    // 	h2.className="now_time";
    // 	h2.innerHTML=weather.hourly_forecast[i].hour+":00";
    //     now.appendChild(h2);

    //     // 创建icon
    //     var div=document.createElement("div");
    //     div.className="now_icon";
    //     div.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`;
    //     now.appendChild(div);

    //     // 创建气温
    //     var h2=document.createElement("h2");
    //     h2.className="now_temp";
    //     h2.innerHTML=weather.hourly_forecast[i].temperature+"°";
    //     now.appendChild(h2);
    // }

     var str_recent="";
     weather.forecast_list.forEach((item,index)=>{
        console.log(item,index);
        str_recent=str_recent+`
        <div class="day">
                <div class="day_date">${item.date.slice(5, 7)}/${item.date.slice(8)}</div>
                <div class="day_weaH">${item.condition}</div>
                <div class="day_picH" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
                <div class="day_high">${item.high_temperature}°</div>
                <div class="day_low">${item.low_temperature}°</div>
                <div class="day_picL"></div>
                <div class="day_weaL">阴</div>
                <div class="day_wind">${item.wind_direction}</div>
                <div class="day_level">${item.wind_level}</div>
            </div>
        `
     })
     $(".huadong").html(str_recent);

    // for(var i in weather.forecast_list){
    //     var day=document.createElement("div");
    //     day.className="day";    
    //     var huadong=document.querySelector(".huadong");
    //     huadong.appendChild(day);
    
    //     //创建 渲染近期时期
    //     var day_date=document.createElement("div");
    //     day_date.className="day_date";
    //     day_date.innerHTML=weather.forecast_list[i].date.slice(5, 7)+"/"+weather.forecast_list[i].date.slice(8);  
    //     day.appendChild(day_date);

    //     //创建 渲染近期天气情况元素
    //     var day_weaH=document.createElement("div");
    //     day_weaH.className="day_weaH";
    //     day_weaH.innerHTML=weather.forecast_list[i].condition;
    //     day.appendChild(day_weaH);

    //     // 渲染近期icon
    //     var day_picH=document.createElement("div");
    //     day_picH.className="day_picH";
    //     day_picH.style=`background-image:url(img/${weather.forecast_list[i].weather_icon_id}.png)`;
    //     day.appendChild(day_picH);
        
    //     // 渲染近期最高气温
    //     var day_high=document.createElement("div");
    //     day_high.className="day_high";
    //     day_high.innerHTML=weather.forecast_list[i].high_temperature+"°";
    //     day.appendChild(day_high);

    //     // 渲染近期最低气温
    //     var day_low=document.createElement("div");
    //     day_low.className="day_low";
    //     day_low.innerHTML=weather.forecast_list[i].low_temperature+"°";
    //     day.appendChild(day_low);

    //     // 渲染近期风
    //     var day_wind=document.createElement("div");
    //     day_wind.className="day_wind";
    //     day_wind.innerHTML=weather.forecast_list[i].wind_direction;
    //     day.appendChild(day_wind);
        
    //     // 渲染近期风级
    //     var day_level=document.createElement("div");
    //     day_level.className="day_level";
    //     day_level.innerHTML=weather.forecast_list[i].wind_level+"级";
    //     day.appendChild(day_level);
        
    //  }
     // for ( var m in city){
     //    // console.log(m);
     //    // console.log(city[m]);
     //    // 创建元素
     //    var hotcity=document.createElement("div");
     //    //添加类名
     //    hotcity.className="hotcity";
     //    hotcity.innerHTML=m;
     //    //插入到页面中
     //    //获取父元素
     //    var hotcity_box=document.querySelector(".hotcity_box");
     //    hotcity_box.appendChild(hotcity);


     //    // 创建hotcitys_box
     //    var hotUl = document.createElement('ul');
     //    hotUl.className = 'hotcitys_box';
     //    hotcity_box.appendChild(hotUl);

     //    for (var n in city[m]){
     //        // console.log(n);
     //        var hotcitys=document.createElement("li");
     //        hotcitys.className="hotcitys";
     //        hotcitys.innerHTML=n;

     //        hotUl.appendChild(hotcitys);       
     //    }       
     // }
}

// 函数 请求各城市天气情况
    function AJAX(str){
        var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
        $.ajax({
            url:url1,
            dataType:"jsonp",
            type:"get",
            success:function(obj){
                // console.log(obj);
            // 获取数据
             var weather=obj.data.weather;
            // 渲染数据
            updata(weather);
            // 获取元素      改变样式  消失
            $(".location").css({"display":"none"});
            // addCless  多加一个类名
            $(".bg").addClass('block');
            }
        })
    }

// 页面加载完成后执行
    window.onload=function(){
    // updata();
    $(".hotcitys").on("click",function(){
    var cityh=this.innerHTML;
    AJAX(cityh);
    })
    $(".city").on("click",function(){
    $(".location").css({"display":"block"});
    })

    // 输入框获取焦点，按钮内容变搜索
    $("input").on("focus",function(){
    $(".search_right").html("搜索");
    })

    // 操作按钮
    var button=document.querySelector(".search_right");
    // 点击 取消 location消失 搜索 str1=="城市名称"  弹出
    button.onclick=function(){
    // 获取search_right的文本内容
    var text=button.innerText;
    console.log(text);// 取消或确定
    if(text=="取消"){
        $(".location").css({"display":"none"});
        }
        else{
        // 获取input中输入的内容
        var str1=document.querySelector("input").value;
        // 比较二级城市名
        for(var i in city){
            for(var j in city[i]){
                   if(str1==j){
                     AJAX(str1);
                     return;
                   }
                }
            }
            alert("没有该城市");
    }
  }
}