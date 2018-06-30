import React from 'react'
import SearchResultList from './searchResultList'
import UserStore from '../../stores/user'
import UsersAction from '../../actions/users'

class SearchUser extends React.Component {
  constructor(props) {
    super(props)
    console.log('SearchUser.js:props')
    console.log(props)
    this.state = this.initialState
  }
  // 初期状態はブランク
  get initialState() {
    console.log('SearchUser.js:initialState()')
    return this.getStateFromStore()
  }
  getStateFromStore() {
    const searchUserList = UserStore.getSearchUsers()
    console.log('searchUserList')
    console.log(searchUserList)
    return {
      searchUserList: searchUserList,
    }
  }
  componentWillMount() {
    console.log('SearchUser.js:componentWillMount()')
    UserStore.onChange(this.onStoreChange.bind(this))
  }

  componentWillUnmount() {
    console.log('SearchUser.js:componentWillUnmount()')
    UserStore.offChange(this.onStoreChange.bind(this))
  }

  onStoreChange() {
    this.setState(this.getStateFromStore())
  }

  handleKeyDown(e) {
    console.log('SearchUser.js:handleKeyDown(e)')
    const search_string = e.target.value
    UsersAction.getSearchUsers(search_string)
  }
  // updateValue(e) {
  //   console.log('SearchUser.js:updateValue(e)')
  //   console.log('e.target.value')
  //   console.log(e.target.value)
  //   this.setState({
  //     value: e.target.value,
  //   })
  // }
  render() {
    return (
      <div className='search_user'>
        <h1>ChatApp</h1>
        <input
          value={ this.state.value }
          onChange={ this.handleKeyDown.bind(this) }
          className='search_user_input'
          placeholder='ユーザー名で検索しよう'
        />
        <SearchResultList searchUserList={this.state.searchUserList}/>
      </div>
    )
  }
}
export default SearchUser
