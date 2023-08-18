import React, { useEffect, useState } from "react";
import axios from 'axios';
import DeleteNews from "./DeleteNews";
import UpdateNews from "./UpdateNews";

const NewsList = (props) => {
	const [newsList, setNewsList] = useState([]);

	useEffect(() => {
		handleGetAllNews();
  	}, []);

	const handleGetAllNews = async () => {
		await axios.get('https://news-management.vercel.app/api/news')
		.then(res => {
        	setNewsList(res.data.reverse());
		})
		.catch(err => {
        	alert(err);
      	});
	};

	const handleGetYourNews = async () => {
		await axios.get(`https://news-management.vercel.app/api/news/user/${props.username}`)
		.then(res => {
        	setNewsList(res.data.reverse());
		})
		.catch(err => {
        	alert(err);
      	});
	}

  	return (
    	<div>
			<div className="button-show-news">
                <button onClick={handleGetAllNews}>Show all</button>
                <button onClick={handleGetYourNews}>Show yours</button>
            </div>
      		<ul>
        		{ newsList.map(news => (
          			<li>
						<h2>{news.title}</h2>
						<p>{news.content}</p>
						<div className="news-info">
							<span>Author: </span>{news.username}
							<span>Date Submitted: </span>{news.entryDate.match(/([^T]+)/)[0].split("-").reverse().join("/")}
						</div>
						<div>
							<DeleteNews news={news} userId={props.userId} onClick={handleGetAllNews}/>
							<UpdateNews news={news} userId={props.userId} onClick={handleGetAllNews}/>
						</div>
					</li> 
				))}
      		</ul>
    	</div>
  	);
};

export default NewsList;
