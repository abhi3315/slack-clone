import React, { Component } from "react"
import {
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Button,
} from "semantic-ui-react"
import Pusher from 'pusher-js'
import { connect } from "react-redux"
import { addNewChannel } from '../../helper/api'
import { setCurrentChannel, setUserPosts } from "../../actions"
import { getAllChannels } from '../../helper/api'

const PUSHER_APP_KEY = '3d220163f622a8b240af'
const PUSHER_APP_CLUSTER = 'ap2'

class Channels extends Component {
  state = {
    channel: null,
    channels: [],
    channelName: "",
    channelDetails: "",
    modal: false,
    firstLoad: true,
    activeChannel: "",
  }

  componentDidMount() {
    getAllChannels()
      .then(channels => {
        this.setState({ channels })
        this.props.setCurrentChannel(channels[0])
        this.props.setUserPosts(channels[0].messages)
      })
      .catch(e => console.log(e))

    this.pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
      encrypted: true,
    })

    this.channels = this.pusher.subscribe('channels')
    this.channels.bind('inserted', this.addChannelToState.bind(this))

    this.messages = this.pusher.subscribe('messages')
    this.messages.bind('inserted', this.addMessageToState)
  }

  addChannelToState = (channel) => {
    const { channels } = this.state
    this.setState({ channels: channels.concat([channel]) })
  }

  addMessageToState = (message) => {
    try {
      let { channels } = this.state
      channels.forEach((channel, index) => {
        if (channel._id === message.channel) {
          channels[index].messages.push(message)
          this.setState({ channels })
          this.props.setUserPosts(channels[index].messages)
        }
      })
    } catch (e) {
      console.log(e);
    }
  }

  addChannel = () => {
    addNewChannel(this.state)
      .then(channel => {
        if (!channel) throw new Error('Unable to add channel!')
        this.setState({ channelName: "", channelDetails: "" })
        this.closeModal()
        console.log("channel added")
      }).catch(err => {
        console.log(err)
      })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.isFormValid(this.state)) {
      this.addChannel()
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  changeChannel = channel => {
    this.setActiveChannel(channel)
    this.props.setCurrentChannel(channel)
    this.props.setUserPosts(channel.messages)
    this.setState({ channel })
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel._id })
  }

  displayChannels = channels =>
    channels.length > 0 &&
    channels.map(channel => (
      <Menu.Item
        key={channel._id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
        active={channel._id === this.state.activeChannel}
      >
        # {channel.name}
      </Menu.Item>
    ))

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails

  openModal = () => this.setState({ modal: true })

  closeModal = () => this.setState({ modal: false })

  render() {
    const { channels, modal } = this.state

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default connect(null, { setCurrentChannel, setUserPosts })(Channels)
