//
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var showslist = [];
var id = {
  "Blindspot":62710,
  "Gotham":60708,
  "Lucifer":63174,
  "Marvel's Agents of S.H.I.E.L.D.":1403,
  "The Flash (2014)":60735,
  "Arrow":1412,
  "Grimm":39351
}
var colors = {
  62710:"#C0E3FC",
  60708:"#979EB0",
  63174:"#662E2E",
  1403:"#CC3300",
  60735:"#FF9900",
  1412:"#0D8133",
  39351:"#3B526B"
}
var links = {
  62710:["76651-sid-2",0],
  60708:["77288-sid-2",0],
  63174:["76648-sid-2",1],
  1403:["77592-sid-5",0],
  60735:["77647-sid-2",1],
  1412:["77783-sid-3",1],
  39351:["78190-sid-3",0]
}
var backdropImg = {};
var swiper;

//https://api.themoviedb.org/3/movie/550?api_key=49034eafe4dfea62ac075ba815f5bf18


$(window).unload(function() {
    window.location.reload(true);
});

$(document).ready(function(){

  for (var i=0;i<7;i++) {
       showslist[i] = [];
       showslist[i][1] = [];
  }

  function set_posterImage(showid, k) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://api.themoviedb.org/3/tv/'+showid+'?api_key=49034eafe4dfea62ac075ba815f5bf18');
    request.setRequestHeader('Accept','application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        var data = jQuery.parseJSON(this.responseText);
        //Get Backdrop_Path
        backdropImg[showid] = '#1A1A1A url(https://image.tmdb.org/t/p/w780'+ data.backdrop_path + ') center / cover';

        //Get Poster_Path
        $('#slide'+k+' .demo-card-image[data-id='+showid+'] .demo-card-image-background').css('background','#1A1A1A url(https://image.tmdb.org/t/p/w780'+ data.poster_path + ') 0px 0px / cover');

        //Set Colors
        $('#slide'+k+' .demo-card-image[data-id='+showid+'] .mdl-card__title').css('background-color',colors[showid]);
        $('#slide'+k+' .demo-card-image[data-id='+showid+'] hr').css('border','solid 2px '+colors[showid]);
        $('#slide'+k+' .demo-card-image[data-id='+showid+'] > .mdl-card__actions').css('border-top','solid 4px '+colors[showid]);
        // $('#slide'+k+' .demo-card-image').attr('data-id', showid);
      }
    };
    request.send();
  };


  $(function(){
      url = 'https://episodecalendar.com/rss_feed/big.head.cool@gmail.com';
      $.ajax({
        type: "GET",
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=1000&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        error: function(){
            alert('Unable to load feed, Incorrect path or invalid feed');
        },
        success: function(xml){
            values = xml.responseData.feed.entries;
            console.log(values);
            for (var k = 0; k < 7; k++){
              var showdate = values[k]["title"].split(', ')[1].split(' ')[1] + " " + values[k]["title"].split(', ')[1].split(' ')[0];
              showslist[k][0] = showdate;

              var shows_nm = values[k]["contentSnippet"].split(/\([0-9]x[0-9]{1,}\)/g);
              var shows_ep = values[k]["contentSnippet"].match(/\([0-9]x[0-9]{1,}\)/g);
              done = false;

              for(var i = 0; i < shows_nm.length-1; i++){
                shows_nm[i];
                shows_ep[i].slice(1,-1);

                var showname = shows_nm[i].split(' - ')[0];
                var title = shows_nm[i].split(' - ')[1].trim();
                var season = shows_ep[i].slice(1,-1).split('x')[0];
                var episode = shows_ep[i].slice(1,-1).split('x')[1];
                if(showname.length > 16) {
                  var shorten = showname.substring(0,16)+"...";
                  showslist[k][1][i] = [shorten, title, season, episode];
                }
                else showslist[k][1][i] = [showname, title, season, episode];

                for(var j = 1; j < 8; j++){
                  var d = new Date();
                  d.setDate(d.getDate()-(7-j));
                  var newDate = updateDate(d).split(', ')[0].split('day ')[1].split(' ')[0] + " " + ('0' + updateDate(d).split(', ')[0].split('day ')[1].split(' ')[1]).slice(-2);
                  console.log(newDate+'-'+showslist[k][0]);
                  if(newDate == showslist[k][0]) {
                    //Apply Card Info
                    $('#slide'+ j).append(
                      '<div class="demo-card-image mdl-card mdl-shadow--2dp" data-id="'+id[showname]+'"><div class="mdl-card__title mdl-card--expand data-adaptive-background data-ab-css-background"><div class="demo-card-image-background"></div><i class="play material-icons">ondemand_video</i></div><div class="mdl-card__actions"><p class="demo-card-image__showname">'+showslist[k][1][i][0]+'</p><hr><p class="demo-card-image__episode">Season '+showslist[k][1][i][2]+' - Episode '+showslist[k][1][i][3]+'</p><p class="demo-card-image__episodename">"'+showslist[k][1][i][1]+'"</p></div></div>'
                    );
                    $('#slide'+ j + ' .demo-card-image').attr('data-episode', showslist[k][1][i][3]);
                    //Apply Images
                    set_posterImage(id[showname], j);
                  }
                }
              }
            }
            console.log(showslist);
            for(var j = 1; j < 8; j++){
              if($('#slide'+ j).find('.demo-card-image').length == 0) {
                $('#slide'+ j).append(
                  '<div class="demo-card-image mdl-card mdl-shadow--2dp noshow"><i class="face material-icons">mood_bad</i><p class="demo-card-image__opps">Opps!</p><p class="demo-card-image__noshow">No TV shows today...</p><hr></div>'
                );
              }
            }
            swiper = new Swiper('.swiper-container', {
                  initialSlide: 5,
                  pagination: '.swiper-pagination',
                  slidesPerView: 'auto',
                  centeredSlides: true,
                  paginationClickable: true,
                  spaceBetween: 30,
                  nextButton: '.swiper-button-next',
                  prevButton: '.swiper-button-prev',
                  onInit: function(){
                    $('body').css('opacity',1)
                  }
            });

            swiper.on('slideChangeEnd', function () {
              var currentid = $('#slide'+(swiper.activeIndex+1)+' .demo-card-image').attr('data-id');
              console.log(currentid);
              if(currentid == null) $('#background').css('background',"#1A1A1A url('../images/backdrop.jpg') center / cover");
              else $('#background').css('background',backdropImg[currentid]);
            });

            $('.play').click(function(){
              var i = links[$(this).parent().parent().attr('data-id')][0];
              var e = parseInt($(this).parent().parent().attr('data-episode'))+parseInt(links[$(this).parent().parent().attr('data-id')][1]);
              console.log(i+" "+e);
              $('#video').show();
              var showurl = "http://www.123kubo.com/vod-play-id-"+i+"-pid-"+e+".html";
              $('#innerdiv').attr('src',showurl);
            });
            $('.exit').click(function(){
              $('#video').hide();
              $('#innerdiv').attr('src',"");
            });
        }
    });
  });

  function updateClock() {
    var d = new Date();
    $('.date').text(updateDate(d));

    var hours = d.getHours();
    var minutes = d.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var time = hours + ':' + minutes + ' ';
    $('.time').text(time);
    $('.ampm').text(ampm);
    setTimeout(updateClock, 1000);
  };
  updateClock();

  function updateDate(d){
    var curr_date = d.getDate();
    var curr_month = monthNames[d.getMonth()];
    var curr_year = d.getFullYear();
    var curr_day = weekNames[d.getDay()];
    var date = curr_day + " " + curr_month + " " + curr_date + ", " + curr_year;
    return date;
  }

  function putDates(d) {
    for(var i = 1; i < 5; i++){
      d.setDate(d.getDate()-(6-i));
      $('#slide'+i+' .demo-card-image__date').text(
        updateDate(d).split(', ')[0]
      );
      d.setDate(d.getDate()+(6-i));
    }
  }
  var dates = new Date();
  putDates(dates);
});
