import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
import MessagesStore from '../../stores/messages'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    console.log('app.js:initialState()')
    UsersAction.getCurrentUser()
    MessagesAction.getMessages()
    return this.getStateFromStore()
  }

  getStateFromStore() {
    UserStore.getOpenChatUserID()
    const openChatUserID = UserStore.getChatUserID()
    console.log('openChatUserID')
    console.log(openChatUserID)
    return {
      openChatUserID: openChatUserID,
    }
  }

  componentWillMount() {
    console.log('app.js:componentWillMount()')
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    console.log('app.js:componentWillUnmount()')
    MessagesStore.offChange(this.onStoreChange.bind(this))
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    return (
        <div className='app'>
          <UserList openChatUserID={this.state.openChatUserID}/>
          <MessagesBox openChatUserID={this.state.openChatUserID}/>
        </div>
      )
  }
}

export default App
