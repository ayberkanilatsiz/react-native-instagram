module.exports = {
  login: async function(clientId,cb) {
    await fetch('https://api.instagram.com/v1/users/self/media/recent/?access_token='+clientId)
      .then((response) => response.json())
      .then((jsonRes) => cb(null,jsonRes))
      .catch((error) => {
        console.log('error!!-> ',error)
        cb(error,null)
      });
  },
  getSelfInfo: async function(clientId,cb){
    await fetch('https://api.instagram.com/v1/users/self/?access_token='+clientId)
    .then((response) => response.json())
    .then((jsonRes) => cb(null,jsonRes))
    .catch((error) =>{
      console.log(error);
      cb(error,null)
    });
  }
};