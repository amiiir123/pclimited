function handleSwitchChangeBlog(event , id){
   const isActive = event.target.checked;
   fetch(`/app/update/blog/${id}`,{
       method:'POST',
       headers:{
           'Content-Type':'application/json'
       },
       body: JSON.stringify({ isActive })

   }).then(response => {
if (!response.ok) {
alert('Failed to update category status');
}
}).catch(error => console.error('Error:', error));
}
function handleBlog(event, blogs){
   event.preventDefault();
   const action = event.target.value;
   const blog = JSON.parse(blogs);
   if (action === 'edit'){
       //update the blog (in new page add-blog)
       window.location.href = `/app/add-blog?${blog}`;


   } else if(action === 'delete') {
       //delete from the database and remove from the table without reload 
       fetch(`/app/delete/blog/${blog}`, { 
           method:'POST',
           headers:{
               'Content-Type':'application/json'
           },body: JSON.stringify({ blog })
        })
   .then(response => {
       if(response.ok){
               console.log("categoryRow${id}")
               console.log(document.getElementById(`categoryRow${blog}`))
               document.getElementById(`categoryRow${blog}`).remove();
           }else{
               alert('Failed to delete category')
           }
   }).catch(error => console.error('Error:', error));

   }


}