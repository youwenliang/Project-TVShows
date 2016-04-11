var monthNames=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],showslist=[],id={Blindspot:62710,Gotham:60708,Lucifer:63174,"Marvel's Agents of S.H.I.E.L.D.":1403,"The Flash (2014)":60735,Arrow:1412,Grimm:39351},colors={62710:"#C0E3FC",60708:"#979EB0",63174:"#662E2E",1403:"#CC3300",60735:"#FF9900",1412:"#0D8133",39351:"#3B526B"},links={62710:["76651-sid-2",0],60708:["77288-sid-2",0],63174:["76648-sid-2",1],1403:["77592-sid-5",0],60735:["77647-sid-2",1],1412:["77783-sid-3",1],39351:["78190-sid-3",0]},backdropImg={},swiper;$(window).unload(function(){window.location.reload(!0)}),$(document).ready(function(){function a(a,b){var c=new XMLHttpRequest;c.open("GET","http://api.themoviedb.org/3/tv/"+a+"?api_key=49034eafe4dfea62ac075ba815f5bf18"),c.setRequestHeader("Accept","application/json"),c.onreadystatechange=function(){if(4===this.readyState){var c=jQuery.parseJSON(this.responseText);backdropImg[a]="#1A1A1A url(https://image.tmdb.org/t/p/w780"+c.backdrop_path+") center / cover",$("#slide"+b+" .demo-card-image[data-id="+a+"] .demo-card-image-background").css("background","#1A1A1A url(https://image.tmdb.org/t/p/w780"+c.poster_path+") 0px 0px / cover"),$("#slide"+b+" .demo-card-image[data-id="+a+"] .mdl-card__title").css("background-color",colors[a]),$("#slide"+b+" .demo-card-image[data-id="+a+"] hr").css("border","solid 2px "+colors[a]),$("#slide"+b+" .demo-card-image[data-id="+a+"] > .mdl-card__actions").css("border-top","solid 4px "+colors[a])}},c.send()}function b(){var a=new Date;$(".date").text(c(a));var d=a.getHours(),e=a.getMinutes(),f=d>=12?"PM":"AM";d%=12,d=d?d:12,e=10>e?"0"+e:e;var g=d+":"+e+" ";$(".time").text(g),$(".ampm").text(f),setTimeout(b,1e3)}function c(a){var b=a.getDate(),c=monthNames[a.getMonth()],d=a.getFullYear(),e=weekNames[a.getDay()],f=e+" "+c+" "+b+", "+d;return f}function d(a){for(var b=1;5>b;b++)a.setDate(a.getDate()-(6-b)),$("#slide"+b+" .demo-card-image__date").text(c(a).split(", ")[0]),a.setDate(a.getDate()+(6-b))}for(var e=0;7>e;e++)showslist[e]=[],showslist[e][1]=[];$(function(){url="https://episodecalendar.com/rss_feed/big.head.cool@gmail.com",$.ajax({type:"GET",url:document.location.protocol+"//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q="+encodeURIComponent(url),dataType:"json",error:function(){alert("Unable to load feed, Incorrect path or invalid feed")},success:function(b){values=b.responseData.feed.entries,console.log(values);for(var d=0;7>d;d++){var e=values[d].title.split(", ")[1].split(" ")[1]+" "+values[d].title.split(", ")[1].split(" ")[0];showslist[d][0]=e;var f=values[d].content.split(/\([0-9]x[0-9]{1,}\)/g),g=values[d].content.match(/\([0-9]x[0-9]{1,}\)/g);done=!1;for(var h=0;h<f.length-1;h++){f[h],g[h].slice(1,-1);var i=f[h].split("<strong>")[1].split(" - ")[0],j=f[h].split("<strong>")[1].split(" - ")[1].trim().replace("</strong>",""),k=g[h].slice(1,-1).split("x")[0],l=g[h].slice(1,-1).split("x")[1];if(i.length>16){var m=i.substring(0,16)+"...";showslist[d][1][h]=[m,j,k,l]}else showslist[d][1][h]=[i,j,k,l];for(var n=1;8>n;n++){var o=new Date;o.setDate(o.getDate()-(7-n));var p=c(o).split(", ")[0].split("day ")[1].split(" ")[0]+" "+("0"+c(o).split(", ")[0].split("day ")[1].split(" ")[1]).slice(-2);console.log(p+"-"+showslist[d][0]),p==showslist[d][0]&&($("#slide"+n).append('<div class="demo-card-image mdl-card mdl-shadow--2dp" data-id="'+id[i]+'"><div class="mdl-card__title mdl-card--expand data-adaptive-background data-ab-css-background"><div class="demo-card-image-background"></div><i class="play material-icons">ondemand_video</i></div><div class="mdl-card__actions"><p class="demo-card-image__showname">'+showslist[d][1][h][0]+'</p><hr><p class="demo-card-image__episode">Season '+showslist[d][1][h][2]+" - Episode "+showslist[d][1][h][3]+'</p><p class="demo-card-image__episodename">"'+showslist[d][1][h][1]+'"</p></div></div>'),$("#slide"+n+" .demo-card-image").attr("data-episode",showslist[d][1][h][3]),a(id[i],n))}}}console.log(showslist);for(var n=1;8>n;n++)0==$("#slide"+n).find(".demo-card-image").length&&$("#slide"+n).append('<div class="demo-card-image mdl-card mdl-shadow--2dp noshow"><i class="face material-icons">mood_bad</i><p class="demo-card-image__opps">Opps!</p><p class="demo-card-image__noshow">No TV shows today...</p><hr></div>');swiper=new Swiper(".swiper-container",{initialSlide:5,pagination:".swiper-pagination",slidesPerView:"auto",centeredSlides:!0,paginationClickable:!0,spaceBetween:30,nextButton:".swiper-button-next",prevButton:".swiper-button-prev",onInit:function(){$("body").css("opacity",1)}}),swiper.on("slideChangeEnd",function(){var a=$("#slide"+(swiper.activeIndex+1)+" .demo-card-image").attr("data-id");console.log(a),null==a?$("#background").css("background","#1A1A1A url('../images/backdrop.jpg') center / cover"):$("#background").css("background",backdropImg[a])}),$(".play").click(function(){var a=links[$(this).parent().parent().attr("data-id")][0],b=parseInt($(this).parent().parent().attr("data-episode"))+parseInt(links[$(this).parent().parent().attr("data-id")][1]);console.log(a+" "+b),$("#video").show();var c="http://www.123kubo.com/vod-play-id-"+a+"-pid-"+b+".html";$("#innerdiv").attr("src",c)}),$(".exit").click(function(){$("#video").hide(),$("#innerdiv").attr("src","")})}})}),b();var f=new Date;d(f)});