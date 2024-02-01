const renderTemplate = (temp, targ, o) => {
    targ = '#' + targ;
    // Fetch the template from the server
    fetch(`/templates/${temp}.hbs`)
        .then(response => response.text())
        .then(templateSource => {
            // Compile the template
            const compiledTemplate = Handlebars.compile(templateSource);
            // Merge data objects if an optional object is provided
            const ob = o ? Object.assign({}, o) : {};
            // Render the template with the data
            const renderedHtml = compiledTemplate(ob);
            // Update the target element with the rendered HTML
            $(targ).html('');
            $(targ).html(renderedHtml);
        })
        .catch(error => console.error('Error fetching or rendering template:', error));
};
