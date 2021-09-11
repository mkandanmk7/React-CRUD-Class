import axios from "axios";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      id: "",
      userId: "",
      title: "",
      body: "",
    };
  }

  //read operations

  getPosts = async () => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      // const data = await res.json();  // no need to parse using axios lib
      this.setState({ posts: data });
      // console.log(res);
    } catch (err) {
      console.error("Try again later", err);
    }
  };

  //create operation

  createPost = async () => {
    try {
      const { userId, title, body } = this.state;
      const { data } = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          userId: userId,
          title: title,
          body: body,
        }
      );
      const posts = [...this.state.posts]; // pusing new data to end .

      posts.push(data);

      this.setState({ posts, userId: "", title: "", body: "" });

      // const data = await res.json();  // no need to parse using axios lib
      console.log(data);
      // this.setState({ posts: data });
      // console.log(res);
    } catch (err) {
      console.error("Try again later", err);
    }
  };

  //Update operation

  updatePost = async () => {
    try {
      const { id, userId, title, body } = this.state;

      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          userId,
          title,
          body,
        }
      );
      const posts = [...this.state.posts];

      const index = posts.findIndex((post) => post.id === id); //compare with particular post id . getting index value then change it

      posts[index] = data;
      this.setState({ posts, userId: "", title: "", body: "", id: "" });
      console.log(index);
    } catch (err) {
      // console.log(`Updated ${data}`);
      console.log("updated done", err);
    }
  };

  //delete operations

  deletePost = async (postId) => {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      //comparing all posts Id to deleted post id:

      let posts = [...this.state.posts];
      // compare using filter();

      posts = posts.filter((post) => post.id !== postId); //now posts have all the data except deleted data.

      this.setState({ posts });

      console.log(`${postId} deleted"`);
    } catch (err) {
      console.log("delete operation error");
    }
  };

  componentDidMount() {
    //initial api call only once mounterd.
    this.getPosts();
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  };

  // we could do this on update onclick function also .  for simplicity:

  // selectPostToUpdate = (post) => {
  //   this.setState({
  //     ...post,
  //     // userId:post.userId,
  //     // id:post.id,
  //     // title:post.title,  we could use also .
  //     // body:post.body,
  //   }); // copied inital data;
  //   console.log(post);
  // };

  render() {
    return (
      <>
        <h1 className="header">CRUD operations</h1>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>User Id: </label>
            <input
              name="userId"
              type="text"
              value={this.state.userId}
              onChange={this.handleChange}
            />
          </div>{" "}
          <br />
          <div>
            <label>Title: </label>
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <label>Body: </label>
            <input
              name="body"
              type="text"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <button type="submit">Submit</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>UserID</th>
              <th>Title</th>
              <th>Post</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <button onClick={() => this.deletePost(post.id)}>
                    Delete
                  </button>
                  <button onClick={() => this.setState({ ...post })}>
                    Update
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default App;
