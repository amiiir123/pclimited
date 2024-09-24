
fetch("favicon", {
    method: "GET",
  }).then(response => response.json())
  .then((data) => {
    const mylogo = data.logo_dark;
    const favicon = data.favicon;
    const logo_lg = document.getElementById('logo')
    logo_lg.src = `uploads/imgs/landing/${mylogo.filename}`
  
    url = `/uploads/imgs/landing/${favicon.filename}`
    changeFavicon(url)
   
  
  
      function changeFavicon(iconURL) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        link.href = iconURL;
    }
  });
  
  