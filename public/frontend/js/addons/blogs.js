
fetch("/data", {
    method: "GET",
})
.then((response) => response.json())
.then((data) => {
    
        const blogs = data.allblg;
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
        function Blogs(data){
            const container = document.getElementById('blogs')
            data.forEach((blog) => {
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
        
                container.appendChild(blogDiv);
              });
        


        }
        Blogs(blogs)



    })