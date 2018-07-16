import React from 'react'
import SearchResultList from './searchResultList'
import UserStore from '../../stores/user'
import UsersAction from '../../actions/users'

class SearchUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    // 検索したユーザーリストを取得
    const searchUserList = UserStore.getSearchUsers()
    return {
      searchUserList: searchUserList,
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

  handleKeyDown(e) {
    const search_string = e.target.value
    // 検索文字列を含むユーザーを検索
    UsersAction.getSearchUsers(search_string)
  }

  render() {
    return (
      <div className='search_user'>
        <h1 className='title'>
          <span className='title_C'>C</span>
          <span className='title_h'>h</span>
          <span className='title_a1'>a</span>
          <span className='title_t'>t</span>
          <span className='title_A2'>A</span>
          <span className='title_p1'>p</span>
          <span className='title_p2'>p</span>
        </h1>
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
