// Fetch data from the server
/*
fetch("/data", {
  method: "GET",
})
.then(response => response.json())
.then(data => {
  console.log("Received data:", data);
  
  // Check if boxData is present and is an array
  const services = data.boxData;
  const about = data.About;
  console.log("services : ",services)
  function renderServices(services) {
    const container = document.getElementById("container-box");
    
    // Clear existing content in the container
    container.innerHTML = '';

    services.forEach((service) => {
      const serviceBox = document.createElement("div");
      serviceBox.className = "article-box";
      serviceBox.innerHTML = `
        <i class="${service.iClass}"></i>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      `;
      
      container.appendChild(serviceBox);
    });
  }
  const title = document.getElementById("Abouttitle")
  const desc = document.getElementById("Aboutdesc")
  const Babout = document.getElementById("Babout")
  
  function renderServices2(services) {
    title.innerHTML=services.title
    desc.innerHTML=services.description
    Babout.innerHTML=services.Bcaption
  
  // Function to format date if needed in the future

  
}
renderServices2(about[0])
  
function renderServices3(services) {
    const title = document.getElementById("abouHeading")
    const desc = document.getElementById("abouP")
    title.innerHTML=services.title
    desc.innerHTML=services.description
  
  // Function to format date if needed in the future

  
}
//renderServices3(about[1])
  
  // Function to format date if needed in the future

  
 // renderServices(services);
})
.catch((error) => {
  console.error("Error fetching data:", error);
});*/
