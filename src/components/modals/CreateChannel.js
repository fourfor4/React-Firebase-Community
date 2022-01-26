import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';

const CreateChannelModal = ({ isModalVisible, setIsModalVisible }) => {
  const [channelName, setChannelName] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  const handleOk = () => {
    setChannelName("")
    setIsModalVisible(false);
    db.collection('channels').add({
      name: channelName,
      email: user.email,
      createdAt: new Date()
    })
  };

  const handleCancel = () => {
    setChannelName("")
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title="Create Channel" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input placeholder="Channel Name" value={channelName} onChange={e => setChannelName(e.target.value)} />
      </Modal>
    </>
  );
};

export default CreateChannelModal;
