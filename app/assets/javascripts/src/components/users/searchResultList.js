import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'

class SearchResultList extends React.Component {

  render() {
    const searchUserList = this.props.searchUserList
    console.log('SearchResultList.js:searchUserList')
    console.log(searchUserList)
    const searchResultList = _.map(searchUserList, (searchResult) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
      })

      return (
        <li 
          className={ itemClasses }
        >
          <div className='user-list__item__picture'>

          </div>
          <div className='user-list__item__details'>
            <h4 className='user-list__item__name'>
              { searchResult.name }
            </h4>
          </div>
        </li>
      )
    }, this)
    return (
      <div className='search_result'>
        <ul>
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
