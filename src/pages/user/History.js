import React from "react";
import UserNav from "../../components/nav/UserNav";
import { useSelector } from "react-redux";
import { List, Divider, Avatar } from "antd";
import { UserOutlined, ContactsOutlined } from "@ant-design/icons";

const data = [
     "This is a protected Route",
     "components ----> routes",
     "You can update your password.",
];

const History = () => {
     const { user } = useSelector((state) => ({ ...state }));

     return (
          <div className="container-fluid">
               <div className="row">
                    <div className="col-md-2 mb-5">
                         <UserNav />
                    </div>
                    <div className="col text-left">
                         <h4>Login Success!!</h4>
                         <Divider />
                         <h3>
                              <List
                                   size="large"
                                   header={
                                        <div>
                                             <Avatar
                                                  className="mr-3"
                                                  style={{
                                                       backgroundColor:
                                                            "#87d068",
                                                  }}
                                                  icon={<UserOutlined />}
                                             />
                                             {user.name}
                                             <Divider />
                                             <Avatar
                                                  className="mr-3"
                                                  style={{
                                                       backgroundColor:
                                                            "#1E90FF	",
                                                  }}
                                                  icon={<ContactsOutlined />}
                                             />
                                             {user.email}
                                        </div>
                                   }
                                   bordered
                                   dataSource={data}
                                   renderItem={(item) => (
                                        <List.Item>{item}</List.Item>
                                   )}
                              />
                         </h3>
                    </div>
               </div>
          </div>
     );
};

export default History;
