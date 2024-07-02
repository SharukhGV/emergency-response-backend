const db = require("../db/dbConfig");

// I found out that put/patch also creates a post if data not there using what is in the body.Still little gray about this (ie.patch).

const patcheInformative = async (communityinteractions) => {
   return await db.oneOrNone("UPDATE communityinteractions SET informative = $1 WHERE username = $2 AND user_post_id = $3", [communityinteractions.informative, communityinteractions.info.username, communityinteractions.info.user_post_id]);

};

const patcheSurprising = async (info, communityinteractions) => {

  return await db.oneOrNone("UPDATE communityinteractions SET surprising = $1 WHERE username = $2 AND user_post_id = $3", [communityinteractions.surprising, communityinteractions.info.username, communityinteractions.info.user_post_id]);

};

const patcheThanks = async (info, communityinteractions) => {

   return await db.oneOrNone("UPDATE communityinteractions SET thanks = $1  WHERE username = $2 AND user_post_id = $3", [communityinteractions.thanks, communityinteractions.info.username, communityinteractions.info.user_post_id]);

};


const getAllCommunityInteractions = async () => await db.any("SELECT * FROM communityinteractions");

module.exports = {

    // createCommunityInteraction,
    patcheInformative,
    patcheSurprising,
    patcheThanks,
    getAllCommunityInteractions
}
