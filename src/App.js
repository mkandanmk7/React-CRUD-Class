import axios from "axios";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
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

  createPost = () => {};

  //Update operation

  createPost = () => {};

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
      console.log("delete operation error", err);
    }
  };

  componentDidMount() {
    //initial api call only once mounterd.
    this.getPosts();
  }

  render() {
    return (
      <>
        <h1 className="header">CRUD operations</h1>
        <table>
          <tr>
            <th>UserID</th>
            <th>ID</th>
            <th>Title</th>
            <th>Post</th>
            <th>Actions</th>
          </tr>

          {this.state.posts.map((post) => {
            return (
              <tr>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
                <button onClick={() => this.deletePost(post.id)}>Delete</button>
              </tr>
            );
          })}
        </table>
      </>
    );
  }
}

export default App;
