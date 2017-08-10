//builder
export default function(js:string){
  return `function(){${js}}.bind();`
}