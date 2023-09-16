const apiStr = "http://localhost:5091/api/inventory/get";

function addItem(item)
{
    console.log(item);
    const list = document.querySelector(".inventory");

    let itemElement = document.createElement("li");
    itemElement.textContent = `${item["name"]} - ${item["quantity"]}`;

    list.appendChild(itemElement);
}

function getInventory()
{
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

getInventory();