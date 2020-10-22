import React, { Component } from "react"
import {
  Grid,
  Header,
  Icon,
  Dropdown,
  Image,
  Modal,
  Input,
  Button,
} from "semantic-ui-react"

class UserPanel extends Component {
  state = {
    user: this.props.currentUser,
    modal: false,
    image: "",
    blob: "",
    uploadedCroppedImage: "",
    metadata: {
      contentType: "image/jpeg",
    },
  }

  openModal = () => this.setState({ modal: true })

  closeModal = () => this.setState({ modal: false })

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.name}</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
      onClick: this.openModal,
    },
    {
      key: "signout",
      text: <span>Sign Out</span>,
      onClick: this.handleSignout,
    },
  ]

  // uploadCroppedImage = () => {
  // }

  // changeAvatar = () => {
  // }

  handleChange = event => {
    const file = event.target.files[0]
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.addEventListener("load", () => {
        this.setState({ image: reader.result })
      })
    }
  }

  // handleSignout = () => {
  // }

  render() {
    const { user, modal, image } = this.state

    return (
      <Grid>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            <Header inverted floated="left" as="h2">
              <Icon name="code" />
              <Header.Content>DevChat</Header.Content>
            </Header>

            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.avatar} spaced="right" avatar />
                    {user.name}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input
                onChange={this.handleChange}
                fluid
                type="file"
                label="New Avatar"
                name="avatar"
              />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column>
                    {image && (
                      <Image
                        style={{ margin: "3.5rem auto" }}
                        width={100}
                        height={100}
                        src={image}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              {image && (
                <Button
                  color="green"
                  inverted
                  onClick={this.uploadImage}
                >
                  <Icon name="save" /> Change Avatar
                </Button>
              )}
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid>
    )
  }
}

export default UserPanel
