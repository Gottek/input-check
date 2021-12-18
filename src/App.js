import React, { useState } from "react";

const Post = ({ post }) => {
    return (
        <div>
            {post.title} {post.author}
            {post.url}
            {post.likes}
        </div>
    );
};

const Filter = ({ newFilter, filterChangeHandler }) => {
    return (
        <p>
            filter shown with
            <input value={newFilter} onChange={filterChangeHandler} />
        </p>
    );
};
const PostForm = ({
    addPost,
    newTitle,
    titleChangeHandler,
    newAuthor,
    authorChangeHandler,
    newURL,
    URLChangeHandler,
    likeChangeHandler,
    likes
}) => {
    return (
        <div>
            <form onSubmit={addPost}>
                <p>
                    {" "}
                    title:{" "}
                    <input value={newTitle} onChange={titleChangeHandler} required />
                </p>
                <p>
                    {" "}
                    number:{" "}
                    <input value={newAuthor} onChange={authorChangeHandler} required />
                </p>
                <p>
                    {" "}
                    url: <input value={newURL} onChange={URLChangeHandler} required />
                </p>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <button onClick={likeChangeHandler}>{likes}</button>
        </div>
    );
};
const Rows = ({ rows }) => {
    return <div>{rows}</div>;
};
const App = () => {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState(0);
    const [newTitle, setNewTitle] = useState("");
    const [newAuthor, setNewAuthor] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [newFilter, setNewFilter] = useState("");
    const [newURL, setNewURL] = useState("");

    const addPost = event => {
        event.preventDefault();
        if (verificationUrl(newURL) && verificationInput(newTitle) && verificationInput(newAuthor)) {
            var titre = nettoyageInput(newTitle)
            var author = nettoyageInput(newAuthor)

            //deuxième verification
            if (verificationInput(titre) && verificationInput(newAuthor)) {

                const postObject = {
                    title: titre,
                    author: author,
                    url: newURL,
                    likes: 0,
                    id: posts.length + 1
                };
                if (posts.findIndex(post => post.title === newTitle) > -1) { alert(`${newTitle} is already added to authorbook`); }
                else { setPosts(posts.concat(postObject)); }
            }
        }


        setNewTitle("");
        setNewAuthor("");
        setNewURL("");
    };
    function verificationInput(input) {
        //verification
        if (input.trim().length < 4 || input.trim().length > 40) { alert("Chaine de caractère trop long ou trop court"); return false; }
        if (input.trim() === "" || input === null) { alert("Vous avez rentrer du vide"); return false; }

        return true;
    }
    function nettoyageInput(input) {
        return input.replace(/[#_@\\/<>[\]*$!&{}]/gi, '');
    }

    function verificationUrl(url) {
        var isCorrect = true;
        var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        var regex = new RegExp(expression);
        if (!url.match(regex)) { isCorrect = false; alert("URL non-conforme au format"); }
        return isCorrect
    }
    

    const filterChangeHandler = event => { setNewFilter(event.target.value); };
    const likeChangeHandler = event => { setLikes(likes + 1); };

    const rows = () =>
        posts
            .filter(post =>
                post.title.toLowerCase().includes(newFilter.toLowerCase())
            )
            .map(post => <Post key={post.id} post={post} />);

    const titleChangeHandler = event => { setNewTitle(event.target.value); };
    const authorChangeHandler = event => { setNewAuthor(event.target.value); };
    const URLChangeHandler = event => { setNewURL(event.target.value); };

    return (
        <div>
            <h1> authorbook </h1>
            <Filter
                newFilter={newFilter}
                filterChangeHandler={filterChangeHandler}
            />
            <h1> add a new </h1>
            <PostForm
                addPost={addPost}
                newTitle={newTitle}
                titleChangeHandler={titleChangeHandler}
                newAuthor={newAuthor}
                authorChangeHandler={authorChangeHandler}
                URLChangeHandler={URLChangeHandler}
                newURL={newURL}
                likeChangeHandler={likeChangeHandler}
                likes={likes}
            />
            <h1>Numbers </h1>
            <Rows rows={rows()} />
        </div>
    );
};

export default App;
