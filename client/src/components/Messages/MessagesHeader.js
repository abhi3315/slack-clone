import React, { Component } from 'react'
import { Header, Segment, Input } from 'semantic-ui-react'

class MessageHeader extends Component {
    render() {
        const {
            channelName,
            numUniqueUsers,
            handleSearchChange,
            searchLoading
        } = this.props

        return (
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }} >
                    {channelName}
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>
                <Header floated="right">
                    <Input
                        loading={searchLoading}
                        onChange={handleSearchChange}
                        size="mini"
                        icon="search"
                        name="searchItem"
                        placeholder="Search Messages"
                    />
                </Header>
            </Segment>
        )
    }
}

export default MessageHeader