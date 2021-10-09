const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
    try {
        const prf = undefined; // BURAYA PREFİXİNİZİ YAZINIZ YA DA MODÜLLER İLE TANIMLI İSE ONU AYARLAYINIZ.
        const prefix = prf || 'r!'; // PREFİX BELİRTİLMEDİYSE VARSAYILAN "!" PREFİXİ KULLANILIR

        const embed = new MessageEmbed().setColor('RANDOM');
        const mesaj_gönder = (başlık, mesaj) => message.channel.send(embed.setTitle(başlık).setDescription(mesaj)).catch(() => {});
        const temizle = m => m.replace(/\*/g, '\\*').replace(/\|\|/g, '\\|\\|').replace(/~~/g, '\\~\\~').replace(/>/g, '\\>').replace(/`/g, '\\`').replace(/_/g, '\\_');
        const arg = sayı => args[sayı].toLocaleLowerCase();
        const şart = (şart, sonuç) => {
            if (şart) return sonuç;
            return undefined;
        }

        if (!args[0]) return mesaj_gönder('Seçenek giriniz!', '❌⼁**Kanal**, **yetki**, **rol**, **çıkar**, **yardım** seçeneklerinden birini giriniz ya da karantinaya almak için birini etiketleyiniz.');
        if (arg(0) === 'yardım') {
            const jailRol = db.get(`${message.guild.id}.jail.yetkirol`);
            const karRol = db.get(`${message.guild.id}.jail.rol`);
            const jailKanal = db.get(`${message.guild.id}.jail.kanal`);
            const yardımYazılar = [
                `⚙⼁${temizle(`${prefix}jail kanal [#kanal/kanal id]`)}`,
                `📤⼁${temizle(`${prefix}jail kanal kapat`)}`,
                `▫ **Kanal:** ${jailKanal ? `<#${jailKanal}>` : 'Yok'}`,
                `\r\n⚙⼁${temizle(`${prefix}jail yetki [@rol/rol id]`)}`,
                `📤⼁${temizle(`${prefix}jail yetki kapat`)}`,
                `▫ **Yetkili rolü:** ${jailRol ? `<@&${jailRol}>` : 'Yok'}`,
                `\r\n⚙⼁${temizle(`${prefix}jail rol [@rol/rol id]`)}`,
                `📤⼁${temizle(`${prefix}jail rol kapat`)}`,
                `▫ **Karantina rolü:** ${karRol ? `<@&${karRol}>` : 'Yok'}`,
            ].join("\r\n");
            const yardımEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle(temizle(`👮🏻‍♂️⼁${client.user.username} Karantina Sistemi`))
                .setDescription(yardımYazılar)
                .addFields([
                    { name: 'Karantinaya nasıl alabilirim?', value: `▫ ${temizle(`${prefix}jail [@üye/üye id] [açıklama]`)}` },
                    { name: 'Karantinadan nasıl çıkarabilirim?', value: `▫ ${temizle(`${prefix}jail çıkar [@üye/üye id]`)}` }
                ]);
            return message.channel.send(yardımEmbed);
        }
        else if (arg(0) === 'yetki') {
            if (!message.member.permissions.has('ADMINISTRATOR')) return mesaj_gönder('Yetkiniz yok!', '❌⼁Yetkili rollerini ayarlamanız için **Yönetici** yetkisi gerekmektedir.');
            const roller = message.guild.roles.cache.filter(r => !r.managed && r.name !== '@everyone');
            const jailRol = db.get(`${message.guild.id}.jail.yetkirol`);
            if (!args[1]) return mesaj_gönder('Seçenek giriniz!', '❌⼁**Kapat** seçeneğini ya da yetkili rolü için bir rol giriniz.');
            if (arg(1) === 'kapat') {
                if (!jailRol) return mesaj_gönder('Hata!', '❌⼁Karantina yetkili rolü zaten **kapalı** durumdadır.');
                db.delete(`${message.guild.id}.jail.yetkirol`);
                return mesaj_gönder('Başarılı!', '👌🏻⼁Karantina yetkili rolü **kapatıldı**.');
            }
            else {
                const ğ = rol => şart(roller.get(rol), rol) || şart(roller.get(rol.slice(3, -1)), rol.slice(3, -1));
                if (!ğ(args[1])) return mesaj_gönder('Hata!', '❌⼁Aradığınız rol bulunamadı.');
                db.set(`${message.guild.id}.jail.yetkirol`, ğ(args[1]))
                if (jailRol) {
                    if (jailRol === ğ(args[1])) return mesaj_gönder('Hata!', '❗⼁Ayarlamak istediğiniz rol ile açık olan rol aynıdır.')
                    return mesaj_gönder('Başarılı!', `👌🏻⼁Karantina yetkili rolü <@&${ğ(args[1])}> olarak değiştirildi.`);
                }
                else {
                    return mesaj_gönder('Başarılı!', `👌🏻⼁Karantina yetkili rolü <@&${ğ(args[1])}> olarak ayarlandı.`);
                }
            }
        }
        else if (arg(0) === 'kanal') {
            if (!message.member.permissions.has('ADMINISTRATOR')) return mesaj_gönder('Yetkiniz yok!', '❌⼁Karantine kanalını ayarlamanız için **Yönetici** yetkisi gerekmektedir.');
            const kanallar = message.guild.channels.cache.filter(k => k.type === 'text');
            const jailKanal = db.get(`${message.guild.id}.jail.kanal`);
            if (!args[1]) return mesaj_gönder('Seçenek giriniz!', '❌⼁**Kapat** seçeneğini ya da kanalı ayarlamak için bir kanal giriniz.');
            if (arg(1) === 'kapat') {
                if (!jailKanal) return mesaj_gönder('Hata!', '❌⼁Karantina kanalı zaten **kapalı** durumdadır.');
                db.delete(`${message.guild.id}.jail.kanal`);
                return mesaj_gönder('Başarılı!', '👌🏻⼁Karantina kanalı **kapatıldı**.');
            }
            else {
                const ğ = kanal => şart(kanallar.get(kanal), kanal) || şart(kanallar.get(kanal.slice(2, -1)), kanal.slice(2, -1));
                if (!ğ(args[1])) return mesaj_gönder('Hata!', '❌⼁Aradığınız kanal bulunamadı.');
                db.set(`${message.guild.id}.jail.kanal`, ğ(args[1]))
                if (jailKanal) {
                    if (jailKanal === ğ(args[1])) return mesaj_gönder('Hata!', '❗⼁Ayarlamak istediğiniz kanal ile açık olan kanal aynıdır.')
                    return mesaj_gönder('Başarılı!', `👌🏻⼁Karantina kanalı <#${ğ(args[1])}> olarak değiştirildi.`);
                }
                else {
                    return mesaj_gönder('Başarılı!', `👌🏻⼁Karantina kanalı <#${ğ(args[1])}> olarak ayarlandı.`);
                }
            }
        }
        else if (arg(0) === 'rol') {
            if (!message.member.permissions.has('ADMINISTRATOR')) return mesaj_gönder('Yetkiniz yok!', '❌⼁Karantina rollerini ayarlamanız için **Yönetici** yetkisi gerekmektedir.');
            const roller = message.guild.roles.cache.filter(r => !r.managed && r.name !== '@everyone');
            const karRol = db.get(`${message.guild.id}.jail.rol`);
            if (!args[1]) return mesaj_gönder('Seçenek giriniz!', '❌⼁**Kapat** seçeneğini ya da karantina rolü için bir rol giriniz.');
            if (arg(1) === 'kapat') {
                if (!karRol) return mesaj_gönder('Hata!', '❌⼁Karantina rolü zaten **kapalı** durumdadır.');
                db.delete(`${message.guild.id}.jail.rol`);
                return mesaj_gönder('Başarılı!', '👌🏻⼁Karantina rolü **kapatıldı**.');
            }
            else {
                const ğ = rol => şart(roller.get(rol), rol) || şart(roller.get(rol.slice(3, -1)), rol.slice(3, -1));
                if (!ğ(args[1])) return mesaj_gönder('Hata!', '❌⼁Aradığınız rol bulunamadı.');
                if (roller.get(ğ(args[1])).position >= message.member.roles.highest.position) return mesaj_gönder('Hata!', '❌⼁Karantinaya rolü ayarlanacak rol sizin en yüksek rolünüzden düşük bir rolde olmalıdır.')
                if (roller.get(ğ(args[1])).position >= message.guild.me.roles.highest.position) return mesaj_gönder('Hata!', '❌⼁Karantinaya rolü ayarlanacak rol benim en yüksek rolümden düşük bir rolde olmalıdır.')
                db.set(`${message.guild.id}.jail.rol`, ğ(args[1]))
                if (karRol) {
                    if (karRol === ğ(args[1])) return mesaj_gönder('Hata!', '❗⼁Ayarlamak istediğiniz rol ile açık olan rol aynıdır.')
                    return mesaj_gönder('Başarılı!', `👌🏻⼁Karantina rolü <@&${ğ(args[1])}> olarak değiştirildi.`);
                }
                else {
                    return mesaj_gönder('Başarılı!', `👌🏻⼁Karantina rolü <@&${ğ(args[1])}> olarak ayarlandı.`);
                }
            }
        }
        else if (arg(0) === 'çıkar') {
            const jailRol = db.get(`${message.guild.id}.jail.yetkirol`);
            const karRol = db.get(`${message.guild.id}.jail.rol`);
            const jailKanal = db.get(`${message.guild.id}.jail.kanal`);
            if (jailRol) {
                if (!message.member.permissions.has('ADMINISTRATOR')) {
                    if (!message.member.roles.cache.get(jailRol)) return mesaj_gönder('Yetkiniz yok!', '❌⼁**Yetkili rolü**nün ya da **Yönetici** yetkisinin sizde olması lazım.');
                }
            }
            else if (!message.member.permissions.has('ADMINISTRATOR')) return mesaj_gönder('Yetkiniz yok!', '❌⼁**Yetkili rolü**nün ya da **Yönetici** yetkisinin sizde olması lazım.');
            if (!message.guild.me.permissions.has('ADMINISTRATOR') && !message.guild.me.permissions.has('MANAGE_ROLES')) return mesaj_gönder('Hata!', '❌⼁**Rolleri Yönet** veya **Yönetici** yetkimden biri yok!');
            if (!args[1]) return mesaj_gönder('Kişi giriniz!', '❓⼁Karantinadan çıkaracağım kişiyi girmeniz gerekmektedir.');
            const kişiTara = id => şart(message.guild.members.cache.get(id), id) || şart(message.guild.members.cache.get(id.slice(2, -1)), id.slice(2, -1)) || şart(message.guild.members.cache.get(id.slice(3, -1)), id.slice(3, -1));
            if (!kişiTara(args[1])) return mesaj_gönder('Hata!', '❌⼁Aradığınız kişi bulunamadı.');
            const üyeRol = db.get(`${message.guild.id}.jail.üyeler.${kişiTara(args[1])}`);
            if (!üyeRol) return mesaj_gönder('Hata!', '❌⼁Karantinadan çıkarmak istediğiniz kişi karantinada değil.');
            let hata = 0;
            let rolal = 0;
            const üye = message.guild.members.cache.get(kişiTara(args[1]));
            if (karRol) üye.roles.remove(karRol).catch(() => ++rolal);
            await üyeRol.forEach(async rl => {
                try {
                    await üye.roles.add(rl);
                } catch (h) {
                    ++hata;
                }
            })
            db.delete(`${message.guild.id}.jail.üyeler.${kişiTara(args[1])}`);
            const üye1 = await client.users.fetch(kişiTara(args[1]));
            const kurtulEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('🎇⼁Karantina Bitti!')
                .setThumbnail(üye1.displayAvatarURL({ dynamic: true }))
                .setDescription(`${üye} karantinadan çıkarıldı.\r\nArtık karantinadan kurtuldu bir daha girmemesi umudu ile. :sweat_smile:`)
                .setTimestamp()
                .setFooter(`${message.author.username} Tarafından Karantinadan Çıkarıldı`, message.author.displayAvatarURL({ dynamic: true }))
            if (jailKanal) (client.channels.cache.get(jailKanal)).send(kurtulEmbed).catch(() => {})
            if (hata === üyeRol.length) return mesaj_gönder('Hata!', `❌⼁Belirtilen kişiye hiçbir rolünü veremedim${rolal ? ' ve karantina rolünü alamadım' : ' ve karantinadan çıkardım'}.`);
            if (hata && hata < üyeRol.length) return mesaj_gönder('Uyarı!', `⚠⼁Belirtilen kişiye bazı rollerini verdim${rolal ? ' ve karantina rolünü alamadım' : ' ve karantinadan çıkardım'}.`);
            return mesaj_gönder('Başarılı!', `👌🏻⼁Belirtilen kişiyi karantinadan çıkardım${rolal ? ' ama karantina rolünü alamadım' : ''}.`);
        }
        else {
            const jailRol = db.get(`${message.guild.id}.jail.yetkirol`);
            const karRol = db.get(`${message.guild.id}.jail.rol`);
            const jailKanal = db.get(`${message.guild.id}.jail.kanal`);
            const roller = message.guild.roles.cache.filter(r => !r.managed && r.name !== '@everyone');
            if (jailRol) {
                if (!message.member.permissions.has('ADMINISTRATOR')) {
                    if (!message.member.roles.cache.get(jailRol)) return mesaj_gönder('Yetkiniz yok!', '❌⼁**Yetkili rolü**nün ya da **Yönetici** yetkisinin sizde olması lazım.');
                }
            }
            else if (!message.member.permissions.has('ADMINISTRATOR')) return mesaj_gönder('Yetkiniz yok!', '❌⼁**Yetkili rolü**nün ya da **Yönetici** yetkisinin sizde olması lazım.');
            if (!message.guild.me.permissions.has('ADMINISTRATOR') && !message.guild.me.permissions.has('MANAGE_ROLES')) return mesaj_gönder('Hata!', '❌⼁**Rolleri Yönet** veya **Yönetici** yetkimden biri yok!');
            if (!args[0]) return mesaj_gönder('Kişi giriniz!', '❓⼁Karantinaya alacağım kişiyi girmeniz gerekmektedir.');
            const kişiTara = id => şart(message.guild.members.cache.get(id), id) || şart(message.guild.members.cache.get(id.slice(2, -1)), id.slice(2, -1)) || şart(message.guild.members.cache.get(id.slice(3, -1)), id.slice(3, -1));
            if (!kişiTara(args[0])) return mesaj_gönder('Hata!', '❌⼁Aradığınız kişi bulunamadı.');
            const üyeRol = db.get(`${message.guild.id}.jail.üyeler.${kişiTara(args[0])}`);
            if (üyeRol) return mesaj_gönder('Hata!', '❌⼁Karantinadan almak istediğiniz kişi zaten karantinada.');
            let hata = 0;
            let rolal = 0;
            const üye = message.guild.members.cache.get(kişiTara(args[0]));
            if (üye.roles.highest.position >= message.member.roles.highest.position) return mesaj_gönder('Hata!', '❌⼁Bu kişiyi karantinaya alabilmek için yetkin yok.');
            if (üye.roles.highest.position >= message.guild.me.roles.highest.position) return mesaj_gönder('Hata!', '❌⼁Bu kişiyi karantinaya alamam.');
            if (karRol) üye.roles.add(karRol).catch(() => ++rolal);
            const liste = [];
            await üye.roles.cache.forEach(async rl => {
                if (!roller.find(i => i.id === rl.id)) return;
                liste.push(rl.id);
            })
            liste.forEach(async rl => {
                try {
                    await üye.roles.remove(rl);
                } catch (h) {
                    ++hata;
                }
            })
            db.set(`${message.guild.id}.jail.üyeler.${kişiTara(args[0])}`, liste);
            const üye1 = await client.users.fetch(kişiTara(args[0]));
            const alınEmbed = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('😩⼁Karantinaya Biri Geldi!')
                .setThumbnail(üye1.displayAvatarURL({ dynamic: true }))
                .setDescription(`${üye} kullanıcısının rollerine el koyuldu.\r\n${karRol ? `<@&${karRol}> kapsamına alınarak` : 'Rol verilmeyerek'} kontrolü kısıtlandı.\r\n**Açıklama**: ${args[1] ? temizle(args.slice(1).join(" ")) : 'Açıklama yok.'}`)
                .setImage('https://media.giphy.com/media/zDBZl5J1R995iCAPo1/giphy.gif')
                .setFooter(`${message.author.username} Tarafından Karantinaya Alındı`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            if (jailKanal) (client.channels.cache.get(jailKanal)).send(alınEmbed).catch(() => {})
            if (hata === liste.length) return mesaj_gönder('Hata!', `❌⼁Belirtilen kişiden rollerini alamadım${rolal ? ' ve karantina rolünü veremedim' : ' ve karantinaya aldım'}.`);
            if (hata && hata < liste.length) return mesaj_gönder('Uyarı!', `⚠⼁Belirtilen kişiden bazı rolleri alamadım${rolal ? ' ve karantina rolünü veremedim' : ' ve karantinaya aldım'}.`);
            return mesaj_gönder('Başarılı!', `👌🏻⼁Belirtilen kişiden rolleri aldım${rolal ? ' ama karantina rolünü veremedim' : ' ve karantinaya aldım'}.`);
        }
    } catch (h) {
        console.error(h);
    };
};

exports.conf = {
    aliases: ["jail", "karantina"],
    enabled: true,
    guildOnly: true,
};

exports.help = {
    name: 'jail',
    description: 'Kişiyi karantinaya alır ve ayarlamalı seçenekler mevcuttur.',
    usage: '{prefix}jail'
};