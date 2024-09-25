

function handleActionEdit(event, user) {
    event.preventDefault();
    const action = event.target.classList;
    const us = JSON.parse(decodeURIComponent(user));
    if(action[action.length - 1] === 'edit'){
        
        
        try {
            const modal = document.getElementById('event-modal')
            modal.querySelector('input[name="fullName"]').value = us.fullName || '';
            modal.querySelector('input[name="bio"]').value = us.bio || '';
            modal.querySelector('input[name="mobile"]').value = us.mobile || '';
            modal.querySelector('input[name="location"]').value = us.location || '';
            modal.querySelector('input[name="id"]').value = us._id;
            modal.querySelector('input[name="email"]').value = us.email ;
            const checkbox = document.getElementById('switch');
            const label = document.querySelector('label[for="switch"]');
            if (checkbox && label) {
                
                checkbox.setAttribute('id', `switch${us._id}`);
                label.setAttribute('for', `switch${us._id}`);
                checkbox.checked = us.isActive;
                
            } 
             const selectt = modal.querySelector('select[name="role"]');
             function setSelect(myarray){
                myarray.forEach(option => {
                    if (option.value == us.role){
                        return option.setAttribute('selected',"") 
                    }
                 });
             }
             setSelect(selectt)
        } catch (err) {
            console.error("Error handling user edit:", err);
        }
    }else{
        fetch(`/app/user/delete/${us._id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },body: JSON.stringify({ us })
        }).then(res=>{
            
            if(res.ok){
                
                )
                document.getElementById(`user${us._id}`).remove();
            }else{
                alert('Failed to delete user')
            }
        }).catch(err=> )
    }
}
