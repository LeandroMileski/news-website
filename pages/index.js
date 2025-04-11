import React from 'react';

function Home() {
    const articles = [
        { id: 1, title: 'Breaking News: React 18 Released!', summary: 'React 18 introduces concurrent rendering and more.' },
        { id: 2, title: 'JavaScript Trends in 2025', summary: 'Discover the latest trends in JavaScript development.' },
        { id: 3, title: 'How to Build a News Website', summary: 'A step-by-step guide to building a modern news website.' },
    ];

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome to News Website</h1>
            <p>tech news and updates.</p>
            <ul>
                {articles.map(article => (
                    <li key={article.id} style={{ marginBottom: '10px' }}>
                        <h2>{article.title}</h2>
                        <p>{article.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
