import axios from 'axios';

const DeleteNews = (props) => {
    const handleDeleteYourNews = async () => {
        await axios.delete(`http://localhost:3001/api/news/${props.news._id}`, {
            data: {userId: props.userId}
        })
        .then(res => {
            alert('Delete success!');
        })
        .catch(err => {
            alert(`Failed! ${err.response.data}`)
        })
	}
    
    return (
        <i className="ti-trash" onClick={handleDeleteYourNews}></i>
    )
}

export default DeleteNews;