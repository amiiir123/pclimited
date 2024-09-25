// Fetch data from the server
/*
fetch("/data", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    
    const services = data.boxData;
    const testimonialss = data.quData;
    const latestBlog = data.Blog;
    const servicesData = data.serviceData;
    // Define an array of IDs for easier access
    const listWe = data.sectionData[1];
    const elements = [
      { smtitle: "crea1", title: "crea2", desc: "crea3" },
      { smtitle: "smtitle2", title: "title2", desc: "desc2" },
      { smtitle: "smtitle4", title: "title4", desc: "desc4" },
      { smtitle: "smtitle5", title: "title5", desc: "desc5" },
      { smtitle: "smtitle6", title: "title6", desc: "desc6" },
    ];

    // Iterate over the sectionData and update the corresponding DOM elements
    data.sectionData.forEach((section, index) => {
      
      if (elements[index]) {
        document.getElementById(elements[index].smtitle).innerHTML =
          section.smtitle;
        document.getElementById(elements[index].title).innerHTML =
          section.title;
        document.getElementById(elements[index].desc).innerHTML =
          section.description;
      }
    });
    ///
    function sectionSerData(mydata) {
      
      const containerServices = document.getElementById("SectionServices");
      mydata.forEach((element) => {
        const myDiv = document.createElement("div");
        myDiv.className = "col-md-4 col-sm-4 col-xs-12";
        const featuresList = element.features
          .map((feature) => `<li>${feature}</li>`)
          .join("");
        myDiv.innerHTML = `
            <div class="article-box">
                    <i class="${element.iClass}"></i>
                    <h3>${element.title}</h3>
                    <p>${element.description}</p>
                    <ul>
                        ${featuresList}
                    </ul>
                </div>
            
            `;
        containerServices.appendChild(myDiv);
      });
    }

    function renderServices(services) {
      const container = document.getElementById("service-container");

      services.forEach((service) => {
        const serviceBox = document.createElement("div");
        serviceBox.className = "col-md-4 col-sm-6 col-xs-12";

        serviceBox.innerHTML = `
                <div class="service-box clearfix">
                    <div class="box-icon">
                        <i class="${service.iClass}"></i>
                    </div>
                    <div class="box-content">
                        <h5>${service.title}</h5>
                        <p>${service.description}</p>
                    </div>
                </div>
            `;

        container.appendChild(serviceBox);
      });
    }
    function testimonials(test) {
        // Get the owl-stage element
        const myarea = document.querySelector("#testmonials .owl-stage");
        
        // Clear existing items if needed
        myarea.innerHTML = ''; // Optional: Clears out existing items
    
        test.forEach((quot) => {
            const quotbox = document.createElement("div");
            quotbox.className = "owl-item"; // Set the class for owl-item
            quotbox.style = "width: 720px; margin-right: 25px;"; // Set the class for owl-item

            
            quotbox.innerHTML = `
                <div class="testmonial-block mt-40">
                    <h4>${quot.title}</h4>
                    <h6>${quot.author}</h6>
                    <p>${quot.description}</p>
                </div>
            `;
    
            // Append the new owl-item to the owl-stage
            myarea.appendChild(quotbox);
        });
    }
    
     function formatDate(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();

      const diffInTime = now.getTime() - date.getTime();
      const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

      if (diffInDays === 0) {
        return `Today at ${date.toLocaleTimeString()}`;
      } else if (diffInDays === 1) {
        return `Yesterday at ${date.toLocaleTimeString()}`;
      } else if (diffInDays < 7) {
        const daysOfWeek = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        return `Last ${
          daysOfWeek[date.getDay()]
        } at ${date.toLocaleTimeString()}`;
      } else {
        return date.toLocaleDateString();
      }
    }
    function blogNews(test) {
      const container = document.getElementById("blogNews");
      test.forEach((blog) => {
        const blogDiv = document.createElement("div");
        blogDiv.className = "col-md-4 col-sm-4 col-xs-12";
        blogDiv.innerHTML = `
            <div class="blog-grid">
                <div class="blog-grid-img">
                    <img src="frontend/img/content/blog/blog-2.jpg" alt="blog">
                </div>
                <div class="blog-grid-text">
                    <h4>
                        <a href="#">${blog.title}</a>
                    </h4>
                    <div class="blog-grid-category"><span>${formatDate(
                      blog.createDate
                    )} in</span>
                        <a href="#">${blog.keywords}</a>
                    </div>
                    <p>${blog.description}</p>
                    <div class="blog-grid-button">
                        <a href="#">Read more
                            <i class="fa fa-angle-right"></i>
                       </a>
                    </div>
            </div>
        </div>
            `;

        container.appendChild(blogDiv);
      });
    }
    function weDo (mydata){
      const myUL = document.getElementById('weDo')
      const featuresList = mydata.ValueOp.map((ele)=>`<li>${ele}</li>`).join("");
      myUL.innerHTML = `${featuresList}`





    }
    weDo(listWe)
    sectionSerData(servicesData);
    blogNews(latestBlog);
    testimonials(testimonialss);
    // Call the function to render services
    renderServices(services);

  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
*/