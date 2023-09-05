import React, { useEffect, useState } from "react";
import axios from 'axios';
import DeleteNews from "./DeleteNews";
import UpdateNews from "./UpdateNews";
import moment from 'moment';
import 'moment/locale/vi';
import { useSelector, useDispatch } from 'react-redux';
import { setNews, addNews, updateNews, removeNews, selectNews } from '../redux/newsSlice';

const NewsList = (props) => {
	const newsData = useSelector(state => state.news.news);
	const dispatch = useDispatch();

	useEffect(() => {
		handleGetAllNews();
  	}, [newsData]);

	moment.locale("vi");

	const getDiff = (time) => {
		return moment(time).fromNow();
	}

	const handleGetAllNews = async () => {
		try {
			const res = await axios.get('https://news-management-api.vercel.app/api/news');
			dispatch(setNews(res.data.reverse()));
			console.log(newsData);
		} catch (err) {
        	alert(err);
      	};
	};

	const handleGetYourNews = async () => {
		await axios.get(`https://news-management-api.vercel.app/api/news/user/${props.username}`)
		.then(res => {
        	dispatch(setNews(res.data.reverse()));
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
        		{ newsData.map(news => (
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
