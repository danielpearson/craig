$(document).ready(function(){formats_autosize(pagetype);});function get_domain(hostname){var m=((hostname||'')+'').match(/craigslist.[\w.]+$/);return m?m[0]:null;}
function extract_posting_id(text){var m=((text||'')+'').match(/[\d]+/);return m?m[0]:null;}
function formats_autosize(pagetype){var mode=get_format_cookie();var offerformats=0;if(mode==='auto'){mode=autodetect_format();}
if((mode==='mobile')||(mode==='tablet')){viewport=document.querySelector("meta[name=viewport]");viewport.setAttribute('content','width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;');}
else if(mode==='none'){if((navigator.userAgent.indexOf('Android')!=-1)||(navigator.userAgent.indexOf('Mobile')!=-1)){offerformats=1;}}
if(mode==='none'){mode='regular';}
if(pagetype==='homepage'){homepage_autosize(mode);}
if(pagetype==='tocs'){tocs_autosize(mode);}
if(pagetype==='posting'){posting_autosize(mode);}
if(pagetype==='post'){post_autosize(mode);}
if(pagetype==='simple'){simple_autosize(mode);}
if(pagetype==='login'){login_autosize(mode);}
if(pagetype==='interstitial'){interstitial_autosize(mode);}
if(pagetype==='sites'){sites_autosize(mode);}
if(pagetype==='account'){account_autosize(mode);}
if(offerformats&&(pagetype==='homepage')){$('body').prepend('<ul id="fmtsel">'+
'<li><b>want to try our new mobile-friendly layout?&nbsp;</b></li>'+
'<li class="fsel" id="fmtsel_mobile" title="format suitable for phones and small mobile devices">yes</li>'+
'<li class="fsel" id="fmtsel_regular">no</li>'+
'</ul>');update_format_selector('none');}
return false;}
function autodetect_format(){var mode='regular';var xdim=window.innerWidth;var ydim=window.innerHeight;if(ydim>=1440){mode='super';}
if(ydim<=800){mode='tablet';}
if(xdim<=480){mode='mobile';}
return mode;}
function get_format_cookie(){var mode='none';var C=document.cookie.split(';');for(i=0;i<C.length;i++){var c=$.trim(C[i]);if(c.indexOf('cl_fmt=')===0){mode=c.substring(7);}}
return mode;}
function issue_format_cookie(format){var date=new Date();var domain=get_domain(document.location.hostname);date.setTime(date.getTime()+(365*24*60*60*1000));document.cookie='cl_fmt='+format+
'; domain='+domain+'; expires='+
date.toGMTString()+'; path=/';window.location.href=window.location.href;}
function append_format_selector(obj){var selector='<ul id="fmtsel">'+
'<li><b>FORMAT:</b></li>'+
'<li class="fsel" id="fmtsel_mobile" title="format suitable for phones and small mobile devices">mobile</li>'+
'<li class="fsel" id="fmtsel_tablet" title="format suitable for tablets and netbooks">tablet</li>'+
'<li class="fsel" id="fmtsel_regular">regular</li>'+
'</ul>';obj.append(selector);var mode=get_format_cookie();update_format_selector(mode);}
function update_format_selector(mode){var currFmt=$('#fmtsel_'+mode);$('#fmtsel .fsel').addClass('a');currFmt.removeClass('a');$('#fmtsel .fsel.a').click(function(){var myFmt=$(this).attr('id').replace('fmtsel_','');issue_format_cookie(myFmt);});$('#fmtsel_'+mode).unbind('click');}
function homepage_autosize(mode){if(mode==='mobile'){homepage_size_mobile();}
if(mode==='tablet'){homepage_size_mobile();homepage_size_tablet();}
append_format_selector($('body'));}
function build_sorted_cat_list(obj,catabbr,catname){$('#'+catabbr).appendTo('body');var catlist=[];$('#'+catabbr+'0>li>a,#'+catabbr+'1>li>a').each(function(){catlist.push($(this).html());});catlist=catlist.sort();var excludePattern=/^\[/;for(var i=0;i<catlist.length;i++){$('#'+catabbr+'0>li,#'+catabbr+'1>li').filter(function(){if($(this).find('a').html().match(excludePattern)){return false;}
return!($(this).find('a').html()===catlist[i]);}).prependTo('#'+catabbr+'0');}
$('#'+catabbr+' .cats').hide();$('#'+catabbr+'0>li').first().clone().prependTo('#'+catabbr+'0');var allHref=$('#'+catabbr+' .ban a').attr('href');$('#'+catabbr+'0>li>a').first().attr('href',allHref);$('#'+catabbr+'0>li>a').first().html('all '+catname);$('#'+catabbr+' .ban a').click(function(e){e.preventDefault();this.href='#';$('#'+catabbr+' .cats').slideToggle();});}
function homepage_size_mobile(){$('body').removeClass('tablet').addClass('mobile');$('#topban').appendTo('body');$('.sublinks').appendTo('body');$('#rightbar').appendTo('body');var areaText=$('#topban h2').first().html();$('#topban a').first().hide();$('#topban h2').first().html('<a href="#">'+areaText+'</a>');$('#topban h2 a').prepend('CL > ');$('#topban h2 a').first().click(function(e){$(this).css('background','#eee');e.preventDefault();$('#rightbar').slideToggle();$('.sublinks').slideToggle();});$('#search').appendTo('body');$('#search>div:first').hide();$('#postlks').appendTo('body');build_sorted_cat_list($(this),'sss','for sale');build_sorted_cat_list($(this),'jjj','jobs');build_sorted_cat_list($(this),'hhh','housing');build_sorted_cat_list($(this),'ppp','personals');$('#ppp0>li').first().remove();$('#ppp .ban').html('<a href="#">personals</a>');$('#ppp .ban a').click(function(e){e.preventDefault();this.href='#';$('#ppp .cats').slideToggle();});build_sorted_cat_list($(this),'ccc','community');build_sorted_cat_list($(this),'bbb','services');build_sorted_cat_list($(this),'ggg','gigs');$('#res').appendTo('body');$('#forums').appendTo('body');$('body').append('<br>');$('.cal').appendTo('body');$('.cal').before('<h4 class="ban" id="calban"><a href="#">'+
$('#calttl a').html()+'</a></h4>');$('#calban').click(function(e){e.preventDefault();$('.cal').slideToggle();});$('#leftlinks').appendTo('body');$('body').append('<br><hr>');if($('.container').html()===null){$('#copy').appendTo('body');}
return false;}
function homepage_size_tablet(){$('body').addClass('mobile tablet');$('body').append('<div id="hpleft"></div><br>');$('body').children().not('#hpleft').appendTo('#hpleft');$('body').prepend('<div id="hpright"><br><img src="http://www.craigslist.org/favicon.ico"><br>CL<br><img src="http://www.craigslist.org/favicon.ico"><br><br></div>');}
function tocs_autosize(mode){if(mode==='mobile'){tocs_autosize_init();tocs_size_mobile();append_format_selector($('body'));return false;}
if(mode==='tablet'){tocs_autosize_init();tocs_size_mobile();tocs_size_tablet();return false;}
$('.itemcg').each(function(){$(this).click(function(e){e.preventDefault();var catAbbr=$(this).attr('title');flipCatAndSubmit(catAbbr);});});}
function tocs_autosize_init(){$('body').children().hide();return false;}
function tocs_size_mobile(){$(window).bind('orientationchange',function(){$('body').css('width','100%');});showImgs();build_tocs_searchform();build_tocs_messages();build_tocs_results();$('#copy').appendTo('body');$('#copy').css({'font-size':'9px','width':'100%','float':'right'});$('body').children().wrapAll('<div id="todos" />');$('#todos').css({'margin':'0','padding':'0'});return false;}
function tocs_size_tablet(){$('body').append('<div id="tocsleft"></div><br>');$('body').children().not('#tocsleft').appendTo('#tocsleft');$('body').css({'overflow':'hidden','height':'100%','width':'100%','margin':'0px','padding':'0px'});$('#tocsleft').css({'border':'0px','border-right':'4px solid #888','top':'0px','float':'left','width':'40%','height':'100%','overflow':'auto'});$('body').prepend('<div id="tocsright"><br><img src="http://www.craigslist.org/favicon.ico"><br>CL<br><img src="http://www.craigslist.org/favicon.ico"><br><br></div>');$('#tocsright').css({'font-family':'sans-serif','font-size':'128px','text-align':'center','border':'0px','float':'right','top':'0px','width':'59%','height':'100%','overflow':'auto'});$('.bchead a,.bchead b').css({'font-size':'16px'});$('.searchhead').css({'position':'fixed','top':'0px','left':'0px','margin':'0px','width':'40%','border-bottom':'4px solid #888','z-index':'100'});$('#searchform').css('margin-top','20px');$('.ban:first').css({'margin-top':$('.searchhead').height()+'px'});$('.row').css({'border-top':'1px solid #fff','border-bottom':'1px solid #ddd','width':'100%'});$('.row').unbind('click');$('.row').bind('click',function(event){event.preventDefault();$('#tocsright').css({'font-family':'sans-serif','font-size':'14px','text-align':'left'});var clickHref=$(this).find('a').attr('href');$('#tocsright').load(clickHref,function(){$.getScript('http://www.craigslist.org/js/postings.js',function(){initFlag(extract_posting_id($('.postinginfo').html()));});$('#tocsright').prepend('<a style="float:right;font-size:24px;text-decoration:none;" href="'+clickHref+'">[+]</a>');});$('.row').css({'border-top':'1px solid #fff','border-bottom':'1px solid #ddd','background':'#fff'});$(this).css({'border-top':'1px solid #000','border-bottom':'1px solid #000','background':'#eee'});});$('.row').each(function(){$(this).find('.itempp').prependTo($(this).find('.itempn'));});$('.itempp').css({'position':'relative','margin':'2px','text-align':'right','background':'#fff','color':'#080','border':'1px solid #080','z-index':'1','float':'right'});$(window).bind('orientationchange',function(){var new_xdim=window.innerWidth;var new_ydim=window.innerHeight;if(new_xdim>new_ydim){tocs_orientation_flip_portrait();}else{tocs_orientation_flip_landscape();}});$(window).scroll(function(){$(window).scrollTop('#tocsright');});var initial_xdim=window.innerWidth;var initial_ydim=window.innerHeight;if(initial_xdim<initial_ydim){tocs_orientation_flip_portrait();}}
function tocs_orientation_flip_portrait(){$('#tocsright').appendTo('body');$('#tocsleft').css({'width':'100%','height':'40%','border-bottom':'4px solid #888'});$('#tocsright').css({'width':'100%','height':'59%'});$('.searchhead').css({'width':'100%'});}
function tocs_orientation_flip_landscape(){$('#tocsleft').appendTo('body');$('#tocsleft').css({'width':'40%','height':'100%','border-bottom':'0px'});$('#tocsright').css({'width':'59%','height':'100%'});$('.searchhead').css({'width':'40%'});}
function reformat_posting_images(obj){var imagesDiv=obj.find('.imagehole');var mainImg=obj.find('#iwi');if(mainImg.length){if(obj.find('#thumbs').html()===null){obj.find('.iw').css('width','100%');obj.find('#ci').css({'width':'100%','border':'0px','margin':'0px'});var imgHref=mainImg.attr('src');imagesDiv.append('<a href="'+imgHref+'"><img class="postingimg" width="100%" src="'+imgHref+'"></a><br>');mainImg.remove();}else{obj.find('.iw').hide();obj.find('#thumbs a').each(function(){var imgHref=$(this).attr('href');imagesDiv.append('<a href="'+imgHref+'"><img class="postingimg" width="100%" src="'+imgHref+'"></a><br>');});}}
obj.find('#userbody img').css('width','100%');}
function build_tocs_searchform(){$('body').prepend('<div class="searchhead"></div>');$('body').css('margin','0');$('.searchhead').css({'background-color':'#fff','width':'100%','margin-top':'4px'});$('.bchead>a').css({'width':'100%','background-color':'#fff'});$('.bchead>span').remove();$('.bchead').css('display','inline');$('.bchead>#satabs').hide();$('.bchead').appendTo('.searchhead');$('.bchead').css({'font-size':'10px','background-color':'#fff','border':'0px','width':'100%'});$('.bchead a,.bchead b').css('font-size','16px');$('#searchform').appendTo('.searchhead');$('#searchform').css({'width':'100%','margin-top':'10px','background-color':'#fff'});$('#query').prependTo('#searchfieldset');$('#searchfieldset').css({'border-left':'0px','border-right':'0px','margin':'0px'});$('#searchfieldset').prepend('<a id="expandosearch" href="#">[+]</a>');$('#searchfieldset').append('<input id="topsubmit" type="submit" value="&gt;">');$('#searchlegend').prependTo('#searchfieldset');$('#searchfieldset>table').appendTo('#searchfieldset');$('#expandosearch').css({'text-decoration':'none','font-size':'20px'});$('#expandosearch').bind('click',function(event){event.preventDefault();if($('#expandosearch').html()==='[+]'){$('#expandosearch').html('[&ndash;]');}else{$('#expandosearch').html('[+]');}
$('#searchtable').slideToggle();});$('#searchlegend').css('font-size','10px');$('#searchlegend a').css('font-size','14px');$('#searchtable').css({'width':'100%','display':'none','font-size':'12px'});$('#searchtable td').first().hide();$('#searchtable tr td').each(function(){var tr=$('<tr></tr>').insertAfter($(this));tr.append(this);});$('#searchtable').append('<tr><td id="searchtd" width="100%"></td></tr>');$('#searchtable tr td').css('text-align','left');$('#searchtable :submit').appendTo('#searchtd');$('#searchtable :submit').css('float','right');$('#searchtable input,select').css('font-size','12px');if($('#satabs').html()!=null){if($('#satabs b').html()===null){$('#searchtable tbody').prepend('<tr><td id="#sasel"><a href="#">'+
$('#satabs a:first').html()+'</a>:<div id="#saselli">'+
$('#satabs').html()+'</div></td></tr>');$('#searchtable>tbody>tr>td>div>a:first').hide();}else{$('#searchtable tbody').prepend('<tr><td id="#sasel"><a href="#">'+
$('#satabs b').html()+'</a>:<div id="#saselli">'+
$('#satabs').html()+'</div></td></tr>');$('#searchtable>tbody>tr>td>div>b').hide();}}
$('#searchtable>tbody>tr>td').css('font-size','16px');$('#searchtable>tbody>tr>td>div>a').css('font-size','16px');$('#searchtable>tbody>tr>td>div').hide();$('#searchtable>tbody>tr>td>div>a').after('<br>');$('#searchtable>tbody>tr>td>a').click(function(e){e.preventDefault();$('#searchtable>tbody>tr>td>div').slideToggle();});$('#query').css('display','inline');$('#query').prepend('<div id="searchquery">');$('#query').append('</div>');$('#query').attr('size','20');$('#query').css({'width':'80%','font-size':'20px'});}
function build_tocs_messages(){if($('#messagestable #messages').html()!=''){if($('.container').html()===null){$('body').append('<h4 id="warns">warnings, notices, useful links</h4>');}
$('#warns').css({'font-size':'10px','color':'#f00','padding':'1','margin':'2','background-color':'#ffc','cursor':'pointer'});$('#warns').click(function(e){e.preventDefault();$('#messagestable').slideToggle();});$('.modetabrow').appendTo('body');$('#messagestable').appendTo('body');$('#messagestable td span').append('<br>');$('#messagestable td span a').css('white-space','normal');$('#messages').css('text-align','left');}}
function expand_row_load_posting(obj){var clickHref=obj.find('a').attr('href');obj.children().filter('a').attr('href','#');obj.children().filter('a').click(function(e){e.preventDefault();});if(obj.next('div').css('display')!='none'){obj.next('div').slideToggle();obj.children().css('white-space','nowrap');obj.css({'background':'#fff','overflow':'hidden','padding':'0px','border':'0px','border':'2px solid #fff','border-bottom':'1px solid #eee'});obj.find('.itempp').css('left','0px');obj.find('.itemcg').css('padding-bottom','5px');return false;}
else{obj.next('div').slideToggle();obj.css('height',null);obj.css({'overflow':'visible','background':'#eee','border':'2px solid #80f','border-bottom':'1px solid #80f','padding':'2px'});obj.children().css('white-space','normal');obj.find('.itempp').css('left','4px');obj.find('.itemcg').css('padding-bottom','0px');if(obj.next('div').css('background-color')!='rgb(238, 238, 238)'){return false;}}
obj.next('div').load(clickHref+' .tsb,.dateReplyBar,#flags,#userbody,.postinginfo',function(){$.getScript('http://www.craigslist.org/js/postings.js',function(){pID=extract_posting_id($('.postinginfo').html());initFlag(extract_posting_id($('.postinginfo').html()));});$(this).find('.dateReplyBar').children('div,sup,#ef').remove();$(this).css('background','#ddd');$(this).children().hide();$(this).find('.dateReplyBar').before('<a href="'+clickHref+'" class="fullscrbtn">[+]</a>&nbsp;&nbsp;');$(this).find('.dateReplyBar').before('<a href="#" class="closebtn">[&ndash;]&nbsp;</a>');$(this).find('.closebtn').click(function(e){e.preventDefault();expand_row_load_posting($(this).parent().prev());return false;});$('.closebtn').css({'float':'right','text-decoration':'none','font-size':'20px'});$('.fullscrbtn').css({'float':'right','text-decoration':'none','font-size':'20px'});$(this).find('.postinginfo').first().appendTo('.dateReplyBar');$(this).find('.postinginfo').css('display','inline');$(this).find('.dateReplyBar').css({'display':'inline','font-size':'10px'});$(this).find('dateReplyBar').after('<br>');$(this).find('dateReplyBar').css({'display':'block','font-size':'10px'});$(this).find('dateReplyBar a').css({'font-size':'12px','align':'center'});$(this).find('dateReplyBar').after('<hr>');$(this).find('#userbody').css({'width':'100%','max-width':'100%','display':'inline','font-size':'14px'});$(this).append('<div width="100%" class="imagehole"></div>');$(this).find('#userbody .blurbs').appendTo($(this));$(this).find('.blurbs').css('font-size','10px');reformat_posting_images($(this));$(this).find('#flags').appendTo($(this));$(this).find('#flags').css({'display':'inline','font-size':'10px','margin-top':'2px','padding-top':'0px','border':'2px solid #80f','border-top':'0px','background':'#ddd'});$(this).find('#flags .fl').css('font-size','12px');});}
function build_tocs_results(){$('#nextpage').appendTo('body');if($('.container .row').html()){$('.container').appendTo('body');return;}
$('.row,.ban').appendTo('body');$('.ban').css({'padding':'0','margin-bottom':'8px','font-size':'10px'});$('.ban>span>a>b').css('font-size','18px');$('.row').css({'background-color':'#fff','margin':'0','margin-top':'4px','font-size':'10px','white-space':'normal','min-height':'4.4em','overflow':'hidden','border':'2px solid #fff','border-bottom':'1px solid #eee','white-space':'nowrap','vertical-align':'text-top','cursor':'pointer'});$('.row>a').css('font-size','22px');$('.row a').css({'text-decoration':'none'});$('.row font').css('font-size','10px');$('.row br.c').hide();$('.row .itempp').css({'z-index':'100','background':'#080','color':'#fff','font-weight':'bold','font-family':'sans-serif','border':'1px solid #fff','padding':'1px','margin-top':'3em','border-radius':'6px'});$('.row').each(function(){$(this).find('.i img').prependTo($(this));$(this).find('.itemsep').hide();$(this).find('.itemsep').last().html('<br>');$(this).find('.itemsep').last().css('display','inline');$(this).find('.itemcg').prependTo($(this).find('.itempn'));if($(this).find('.i').attr('id')===''){$(this).find('.i').css('display','inline');}else{$(this).find('.i').hide();}
if($(this).find('.itempp').html()===''){$(this).find('.itempp').hide();}else{$(this).find('.itempp').prependTo($(this));$(this).find('.itempp').css({'position':'absolute','left':'0px'});}});$('.row .i').css({'background':'#eee','height':'4.4em','width':'4.4em','margin-right':'1px','margin-top':'1px'});$('.row img').css({'float':'left','width':null,'height':'4.4em','vertical-align':'top','margin-right':'1px'});$('.row .itemdate').hide();$('.row .itemcg a').css('padding-bottom','5px');$('.row').click(function(e){e.preventDefault();expand_row_load_posting($(this));});$('.row').after('<div class="loadposting"><div class="pleasewait"><br><img src="http://www.craigslist.org/favicon.ico"><br>CL<br><img src="http://www.craigslist.org/favicon.ico"><br><br></div></div>');$('.loadposting').css({'display':'none','background':'#eee','border':'2px solid #80f','border-top':'0px','padding':'2px','overflow':'auto'});$('.pleasewait').css({'color':'#80f','font-size':'96px','width':'100%','text-align':'center'});$('#nextpage').clone().appendTo('body');$('#nextpage').css({'float':'right','margin-bottom':'2'});$('#nextpage a').css('text-decoration','none');$('#nextpage font').css('font-size','12px');}
function posting_autosize(mode){if(mode==='mobile'){posting_size_mobile();append_format_selector($('body'));}
if(mode==='tablet'){posting_size_tablet();}}
function posting_size_mobile(){$('body').removeClass('tablet').addClass('mobile');$('.iw').after('<br clear="all">');$('.cltags').before($('#attributes'));}
function posting_size_tablet(){$('body').removeClass('mobile').addClass('tablet');}
function post_autosize(mode){if(mode==='mobile'){post_autosize_init();post_size_mobile();}
append_format_selector($('body'));}
function post_autosize_init(){return false;}
function post_size_mobile(){$('body').children().wrapAll('<div class="todos" />');$('.todos').css('width','100%');$('table#header').css({'font-size':'10px','background':'#eee','padding':'3px','font-family':'sans-serif','border-bottom':'2px #ccc solid','margin-bottom':'1em'});$('table#header').append('<tr></tr>');$('table#header a').css('font-size','14px');$('table#header td:last').appendTo('table#header tr:last');$('table#header td:last').css('text-align','center');$('table#header td:last a').css('white-space','nowrap');$('table#header td:last br').hide();$('table#header font').css('font-size','12px');$('table#header .highlight').css('float','none');$('table#header .highlight').children().css({'white-space':'normal','font-size':'8px'});$('hr').hide();$('.highlight').css({'font-size':'10px','margin':'0px','padding':'0px','width':'100%'});$('.highlight>ol').css({'background':'#ffc','margin':'0px'});$('.managestatus').css({'width':'100%','margin':'0px','padding':'0px'});$('.managestatus table').css({'width':'100%','font-size':'12px'});$('.managestatus a').css('font-size','14px');$('.managestatus a').prepend('<br>');$('.managestatus form').prepend('<br>');$('.managestatus table td').wrap('<tr />');$('blockquote').css({'margin':'8px','font-size':'20px'});$('blockquote>i').css({'margin-left':'20px','font-size':'10px'});$('blockquote>i').each(function(){$(this).find('sup').each(function(){$(this).replaceWith($(this).html());});$(this).prev('label').append('<br>');$(this).appendTo($(this).prev('label'));});if($('form table').attr('summary')==='neighborhood picker'){$('form table td:last').prependTo('form table td blockquote');}
if($('form table').attr('summary')==='flava picka'){$('form table td fieldset').last().appendTo($('form table td:first'));$('form table td:first').append('<br>');$('form table td:last').children().appendTo($('form table td:first'));}
if($('textarea.toutext').attr('cols')==='80'){$('textarea').attr('cols',null);$('textarea').css('width','100%');$('table form').append('<br><br>');$('table form').appendTo('body');}
if($('form').first().attr('id')==='postingForm'){$('input[size=80]').css('width','100%');$('input[size=80]').attr('size',null);$('input[size=30]').css('width','100%');$('input[size=30]').attr('size',null);$('input[size=20]').css('width','100%');$('input[size=20]').attr('size',null);}
$('.bchead').hide();$('div.row').css('width','100%');$('label.req').css('font-size','10px');$('#userbody').append('<div width="100%" class="imagehole"></div>');$('.iw').hide();var imagesDiv=$('.imagehole');$('.tn a').each(function(){var imgHref=$(this).attr('href');imagesDiv.append('<a href="'+imgHref+'"><img class="postingimg" width="100%" src="'+imgHref+'"></a><br>');});$('#userbody img').css('width','100%');$('#leaflet').css('height','250px');return false;}
function simple_autosize(mode){if(mode==='mobile'){simple_size_mobile();}
append_format_selector($('body'));}
function simple_size_mobile(){$('body').addClass('mobile');if($('table:first').css('width')==='706px'){$('table:first>tbody>tr>td').appendTo('table:first');$('table:first>td').wrap('<tr />');$('input[size=60]').css('width','100%');$('input[size=60]').attr('size',null);$('table').css('width','100%');$('table strong').css('font-size','12px');$('table a').css('font-size','12px');}
if($('table:first').css('width')==='500px'){$('table:first>tbody>tr>td:even').appendTo('table:first');$('table:first>tbody>tr>td:odd').appendTo('table:first');$('table:first>td').wrap('<tr />');$('table').css({'width':'100%','font-size':'10px'});$('table strong').hide();$('table a').css('font-size','12px');}
return false;}
function login_autosize(mode){if(mode==='mobile'){$('body').addClass('mobile');}
append_format_selector($('body'));}
function interstitial_autosize(mode){if(mode==='mobile'){interstitial_autosize_init();interstitial_size_mobile();}
append_format_selector($('body'));}
function interstitial_autosize_init(){return false;}
function interstitial_size_mobile(){$('h3').css('font-size','10px');$('h3 a').css('font-size','12px');$('blockquote').css({'width':'100%','margin':'2px','font-size':'10px'});$('blockquote a').css('font-size','14px');$('blockquote>blockquote').css({'width':'100%','white-space':'normal'});$('blockquote>blockquote>span>a').css('font-size','20px');$('blockquote>blockquote>span').css('width','100%');$('blockquote>blockquote').after('<br>');$('blockquote>blockquote>a:first').before('<br>');$('blockquote>blockquote>a').after(' ');$('blockquote>blockquote>small>a').after(' ');return false;}
function sites_autosize(mode){if(mode==='mobile'){sites_size_mobile();}
append_format_selector($('body'));}
function sites_size_mobile(){$('body').addClass('mobile')
.prepend('<div class="topban"><a href="#">CL&nbsp;&gt;</a></div><br>');$('.colleft').each(function(){$(this).find('.box_2').children().appendTo($(this).find('.box_1'));$(this).find('.box_3').children().appendTo($(this).find('.box_1'));$(this).find('.box_4').children().appendTo($(this).find('.box_1'));});$('.colmask').each(function(){$(this).find('.box_1').appendTo($(this));$(this).find('.continent_header').appendTo('body');$(this).appendTo('body');});$('.state_delimiter').click(function(e){e.preventDefault();var menu=$(this).next('ul');menu.slideToggle();$(this).parent().find('ul:visible').not(menu).slideUp();});$('.continent_header').click(function(e){var menu=$(this).next('.colmask');menu.slideToggle();$(this).parent().find('.colmask:visible').not(menu).slideUp();});$('.footer').appendTo('body');$('.footer>span:first').after('<hr>');return false;}
function account_autosize(mode){if(mode==='mobile'){account_size_mobile();}
append_format_selector($('body'));}
function account_size_mobile(){$('body').removeClass('toc').addClass('mobile');$('.bchead').appendTo('body');$('.bchead>#ef>a:first').appendTo('.bchead>#satabs');$('.bchead>#satabs').append(' ');$('.bchead>#ef>a:first').appendTo('.bchead>#satabs');$('.bchead>#ef').remove();$('.bchead>#satabs').appendTo('body');$('blockquote>br').remove();$('blockquote').children().appendTo('body');$('form').each(function(){$(this).find('table td').children().appendTo($(this).find('table td:first'));});$('select').before('<br>');$('#paginator>table>tbody>tr').first().remove();$('#paginator>table>tbody>tr').each(function(){var newDiv=$('<div class="postingrow"></div>');var posttitle=$(this).find('.title');newDiv.append(posttitle.html())
.append($(this).find('.areacat').html())
.append('&bull;')
.append($(this).find('.dates').html())
.append('<br>')
.append($(this).find('.status').html());newDiv.css({'background':posttitle.css('background'),'border':posttitle.css('border'),'font-size':posttitle.css('font-size'),'font-family':posttitle.css('font-family')});$('#paginator').append(newDiv);newDiv.click(function(e){e.preventDefault;window.location.href=posttitle.find('a').attr('href');});});$('#paginator>table').remove();$('#paginator>.postingrow').appendTo('body');$('#paginator').clone().appendTo('body');$('p>em').appendTo('body');$('#footer').appendTo('body');return false;}