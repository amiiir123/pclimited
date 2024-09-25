
$(document).ready(function() {
    function selectLocalFile() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*, video/*');
        input.click();

        input.onchange = function() {
            const file = input.files[0];
            if (/^image\//.test(file.type) || /^video\//.test(file.type)) {
                saveToServer(file);
            } else {
                console.warn('You could only upload images or videos.');
            }
        };
    }

    function saveToServer(file) {
        const formData = new FormData();
        formData.append('file', file);

        $.ajax({
            url: '/app/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                const range = quill.getSelection();
                quill.insertEmbed(range.index, response.type, response.url);
            },
            error: function() {
                console.warn('Unable to upload file');
            }
        });
    }

    const quill = new Quill('#snow-editor', {
        theme: 'snow',
        modules: {
            toolbar: {
                container: [
                    [{ 'font': [] }, { 'size': [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'script': 'sub'}, { 'script': 'super' }],
                    [{ 'header': '1'}, { 'header': '2' }, 'blockquote', 'code-block'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
                handlers: {
                    'image': selectLocalFile,
                    'video': selectLocalFile
                }
            }
        }
    });

    // Set initial content if it exists
    var initialContent = $('#content').val();
    if (initialContent) {
        quill.clipboard.dangerouslyPasteHTML(initialContent);
    }

    // Handle form submission
    $('#dataForm').on('submit', function(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Get the selected category
        var selectedCategory = $('#floatingSelect').val();

        // Get the content of the editor
        
        var content = quill.root.innerHTML;
        
        // Debugging: Log the content
        

        // Set the content to the hidden input field
        $('#categoryy').val(selectedCategory);
        $('#content').val(content);
        
        // Debugging: Log the hidden input value
        .val());

        // Submit the form
        this.submit();
    });
});



$(document).ready(function() {
    // Handle the change event on the select element
    $('#floatingSelect').on('change', function() {
        // Get the selected value
        var selectedValue = $(this).val();

        // Log the selected value to the console
        
    });
});
