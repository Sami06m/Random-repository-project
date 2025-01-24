// Function to fetch repositories based on the user's selected language  
const fetchRepo = async (language) => {  
    try {  
        // Step 1: Fetch data from the GitHub API  
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`);  

        // Step 2: Check if the response is OK (status code 200)  
        if (!response.ok) {  
            throw new Error('Network response was not ok.');  
        }  

        // Step 3: Convert the response to JSON format  
        const data = await response.json();  

        // Step 4: Check if we found any repositories  
        if (data.items.length === 0) {  
            throw new Error('No repositories found for this language.');  
        }  

        // Step 5: Select a random repository from the list  
        const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];  

        // Step 6: Display the repository information  
        document.querySelector('.main-box').innerHTML = `  
            <strong>${randomRepo.name}</strong>:  
            <p><strong>Description:</strong> ${randomRepo.description || 'No description available'}</p>  
            <p><strong>Owner:</strong> ${randomRepo.owner.login}</p>  
            <p><strong>Stars:</strong> ${randomRepo.stargazers_count}</p>  
            <p><strong>Link:</strong> <a href="${randomRepo.html_url}" target="_blank">${randomRepo.html_url}</a></p>  
        `;  

    } catch (error) {  
        // Step 7: Handle errors and display an error message  
        console.error('Error fetching repository:', error);  
        document.getElementById('repo-info').innerHTML = `<p>Error: ${error.message}</p>`;  
    }  
};  

// Event listener for the button click to initiate the fetch process  
document.getElementById('fetch-repo').addEventListener('click', () => {  
    const selectedLanguage = document.getElementById('language').value;  // Get the selected language from the dropdown  
    if (selectedLanguage) {  
        fetchRepo(selectedLanguage);  // Call the fetchRepo function  
    } else {  
        alert('Please select a language before fetching a repository.');  // Alert if no language is selected  
    }  
});