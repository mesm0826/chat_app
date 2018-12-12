import React from 'react'
import UsersAction from '../../actions/users'
import _ from 'lodash'

class SearchResultList extends React.Component {

  // 友達関係の保存
  saveFriendship(e) {
    const targetUserName = e.currentTarget.textContent
    UsersAction.saveFriendship(targetUserName)
  }

  render() {
    const searchUserList = this.props.searchUserList
    const searchResultList = _.map(searchUserList, (searchResult) => {
      return (
        <li
          className='search_user_list'
          onClick={ this.saveFriendship.bind(this) }
        >
          <div className='search_user_list_item'>
            <div className='search_user_list_details'>
              <img className='search_user_list_image' src={searchResult.image_name.url}/>
              { searchResult.name }
            </div>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='search_result'>
        <ul className='search_result_ul'>
          { searchResultList }
        </ul>
      </div>
    )
  }
}
SearchResultList.propTypes = {
  searchUserList: React.PropTypes.array,
}
export default SearchResultList
