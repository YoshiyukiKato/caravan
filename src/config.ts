//read config file
//AB出しわけの情報管理をしたい
//* 全コンポーネントのリスト
//* コンポーネントidと対応するカスタマid枠 :: 先頭 0~f
//* 
/**
 * config format
 * {
 *    name : "",
 *    components : ["path/to/component"], //コンポーネントのリスト指定
 * }
 */

module.exports = {
  name : "",
  user_attributes : ["./user"],
  view_components : ["./view"]
};
