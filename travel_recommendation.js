
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

btnSearch.addEventListener("click", search);
btnClear.addEventListener("click", clearResults);

const listResults = document.getElementById('results');

function search() {
    const destinationInput = document.getElementById("destination").value.toLowerCase();
    var destinationNormalized = destinationInput.indexOf("beach") > -1 ? "beaches" : destinationInput.indexOf("temple") > -1 ? "temples" :
        destinationInput.indexOf("countr") > -1 ? "countries" : null;

    if (destinationNormalized == null) {
        alert("Input not recognized");
        return;
    }

    clearResults();
    fetch("./travel_recommendation_api.json")
        .then(function (result) {
            return result.json();
        })
        .then(function (aDestinations) {
            var aResults = aDestinations[destinationNormalized];
            aResults.forEach(oResult => addResult(oResult));
        })
        .catch(function (error) {
            alert("error!");
        });
}

function clearResults() {
  listResults.innerHTML = '';
  document.getElementById("destination").value = ''
}

function addResult(oResult) {
    var divDestination = document.createElement("div");
    divDestination.classList.add("destination-card");

    var img = document.createElement("img");
    img.classList.add("destination-image");
    img.setAttribute("src", oResult.imageUrl);

    var h3 = document.createElement("h3");
    h3.classList.add("destination-name");
    h3.innerHTML = oResult.name;

    var p = document.createElement("p");
    p.classList.add("destination-description");
    p.innerHTML = oResult.description;

    var button = document.createElement("button");
    button.classList.add("destination-button");
    button.innerHTML = "Visit";

    
    var listItem = document.createElement("li");
    listItem.appendChild(divDestination);
    divDestination.appendChild(img);
    divDestination.appendChild(h3);
    divDestination.appendChild(p);
    divDestination.appendChild(button);

    listResults.appendChild(listItem);
}