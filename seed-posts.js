// seed-posts.js — initial content across the whole site.
// Exports a function that returns a plain array of post objects, ready for
// Mongoose's insertMany(). You can add far more from the admin panel.

const WIKI = 'https://en.wikipedia.org/wiki/FC_Barcelona';
const CLUB = 'https://www.fcbarcelona.com/en/club/history';

module.exports = function seedPosts() {
  const now = Date.now();
  const daysAgo = (n) => new Date(now - n * 86400000);
  const posts = [];

  function add(p, ageDays) {
    posts.push({
      created_at: daysAgo(ageDays),
      image_url: '',
      video_url: '',
      embed_url: '',
      source_url: '',
      source_label: '',
      ...p,
    });
  }

  // ---------- ARTICLES: Foundational history ----------
  add({ type: 'article', slug: 'joan-gamper-founding', title: 'The Swiss Accountant Who Founded a Religion', excerpt: 'In 1899, Joan Gamper placed a newspaper ad looking for people to play football with. Nobody involved could have guessed what it became.', tag: 'history', tag_label: 'Founding & Early Years', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '6 min', body: `On 22 October 1899, a Swiss businessman named Hans Gamper — soon to Catalanise his name to Joan — placed a small advert in a Barcelona sports magazine asking if anyone wanted to play football regularly. Eleven people showed up. FC Barcelona was born out of nothing more dramatic than a want ad.

Gamper wasn't just the founder; for the club's first three decades he was its financial backbone, personally covering debts more than once to keep the lights on. He served as president five separate times.

The club adopted blue and garnet early on, reportedly inspired by Gamper's own boyhood club in Switzerland, FC Basel — though the exact origin of the colours is still debated by historians.

What Gamper couldn't have known was that the club would eventually become something closer to a Catalan cultural institution than a sports team — a role cemented decades later under a dictatorship that tried to erase the very identity Barça stood for.`}, 700);

  add({ type: 'article', slug: 'mes-que-un-club-origins', title: "Where 'Més Que Un Club' Actually Comes From", excerpt: "It's printed on scarves everywhere, but the phrase has a specific, political history rooted in Franco-era Catalonia.", tag: 'history', tag_label: 'Founding & Early Years', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `"Més que un club" — more than a club — is one of the most repeated phrases in football, but it wasn't a marketing slogan. It was coined by club president Narcís de Carreras in his 1968 inauguration speech, at a time when Catalan language and identity were actively suppressed under Francisco Franco's dictatorship.

Camp Nou became one of the only places Catalans could publicly speak Catalan and sing Catalan songs without fear. Chanting for Barça was, for decades, a coded act of political defiance.

That history is why the phrase still carries weight instead of reading as a hollow slogan — it was earned during a period when supporting the club really did mean something beyond sport.`}, 650);

  // ---------- ARTICLES: Cruyff eras ----------
  add({ type: 'article', slug: 'cruyffs-3-4-3', title: "Why Cruyff's 3-4-3 Still Echoes in Every Barça XI", excerpt: "Positional play didn't start with Guardiola. It started with a Dutchman who thought space was the only thing worth arguing about.", tag: 'cruyff', tag_label: 'Cruyff Era', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '7 min', body: `In 1988, Johan Cruyff walked into a Barcelona dressing room and told his players something that sounded almost too simple to matter: the ball moves faster than any player ever could, so build a team that never stops giving it somewhere to go.

That single idea — space as the real currency of the game — became the 3-4-3, and the 3-4-3 became the closest thing football has to a religious text.

The shape wasn't the point. Coaches who tried to copy the Dream Team by copying the formation alone usually failed. The 3-4-3 only works if every player understands the rule underneath it: whoever has the ball should always have at least two passing options.

From Guardiola to Xavi to Flick, the same shape shows up in how Barça's academy sides are still coached before they ever touch a first-team pitch.`}, 600);

  add({ type: 'article', slug: 'cruyff-as-player', title: "Before He Was a Manager, He Was Already a Revolutionary", excerpt: "Cruyff's playing spell at Barça in the 1970s reshaped the club before he ever picked up a whistle.", tag: 'cruyff', tag_label: 'Cruyff Era', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '6 min', body: `Johan Cruyff signed for Barcelona in 1973 as the most expensive player in the world at the time, arriving from Ajax having just built the foundations of "Total Football" alongside Rinus Michels.

His first season delivered the club's first league title in 14 years, and a 5-0 demolition of Real Madrid at the Bernabéu that is still talked about in Catalonia today.

Cruyff named his son Jordi after Catalonia's patron saint, at a time when using Catalan names was still restricted — a small act that made his identification with the club, and the region, unmistakable.

By the time he returned as manager in 1988, he wasn't an outsider imposing a philosophy. He was finishing something he'd started fifteen years earlier as a player.`}, 590);

  // ---------- ARTICLES: Dream Team / Guardiola ----------
  add({ type: 'article', slug: 'dream-team-1992', title: "1992: The Night Barça Finally Won It", excerpt: "Ronald Koeman's free kick at Wembley ended decades of European heartbreak in extra time.", tag: 'dreamteam', tag_label: 'Dream Team', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '5 min', body: `Barcelona had reached — and lost — European Cup finals before. In 1992, at Wembley against Sampdoria, the club finally broke through, with Ronald Koeman's swerving extra-time free kick delivering the club's first-ever European Cup.

It was the culmination of Cruyff's Dream Team project — Guardiola himself playing in midfield that night, learning under the manager whose ideas he'd later carry forward as a coach.

The Dream Team went on to win four consecutive league titles, but that Wembley night remains the symbolic proof that Cruyff's philosophy wasn't just elegant — it could actually win the biggest prize in the game.`}, 560);

  add({ type: 'article', slug: 'guardiola-treble-2009', title: "The Treble That Redefined What a Season Could Look Like", excerpt: "Guardiola's first season in charge delivered La Liga, the Copa del Rey, and the Champions League — a perfect debut.", tag: 'dreamteam', tag_label: 'Guardiola Era', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '7 min', body: `Pep Guardiola took charge of Barcelona's first team in 2008 at 37 years old, with limited managerial experience and a squad many felt needed rebuilding, not fine-tuning.

Instead, he trusted La Masia. Messi, Xavi, Iniesta, Busquets — several barely older than the manager's own coaching career — became the spine of a team that won every major trophy available in a single season, an unprecedented sextuple counting the Spanish and European Super Cups and Club World Cup.

Tiki-taka, as the press dubbed it, wasn't new in principle — it was Cruyff's positional play, refined with modern fitness science and an even deeper conviction that possession itself could be a form of defence.

Four years later, Guardiola left having redefined the ceiling of what a single era at one club could achieve.`}, 500);

  add({ type: 'article', slug: 'tiki-taka-misunderstood', title: 'Tiki-Taka Was Never About Passing', excerpt: 'It was about denying the opponent the one thing they needed most: the ball.', tag: 'dreamteam', tag_label: 'Guardiola Era', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '8 min', body: `The popular caricature of tiki-taka is endless sideways passing for its own sake. That was never the point.

Guardiola's Barcelona pressed with a ferocity that's often forgotten — the moment possession was lost, the nearest players closed down within seconds, a principle later formalised across football as "counter-pressing."

Holding the ball wasn't decoration. It was a defensive strategy: if the opponent never has the ball, they can never score.

That's why the system began to break down against teams disciplined enough to sit deep and refuse to chase the ball at all — a tactical answer that took the rest of European football years to consistently execute.`}, 480);

  // ---------- ARTICLES: MSN / Luis Enrique ----------
  add({ type: 'article', slug: 'msn-numbers', title: "The Numbers Behind Football's Deadliest Front Three", excerpt: '364 combined league goals in three seasons. How the system, not just the talent, made MSN unstoppable.', tag: 'msn', tag_label: 'MSN Trinity', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '9 min', body: `Messi, Suárez, and Neymar didn't just score goals — they rewrote how many a front three was supposed to score in the first place.

122 combined league goals in their first season together, a treble to show for it, and a front line that defenders simply had no answer for.

The system mattered as much as the talent: width from Neymar, movement from Suárez, and freedom for Messi to drift wherever the game needed him.

Luis Enrique took criticism for a more direct, transitional style compared to peak tiki-taka — but a second treble in three years settled that argument fairly definitively.`}, 420);

  add({ type: 'article', slug: 'luis-enrique-pragmatism', title: "Luis Enrique's Quiet Tactical Genius", excerpt: 'The coach who got out of three superstars\' way — and still built a system around them.', tag: 'msn', tag_label: 'MSN Trinity', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '6 min', body: `Luis Enrique never got the same tactical reverence as Cruyff or Guardiola, but his Barcelona won a treble in his very first season — a feat neither of the other two managed immediately.

His genius was restraint: rather than force three generational attackers into a rigid possession structure, he built a more direct, vertical framework that let their individual brilliance do more of the heavy lifting.

Critics called it a step back from "the Barça way." Two more league titles and another Champions League suggest it was simply a different, equally valid way of winning.`}, 400);

  // ---------- ARTICLES: financial crisis / modern rebuild ----------
  add({ type: 'article', slug: 'la-masia-never-left', title: 'La Masia Never Left — It Just Waited', excerpt: 'How a financially broken club found its way back to a philosophy it never should have abandoned.', tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '6 min', body: `A financial crisis around 2021 forced painful exits — Messi among them — and an unplanned reset nobody at the club wanted.

What followed was a forced return to first principles. Academy graduates were thrown into the first team out of necessity, not sentiment — Pedri, Gavi, Araújo, and later Cubarsí and Yamal all forced into senior roles years earlier than any long-term plan would have chosen.

It wasn't the plan. But it turned into arguably the most honest version of the club's identity in over a decade — a squad genuinely built on La Masia again, not assembled by cheque.`}, 320);

  add({ type: 'article', slug: 'lamine-yamal-rise', title: 'The Youngest Barça XI Debutant in a Century', excerpt: 'Lamine Yamal broke a 1922 record before he could legally drive — and kept breaking records after.', tag: 'future', tag_label: 'The Next Generation', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '6 min', body: `Lamine Yamal made his first-team debut in April 2023 at 15 years, 9 months, and 16 days old, breaking a club record that had stood since 1922.

Within months he was La Liga's youngest ever goalscorer. Within two years he was a Euro 2024 winner, a Kopa Trophy holder, and wearing Barça's number 10 — a shirt that carries obvious historical weight at this club.

By the 2026-27 season, under manager Hansi Flick, Yamal has become one of the squad's most important attacking players, with the coaching staff exploring different positions to get the most from him as the team chases a third consecutive league title.

The story of Barça's next decade may well be written by players who, right now, are barely older than the club's own famous academy dormitories.`}, 40);

  add({ type: 'article', slug: 'hansi-flick-rebuild', title: "Hansi Flick and the Return to Winning Football", excerpt: 'A German manager known for a Bayern treble arrived to rebuild belief as much as tactics.', tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '6 min', body: `Hansi Flick took over a Barcelona side still recovering from years of financial turmoil, tasked with restoring both results and identity at the same time.

His football leans on intense pressing and vertical transitions layered on top of the possession principles the club never fully abandoned — a modern synthesis rather than a rejection of what came before.

Back-to-back league title challenges have followed, built around a blend of veteran signings and the academy talents the crisis years forced into the spotlight. The current squad, featuring Pedri, Gavi, Yamal, Cubarsí, Raphinha and new arrivals like Rodri, looks like a team assembled with real intention again.`}, 60);

  // ---------- ARTICLES: legends & culture ----------
  add({ type: 'article', slug: 'kubala-the-rebuilder', title: 'László Kubala: The Player Who Rebuilt a Broken Club', excerpt: "Before Cruyff, before Messi, a Hungarian refugee turned a struggling Barça into Spain's dominant force.", tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `In the aftermath of the Spanish Civil War and World War II, Barcelona was a diminished force. László Kubala's arrival in 1950, after defecting through a complicated political ordeal, changed that overnight.

Kubala was so central to the club's revival that Camp Nou itself was built partly because the old Les Corts stadium couldn't hold the crowds coming to watch him play.

He remains one of the few players with a statue outside Camp Nou — recognition of a career that predates almost every name modern fans associate with the club's greatness.`}, 300);

  add({ type: 'article', slug: 'ronaldinho-smile', title: "Ronaldinho and the Season Real Madrid Applauded Him", excerpt: "In 2005, Ronaldinho scored a goal at the Bernabéu so good the home crowd stood and applauded.", tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `By 2005, Barcelona had gone years without a major trophy. Ronaldinho's arrival, alongside a young Lionel Messi's first appearances, began the club's return to the top.

His goal against Real Madrid at the Bernabéu that November — a mazy solo run finished with a composed dink — earned a standing ovation from the home crowd, an almost unheard-of gesture in one of football's fiercest rivalries.

That night marked a symbolic passing of the torch: Ronaldinho's brilliance opening the door for the academy generation, including Messi, that would soon eclipse him.`}, 280);

  add({ type: 'article', slug: 'xavi-the-metronome', title: 'Xavi: The Player Who Never Seemed to Hurry', excerpt: 'No one in the modern game controlled tempo the way Xavi Hernández did for over a decade.', tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Xavi Hernández made over 750 appearances for Barcelona, and his defining trait was never speed or power — it was the ability to receive the ball under pressure and always know, instantly, where it needed to go next.

Guardiola once said he'd build his entire team around Xavi if he could. That's roughly what happened: the Dream Team, MSN, and modern eras all trace back to the passing rhythm Xavi established in the mid-2000s.

He later returned as manager during the club's financial crisis, trying to instil the same footballing values in a very different set of circumstances.`}, 250);

  add({ type: 'article', slug: 'iniesta-world-cup-goal', title: "Iniesta's Goal That Belonged to a Whole Country", excerpt: 'The 2010 World Cup final winner remains one of the most quietly devastating players Barça ever produced.', tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Andrés Iniesta scored Spain's 2010 World Cup final winner, but his club career at Barcelona is arguably even more decorated — nine La Liga titles and four Champions Leagues across 16 seasons.

He was never the flashiest name in a midfield full of era-defining talent, but teammates and coaches consistently pointed to him as the player defenders feared most in tight spaces.

His emotional farewell match in 2018 remains one of the most heartfelt send-offs in the club's history.`}, 240);

  add({ type: 'article', slug: 'puyol-captain-identity', title: 'Carles Puyol and the Meaning of Wearing the Armband', excerpt: "Barcelona's captain for a decade wasn't the most gifted player on the pitch — he just refused to accept losing.", tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Carles Puyol never had the technical polish associated with Barça's academy output, which made him an unusual captain for a team built on elegant football.

What he had instead was relentlessness — famously playing through injuries that would have sidelined most defenders, and organising a back line that gave the era's attacking talent the platform to dominate.

His header in the 2009 Champions League semi-final against Chelsea, scored while playing out of position at right-back, is still shown as a symbol of the captain's refusal to be limited by his job description.`}, 230);

  add({ type: 'article', slug: 'messi-by-the-numbers', title: "Messi's Barcelona Career, By the Numbers", excerpt: 'Some records are close. This one just isn\'t.', tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `Lionel Messi's Barcelona career produced over 670 goals across more than 770 appearances — both figures comfortably the highest in club history.

Ten league titles, four Champions Leagues, and a run of four consecutive Ballon d'Or awards from 2009-2012 came during a stretch where Barça's attacking football was arguably the most dominant club football has ever produced.

His 2021 departure, forced by the club's financial situation rather than any footballing decision, remains one of the most jarring moments in the club's modern history — a reminder that even the greatest eras eventually end for reasons that have nothing to do with form.`}, 200);

  add({ type: 'article', slug: 'messi-91-goals', title: 'The Year One Player Scored 91 Goals', excerpt: "Messi's 2012 calendar year is a record that may never be seriously challenged.", tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '3 min', body: `In the 2012 calendar year, Lionel Messi scored 91 goals across all competitions for club and country — surpassing a record that had stood since the 1970s.

The run included five-goal games and a level of consistency that turned "will he score today" from a question into an assumption.

It remains one of the most frequently cited individual statistical achievements in football history.`}, 195);

  add({ type: 'article', slug: 'ronaldo-brazil-one-season', title: "Ronaldo's One Wild Season in Catalonia", excerpt: "Before Real Madrid, before the Ballon d'Or, a 20-year-old Brazilian played a single explosive season at Camp Nou.", tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Ronaldo Nazário spent only the 1996-97 season at Barcelona, but scored 47 goals in 49 appearances — a rate that stunned even a club used to attacking talent.

His time at the club ended in a bitter transfer saga to Inter Milan, driven by a buyout clause dispute, cutting short what could have been a defining long-term partnership.

That single season is still remembered by older Barça fans as one of the purest displays of individual attacking talent the club has ever hosted, however brief.`}, 190);

  add({ type: 'article', slug: 'figo-transfer-saga', title: 'The Transfer That Turned a Hero Into a Villain Overnight', excerpt: "Luís Figo's 2000 move to Real Madrid remains one of football's most bitter transfer stories.", tag: 'history', tag_label: 'Rivalries', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `Luís Figo was a Barcelona captain and fan favourite when he shocked the club by moving directly to arch-rivals Real Madrid in 2000, for what was then a world record transfer fee.

His return to Camp Nou as a Madrid player was chaotic — objects thrown from the stands, including, famously, a pig's head onto the pitch during a corner kick.

The episode remains a reference point whenever a player is rumoured to be considering a direct move between the two clubs — a reminder of how personally this particular rivalry is felt.`}, 180);

  add({ type: 'article', slug: 'eto-o-prolific-spell', title: "Samuel Eto'o: The Most Underrated Great of the 2000s", excerpt: 'Overshadowed by Ronaldinho\'s flair, Eto\'o quietly became one of the most clinical strikers in club history.', tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Samuel Eto'o joined Barcelona in 2004 and scored 130 goals across five seasons, forming a devastating attacking trio alongside Ronaldinho and Messi's emergence.

He was central to the 2009 treble, scoring in the Champions League final itself, yet often discussed less than the era's more flamboyant personalities.

Coaches from the period consistently rank him among the most complete strikers the club has had — clinical, hard-working, and never afraid of the physical side of the game.`}, 175);

  add({ type: 'article', slug: 'camp-nou-history', title: 'Camp Nou: Building a Stadium Bigger Than the Club Expected to Need', excerpt: 'Opened in 1957, it remains one of the largest stadiums in world football — and is currently being rebuilt again.', tag: 'culture', tag_label: 'Club Culture', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `Camp Nou opened in 1957 with capacity for around 90,000 fans, built partly because László Kubala's popularity had outgrown the club's previous home, Les Corts.

For decades it stood as one of the largest football stadiums in the world, hosting World Cup and European Cup finals across its history.

The club is currently in the middle of the "Espai Barça" redevelopment project, modernising the stadium and surrounding facilities for the next era of the club — a reminder that even the most iconic buildings in football eventually need reinvention.`}, 150);

  add({ type: 'article', slug: 'el-clasico-history', title: "El Clásico: More Than a Fixture", excerpt: 'The rivalry with Real Madrid carries political and cultural weight that most sporting rivalries simply don\'t.', tag: 'history', tag_label: 'Rivalries', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '6 min', body: `El Clásico is regularly cited as the most-watched annual club fixture in world football, but its intensity has roots well beyond sport.

During the Franco dictatorship, the fixture became a proxy for tension between Catalan identity and Spanish centralism — a dynamic that still colours how the match is discussed, even in a far less politically charged present day.

On the pitch, the fixture has produced some of the sport's most iconic individual moments — from Cruyff's 5-0 in 1974 to the Messi-Ronaldo duels of the 2010s — a rivalry that keeps generating new chapters every single season.`}, 140);

  add({ type: 'article', slug: 'derbi-barceloni', title: 'The Other Derby: Barça vs Espanyol', excerpt: "Overshadowed by El Clásico, the city derby has its own century-long history worth knowing.", tag: 'history', tag_label: 'Rivalries', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `While El Clásico gets the global attention, the Derbi Barceloní against city rivals RCD Espanyol carries its own distinct local intensity, contested since the early 1900s.

Espanyol was historically associated with a more Spanish-nationalist identity in contrast to Barça's Catalanist associations, adding a layer of local political texture to the fixture that persists in a softer form today.

For supporters actually living in the city, this derby — not El Clásico — is often described as the "real" local rivalry.`}, 135);

  add({ type: 'article', slug: 'barca-femeni-rise', title: "Barça Femení: Building Europe's Most Dominant Women's Side", excerpt: 'Multiple Champions League titles and a squad built on the same academy pipeline as the men\'s team.', tag: 'culture', tag_label: 'Barça Femení', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `Barcelona's women's team has become one of the dominant forces in European football, winning multiple UEFA Women's Champions League titles and setting attendance records for women's club football along the way.

Players like Alexia Putellas, a multiple Ballon d'Or Féminin winner, came through the same broader club structure that produces the men's team's academy talent.

The women's side is increasingly treated as a core part of the club's footballing identity rather than a separate project — a shift that's reshaped how the club talks about itself.`}, 130);

  add({ type: 'article', slug: 'la-masia-pathway-explained', title: "How La Masia Actually Works", excerpt: "The academy behind Messi, Xavi, Iniesta, and now Yamal has a specific developmental philosophy behind it.", tag: 'youth', tag_label: 'La Masia', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '6 min', body: `La Masia — literally "the farmhouse," named after the building that once housed young players — is built around teaching Cruyff's positional principles from the earliest age groups, long before tactical complexity is introduced elsewhere.

Technical ability under pressure is prioritised over physical size, which is why the academy has historically produced smaller, technically gifted players who might be overlooked by academies prioritising athleticism.

The financial crisis years accelerated academy graduates' path to the first team out of necessity — but the pipeline itself, and the coaching philosophy behind it, predates that crisis by decades.`}, 120);

  add({ type: 'article', slug: 'false-nine-explained', title: 'The False Nine: How Messi Broke Defensive Logic', excerpt: "Guardiola's positional trick with Messi in 2009 confused defenders who didn't know who to mark.", tag: 'tactics', tag_label: 'Tactics', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '5 min', body: `In the 2009-10 season, Guardiola began deploying Messi not as a traditional striker but dropping into midfield, pulling opposition centre-backs out of position with nowhere obvious to go.

The tactic, borrowed from a much older footballing concept, created a structural problem defenses hadn't been drilled for: following Messi meant abandoning defensive shape, but ignoring him meant giving the world's best player time on the ball.

It's now a standard part of tactical vocabulary across the sport, but Barcelona's version remains the reference point most commonly cited.`}, 115);

  add({ type: 'article', slug: 'six-two-bernabeu', title: "The Night Barça Won 6-2 at the Bernabéu", excerpt: 'One of the most one-sided results in Clásico history, in 2009, on the way to the historic sextuple.', tag: 'history', tag_label: 'Rivalries', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `In May 2009, en route to a historic sextuple, Barcelona thrashed Real Madrid 6-2 at the Santiago Bernabéu — a result still cited as one of the most complete performances in the rivalry's history.

Messi scored twice in a performance that showcased the false-nine role at its most devastating, with the away end reportedly celebrating so loudly it could be heard across the stadium.

The result effectively ended that season's title race and became a symbol of just how dominant that particular Barcelona side was.`}, 500);

  add({ type: 'article', slug: 'eight-two-bayern', title: 'The 8-2 Defeat That Changed Everything', excerpt: 'A humiliating Champions League loss to Bayern Munich in 2020 exposed how far the squad had drifted from its principles.', tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '5 min', body: `In August 2020, Barcelona were beaten 8-2 by Bayern Munich in the Champions League quarter-final — the club's heaviest European defeat in decades.

The result is widely seen as the moment the club's internal problems — financial mismanagement, an ageing squad, and a lack of long-term planning — became impossible to ignore from the outside.

Messi's departure the following year, and the years of rebuilding that followed, trace directly back to the reckoning that night forced on the club's leadership.`}, 350);

  add({ type: 'article', slug: 'neymar-psg-departure', title: "Neymar's World Record Departure", excerpt: 'The 2017 transfer to PSG remains, adjusted or not, one of the most expensive in football history.', tag: 'history', tag_label: 'Transfers', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Neymar's 2017 move to Paris Saint-Germain, triggered via his buyout clause, remains one of the largest transfer fees ever paid in football, shattering the previous record by a wide margin.

His departure effectively ended the MSN front three after just three seasons together, a partnership many felt still had years of dominance left in it.

The transfer also reshaped Barcelona's transfer strategy for years afterward, as the club attempted — with mixed results — to reinvest the fee into replacements who could match his output.`}, 330);

  add({ type: 'article', slug: 'messi-farewell-press-conference', title: "Messi's Farewell: A Room Full of Silence", excerpt: 'The 2021 press conference announcing his exit is remembered as one of the rawest moments in the club\'s history.', tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `In August 2021, Lionel Messi held a press conference to confirm he was leaving Barcelona — not by choice, but because La Liga's financial fair play rules prevented the club from registering a new contract.

Messi broke down in tears multiple times during the announcement, a moment that felt less like a transfer and more like a genuine end of an era for everyone watching.

It remains one of the most emotionally raw moments in modern football, a reminder that even a two-decade relationship between a player and a club can end for reasons that have nothing to do with either side's wishes.`}, 340);

  add({ type: 'article', slug: 'busquets-deep-lying-role', title: "Sergio Busquets and the Hardest Job to Notice", excerpt: 'The deep-lying midfielder role he mastered rarely gets credit — which is sort of the point.', tag: 'tactics', tag_label: 'Tactics', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `Sergio Busquets made his name doing the least visually exciting job on the pitch: constantly repositioning between the centre-backs, receiving the ball under pressure, and recycling possession before an opponent could close him down.

Guardiola trusted a 20-year-old Busquets in that role from 2008 onward, a decision that underpinned the entire tiki-taka system — without a reliable pivot, the rest of the structure simply doesn't function.

Coaches across the sport still cite him as the clearest example of a player whose importance is almost inversely related to how often casual fans mention his name.`}, 280);

  add({ type: 'article', slug: 'dani-alves-decorated', title: "Dani Alves: The Most Decorated Player in Club History", excerpt: 'More trophies than any player who has ever worn the shirt, from a full-back who redefined the position.', tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Dani Alves won more trophies at Barcelona than any player in the club's history, spanning both the Guardiola and Luis Enrique treble-winning sides.

He's also credited with helping redefine the modern full-back — an attacking outlet as dangerous going forward as any winger, rather than a purely defensive role.

His longevity across two distinct golden eras of the club makes him a rare bridge figure between two Barcelona generations that otherwise get discussed almost separately.`}, 260);

  add({ type: 'article', slug: 'cubarsi-rapid-rise', title: "Pau Cubarsí: A Teenager Anchoring a Title Chase", excerpt: 'Thrown into the first team at 17, Cubarsí has looked startlingly composed for his age.', tag: 'future', tag_label: 'The Next Generation', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `Pau Cubarsí made his first-team debut at just 17, immediately taking on a central defensive role usually reserved for far more experienced players.

His reading of the game and positioning have drawn comparisons to older, more established defenders — a rare compliment for someone this early in a senior career.

Alongside Yamal and the other young academy graduates, Cubarsí represents the clearest sign that La Masia's pipeline, even after the financial crisis, hasn't lost its ability to produce elite talent.`}, 90);

  add({ type: 'article', slug: 'pedri-injury-quality', title: "Pedri: Generational Talent, Complicated by Injuries", excerpt: 'When healthy, few midfielders in the world combine his composure and vision.', tag: 'future', tag_label: 'The Next Generation', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `Pedri González burst onto the scene as a teenager, drawing comparisons to Iniesta for his composure on the ball and ability to glide past pressure in tight spaces.

His career since has been shaped as much by recurring muscular injuries as by his footballing quality, a frustration for both the player and the club given his evident ceiling.

When fit, he remains one of the first names on the team sheet — a reminder that the biggest question mark over Barcelona's midfield future is fitness, not talent.`}, 100);

  add({ type: 'article', slug: 'gavi-combative-rise', title: 'Gavi: All Elbows, All Heart', excerpt: 'The academy graduate who plays like every match is a cup final.', tag: 'future', tag_label: 'The Next Generation', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `Gavi made his first-team debut at 17 and immediately stood out less for flair than for sheer competitive intensity — a tone-setter in midfield battles against far more experienced opponents.

His combative style has occasionally drawn cards and criticism, but it's also become a defining trait of the post-crisis Barcelona identity: a squad that fights for everything rather than assuming quality alone will be enough.

A serious long-term injury interrupted his development, but his return has been treated as one of the squad's most important boosts heading into recent title challenges.`}, 95);

  add({ type: 'article', slug: 'barca-crest-history', title: "The Story Behind the Crest", excerpt: 'The Barça badge has changed more times than most fans realise, each version carrying its own history.', tag: 'culture', tag_label: 'Club Culture', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Barcelona's crest has evolved significantly since the club's founding, incorporating the Catalan flag's stripes and the cross of Saint George, patron saint of Catalonia — deliberate symbols of regional identity built into the badge itself.

The ball in the crest's lower section is a later addition, a nod to the sport itself amid the more historically and politically loaded elements above it.

Even small redesigns of the crest have occasionally sparked debate among supporters — a sign of how much symbolic weight fans attach to details most casual observers would never notice.`}, 110);

  add({ type: 'article', slug: 'cant-del-barca-anthem', title: "Cant del Barça: The Club's Official Anthem", excerpt: "Written in Catalan, the anthem is as much a statement of identity as it is a football chant.", tag: 'culture', tag_label: 'Club Culture', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '3 min', body: `The club's official anthem, "Cant del Barça," was written in Catalan in 1974 — itself a quiet act of cultural assertion during a period when the language faced restrictions.

Its lyrics explicitly reference the club representing more than sport, echoing the "més que un club" ethos years before that phrase was even coined.

It's still sung before Camp Nou's biggest fixtures, one of the clearest reminders that the club's identity was never built around football alone.`}, 105);

  add({ type: 'article', slug: 'financial-crisis-explained', title: "How Barcelona Actually Ended Up Broke", excerpt: 'A brief, honest explanation of the financial mismanagement that forced Messi\'s exit.', tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '6 min', body: `Barcelona's financial crisis in the early 2020s stemmed from a combination of factors: heavy spending on transfers and wages during a period of declining on-pitch returns, the pandemic's impact on matchday and commercial revenue, and long-term contracts signed without enough safeguards.

The club was forced to use so-called "economic levers" — selling future revenue streams, such as a percentage of TV rights, for immediate cash — just to register new signings under La Liga's spending rules.

The consequences shaped nearly every decision the club made for several years afterward, including the reliance on academy graduates that's arguably reshaped the team's identity for the better.`}, 300);

  add({ type: 'article', slug: 'next-generation-watchlist', title: 'Five Academy Names to Watch Beyond Yamal', excerpt: "La Masia's pipeline hasn't stopped producing talent just because of one breakout star.", tag: 'future', tag_label: 'The Next Generation', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '5 min', body: `While Lamine Yamal understandably dominates headlines, several other academy products are pushing for regular first-team roles, part of a deep pipeline that the financial crisis years forced into earlier prominence.

Younger wingers and midfielders continue to progress through the club's age-group sides, with several already training regularly alongside the senior squad well ahead of schedule.

If the club's recent history is any guide, at least one or two names currently unfamiliar to casual fans will likely be first-team regulars within two or three seasons.`}, 30);

  add({ type: 'article', slug: 'stoichkov-fire', title: "Hristo Stoichkov: The Dream Team's Lit Fuse", excerpt: 'Every great side needs a player with an edge. Stoichkov was Cruyff\'s.', tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '3 min', body: `Hristo Stoichkov brought a ferocity to Cruyff's Dream Team that balanced out the side's elegance — a Ballon d'Or winner in 1994 known as much for his temper as his finishing.

He remains one of the most iconic foreign signings in club history, part of the core that delivered the club's first European Cup in 1992.

Fans of that era often describe him as the player who made sure the Dream Team's beautiful football came with genuine bite.`}, 550);

  add({ type: 'article', slug: 'rivaldo-overhead-kick', title: "Rivaldo's Overhead Kick That Saved a Season", excerpt: "A hat-trick against Valencia on the final day, capped by one of football's great individual goals.", tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '3 min', body: `Rivaldo's stoppage-time overhead kick against Valencia on the final day of the 2000-01 season remains one of the most replayed individual goals in club history, completing a hat-trick that secured Champions League qualification.

He won the Ballon d'Or in 1999, part of a golden generation that kept Barcelona competitive between the Dream Team and the Ronaldinho-Messi eras.

The goal is still frequently listed among the greatest in La Liga history, technical difficulty aside from the pure stakes riding on it.`}, 520);

  add({ type: 'article', slug: 'copa-del-rey-moments', title: "Copa del Rey: The Trophy That Keeps Producing Chaos", excerpt: "Barça's domestic cup history is full of drama the league title race rarely allows for.", tag: 'history', tag_label: 'Rivalries', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Barcelona holds the record for the most Copa del Rey titles in Spanish football, a competition that's produced some of the club's most dramatic knockout moments outside of Europe.

Because it's a straight knockout format, the tournament has occasionally exposed the club to shock defeats that a long league season would usually smooth over — making it a genuine source of both celebration and embarrassment across different eras.

For a club obsessed with process and philosophy, the cup's chaos offers a different, more unpredictable kind of drama every season.`}, 160);

  add({ type: 'article', slug: 'pique-defensive-partnership', title: "Piqué and Puyol: An Odd Couple Who Just Worked", excerpt: 'A cultured, occasionally arrogant Catalan and a rugged Pyrenees-born warrior formed one of Europe\'s best defensive pairings.', tag: 'legends', tag_label: 'Club Legends', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '4 min', body: `Gerard Piqué's return to Barcelona from Manchester United in 2008 formed one of the most effective centre-back pairings of the Guardiola era alongside Carles Puyol.

Piqué brought composure on the ball rare for a defender at the time, while Puyol supplied the physical urgency — a genuine complement rather than two players doing the same job.

Their partnership underpinned the treble and sextuple seasons, proof that even the most possession-obsessed system still needs defenders who can actually defend.`}, 240);

  add({ type: 'article', slug: 'barca-shirt-sponsor-history', title: "Why Barça Went Decades Without a Shirt Sponsor", excerpt: "The club famously paid UNICEF to appear on its shirt instead of the other way around.", tag: 'culture', tag_label: 'Club Culture', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '3 min', body: `For most of its history, Barcelona refused corporate shirt sponsorship on principle, only breaking that stance in 2006 — and even then, choosing to display UNICEF's logo and donate money to the charity rather than the usual arrangement of being paid by a sponsor.

The move was widely covered internationally as an example of the club's self-image as something more than a typical commercial entity.

Commercial pressures eventually led to conventional sponsorship deals in later years, but the UNICEF era is still cited as a distinctive chapter in the club's identity.`}, 145);

  add({ type: 'article', slug: 'barca-loan-army-era', title: "The 'Loan Army' Years: A Cautionary Financial Tale", excerpt: 'At one point Barcelona had dozens of players out on loan across Europe — a symptom of deeper problems.', tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `During the height of the financial crisis, Barcelona's books were so strained that the club had an unusually large number of players out on loan across various European leagues at once, some barely known to the fanbase.

Pundits nicknamed it the "loan army" — a sign of just how far recruitment strategy had drifted from anything resembling long-term planning.

The subsequent shift back toward academy graduates was, in part, a direct reaction to how badly that scattergun recruitment approach had failed.`}, 310);

  add({ type: 'article', slug: 'barca-b-team-pathway', title: "Barça Atlètic: The Bridge Between Academy and First Team", excerpt: "The club's reserve side has quietly become one of the most important pieces of the modern rebuild.", tag: 'youth', tag_label: 'La Masia', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `Barça Atlètic, the club's reserve team, plays a step below the top division but has become an increasingly important proving ground for academy graduates before their senior debuts.

Several of the current first-team's academy products spent time there refining their game against senior, physical opposition before being trusted at the very top level.

It's a less glamorous part of the pipeline than La Masia's youngest age groups, but arguably just as important to the pathway that's produced the club's recent academy success stories.`}, 200);

  add({ type: 'article', slug: 'messi-vs-ronaldo-clasico-era', title: "The Decade El Clásico Became a Two-Man Show", excerpt: "Between 2009 and 2018, Messi and Ronaldo turned every meeting into a personal duel layered on top of the rivalry.", tag: 'history', tag_label: 'Rivalries', source_url: 'https://en.wikipedia.org/wiki/FC_Barcelona', source_label: 'Wikipedia — FC Barcelona', read_time: '5 min', body: `For roughly a decade, El Clásico carried an added layer: two of the greatest players in football history facing off multiple times a season, each pushing the other to remarkable individual numbers.

The rivalry between Messi and Cristiano Ronaldo — never personally hostile by most accounts — nonetheless defined an era of the fixture in a way no individual duel had before.

Since Ronaldo's 2018 departure from Madrid, the fixture has settled back into being primarily about the two clubs again, though that decade is still the reference point most fans measure the rivalry's peak against.`}, 250);

  add({ type: 'article', slug: 'raphinha-breakout-season', title: "Raphinha's Rebirth on the Wing", excerpt: 'Written off by some after a slow start, Raphinha became one of the squad\'s most important attacking outlets.', tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `Raphinha's first season after joining Barcelona drew mixed reviews, with critics questioning whether he suited the system Xavi and later Flick wanted to play.

Since then, he's developed into one of the squad's most consistent attacking threats, contributing heavily to goals and assists during the club's recent title challenges.

His trajectory is often cited as an example of patience paying off — a reminder that not every signing needs to look right in its first six months to eventually become important.`}, 80);

  add({ type: 'article', slug: 'rodri-signing-significance', title: "Why Rodri's Arrival Matters More Than the Headlines Suggest", excerpt: "Signing a reigning Ballon d'Or-calibre midfielder signals the club's financial recovery as much as its ambition.", tag: 'modern', tag_label: 'Modern Barça', source_url: 'https://www.fcbarcelona.com/en/club/history', source_label: 'FC Barcelona — Official Club History', read_time: '4 min', body: `Rodri's move to Barcelona from Manchester City was one of the clearest signals yet that the club's years of financial restriction were genuinely easing.

Beyond the individual quality he brings, the ability to complete a deal of that profile again — competing for top-tier midfielders rather than only reclaiming academy graduates — marks a symbolic turning point after years of enforced austerity.

How he fits alongside the club's existing midfield options will be one of the more interesting tactical questions of the season.`}, 45);

  // ---------- MATCH REPORTS ----------
  add({ type: 'matchreport', slug: 'preview-clasico-2026', title: 'Pre-Match: Barça Travel to the Bernabéu Chasing the Title', excerpt: 'A look at team news, form, and the tactical questions ahead of this season\'s first Clásico.', tag: 'pre-match', tag_label: 'Pre-Match', read_time: '4 min', body: `Barcelona head into this weekend's Clásico sitting top of the table, with Hansi Flick's side needing a result to keep pace in a tight title race.

Team news: expect the usual pressing shape, with the front line built around Yamal's movement off the right and Raphinha stretching the pitch on the opposite flank.

Key battle: Barça's ability to win second balls in midfield against a Madrid side that thrives on quick transitions will likely decide this one.

Prediction: a tight, cagey affair that could well be settled by a single moment of individual quality — exactly the kind of game this fixture usually produces.`}, 5);

  add({ type: 'matchreport', slug: 'report-league-win-week', title: 'Post-Match: Barça Grind Out a Gritty Three Points', excerpt: "Not always pretty, but three points are three points in a title race this tight.", tag: 'post-match', tag_label: 'Post-Match', read_time: '4 min', body: `Barcelona ground out a hard-fought win this weekend, with the game settled by a set-piece goal rather than the flowing football the club is more associated with.

Talking point: the defensive discipline over the full 90 minutes was arguably more important than the attacking output — a sign of a squad maturing under pressure.

Player of the match: a commanding display at the base of midfield kept the team ticking even when the final ball wasn't quite clicking further forward.

What's next: attention turns to a midweek cup fixture, with squad rotation likely given the busy fixture list this season.`}, 3);

  // ---------- CLIPS ----------
  add({ type: 'clip', slug: 'clip-yamal-solo-goal', title: 'Yamal Skill Compilation — La Liga 2026', excerpt: 'A cut of the best individual moments from this season so far.', tag: 'skills', tag_label: 'Skills', read_time: '1 min watch', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, 10);
  add({ type: 'clip', slug: 'clip-camp-nou-atmosphere', title: 'Matchday Atmosphere — Full Stadium Bounce', excerpt: 'What it sounds like from the stands on a big European night.', tag: 'atmosphere', tag_label: 'Matchday', read_time: '1 min watch', video_url: 'https://www.tiktok.com/@fcbarcelona' }, 15);
  add({ type: 'clip', slug: 'clip-training-ground', title: 'Behind the Scenes: Training Ground Footage', excerpt: 'A look at how Flick runs a typical pressing drill in training.', tag: 'training', tag_label: 'Training', read_time: '2 min watch', video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }, 20);

  // ---------- BANTER ----------
  add({ type: 'banter', slug: 'banter-post-1', title: 'When you finally win the Clásico', excerpt: 'The timeline reacts.', tag: 'memes', tag_label: 'Memes', read_time: '30 sec', body: 'Replace this with a real embedded tweet URL from the admin panel — paste any public X/Twitter post link and it renders automatically.' }, 8);
  add({ type: 'banter', slug: 'banter-post-2', title: 'Transfer deadline day energy', excerpt: 'Every fanbase, every window, forever.', tag: 'memes', tag_label: 'Memes', read_time: '30 sec', body: 'Replace this with a real embedded tweet URL from the admin panel.' }, 12);

  return posts;
};
