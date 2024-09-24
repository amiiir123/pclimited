

function handleSwitchChangePage(event , id){
    const isActive = event.target.checked;
    fetch(`/app/pages/update/${id}`,{
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
function handleActionPage(event, cats){
    event.preventDefault();
    const cat = JSON.parse(decodeURIComponent(cats));
    const action = event.target.value;
    if (action === 'edit'){
        try{

            console.log(cat._id)
            window.location.href = `page-edit?${cat._id}`
        }catch(eet){
            window.location.href =  `pages`

        }


    } else if(action === 'delete') {
        fetch(`/app/pages/delete/${cat._id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },body: JSON.stringify({ cat })
        }).then(res=>{
            console.log(res)
            if(res.ok){
                
                document.getElementById(`categoryRow${cat._id}`).remove();
            }else{
                alert('Failed to delete category')
            }
        }).catch(err=> console.log("err000 :",err))
    }

}

