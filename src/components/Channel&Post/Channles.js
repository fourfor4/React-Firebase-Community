import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { db } from '../../firebase';
import { Divider } from 'antd'
import { setChannelId } from '../../actions/communityActions';
import classnames from 'classnames'

// component for channels.
const Channels = () => {
  const [channels, setChannels] = useState([])

  const dispatch = useDispatch()
  const channelId = useSelector(state => state.community.channelId)
  const user = useSelector(state => state.user)

  const setChannel = (channel) => {
    dispatch(setChannelId({
      channelId: channel.id
    }))
  }

  useEffect(() => {
    db.collection('channels').onSnapshot(data => {
      let channels = []
      data.forEach(item => {
        channels.push({
          id: item.id,
          name: item.data().name,
          email: item.data().email,
          createdAt: item.data().createdAt
        })
      })
      setChannels(channels.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds))
    })
  }, [])

  return (
    <div>
      <div className='text-center mb-2'>
        Channels
      </div>
      {channels.map((channel) => (
        <div key={channel.id} style={{ cursor: 'pointer' }} onClick={() => setChannel(channel)}>
          <div className={classnames('channel-item', { 'channel-item-active': (channel.id === channelId), 'channel-item-mine': channel.id === channelId && channel.email === user.email })}>
            {channel.name}
          </div>
          <Divider style={{ margin: 0 }} />
        </div>
      ))
      }
    </div >
  )
}

export default Channels