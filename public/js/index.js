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

function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    //cards = $("#accordionExample").find(".card");
    accordion = document.getElementById("accordionExample");
    cards = accordion.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        
        carNumber = cards[i].getElementsByClassName("carNumberBody")[0];
        carNumberSearch = carNumber.textContent || carNumber.innerText;

        brand = cards[i].getElementsByClassName("brandNameBody")[0];
        brandSearch = brand.textContent || brand.innerText;

        model = cards[i].getElementsByClassName("modelBody")[0];
        modelSearch = model.textContent || model.innerText;

        model = cards[i].getElementsByClassName("modelBody")[0];
        modelSearch = model.textContent || model.innerText;

        year = cards[i].getElementsByClassName("yearBody")[0];
        yearSearch = year.textContent || year.innerText;

        if (carNumberSearch.toUpperCase().indexOf(filter.trim()) > -1 ||
            brandSearch.toUpperCase().indexOf(filter.trim()) > -1 ||
            modelSearch.toUpperCase().indexOf(filter.trim()) > -1 ||
            yearSearch.toUpperCase().indexOf(filter.trim()) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
};