import React, { useEffect, useState } from "react";
import axios from 'axios';

const NewsList = (props) => {
	const [newsList, setNewsList] = useState([]);

	useEffect(() => {
    //Call API bằng Axios khi component được mount
		handleGetAllNews();
  	}, []); //Sử dụng mảng rỗng để chỉ call một lần khi mount

	const handleGetAllNews = () => {
		axios.get('http://localhost:3000/api/news')
		.then(res => {
        	setNewsList(res.data);
		})
		.catch(err => {
        	alert(err.response.data);
      	});
	};

	const handleGetYourNews = () => {
		axios.get(`http://localhost:3000/api/news/user/${props.username}`)
		.then(res => {
        	setNewsList(res.data);
		})
		.catch(err => {
        	alert(err.response.data);
      	});
	}

  	return (
    	<div>
			<div className="button-show-news">
                <button className="" onClick={handleGetAllNews}>Show all</button>
                <button className="" onClick={handleGetYourNews}>Show yours</button>
            </div>
      		<ul>
        		{ newsList.map(news => (
          			<li>
						<h1>{news.title}</h1>
						<p>{news.content}</p>
						<div><span>Author: </span>{news.username}</div>
						<div><span>Date Submitted: </span>{news.entryDate.match(/([^T]+)/)[0].split("-").reverse().join("/")}</div>
					</li> 
				))}
      		</ul>
    	</div>
  	);
};

export default NewsList;
