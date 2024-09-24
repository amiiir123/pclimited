fetch(`/projects_Data`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    const allCat = document.getElementById("filters");
    const projects = document.getElementById("projects");
    data.category.forEach((cat) => {
      const myDiv = document.createElement("button");
      myDiv.setAttribute("class", "isotop-button");
      myDiv.setAttribute("data-filter", `.${cat.name}`);
      myDiv.innerHTML = `
      ${cat.name}
        `;
      allCat.appendChild(myDiv);
    });
    data.projects.forEach((project) => {
      const myDiv = document.createElement("div");
      myDiv.setAttribute(
        "class",
        `col-xs-12 col-sm-6 col-md-4 isotope-item ${project.type}`
      );

      myDiv.innerHTML = `
                          <a href=#>
                        <div class=project-item>
                            <div class=overlay-container>
                                <img alt=project-1 src=${project.filename}>
                                <div class=project-item-overlay>
                                    <h4>${project.title}</h4>
                                    <p>${project.description}

                                </div>
                            </div>
                        </div>
                    </a>

                        `;
      projects.appendChild(myDiv);
    });
  });
