const { ShardingManager } = require ('discord.js')
const ayarlar = require ('./ayarlar.json')
const Discord = require ('discord.js')
const shards = new ShardingManager ('./index.js', {//Ana Dosya

token : ayarlar.token,

totalShards : 1 /shard sayısı

});
    const webhook = new Discord.WebhookClient("webhook id","webhook token")

shards.on('launch', shard => {
  webhook.send(`:BasladiShard:  n${shard.id + 1} IDli Başlatıldı ve Kullanıma Hazır.`)
})

shards.on('reconnecting', shard => {
    webhook.send(`:BeklemeShard:  - Bağlanılması için uğraşıyor.`)
})
shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.on('disconnect', shard => {

    webhook.send(`:kapandishard:   -> Shard kapandı!`)
})
shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});
shards.spawn()
setTimeout(() => {
  webhook.send(":kapalishard:   Bot size daha iyi sistem verebilmesi için shard kullanıyoruz shard'ı kapadı.")

    shards.broadcastEval(process.exit());
}, 43200000);