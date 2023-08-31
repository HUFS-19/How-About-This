import db from '../db';

export const postMessage = (req, res) => {
  const { chatRoomId, product, inquirerId, senderId, message } = req.body;
  const { prodID, userID, cateID } = product;
  db.query(
    `insert into message (chatRoomID, prodID, userID, cateID, inquirerID, senderID, content) value('${chatRoomId}', '${prodID}', '${userID}', '${cateID}', '${inquirerId}', '${senderId}', '${message}')`,
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Interal Server Error');
      }
      return res.send(results);
    },
  );
};

export const getAllMessage = (req, res) => {
  const chatRoomId = req.params.chatroomId;
  db.query(
    `select content, senderID, time from message where chatroomID='${chatRoomId}' order by time asc`,
    (error, results) => {
      if (error) {
        return res.status(500).send('Internal Server Error');
      }

      return res.send(results);
    },
  );
};
