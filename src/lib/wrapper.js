function wrap(id, script, env){
  const body = `__grender_${env}__(${id}, function(){${script}});`
  return s3.putObject({
    Bucket : "gizmo-assets",
    Key : `public/${event.item.id}.js`,
    Body : body,
    CacheControl : "no-cache, no-store"
  }).promise();
}