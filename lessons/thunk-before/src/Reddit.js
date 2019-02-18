import React from 'react';
import { connect } from 'react-redux';

class Reddit extends React.Component {
  render() {
    const { posts } = this.props;

    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <span>{post.score}</span>
            <div>
              <h2>{post.title}</h2>
              <div>{post.num_comments} comments</div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

const mapState = state => ({
  posts: state.posts
});

export default connect(mapState)(Reddit);
