const inventory = document.querySelector(".inventory");
const searchButton = document.querySelector(".search-button");
const search = document.querySelector("#search");

function addItem(item)
{
    console.log(item);
    const list = document.querySelector(".inventory");

    let itemElement = document.createElement("li");
    let itemName = document.createElement("div");
    let itemQuantity = document.createElement("div");

    itemName.textContent = item["name"];
    itemQuantity.textContent = item["quantity"];
    itemName.classList.add("item-text");
    itemQuantity.classList.add("item-text");


    itemElement.appendChild(itemName);
    itemElement.appendChild(itemQuantity);

    list.appendChild(itemElement);
}

// Removes previous search results.
function clearResults()
{
    while (inventory.firstChild) {
        inventory.removeChild(inventory.firstChild);
    }
}

// Gets items of a certain name.
function searchInventory()
{
    clearResults();
    const apiStr = "http://localhost:5091/api/inventory/search?itemName=" + search.value;

    fetch (apiStr)
        .then((response) => {
            if (!response.ok)
                throw new Error(`Failed to find any items containg ${search.textContent}`);

            return response.json();
        })
        .then((data) => {
            data.forEach((item) => {
                addItem(item);
            })
        })
        .catch((error) => {
            console.error(error);
        })
}

// Gets the entire inventory.
function getInventory()
{
    const apiStr = "http://localhost:5091/api/inventory/get";

    fetch (apiStr)
        .then((response) => {
            if (!response.ok)
                throw new Error("Failed to get inventory.");

            return response.json();
        })
        .then((data) => {
            data.forEach((item) => {
                addItem(item);
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

searchButton.addEventListener("click", searchInventory);