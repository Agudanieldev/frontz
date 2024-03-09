var times = [8568,9751,3120, 4442, 5224, 7510, 8636, 16002, 17222];
var names = ['Tyler Graves','Howard McCain','Rudy Henderson','Chris Clayman','John Hendrick', 'Rolland Moore','Sean Johnson','Christiana Estein','David Allen','Kathy Davis','Susan Dwayne','Alice Davis','Bryan Tallman']
var words = ['INVESTMENT','WITHDRAWAL','INVESTMENT','WITHDRAWAL','INVESTMENT','WITHDRAWAL','INVESTMENT','WITHDRAWAL','INVESTMENT'];
var countries = ['eng','us','eng_flage','fn','rus_flage','chn_flage','frn_flage'];
var themeInterval = setInterval('notification()', time());

function time() {
    return   times[parseInt(Math.random()*7)] + 8000;
}
function notification() {
    spop({
        template: '<div class="sale_notification d-flex align-items-center"><img src="assets/images/eng_flage.png" alt="" /> <div class="notification_inner"> <h3>$'+Math.floor(Math.random()*6000 + 300)+'</h3><p>'+' '+words[Math.floor(Math.random()*7)]+' by <br><h3>'+names[Math.floor(Math.random()*7)]+'</p></div></div>',
        group: 'submit-satus',
		style     : 'nav-fixed',// error or success
        position  : 'bottom-left',
        autoclose: 5000,
        icon: false
    });
    clearInterval(themeInterval);
    themeInterval = setInterval('notification()', time());
}