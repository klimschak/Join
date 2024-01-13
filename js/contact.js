// register.js + storage.js einbinden die daten sind unter users gespeicher und alle kontakte visualisieren



async function renderContacts() {
     document.getElementById('contacts').innerHTML = " ";

    for (let i = 0; i < accounts.length; i++) {
        
        document.getElementById('contacts').innerHTML += /*html*/`
            <div>${accounts}</div>
        `
    }
}