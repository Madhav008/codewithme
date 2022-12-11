import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ username }) => {
    return (
        <div className="flex items-center flex-col font-medium font-mono" >
            <Avatar name={username} size={50} round="14px" />
            <span className="mt-[10px] ">{username}</span>
        </div>
    );
};

export default Client;