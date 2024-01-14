let userContacts = [
  {
    id: 1,
    name: "Siham El-Maimouni",
    initials: "SE",
  },

  {
    id: 2,
    name: "Pedro Göntürk",
    initials: "PG",
  },

  {
    id: 3,
    name: "Thorsten Puccini",
    initials: "TP",
  },
];

async function renderContacts() {
  console.log("Rendering contacts...");
  const contactsContainer = document.getElementById("contacts");
  contactsContainer.innerHTML = "";

  // Überprüfen Sie, ob userContacts vorhanden sind
  if (userContacts && userContacts.length > 0) {
    for (let i = 0; i < userContacts.length; i++) {
      const contact = userContacts[i];

      // Beispielhaftes HTML für die Darstellung der Kontakte
      contactsContainer.innerHTML += `
          <div>
            <p>Name: ${contact.name}</p>
            <p>Initials: ${contact.initials}</p>
          </div>
        `;
    }
  } else {
    contactsContainer.innerHTML = "Keine Kontakte gefunden.";
  }
}
