function nav_btn_hover_in() {
    $("#overlay").addClass("overlay");
}

function nav_btn_hover_out() {
    $("#overlay").removeClass("overlay");
}

function searchFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
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