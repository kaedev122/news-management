import React, { useEffect, useState } from "react";
import axios from 'axios';
import DeleteNews from "./DeleteNews";
import UpdateNews from "./UpdateNews";
import moment from 'moment';
import 'moment/locale/vi';

const NewsList = (props) => {
	const [newsList, setNewsList] = useState([]);

	useEffect(() => {
		handleGetAllNews();
  	}, []);

	moment.locale("vi");

	const getDiff = (time) => {
		return moment(time).fromNow();
	}

	const handleGetAllNews = async () => {
		await axios.get('http://localhost:3001/api/news')
		.then(res => {
        	setNewsList(res.data.reverse());
		})
		.catch(err => {
        	alert(err);
      	});
	};

	const handleGetYourNews = async () => {
		await axios.get(`http://localhost:3001/api/news/user/${props.username}`)
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
							{/* news.entryDate.match(/([^T]+)/)[0].split("-").reverse().join("/") */}
							<span>Date Submitted: </span>{getDiff(news.entryDate)}
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
