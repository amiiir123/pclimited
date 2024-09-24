document.addEventListener('DOMContentLoaded', () => {
    // Get all forms with the class 'menu-form'
    const forms = document.querySelectorAll('.menu-form2');

    forms.forEach(form => {
      // Find checkboxes within the current form
      const checkboxes = form.querySelectorAll('input[type="checkbox"]');
      
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
          // Submit the form on checkbox change
          form.submit();
        });
      });
    });
  });

function handleDeleteMenu(id) {
    const form = document.getElementById(`menuForm${id}`);
    form.action = `menu-delete/${id}`;
    form.method = 'post';
    form.submit();
    
}
document.querySelectorAll('.expand').forEach(expand => {
    expand.addEventListener('click', () => {
      const ddBody = expand.parentElement.nextElementSibling;
      ddBody.classList.toggle('hide');
      expand.querySelector('i').classList.toggle('fa-angle-down');
      expand.querySelector('i').classList.toggle('fa-angle-up');
    });
  });

  document.querySelectorAll('.remove_item').forEach(removeItem => {
    removeItem.addEventListener('click', () => {
      removeItem.parentElement.remove();
    });
  });