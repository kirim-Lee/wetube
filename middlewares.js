import path from 'path';
import multer from 'multer';
import routes from './routes';

/*const imageStorage = multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'uploads/avatars/');
    },
    filename: function(_req, file, cb){
      var filename = Date.now();
      if (file.mimetype) {
          filename = filename + file.mimetype.replace('image/', '.');
      }
      cb(null, filename);
    }
});*/
export const multerVideo = multer({ dest: 'uploads/videos/' });
// export const multerAvatar = multer({storage: imageStorage});
export const multerAvatar = multer({dest: 'uploads/avatars/'});

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = 'WeTube';
    res.locals.routes = routes;
    res.locals.loggedUser = req.user;
    next();
};

export const onlyPublic = (req, res, next) => {
    if(req.user) { 
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if(!req.user) {
        res.redirect(routes.login);
    } else {
        next();
    }
}

export const uploadVideo = multerVideo.single('videoFile');
export const uploadAvatar = multerAvatar.single('avatar');