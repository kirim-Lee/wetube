export const home = (req, res) => res.render("home", {pageTitle: 'Home'});
export const search = (req, res) => {
    const {term: searchingBy} = req.query;
    return res.render("search", {pageTitle: 'Search', searchingBy});
}
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");