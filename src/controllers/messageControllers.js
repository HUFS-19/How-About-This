import db from '../db';

export const postMessage = (req, res) => {
  const { chatRoomId, product, inquirerId, message } = req.body;
  const { prodID, userID, cateID } = product;
  const { text, senderId } = message.pop();
  db.query(
    `insert into message (chatRoomID, prodID, userID, cateID, inquirerID, senderID, content) value('${chatRoomId}', '${prodID}', '${userID}', '${cateID}', '${inquirerId}', '${senderId}', '${text}')`,
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Interal Server Error');
      }
      return res.send(results);
    },
  );
};
