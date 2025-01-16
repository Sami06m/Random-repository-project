const fetchRepo = async (language) => {  
    try {  
        // درخواست به API گیت‌هاب برای دریافت ریپازیتوری‌ها بر اساس زبان انتخاب‌شده  
        const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`);  
        const data = await response.json();  
        
        if (data.items.length === 0) {  
            throw new Error('No repositories found for this language.');  
        }  
        
        // انتخاب یک ریپازیتوری تصادفی  
        const randomRepo = data.items[Math.floor(Math.random() * data.items.length)];  
        
        // نمایش اطلاعات ریپازیتوری  
        const repoInfoDiv = document.getElementById('repo-info');  
        repoInfoDiv.innerHTML = `  
            <h3>${randomRepo.name}</h3>  
            <p><strong>Description:</strong> ${randomRepo.description || 'No description available'}</p>  
            <p><strong>Owner:</strong> ${randomRepo.owner.login}</p>  
            <p><strong>Stars:</strong> ${randomRepo.stargazers_count}</p>  
            <p><strong>Link:</strong> <a href="${randomRepo.html_url}" target="_blank">${randomRepo.html_url}</a></p>  
        `;  
    } catch (error) {  
        console.error('Error fetching repository:', error);  
        const repoInfoDiv = document.getElementById('repo-info');  
        repoInfoDiv.innerHTML = <p>Error: ${error.message}</p>;  
    }  
  };  
  
  document.getElementById('fetch-repo').addEventListener('click', () => {  
    const selectedLanguage = document.getElementById('language').value;  
    if (selectedLanguage) {  
        fetchRepo(selectedLanguage);  
    } else {  
        alert('Please select a language before fetching a repository.');  
    }  
  });