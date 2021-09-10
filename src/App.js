import axios from "axios";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
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

      this.setState({ posts: posts });

      // const data = await res.json();  // no need to parse using axios lib
      console.log(data);
      // this.setState({ posts: data });
      // console.log(res);
    } catch (err) {
      console.error("Try again later", err);
    }
  };

  //Update operation

  updatePost = (postId) => {
    console.log(`"Updated" ${postId}`);
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
    this.createPost();
  };

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
          <tr>
            <th>ID</th>
            <th>UserID</th>
            <th>Title</th>
            <th>Post</th>
            <th>Actions</th>
          </tr>

          {this.state.posts.map((post) => {
            return (
              <tr>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <button onClick={() => this.deletePost(post.id)}>Delete</button>
                <button onClick={() => this.updatePost(post.id)}>Edit</button>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}

export default App;
