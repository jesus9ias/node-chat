
export default (APP, chatApp) => {
  APP.get('/', (req, res) => {
    res.render('home');
  });
};
