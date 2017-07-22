import React from 'react';
import PropTypes from 'prop-types';

class UpvotesShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      showJson: false
    };
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.toggleShowJson = this.toggleShowJson.bind(this);
  }
  render() {
    const data = this.props.upvote.data;
    return (
      <div className="upvote">
        <div className="header">
          <div className="thumbnail">
            {data.thumbnail && data.thumbnail !== 'self' &&
              <img src={decodeURI(data.thumbnail)} />
            }
          </div>
          <div className="title">
            <h2>{data.title}</h2>
            <h3>{data.subreddit_name_prefixed}</h3>
          </div>
        </div>
        <div className="controls">
          <button onClick={this.toggleExpansion}>Expand</button>
          <button onClick={this.toggleShowJson}>Show JSON</button>
        </div>
        {this.state.showJson && <div className="raw">
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>}
        {this.state.expanded && data.media && data.media.oembed &&
          <div dangerouslySetInnerHTML={{__html: data.media.oembed.html}} />
        }
        <br />
        <div className="divider">
          <hr />
        </div>
      </div>
    );
  }
  toggleExpansion() {
    this.setState({
      expanded: !this.state.expanded
    });
  }
  toggleShowJson() {
    this.setState({
      showJson: !this.state.showJson
    });
  }
};

UpvotesShow.propTypes = {
  upvote: PropTypes.object.isRequired
};

export default UpvotesShow;
