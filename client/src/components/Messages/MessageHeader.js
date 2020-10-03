import React, { Component } from 'react'
import { Header, Segment, Input, Icon, Message } from 'semantic-ui-react'

class MessageHeader extends Component {
    render() {
        const {
            channelName,
            numUniqueUsers,
            handleSearchChange,
            searchLoading,
            handleStar,
            isChannelStarred
        } = this.props

        return (
            <Segment clearing>
                <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }} >
                    <span>
                        {channelName}
                        <Icon
                            onClick={handleStar}
                            name={isChannelStarred ? "start" : "star outline"}
                            color={isChannelStarred ? "yellow" : "black"}
                        />
                    </span>
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>
                </Header>
                <Header floated="right">
                    <Input
                        loading={searchLoading}
                        onChange={handleSearchChange}
                        size="mini"
                        icon="search"
                        name="searchItem"
                        placeHolder="Search Messages"
                    />
                </Header>
            </Segment>
        )
    }
}

export default MessageHeader