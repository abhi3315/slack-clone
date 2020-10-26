import React, { Component } from "react"
import { Segment, Button, Input } from "semantic-ui-react"
import { Picker, emojiIndex } from "emoji-mart"
import "emoji-mart/css/emoji-mart.css"
import FileModal from "./FileModal"
import ProgressBar from "./ProgressBar"
import { addNewMessage } from '../../helper/api'

class MessageForm extends Component {
  state = {
    uploadState: "",
    percentUploaded: 0,
    message: "",
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    loading: false,
    errors: [],
    modal: false,
    emojiPicker: false,
  }

  openModal = () => this.setState({ modal: true })

  closeModal = () => this.setState({ modal: false })

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      this.sendMessage()
    }
  }

  handleTogglePicker = () => {
    this.setState({ emojiPicker: !this.state.emojiPicker })
  }

  handleAddEmoji = emoji => {
    const oldMessage = this.state.message
    const newMessage = this.colonToUnicode(` ${oldMessage} ${emoji.colons} `)
    this.setState({ message: newMessage, emojiPicker: false })
    setTimeout(() => this.messageInputRef.focus(), 0)
  }

  colonToUnicode = message => {
    return message.replace(/:[A-Za-z0-9_+-]+:/g, x => {
      x = x.replace(/:/g, "")
      let emoji = emojiIndex.emojis[x]
      if (typeof emoji !== "undefined") {
        let unicode = emoji.native
        if (typeof unicode !== "undefined") {
          return unicode
        }
      }
      x = ":" + x + ":"
      return x
    })
  }


  sendMessage = () => {
    const formData = new FormData()
    formData.append('content', this.state.message)
    formData.append('channel', this.state.channel._id)
    addNewMessage(formData)
      .then(res => console.log(res))
  }

  sendFile = (file) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('channel', this.state.channel._id)
    addNewMessage(formData)
      .then(res => console.log(res))
  }

  render() {
    const {
      errors,
      message,
      loading,
      modal,
      uploadState,
      percentUploaded,
      emojiPicker,
    } = this.state

    return (
      <Segment className="message__form">
        {emojiPicker && (
          <Picker
            set="apple"
            onSelect={this.handleAddEmoji}
            className="emojipicker"
            title="Pick your emoji"
            emoji="point_up"
          />
        )}
        <Input
          fluid
          name="message"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={
            <Button
              icon={emojiPicker ? "close" : "add"}
              content={emojiPicker ? "Close" : null}
              onClick={this.handleTogglePicker}
            />
          }
          labelPosition="left"
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            disabled={loading}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            onClick={this.openModal}
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={this.closeModal}
          sendFile={this.sendFile}
        />
        <ProgressBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    )
  }
}

export default MessageForm
