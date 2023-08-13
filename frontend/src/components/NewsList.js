import React, { useEffect, useState } from "react";
import axios from 'axios';

const NewsList = ({ news, onDeleteNews }) => {
	const [newsList, setNewsList] = useState([]);

	useEffect(() => {
    //Call API bằng Axios khi component được mount
    axios.get('http://localhost:3000/api/news')
		.then(res => {
        	setNewsList(res.data);
		})
		.catch(err => {
        	alert(err.response.data);
      	});
  	}, []); //Sử dụng mảng rỗng để chỉ call một lần khi mount

  	return (
    	<div>
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
