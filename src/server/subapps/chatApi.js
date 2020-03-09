
export default (CHAT_API, chatApp) => {
  CHAT_API.get('/', (req, res) => {
    res.json({});
  });
};
