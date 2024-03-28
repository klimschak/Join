


async function init() {
      await includeHTML();
      document.getElementById('headline').innerHTML = 'Herzlich willkommen!';
  }
  
  async function includeHTML() {
      let includeElements = document.querySelectorAll('[w3-include-html]');
      for (let i = 0; i < includeElements.length; i++) {
          const element = includeElements[i];
          file = element.getAttribute("w3-include-html"); // "includes/header.html"
          let resp = await fetch(file);
          if (resp.ok) {
              element.innerHTML = await resp.text();
          } else {
              element.innerHTML = 'Page not found';
          }
      }
      
      
  }

  function getHtmlTemplate (template, elementID){
    return /*html*/`
    
      <div id=${elementID} w3-include-html=${template}>
    </div>`;
}


async function showTopBarMenu() {
    let element = document.getElementById("top-menu");
    element.style.right = "48px";
    if (loggedInUser === 'Guest') {
        element.innerHTML = /*html*/`
        <a class="top-menu-link pointer" href="">Legal Notice</a>
        <a class="top-menu-link pointer" href="">Privacy Policy</a>
        <a class="top-menu-link pointer" href="./index.html">Log in</a>
        `
        
    }
    if (loggedInUser !== 'Guest') {
        element.innerHTML = /*html*/`
        <a class="top-menu-link pointer" href="">Legal Notice</a>
        <a class="top-menu-link pointer" href="">Privacy Policy</a>
        <a class="top-menu-link pointer" href="./index.html" onclick="logUserOut()">Log out</a>
        `
        
    }

    await putInitialInTopBar()

    // Füge eine Funktion hinzu, die als Event Listener verwendet wird
    function handleClickOutside(event) {
        if (!element.contains(event.target)) {
            element.style.right = "-250px";
            // Entferne den Event Listener, wenn das Menü ausgeblendet wird
            document.removeEventListener("click", handleClickOutside);
            // Entferne die Markierung, dass der Event Listener hinzugefügt wurde
            element.classList.remove("event-listener-added");
        }
    }

    // Überprüfe, ob der Event Listener schon hinzugefügt wurde
    if (!element.classList.contains("event-listener-added")) {
        setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
            // Markiere das Element, um anzuzeigen, dass der Event Listener hinzugefügt wurde
            element.classList.add("event-listener-added");
        }, 10); // Kurze Verzögerung, um sofortiges Ausblenden zu verhindern
    }
    
}



function logUserOut(){
        loggedInUser = 'Guest'
}

async function putInitialInTopBar(){
    document.getElementById('top-bar-button').innerHTML = loggedInitials
}

  
