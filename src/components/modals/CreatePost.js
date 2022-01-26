import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { Input } from 'antd';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { toast } from 'react-toastify';

const { TextArea } = Input
const CreatePost = ({ isModalVisible, setIsModalVisible, channelId, postTitle, replyPostId }) => {
  const [postSubject, setPostSubject] = useState("");
  const [postBody, setPostBody] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  const handleOk = () => {
    if (postSubject !== "" && postBody !== "") {
      db.collection('channels').doc(channelId).collection('posts').add({
        subject: postSubject,
        body: postBody,
        email: user.email,
        replyPostId: replyPostId,
        createdAt: new Date()
      })
      setPostSubject("")
      setPostBody("")
      setIsModalVisible(false);
    } else {
      toast.error('Please fill the subject and body')
    }
  };

  const handleCancel = () => {
    setPostSubject("")
    setPostBody("")
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal title={postTitle} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input className='mb-2' placeholder="Subject" value={postSubject} onChange={e => setPostSubject(e.target.value)} />
        <TextArea placeholder="Body" rows={5} value={postBody} onChange={e => setPostBody(e.target.value)} />
      </Modal>
    </>
  );
};

export default CreatePost;
