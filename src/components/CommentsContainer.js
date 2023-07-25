import React from "react";

const commentsData = [
  {
    name: "vibhor soni",
    text: "lorem 10 nlnldmlmml jkjksdjkljmkljljskldjklj knkbjkhksdnkl",
    replies: [],
  },
  {
    name: "vibhor soni",
    text: "lorem 10 nlnldmlmml jkjksdjkljmkljljskldjklj knkbjkhksdnkl",
    replies: [
      {
        name: "vibhor soni",
        text: "lorem 10 nlnldmlmml jkjksdjkljmkljljskldjklj knkbjkhksdnkl",
        replies: [
          {
            name: "vibhor soni",
            text: "lorem 10 nlnldmlmml jkjksdjkljmkljljskldjklj knkbjkhksdnkl",
            replies: [],
          },
        ],
      },
    ],
  },
];

const Comment = ({ data }) => {
  const { name, text, replies } = data;
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
      <img
        className="w-12 h-12"
        alt="user"
        src="https//images.unsplash.com/photo-1690040158054-04a19549b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
      />

      <div className="px-3">
        <p className="font-bold">{name}</p>
        <p> {text}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return comments.map((comment, index) => (
    <div>
      <Comment data={comment} key={index} />
      <div className="pl-5 border border-l-black ml-5">
        <CommentList comments ={comment.replies} />
      </div>
    </div>
  ));
};  

const CommentsContainer = () => {
  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments : </h1>
      <CommentList comments={commentsData} />
    </div>
  );
};

export default CommentsContainer;
