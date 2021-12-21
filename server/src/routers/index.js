const express = require("express");
const router = express.Router();
/*controllers */
//router admin

//middlewares

const { register, login } = require("../controllers/user");
router.post("/regist", register);
router.post("/login", login);

const {
  getListPoke,
  getDetailPoke,
  addPoke,
  catchPokemon,
  releasePokemon,
  getUserCatchedPoke,
  renamePoke
} = require("../controllers/pokeapi/pokeapi");
router.get("/listpoke", getListPoke);
router.get("/detailpoke/:id/", getDetailPoke);
router.get("/userPokes", getUserCatchedPoke);
router.post("/addpoke", addPoke);
router.post("/catchpoke", catchPokemon);
router.post("/releasepoke", releasePokemon);
router.post("/renamepoke/:user_id/:poke_id", renamePoke);

module.exports = router;
