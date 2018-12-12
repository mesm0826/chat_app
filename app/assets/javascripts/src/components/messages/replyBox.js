import React from 'react'
import MessagesAction from '../../actions/messages'

class ReplyBox extends React.Component {

  static get propTypes() {
    return {
      openChatUserID: React.PropTypes.number,
    }
  }

  constructor(props) {
    super(props)
    this.state = this.initialState
  }

  get initialState() {
    return {
      value: '',
    }
  }
  // Enter単押しで更新されるのを防止
  handleKeyDown(e) {
    if (e.keyCode === 13 && this.state.value !== '') {
      const to_user_id = this.props.openChatUserID
      MessagesAction.saveMessage(this.state.value, to_user_id)
      this.setState({
        value: '',
      })
    }
  }
  // 更新
  updateValue(e) {
    this.setState({
      value: e.target.value,
    })
  }
  // 画像選択時
  selectImage(e) {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      const to_user_id = this.props.openChatUserID
      // 画像を登録
      MessagesAction.saveImage(file, to_user_id)
    }
  }

  render() {
    return (
      <div className='reply-box'>
        <input
          value={ this.state.value }
          onKeyDown={ this.handleKeyDown.bind(this) }
          onChange={ this.updateValue.bind(this) }
          className='reply-box__input'
          placeholder='Type message to reply..'
        />
        <span className='reply-box__tip'>
          Press <span className='reply-box__tip__button'>Enter</span> to send
        </span>
        <input
          type='file'
          onChange={ this.selectImage.bind(this) }
          className='reply-box__input_image'/>
      </div>
    )
  }
}

export default ReplyBox
