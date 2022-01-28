import React, { useState } from 'react';
import { Modal } from 'antd';
import { Input } from 'antd';
import { db } from '../../firebase';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import constants from '../../constants';

const { TextArea } = Input
const CreatePost = ({ isModalVisible, setIsModalVisible, channelId, postTitle, replyPostId }) => {
  const [postSubject, setPostSubject] = useState("");
  const [postBody, setPostBody] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  // Add or Reply post
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
      toast.error(constants.post_alert)
    }
  };

  // Cancel modal
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
