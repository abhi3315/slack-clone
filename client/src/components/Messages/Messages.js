import React, { Component } from "react"
import MessagesHeader from "./MessagesHeader"
import MessageForm from "./MessageForm"
import { Segment, Comment } from "semantic-ui-react"
import Message from "./Message"
import { connect } from "react-redux"
import Skeleton from "./Skeleton"

class Messages extends Component {
  state = {
    channel: this.props.currentChannel,
    isChannelStarred: false,
    user: this.props.currentUser,
    searchTerm: "",
    searchLoading: false,
    searchResults: [],
  }

  handleSearchChange = e => {
    this.setState(
      {
        searchTerm: e.target.value,
        searchLoading: true,
      },
      () => this.handleSearchMessages()
    )
  }

  handleSearchMessages = () => {
    const channelMessages = [...this.props.userPosts]
    const regex = new RegExp(this.state.searchTerm, "gi")
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message)
      }
      return acc
    }, [])
    this.setState({ searchResults })
    setTimeout(() => this.setState({ searchLoading: false }), 1000)
  }

  displayMessages = messages => {
    if (messages) {
      return messages.length > 0 &&
        messages.map(message => (
          <Message
            key={message.timestamp}
            message={message}
            user={this.state.user}
          />
        ))
    }
  }

  displayChannelName = channel => (channel ? `#${channel.name}` : "")

  displayMessageSkeleton = () => (
    <React.Fragment>
      {[...Array(10)].map((_, i) => (
        <Skeleton key={i} />
      ))}
    </React.Fragment>
  )

  render() {
    const {
      channel,
      user,
      searchTerm,
      searchResults,
      searchLoading,
      isChannelStarred,
    } = this.state

    const messages = this.props.userPosts

    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(channel)}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
          handleStar={this.handleStar}
          isChannelStarred={isChannelStarred}
        />

        <Segment className="messages">
          <Comment.Group>
            {!messages && this.displayMessageSkeleton()}
            {searchTerm
              ? this.displayMessages(searchResults)
              : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          currentChannel={channel}
          currentUser={user}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  currentChannel: state.channel.currentChannel,
  userPosts: state.channel.userPosts,
})

export default connect(mapStateToProps)(Messages)
