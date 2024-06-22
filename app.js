const apiKey = 'your_api_key'

const blogContainer = document.getElementById('blog-container')
const seachInput = document.getElementById('search-input')
const seachButton = document.getElementById('search-button')

async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`

        response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data)
        articles = data.articles
        console.log(articles)
        return articles
    } catch {
        console.error("Error Fetching the News", error)
        return []
    }
}

seachButton.addEventListener('click', async () => {
    query = seachInput.value.trim()
    if (query !== '') {
        try {
            const articles = await fetchQueryArticles(query)
            displayBlogs(articles)
        } catch (error) {
            console.log(error)
        }
    }
})

async function fetchQueryArticles(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`

        response = await fetch(apiUrl)
        const data = await response.json()
        articles = data.articles
        console.log(articles)
        return articles
    } catch {
        console.error("Error Fetching the News", error)
        return []
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = ''
    articles.forEach(article => {
        const blogCard = document.createElement('div')
        blogCard.id = 'blog-card'

        const img = document.createElement('img')
        img.src = article.urlToImage
        img.alt = article.title

        const title = document.createElement('h2')
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title
        title.textContent = truncatedTitle

        const desc = document.createElement('p')
        const truncatedDesc = article.description.length > 100 ? article.description.slice(0, 100) + '...' : article.description
        desc.textContent = truncatedDesc

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(desc)
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank")
        })
        blogContainer.appendChild(blogCard)
    })
}

(async () => {
    const articles = await fetchRandomNews()
    displayBlogs(articles)
})()