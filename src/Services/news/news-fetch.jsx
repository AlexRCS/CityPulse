// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function NewsFetch() {
// 	const [articles, setArticles] = useState([]);

// 	useEffect(() => {
// 		const apiKey = '369bb5857f0fcfd197abae7c0779c0ec';
// 		const url = `https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=6&apikey=${apiKey}`;

// 		axios.get(url)
// 			.then(response => {
// 				setArticles(response.data.articles);
// 			})
// 			.catch(error => {
// 				console.error('fetching error', error);
// 			});
// 	}, []);

// 	return (
// 		<div>
// 			<h2>Últimas Notícias</h2>
// 			<ul>
// 				{articles.map((article, index) => (
// 					<li key={index}>
// 						<h3>{article.title}</h3>
// 						<img src={article.image} alt={article.title} width="500" />
// 						<p>{article.description}</p>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }

// export default NewsFetch;


