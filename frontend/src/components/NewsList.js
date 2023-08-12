import React from 'react';
import axios from 'axios';

const NewsList = ({ news, onDeleteNews }) => {
  const handleDeleteNews = async (id) => {
    try {
      await axios.delete(`/api/news/${id}`);
      onDeleteNews(id);
    } catch (error) {
      console.error("Error deleting news: ", error);
    }
  };

  return (
    <div className="todos">
      {news.length > 0 ? news.map((item) => (
        <div className="todo" key={item._id}>
          <div className="text">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
          <div className="delete-todo" onClick={() => handleDeleteNews(item._id)}>x</div>
        </div>
      )) : (
        <p>There is no news at the moment</p>
      )}
    </div>
  );
};

export default NewsList;
