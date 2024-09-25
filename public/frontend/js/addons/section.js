// Fetch data from the server
/*
fetch("/data", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
     
  
      // Iterate over the sectionData and update the corresponding DOM elements
      
      
      /*
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
  
      sectionSerData(servicesData);
      blogNews(latestBlog);
      testimonials(testimonialss);
      // Call the function to render services
      renderServices(services);*/
/*function partner(){

         const  myDiv = document.getElementById('partner');
         //const port = data.sectionData[2]
         myDiv.innerHTML = `
         <div class=partner-section-grey>
    <div class=container>
        <div class="owl-carousel owl-theme partners" id=partners>
                    <div class=item>
                <img alt=partner-image src=frontend/img/content/partner1.png>
            </div>
            <div class=item>
                <img alt=partner-image src=frontend/img/content/partner2.png>
            </div>
            <div class=item>
                <img alt=partner-image src=frontend/img/content/partner3.png>
            </div>
            <div class=item>
                <img alt=partner-image src=frontend/img/content/partner4.png>
            </div>
            <div class=item>
                <img alt=partner-image src=frontend/img/content/partner5.png>
            </div>
            <div class=item>
                <img alt=partner-image src=frontend/img/content/partner6.png>
            </div>
            </div>

        
    </div>
</div>

        `
     }
     
     const mydata = data.About
     
     function purchase(data){
        

         const  myDiv = document.getElementById('purchase');
         //const port = data.sectionData[2]
         myDiv.innerHTML = `
        
                <div class="section-heading left-holder mt-50">
                    <h2 style=color:#fff id="Abouttitle">${data.title}</h2>
                    <div class=heading-line>

                    </div>
                    <p style=color:#fff id="Aboutdesc">${data.description}
                </div>
                <a href=# class="mt-30 button-md primary-button" id="Babout">${data.Bcaption}</a>
     
         `
     }
     function ourMission(){

         const  myDiv = document.getElementById('mission');
         const port = data.sectionData[2]
         myDiv.innerHTML = `
        <div class=section-heading>
                    <span >${port.smtitle}</span>
                    <h2>${port.title}</h2>
                </div>
                <div class=mt-50 id="container-box">
                    
                    
                        <div class=article-box>
                            <i class=icon-briefcase></i>
                            <h3>Design</h3>
                            <p>Classic Business provides complete solutions for multi page website.No coding skills
                                required.Classic Business provides complete solutions for multi page website.No coding
                                skills required.
    
                        </div>
                        <div class=article-box>
                            <i class=icon-diamond></i>
                            <h3>Branding</h3>
                            <p>Classic Business provides complete solutions for multi page website.No coding skills
                                required.Classic Business provides complete solutions for multi page.
    
                        </div>
                        <div class=article-box>
                            <i class=icon-credit-card>
    
                            </i>
                            <h3>Finances</h3>
                            <p>Classic Business provides complete solutions for multi page website.No coding skills
                                required. Classic Business provides complete solutions for multi page website.
    
                        </div>
                    
                </div>
         `
     }
     function ourTeam(){

         const  myDiv = document.getElementById('team');
         const port = data.sectionData[6]
         myDiv.innerHTML = `
        <div class="section-heading center-holder">
            <span> ${port.smtitle}</span>
            <h2> ${port.title}</h2>

            <div class=heading-line>

            </div>
            <p>${port.description}</p>
        </div>
        <div class="mt-40 row">
            <div class="col-xs-12 col-md-4 col-sm-4">
                <div class=team-box>
                    <div class=team-box-img>
                        <img alt=team-img src=frontend/img/content/team/team_2.jpg>
                    </div>
                    <div class=team-social>
                        <h4>Daniel Gipson</h4>
                        <h5>Web Designer</h5>
                        <div class=team-social-icom>
                            <a href=#>
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-instagram"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-twitter"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-google-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-4">
                <div class=team-box>
                    <div class=team-box-img>
                        <img alt=team-img src=frontend/img/content/team/team_5.jpg>
                    </div>
                    <div class=team-social>
                        <h4>Daniel Gipson</h4>
                        <h5>Web Designer</h5>
                        <div class=team-social-icom>
                            <a href=#>
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-instagram"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-twitter"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-google-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-4">
                <div class=team-box>
                    <div class=team-box-img><img alt=team-img src=frontend/img/content/team/team_6.jpg></div>
                    <div class=team-social>
                        <h4>Daniel Gipson</h4>
                        <h5>Web Designer</h5>
                        <div class=team-social-icom>
                            <a href=#>
                                <i class="fa fa-facebook"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-instagram"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-twitter"></i>
                            </a>
                            <a href=#>
                                <i class="fa fa-google-plus"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         `
     }
     function portfolio (){
        

        const  myDiv = document.getElementById('portfolio');
        const port = data.sectionData[4]
        myDiv.innerHTML = `
        <div class="center-holder section-heading">
            <span id="smtitle5">${port.smtitle}</span>
            <h2 id="title5">${port.title}</h2>
            <div class=heading-line>

            </div>
            <p id="desc5">${port.description}</p>
        </div>
        <div class="center-holder mt-40" id=filters>
            <button class=isotop-button data-filter=*>Show all</button>
            <button class=isotop-button data-filter=.financical>Financical</button>
            <button class=isotop-button data-filter=.business>Business</button>
            <button class=isotop-button data-filter=.marketing>Marketing</button>
        </div>
        <div class=row>
            <div class=isotope-grid>
                <div class="col-xs-12 col-md-4 col-sm-6 isotope-item business marketing">
                    <a href=#>
                        <div class=project-item>
                            <div class=overlay-container>
                                <img alt=project-1 src=frontend/img/content/projects/project1.jpg>
                                <div class=project-item-overlay>
                                    <h4>Project 1</h4>
                                    <p>Lorem ipsum dolor sit amet

                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-xs-12 col-md-4 col-sm-6 isotope-item financical">
                    <a href=#>
                        <div class=project-item>
                            <div class=overlay-container>
                                <img alt=project-1 src=frontend/img/content/projects/project2.jpg>
                                <div class=project-item-overlay>
                                    <h4>Project 1</h4>
                                    <p>Lorem ipsum dolor sit amet

                                </div>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-xs-12 col-md-4 col-sm-6 isotope-item marketing financical">
                    <a href=#>
                        <div class=project-item>
                            <div class=overlay-container>
                                <img alt=project-1 src=frontend/img/content/projects/project3.jpg>
                                div class=project-item-overlay>
                                <h4>Project 1</h4>
                                <p>Lorem ipsum dolor sit amet

                            </div>
                        </div>
                </div>
                </a>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-6 isotope-item marketing">
                <a href=#>
                    <div class=project-item>
                        <div class=overlay-container>
                            <img alt=project-1 src=frontend/img/content/projects/project4.jpg>
                            <div class=project-item-overlay>
                                <h4>Project 1</h4>
                                <p>Lorem ipsum dolor sit amet

                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-6 isotope-item business">
                <a href=#>
                    <div class=project-item>
                        <div class=overlay-container>
                            <img alt=project-1 src=frontend/img/content/projects/project5.jpg>
                            <div class=project-item-overlay>
                                <h4>Project 1</h4>
                                <p>Lorem ipsum dolor sit amet

                            </div>
                        </div>
                    </div>
                </a>
            </div>
            <div class="col-xs-12 col-md-4 col-sm-6 isotope-item business">
                <a href=#>
                    <div class=project-item>
                        <div class=overlay-container>
                            <img alt=project-1 src=frontend/img/content/projects/project6.jpg>
                            <div class=project-item-overlay>
                                <h4>Project 1</h4>
                                <p>Lorem ipsum dolor sit amet

                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        `

    
    }
    //partner()
    purchase(mydata[0])
    ourMission()
    ourTeam()
    portfolio()

    })
    .catch((error) => {
      console.error("Error fetching data:", error);})*/

function allSection() {
  // Fetch data from the server
  fetch("/data", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      
      /////////////////////////////

      const services = data.boxData;
      const services2 = data.boxDataa2;
      const testimonialss = data.quData;
      const latestBlog = data.Blog;
      const servicesData = data.serviceData;
      const listWe = data.sectionData[1];

      //////////////////////////////
      const sectionData = data.sectionData;
      const Assets = data.Assetss;


      const sectionFunctions = {
        creative: function (data) {
          const myblock = document.getElementById(data.sectionName);
          if(myblock){
            myblock.innerHTML = `
                  <div class="container">
                    <div class="section-heading center-holder" id="creative">
                      <span id="crea1">${data.title}</span>
                      <h2 id="crea2">${data.smtitle}</h2>
                      <div class="heading-line"></div>
                      <p id="crea3">${data.description}</p>
                    </div>
                    <div class="row mt-60" id="SectionServices"></div>
                  </div>
                `;
            myblock.style.display = "block";
            sectionSerData(servicesData);
          }

        },
        whatWedo: function (data) {
          const myblock = document.getElementById(data.sectionName);
          if(myblock){
            myblock.innerHTML = `
                  <div class="container">
          <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                  <img src="" class="rounded-border" alt="img" id="wedo">
              </div>
              <div class="col-md-5 col-sm-6 col-xs-12 col-md-offset-1">
                  <div class="section-heading left-holder"  >
  
                      <span id="smtitle2">${data.smtitle}</span>
                      <h2 id="title2">${data.title}</h2>
  
                  </div>
              <div class="text-content mt-30">
                  <p id="desc2">${data.description}</p>
              </div>
                  <div class="mt-20">
                       <ul class="primary-list" id="weDo">
                          <!--forEach-->
                       </ul>
               </div>
            </div>
         </div>
      </div>
                  `;
            myblock.style.display = "block";
            weDo(listWe);
          }
        },
        whyChoose: function (data) {
          const myblock = document.getElementById(data.sectionName);
          if(myblock){

            myblock.innerHTML = `
                  <div class="container">
          <div class="section-heading center-holder">
  
              <span id="smtitle4">${data.smtitle}</span>
              <h2 id="title4">${data.title}</h2>
              <div class="heading-line">
              </div><p id="desc4">${data.description} </p>
  
  
      </div>
      <div class="row mt-40" id="service-container">
  
      </div>
  </div>
  
  
                  `;
            myblock.style.display = "block";
            renderServices(services);
          }
        },
        ourPortfolio: function (data) {
          const myblock = document.getElementById(data.sectionName);
          if(myblock){
            myblock.innerHTML = `
                <div class="container">
        <div class="section-heading center-holder">

            <span id="smtitle5">${data.smtitle}</span>
            <h2 id="title5">${data.title}</h2>
            <div class="heading-line"></div>
            <p id="desc5 ">${data.description}</p>

    </div>
    <div class="center-holder mt-40" id=filters>
        <button class=isotop-button data-filter=*>Show all</button>
        
    </div>
    <div class=row>
        <div class=isotope-grid id="projects">



        </div>
    </div>
</div>`;

            myblock.style.display = "block";
            projects()
          }
          
        },
        ourNews: function (data) {
          const myblock = document.getElementById(data.sectionName);
          if(myblock){
            myblock.innerHTML = `
                <div class="container">
        <div class="section-heading center-holder">
            <span id="smtitle6">${data.smtitle}</span>
            <h2 id="title6">${data.title}</h2>
            <div class="heading-line">
            </div>
            <p id="desc6">${data.description} </p>
    </div>
    
    <div class="row mt-40" id="blogNews">
        
</div>
</div>
                `;
                
                myblock.style.display = "block";
                blogNews(latestBlog);
          }
          
        },
        partner: function (data) {
          const myblock =document.getElementById("partner")
          if(myblock){
            const partnerImages = Assets.filter(image => image.section.startsWith("partner"));
            const partnerHTML = partnerImages.map(image => `
              <div class="item">
              <img src="app/uploads/imgs/landing/${image.filename}" alt="${image.section}">
              </div>
            `).join('');
            myblock.innerHTML = `
            <div class="container">
            <div class="owl-carousel owl-theme partners" id="partners">
            ${partnerHTML}
            </div>
            </div>
            `;
            myblock.style.display = 'block';
            $('.owl-carousel').owlCarousel({
              loop: true,
              margin: 10,
              nav: false,
              responsive: {
                0: {
                  items: 1
                },
                600: {
                  items: 3
                },
                1000: {
                  items: 5
                }
              }
            });
          }
    
        },
        ourMession: function(data){
          const myblock = document.getElementById(data.sectionName)
          if(myblock){

            myblock.innerHTML = `
                <div class=container>
          <div class=row>
              <div class="col-xs-12 col-sm-6 col-md-5">
                  <img alt=timer src id="aboutSection1">
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 col-md-offset-1">
                  <div class=section-heading>
                        <span id="smtitle6">${data.smtitle}</span>
                        <h2 >${data.title}</h2>
                        <div class="heading-line"></div>
                        <p >${data.description} </p>
                  </div>
                  <div class="mt-50" id="mission">
                  
                  </div>
  
                  
              </div>
          </div>
      </div>
      
      `            
      myblock.style.display = 'block'

      ourMessionData()
          }
        },
        ourTeam: function(data){
          const myblock = document.getElementById(data.sectionName)
          if(myblock){
            myblock.innerHTML = `
            <div class=container>
            <div class="section-heading center-holder">
              <h2>${data.title}</h2>
              <div class=heading-line>
  
              </div>
              <p>${data.description}
          </div>
          <div class="mt-40 row">
          <div class="col-xs-12 col-md-4 col-sm-4">
                  <div class=team-box>
                      <div class=team-box-img>
                      <img alt=team-img src=./frontend/img/content/team/team_2.jpg>
                      </div>
                      <div class=team-social>
                      <h4>Daniel Gipson</h4>
                          <h5>Web Designer</h5>
                          <div class=team-social-icom>
                              <a href=#>
                                  <i class="fa fa-facebook"></i>
                              </a>
                              <a href=#>
                                  <i class="fa fa-instagram"></i>
                              </a>
                              <a href=#>
                                  <i class="fa fa-twitter"></i>
                              </a>
                              <a href=#>
                                  <i class="fa fa-google-plus"></i>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                  <div class=team-box>
                      <div class=team-box-img>
                          <img alt=team-img src=./frontend/img/content/team/team_5.jpg>
                      </div>
                      <div class=team-social>
                          <h4>Daniel Gipson</h4>
                          <h5>Web Designer</h5>
                          <div class=team-social-icom>
                              <a href=#>
                                  <i class="fa fa-facebook"></i>
                              </a>
                              <a href=#>
                                  <i class="fa fa-instagram"></i>
                              </a>
                              <a href=#>
                                  <i class="fa fa-twitter"></i>
                              </a>
                              <a href=#>
                                  <i class="fa fa-google-plus"></i>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-xs-12 col-md-4 col-sm-4">
                  <div class=team-box>
                      <div class=team-box-img><img alt=team-img src=./frontend/img/content/team/team_6.jpg></div>
                      <div class=team-social>
                          <h4>Daniel Gipson</h4>
                          <h5>Web Designer</h5>
                          <div class=team-social-icom>
                              <a href=#>
                              <i class="fa fa-facebook"></i>
                              </a>
                              <a href=#>
                              <i class="fa fa-instagram"></i>
                              </a>
                              <a href=#>
                              <i class="fa fa-twitter"></i>
                              </a>
                              <a href=#>
                              <i class="fa fa-google-plus"></i>
                              </a>
                              </div>
                              </div>
                              </div>
              </div>
              </div>
      </div>
      `
      myblock.style.display = 'block'

          }
          
    
    
        },
         aboutSection3 : function (data){
    const myblock = document.getElementById(data.sectionName)
    if(myblock){

      myblock.innerHTML = `
      <div class=container >
          <div class=row>
              <div class="col-xs-12 col-sm-6 col-md-6">
                  <img  src id="aboutSection2">
              </div>
              <div class="col-xs-12 col-sm-6 col-md-5 col-md-offset-1">
                  <div class="section-heading left-holder mt-50">
                      <h2 style=color:#fff>${data.title}</h2>
                      <div class=heading-line>
  
                      </div>
                      <p style=color:#fff>${data.description}.
                  </div>
                  <a href='${data.link}' class="mt-30 button-md primary-button">${data.smtitle}</a>
              </div>
          </div>
         
      </div>
      `
      myblock.style.display = 'block'
    }
    
        },
        SectionStart: function (data){
          const myblock = document.getElementById(data.sectionName)
          if(myblock){

            myblock.innerHTML =`
             <div class="container">
          <div class="section-heading white-color center-holder">
              <h2 style="color: #fff;">${data.title}</h2>
          </div>
          <div class="section-heading white-color center-holder mt-20">
              <h4 style="color: #fff;">${data.description}</h4>
          </div>
          <div class="center-holder mt-30">
              <a href="${data.link}" class="dark-button button-md">${data.smtitle}</a>
          </div>
      </div>
            `
            myblock.style.display = 'block'
          }

        },
        ourVideo : function (data){
          const myblock = document.getElementById(data.sectionName)
          if(myblock){
            myblock.innerHTML = `
                <div class=container>
        <div class="section-heading center-holder">
            <span>${data.smtitle}</span>
            <h2>${data.title}</h2>
            <div class=heading-line></div>
            <p>${data.description}</p>
        </div>
        <div class="row mt-50">
            <div class="col-xs-12 col-sm-12 col-md-8 col-md-offset-2">
                <div class=video-box>
                    <img alt=about-img src= class=rounded-border id="videoThumb">
                    <div class=video-box-overlay>
                        <div class=video-box-button>
                        <button class=video-play-icon data-target=.video-modal data-toggle=modal>
                        <i class="fa fa-play"></i>
                        </button>
                        </div>
                        <div class="fade modal video-modal"role=dialog id=videomodal tabindex=-1>
                        <div class="modal-dialog modal-lg"role=document>
                        <iframe height=480 src='${data.link}' width=854>
                        </iframe>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `
            myblock.style.display = 'block'

          }

        }

        // Add more functions here if needed
      };


      sectionData.forEach((element) => {
        if (element.isActive) {
          // Dynamically call the function using the sectionName value
          const funcName = element.sectionName; 

        if (typeof sectionFunctions[funcName] === "function") {
      
            
          sectionFunctions[funcName](element); // Dynamically calls the respective function
        } else {
          
        }
          
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
        myarea.innerHTML = ""; // Optional: Clears out existing items

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
                            <img src="app/${blog.thub}" alt="blog">
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
                                <a href="blog/${blog._id}">Read more
                                    <i class="fa fa-angle-right"></i>
                               </a>
                            </div>
                    </div>
                </div>
                `;
          if(blogDiv && container){

            container.appendChild(blogDiv);
          }
        });
      }
      function weDo(mydata) {
        const myUL = document.getElementById("weDo");
        const featuresList = mydata.ValueOp.map(
          (ele) => `<li>${ele}</li>`
        ).join("");
        myUL.innerHTML = `${featuresList}`;
      }
      function projects() {
        fetch(`/projects_Data`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            
      
            const allCat = document.getElementById("filters");
            const projects = document.getElementById("projects");
      
            // Clear any existing filter buttons and projects
            allCat.innerHTML = "";
            projects.innerHTML = "";
      
            // Add filter buttons
            const showAllButton = document.createElement("button");
            showAllButton.setAttribute("class", "isotop-button");
            showAllButton.setAttribute("data-filter", "*");
            showAllButton.innerText = "Show all";
            allCat.appendChild(showAllButton);
      
            data.category.forEach((cat) => {
              const myDiv = document.createElement("button");
              myDiv.setAttribute("class", "isotop-button");
              myDiv.setAttribute("data-filter", `.${cat.name}`);
              myDiv.innerHTML = `${cat.name}`;
              allCat.appendChild(myDiv);
            });
      
            // Add projects
            data.projects.forEach((project) => {
              const myDiv = document.createElement("div");
              myDiv.setAttribute(
                "class",
                `col-xs-12 col-sm-6 col-md-4 isotope-item ${project.type}`
              );
      
              myDiv.innerHTML = `
                <a href="#">
                  <div class="project-item">
                    <div class="overlay-container">
                      <img alt="project-1" src="${project.filename}">
                      <div class="project-item-overlay">
                        <h4>${project.title}</h4>
                        <p>${project.description}</p>
                      </div>
                    </div>
                  </div>
                </a>
              `;
              projects.appendChild(myDiv);
            });
      
            // Initialize Isotope after dynamic content is loaded
            const iso = new Isotope('#projects', {
              itemSelector: '.isotope-item',
              layoutMode: 'fitRows',
            });
      
            // Add event listeners for filter buttons
            const filterButtons = document.querySelectorAll(".isotop-button");
            filterButtons.forEach((button) => {
              button.addEventListener("click", function () {
                const filterValue = this.getAttribute("data-filter");
                iso.arrange({ filter: filterValue });
              });
            });
          });
      }
      function ourMessionData(){
        const container =  document.getElementById('mission')
        services2.forEach(ee=>{
          const mydiv = document.createElement('div')
          mydiv.setAttribute('class','article-box')
          mydiv.innerHTML =`
                        <i class=${ee.iClass}></i>
                        <h3>${ee.title}</h3>
                        <p>${ee.description}
          `
          container.appendChild(mydiv)


        })



      }
      function ourTeamdata (){
        //oooooooo

      }
      

      // sectionSerData(servicesData);
      // blogNews(latestBlog);
      //testimonials(testimonialss);

      images()
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
allSection();
function images(){

    fetch("/imgs")
      .then((response) => response.json())
      .then((data) => {
        
        function changeFavicon(iconURL) {
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
              link = document.createElement("link");
              link.rel = "icon";
              document.getElementsByTagName("head")[0].appendChild(link);
          }
          link.href = iconURL;
      }
      

        data.Assetss.forEach((ee) => {
          if(ee.section == 'favicon'){
            url = `/uploads/imgs/landing/${ee.filename}`

            changeFavicon(url);

          }
          if (
            ee.section == "caption1" ||
            ee.section == "caption2" ||
            ee.section == "caption3"
          ) {
            let testli = document.getElementById(`${ee.section}li`);
            if (testli) {
              testli.setAttribute(
                "data-thumb",
                `app/uploads/imgs/landing/${ee.filename}`
              );
            }
            //
            //test.src = `app/uploads/imgs/landing/${ee.filename}`
          }
    
          const test = document.getElementById(`${ee.section}`);
          
          
          if (test) {
            if (test.tagName === "IMG") {
              test.src = `/app/uploads/imgs/landing/${ee.filename}`;
            }
            // If it's not an IMG tag, set the backgroundImage
            else {
              test.style.backgroundImage = `url('/app/uploads/imgs/landing/${ee.filename}')`;
            }
          }
        });



      });
}
