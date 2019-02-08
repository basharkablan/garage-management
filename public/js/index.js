function show1() {
    $("#page1").show();
    $("#page2").hide();
    $("#page3").hide();
    $("#page4").hide();
}
function show2() {
    $("#page1").hide();
    $("#page2").show();
    $("#page3").hide();
    $("#page4").hide();
}
function show3() {
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").show();
    $("#page4").hide();
}
function show4() {
    $("#page1").hide();
    $("#page2").hide();
    $("#page3").hide();
    $("#page4").show();
}

function nav_btn_hover_in() {
    $("#overlay").addClass("overlay");
}

function nav_btn_hover_out() {
    $("#overlay").removeClass("overlay");
}

$(document).ready(function() {
    show1();
    
    $("#nav_btn_1").hover(nav_btn_hover_in, nav_btn_hover_out);
    $("#nav_btn_2").hover(nav_btn_hover_in, nav_btn_hover_out);
    $("#nav_btn_3").hover(nav_btn_hover_in, nav_btn_hover_out);
    $("#nav_btn_4").hover(nav_btn_hover_in, nav_btn_hover_out);
});