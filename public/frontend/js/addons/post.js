
const path = window.location.pathname;
const postId = path.split("/").pop()
fetch(`/post/${postId}`, {
    method: "GET",
})
.then((response) => response.json())
.then((data) => {
        console.log('mydata :',data.post)
    
        const mypost = data.post;
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

        const recent =  document.getElementById('recentPost')
        const categories =  document.getElementById('blog-list-category')
        data.blogg.forEach(blog=>{
            const myDiv =  document.createElement('div');
            myDiv.setAttribute('class','blog-list-recent-post')
            myDiv.innerHTML = `
            <div class=row>
                <div class="col-md-4 col-sm-4 col-xs-4">
                    <div class=blog-list-recent-img>
                        <img alt=image src='/${blog.thub}'>
                    </div>
                </div>
                <div class="col-md-8 col-sm-8 col-xs-8 pl-0 pr-0">
                    <div class=blog-list-recent-text>
                        <h5>
                            <a href='${blog._id}'>${blog.title}</a>
                        </h5>
                        <span>${formatDate(blog.createDate)}</span>
                    </div>
                </div>
            </div>
            `
            recent.appendChild(myDiv)
        })
        data.category.forEach(cat=>{
            const myDiv =  document.createElement('li');
            myDiv.innerHTML = `
                <a href=#>
                    <i class="fa fa-angle-right">
                        </i>${cat.name}</a>
            
            
            `
            categories.appendChild(myDiv)
        })
        document.getElementById('date').innerHTML = `
        <i class="fa fa-calendar-check-o"></i>
        ${formatDate(mypost.createDate)}
        `
        document.getElementById('postthub').src = `/${mypost.thub}`
        document.getElementById('postContent').innerHTML = `${mypost.content}`
         


    })