function searchFunction() {
    var input, filter, i;
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

        year = cards[i].getElementsByClassName("yearBody")[0];
        yearSearch = year.textContent || year.innerText;
        
        engine = cards[i].getElementsByClassName("engineBody")[0];
        engineSearch = engine.textContent || engine.innerText;

        if (carNumberSearch.toUpperCase().indexOf(filter.trim()) > -1 ||
            brandSearch.toUpperCase().indexOf(filter.trim()) > -1 ||
            modelSearch.toUpperCase().indexOf(filter.trim()) > -1 ||
            yearSearch.toUpperCase().indexOf(filter.trim()) > -1 ||
            engineSearch.toUpperCase().indexOf(filter.trim()) > -1) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
};


function verifyCarRecordInput(carRecord) {
    console.log(carRecord);
    if(carRecord.carNumber == undefined || carRecord.model == undefined ||
            carRecord.complaint == undefined || carRecord.cost == undefined ||
            carRecord.carNumber == "" ||
            carRecord.model == "" ||
            carRecord.complaint == "") {
        return {status: "error", message: "You need to fill the missing fields"};
    }
    return {status: "OK", message: ""};
};