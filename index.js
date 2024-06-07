const state = {
  parties: [],
};
const partyList = document.getElementById("events");
// const init = (event) => {
const addPartyForm = document.getElementById("addParty");
addPartyForm.addEventListener("submit", addParty);
//   addDeleteEventListener();
//   render();
// };
const render = async () => {
  await getEventsApi();
  renderParties();
  addDeleteEventListener();
};

const getEventsApi = async () => {
  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events"
    );
    const data = await response.json();
    // console.log(response);
    // console.log(data);
    state.parties = data.data;
    // printResults(displayed);
    // console.log(displayed);
    return state.parties;
  } catch (error) {
    console.log(error.message);
  }
};

function renderParties() {
  if (!state.parties.length) {
    partyList.innerHTML = "<li>No parties.</li>";
    return;
  }
  const partyCards = state.parties.map((element) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h4>${element.name}</h4>
    <p>Date: ${element.date}</p><p>Description: ${element.description}</p><p>Location: ${element.location}</p>
    <button type="submit" data-id="${element.id}" id="removeButton">Remove</button>`;
    li.style.display = "flex: 1 1 300px";
    li.style.margin = "10px";
    li.style.padding = "10px";
    li.style.border = "1px solid #ccc";
    li.style.borderRadius = "5px";
    li.style.overflow = "auto";
    li.style.color = "green";

    // console.log(li);
    return li;
  });
  partyList.replaceChildren(...partyCards);
}
async function addParty(event) {
  event.preventDefault();

  try {
    const response = await fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: addPartyForm.name.value,
          description: addPartyForm.description.value,
          date: "2023-11-13T07:00:24.000Z",
          location: addPartyForm.location.value,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create party");
    }
    addPartyForm.name.value = "";
    addPartyForm.description.value = "";
    addPartyForm.date.value = "";
    addPartyForm.location.value = "";
    // document.getElementById("partyDate").value = "";
    // document.getElementById("partyTime").value = "";
    // document.getElementById("partyLocation").value = "";
    // document.getElementById("partyDescription").value = "";

    render();
  } catch (error) {
    console.error(`Error adding party`, error);
  }
}
const deleteParty = async (id) => {
  try {
    const response = await fetch(
      `https://fsa-crud-2aa9294fe819.herokuapp.com/api/2405-ftb-et-web-ft/events/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete party");
    }
    render();
  } catch (error) {
    console.error("Error deleting", error);
  }
};
const addDeleteEventListener = () => {
  document.querySelectorAll("#removeButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const partyId = event.target.getAttribute("data-id");
      console.log(partyId);
      deleteParty(partyId);
    });
  });
};
// init();
render();

document.addEventListener("DOMContentLoaded", render);
