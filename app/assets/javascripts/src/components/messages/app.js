import React from 'react'
import UserList from './userList'
import MessagesBox from './messagesBox'
import UserStore from '../../stores/user'
import MessagesAction from '../../actions/messages'

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }

  getStateFromStore() {
    // ログインユーザーの情報を取得
    const currentUser = UserStore.getCurrentUser()
    // chatユーザー(相手)IDを取得
    const openChatUserID = UserStore.getChatUserID()
    MessagesAction.getMessages(openChatUserID)
    return {
      currentUser: currentUser,
      openChatUserID: openChatUserID,
    }
  }

  componentWillMount() {
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  render() {
    return (
        <div className='app'>
          <UserList currentUser={this.state.currentUser} openChatUserID={this.state.openChatUserID}/>
          <MessagesBox currentUser={this.state.currentUser} openChatUserID={this.state.openChatUserID}/>
        </div>
      )
  }
}

export default App
