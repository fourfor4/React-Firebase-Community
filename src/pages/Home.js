import React, { useState, useEffect } from 'react'
import { Steps, Divider } from 'antd';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore'
import { Button, } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CreateChannelModal from '../components/modals/CreateChannel';
import Channels from '../components/Channel&Post/Channles';
import Posts from '../components/Channel&Post/Posts';

const Home = () => {
  const [createChannelModalVisible, setCreateChannelModalVisible] = useState(false)

  return (

    <div className="container ">
      <div className="row">
        <div className="col-12">
          <Button type='primary' icon={<PlusOutlined />} onClick={() => setCreateChannelModalVisible(true)}>Create Channel</Button>
          <Divider />
          <div>
            <div className='row'>
              <div className='col-3'>
                <Channels />
              </div>
              <div className='col-9'>
                <Posts />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateChannelModal isModalVisible={createChannelModalVisible} setIsModalVisible={setCreateChannelModalVisible} />
    </div>
  )
}

export default Home
