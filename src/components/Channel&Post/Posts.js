import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import { PlusOutlined } from '@ant-design/icons';
import CreatePost from "../modals/CreatePost";
import { Button, Empty, Comment, Tooltip, Divider, Avatar, BackTop } from "antd";
import { toast } from "react-toastify";


// component for posts
const Posts = () => {

  const [createPostModalVisible, setCreatePostModalVisible] = useState(false)
  const [postTitle, setPostTitle] = useState("Create Post")
  const [posts, setPosts] = useState([])
  const [replyPostId, setReplyPostId] = useState('')

  const { channelId } = useSelector(state => state.community)
  const user = useSelector(state => state.user)

  // Create Post with permission
  const createPost = () => {
    if (user.permission) {
      setPostTitle('Create Post')
      setCreatePostModalVisible(true)
      setReplyPostId('')
    } else {
      toast.error("You are not allowed to post, because you are not a member of levelshealth.com.");
    }
  }

  // Reply Post with permission
  const replyPost = (post) => {
    if (user.permission) {
      setPostTitle('Reply Post')
      setCreatePostModalVisible(true)
      setReplyPostId(post.id)
    } else {
      toast.error("You are not allowed to post, because you are not a member of levelshealth.com.");
    }
  }

  // Header of post - render part
  const replyHeader = (post) => {
    console.log(post)
    if (post.replyPostId !== "") {
      const replyPost = posts.filter(item => item.id === post.replyPostId)[0]
      return (
        <div>
          {post.email} - {replyPost.subject} ({replyPost.email})
        </div>
      )
    } else {
      return (
        <div>{post.email}</div>
      )
    }
  }

  useEffect(() => {

    // Hook the change of posts in the database realtime
    channelId != '' && db.collection('channels').doc(channelId).collection('posts').onSnapshot(data => {
      let posts = []
      data.forEach(item => {
        posts.push({
          id: item.id,
          subject: item.data().subject,
          body: item.data().body,
          email: item.data().email,
          replyPostId: item.data().replyPostId,
          createdAt: item.data().createdAt
        })
      })
      setPosts(posts.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds))
    })
  }, [channelId])

  return (
    <div>
      <BackTop />
      <div className="d-flex">
        <Tooltip title="New Post">
          <Button
            className="ml-auto"
            type='danger'
            icon={<PlusOutlined />}
            shape="circle"
            onClick={() => createPost()}
          />
        </Tooltip>
      </div>
      <div>
        {channelId === '' ? <Empty /> : (
          <div>
            {posts.length !== 0 ? posts.map(post => (
              <div key={post.id}>
                <Comment
                  actions={
                    [<span
                      key="comment-basic-reply-to"
                      onClick={() => replyPost(post)}>
                      Reply to
                    </span>]
                  }
                  author={replyHeader(post)}
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
                  content={
                    <>
                      <h6>{post.subject}</h6>
                      <p>
                        {post.body}
                      </p>
                    </>
                  }
                />
                <Divider />
              </div>
            )) : (
              <Empty />
            )}
          </div>
        )}
      </div>
      <CreatePost
        isModalVisible={createPostModalVisible}
        setIsModalVisible={setCreatePostModalVisible}
        channelId={channelId}
        postTitle={postTitle}
        replyPostId={replyPostId}
      />
    </div>
  )
}

export default Posts;
