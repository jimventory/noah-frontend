const inventory = document.querySelector(".inventory");
const searchButton = document.querySelector(".search-button");
const search = document.querySelector("#search");

const jonBotMessage = document.querySelector(".message");

function toggleMessage(message)
{
    message.classList.remove("hide")
    setTimeout( () => {
        message.remove();
    }, 2500);
}

function addItem(item)
{
    console.log(item);
    const list = document.querySelector(".inventory");

    let itemElement = document.createElement("li");
    let itemName = document.createElement("div");
    let itemQuantity = document.createElement("div");
    let addButton = document.createElement("button");

    itemName.textContent = item["name"];
    itemName.classList.add("item-title");

    itemQuantity.textContent = `${item["quantity"]} in stock`;
    itemQuantity.classList.add("item-text");

    addButton.textContent = "Add to cart";
    addButton.classList.add("add-to-cart");


    itemElement.appendChild(itemName);
    itemElement.appendChild(itemQuantity);
    itemElement.appendChild(addButton);

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

setTimeout( () => {
    jonBotMessage.classList.remove("hide")

    const msgContainer = document.querySelector("#messageContainer");
    const message = jonBotMessage.cloneNode(true);

    setTimeout( () => {
        const p = message.querySelector('p');
        p.textContent = 'I wrote Sales Comparison.';

        const yes = message.querySelector("#yesButton");
        yes.textContent = 'Ok';

        const no = message.querySelector('#noButton');
        no.textContent = 'Thanks';

        msgContainer.appendChild(message);

    }, 3000);

}, 2000);