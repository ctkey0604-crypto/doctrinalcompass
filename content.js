/* Doctrinal Compass — content.js
 *
 * THIS IS THE ONLY FILE YOU EDIT TO ADD CONTENT.
 * Every page on the site renders from this data, so a tradition page, an axis
 * page and the comparison view can never drift out of sync with each other.
 *
 * Editing rules, so the site keeps its promise:
 *   1. `what` states the position in the tradition's own terms. Never in the
 *      terms of its critics.
 *   2. `why` is the reasoning FROM INSIDE. It answers "why would a thoughtful
 *      person hold this", not "what's wrong with this".
 *   3. `texts` are scripture ADDRESSES, never quotations. A reference is
 *      checkable; a quotation typed from memory is how sites like this die.
 *   4. `sources` point at primary documents. Anything not personally checked
 *      against the document keeps verify:true, which prints a VERIFY badge.
 *      Set verify:false only after YOU have read it in the source.
 *   5. Keep `what` roughly the same length across traditions on a given axis.
 *      Unequal length is the most visible bias there is.
 */

window.DATA = (function () {
  'use strict';

  /* ================= GLOSSARY ================= */
  /* Tap any <span data-term="id"> in the copy to open these. */

  var glossary = {
    'sola-scriptura': {
      term: 'Sola scriptura',
      body: 'Scripture is the only infallible rule of faith. Creeds, councils and confessions still carry real authority, but they are subordinate and can in principle be corrected by Scripture.',
      also: 'Latin: "by Scripture alone." Often confused with solo scriptura.'
    },
    'solo-scriptura': {
      term: 'Solo scriptura',
      body: 'Scripture is the only authority at all, with no binding role for creed, council or church. The individual reader stands directly before the text.',
      also: 'A distinct position from sola scriptura, though the two are often blurred together.'
    },
    'prima-scriptura': {
      term: 'Prima scriptura',
      body: 'Scripture is supreme, but tradition, reason and experience are genuine subordinate authorities rather than merely useful tools.',
      also: 'Latin: "Scripture first."'
    },
    'magisterium': {
      term: 'Magisterium',
      body: 'The teaching office of the Catholic Church — the bishops in communion with the Bishop of Rome — charged with authentically interpreting the Word of God.',
      also: 'Catholic teaching holds that the Magisterium serves the Word of God and is not above it.'
    },
    'sacred-tradition': {
      term: 'Sacred Tradition',
      body: 'The apostolic preaching handed on in the life of the Church. In Catholic and Orthodox teaching this is not a second body of facts added to the Bible, but the same deposit transmitted in a second mode.',
      also: 'Distinguish from "traditions" (lowercase) meaning local customs, which both communions agree can change.'
    },
    'norma-normans': {
      term: 'Norma normans / norma normata',
      body: 'The "norming norm" and the "normed norm." Scripture norms everything else; the creeds and confessions are themselves normed by Scripture, and are authoritative because and insofar as they agree with it.',
      also: 'Standard Lutheran vocabulary for how confessions can be binding without rivalling Scripture.'
    },
    'deuterocanon': {
      term: 'Deuterocanonical books',
      body: 'Books including Tobit, Judith, Wisdom, Sirach, Baruch and 1–2 Maccabees, plus additions to Esther and Daniel. Catholics and Orthodox receive them as Scripture; Protestants classify them as Apocrypha and exclude them from the canon.',
      also: 'Greek-derived term meaning "second canon" — second in the order they were settled, not second in authority.'
    },
    'anagignoskomena': {
      term: 'Anagignoskomena',
      body: 'Greek for "those which are read." The Orthodox term for the books beyond the Protestant Old Testament that are read in the Church, received as Scripture though sometimes distinguished in rank.',
      also: 'Orthodox canon lists vary somewhat between local churches.'
    },
    'material-sufficiency': {
      term: 'Material vs. formal sufficiency',
      body: 'Material sufficiency: everything necessary for salvation is contained in Scripture. Formal sufficiency: Scripture is also clear enough to be rightly interpreted without an external interpreting authority. Some traditions affirm the first and deny the second.',
      also: 'This distinction resolves many arguments that otherwise talk past each other.'
    },
    'perspicuity': {
      term: 'Perspicuity of Scripture',
      body: 'The teaching that what is necessary for salvation is clear enough in Scripture that an ordinary reader, with ordinary means, can grasp it.',
      also: 'Not a claim that every passage is easy.'
    },
    'adiaphora': {
      term: 'Adiaphora',
      body: 'Matters "indifferent" — practices neither commanded nor forbidden by Scripture, on which the church may legitimately decide for good order.',
      also: 'Where a tradition draws this line largely determines how much freedom it allows.'
    },
    'ceni': {
      term: 'CENI',
      body: 'Command, Example and Necessary Inference — a hermeneutic that authorises a practice only if Scripture commands it, shows an approved example of it, or necessarily implies it.',
      also: 'Paired with the "law of silence": where Scripture does not speak, neither do we.'
    },
    'regulative-principle': {
      term: 'Regulative principle of worship',
      body: 'Worship may include only what Scripture positively commands. Contrast the normative principle, which permits whatever Scripture does not forbid.',
      also: 'The same two traditions can share a doctrine of Scripture and still worship very differently because of this.'
    },
    'apostolic-succession': {
      term: 'Apostolic succession',
      body: 'The continuity of ordained ministry, traced through the laying on of hands from the apostles, understood as guarding the continuity of apostolic teaching.',
      also: 'Held by Catholic, Orthodox and Anglican bodies, understood differently in each.'
    },
    'ecumenical-council': {
      term: 'Ecumenical council',
      body: 'A council understood to speak for the whole Church. The first seven, from Nicaea in 325 to Nicaea II in 787, are received by both Catholic and Orthodox Christians.',
      also: 'Rome counts later councils as ecumenical; the Orthodox do not.'
    },
    'homoousios': {
      term: 'Homoousios',
      body: 'Greek for "of the same substance." The Nicene term stating that the Son is of the same being as the Father, not merely similar to him.',
      also: 'This single word is the historic dividing line on the nature of God.'
    },
    'filioque': {
      term: 'Filioque',
      body: 'Latin for "and the Son." The Western addition to the Nicene Creed stating that the Spirit proceeds from the Father and the Son. The East holds the Spirit proceeds from the Father.',
      also: 'A disagreement about the creed itself and about who may amend it.'
    },
    'modalism': {
      term: 'Modalism',
      body: 'The view that Father, Son and Spirit are not three distinct persons but three modes, roles or manifestations of one single person.',
      also: 'Groups described this way by others often reject the label and prefer their own terms.'
    },
    'subordinationism': {
      term: 'Subordinationism',
      body: 'The view that the Son, and often the Spirit, are lesser in being than the Father rather than equal in nature.',
      also: 'Distinguish from functional subordination, which many Trinitarians affirm within an equality of being.'
    },
    'continuing-revelation': {
      term: 'Continuing revelation',
      body: 'The teaching that God still gives authoritative revelation beyond the biblical canon, whether through a living prophet, a governing body, or direct illumination.',
      also: 'The canon question and this question are separate: a group can hold a closed canon and still expect ongoing guidance.'
    },
    'inner-light': {
      term: 'Inner Light',
      body: 'The Quaker term for the immediate presence of Christ teaching the individual and the gathered meeting directly, without an intermediary.',
      also: 'Also called the Inward Light or "that of God in everyone."'
    },
    'inerrancy': {
      term: 'Inerrancy',
      body: 'The teaching that Scripture, in its original manuscripts, does not err in what it affirms. Distinguished by its own defenders from a wooden literalism.',
      also: 'Held most explicitly by conservative evangelical bodies; other traditions prefer "infallible in matters of faith and practice."'
    }
  };

  /* ================= AXES ================= */

  var axes = [
    {
      id: 'authority',
      name: 'Where authority sits',
      question: 'When Christians disagree about what is true, what settles it? This is the deepest division on the site, and most other disagreements run downstream of it.',
      written: true,
      spectrum: { left: 'The text alone', right: 'A living voice' }
    },
    {
      id: 'canon',
      name: 'Which books count',
      question: 'Before you can ask what Scripture teaches, you have to know what Scripture is. Which books belong, and is the list closed?',
      written: true
    },
    {
      id: 'godhead',
      name: 'The nature of God',
      question: 'Is God three distinct persons in one being, one person in three modes, or three distinct beings united in purpose? The historic creeds answer one way; several modern groups answer differently.',
      written: true
    },
    { id: 'baptism',  name: 'Baptism',            question: 'Who is baptised, by what mode, and what does the act accomplish?', written: false },
    { id: 'supper',   name: "The Lord's Supper",  question: 'In what sense, if any, is Christ present in the bread and cup?', written: false },
    { id: 'salvation',name: 'Salvation and election', question: 'How is a person justified, and what part do God and the human will each play?', written: false },
    { id: 'governance', name: 'Church governance', question: 'Who decides, and by what right? Bishops, elders, the congregation, or a central body?', written: false }
  ];

  /* ================= TRADITIONS ================= */
  /* `locus` is the one-line answer to "where does authority sit". */
  /* `spectrum` places the tradition 0–100 on the axis above. It is a deliberate */
  /* simplification and the site says so on screen. */

  var traditions = [
    { id: 'restoration', name: 'Churches of Christ', family: 'Restoration Movement', locus: 'Scripture alone, no creeds', spectrum: 3 },
    { id: 'baptist',     name: 'Baptist',            family: 'Free Church',          locus: 'Scripture alone; confessions advisory', spectrum: 9 },
    { id: 'reformed',    name: 'Reformed / Presbyterian', family: 'Magisterial Reformation', locus: 'Scripture alone; confessions subordinate', spectrum: 13 },
    { id: 'nondenom',    name: 'Non-denominational evangelical', family: 'Evangelical', locus: 'Scripture alone; little formal tradition', spectrum: 15 },
    { id: 'lutheran',    name: 'Lutheran',           family: 'Magisterial Reformation', locus: 'Scripture norms the confessions', spectrum: 19 },
    { id: 'adventist',   name: 'Seventh-day Adventist', family: 'Adventist',          locus: 'Scripture the standard; a prophetic gift under it', spectrum: 27 },
    { id: 'anabaptist',  name: 'Anabaptist / Mennonite', family: 'Radical Reformation', locus: 'Scripture read by the gathered congregation', spectrum: 34 },
    { id: 'anglican',    name: 'Anglican / Episcopal', family: 'English Reformation', locus: 'Scripture supreme; tradition and reason under it', spectrum: 39 },
    { id: 'methodist',   name: 'Methodist / Wesleyan', family: 'Wesleyan',            locus: 'Scripture first; tradition, reason, experience follow', spectrum: 43 },
    { id: 'oneness',     name: 'Oneness Pentecostal', family: 'Pentecostal',          locus: 'Scripture alone, read through the apostolic pattern', spectrum: 46 },
    { id: 'pentecostal', name: 'Pentecostal',        family: 'Pentecostal',           locus: 'Scripture first; the Spirit still speaks under it', spectrum: 49 },
    { id: 'jw',          name: "Jehovah's Witnesses", family: 'Bible Student movement', locus: 'Scripture, interpreted by the Governing Body', spectrum: 62 },
    { id: 'orthodox',    name: 'Eastern Orthodox',   family: 'Eastern Christianity',  locus: 'Scripture within Holy Tradition', spectrum: 67 },
    { id: 'catholic',    name: 'Roman Catholic',     family: 'Western Catholicism',   locus: 'Scripture and Tradition, read by the Magisterium', spectrum: 71 },
    { id: 'quaker',      name: 'Quaker (Friends)',   family: 'Radical Reformation',   locus: 'The Spirit speaking directly; Scripture secondary', spectrum: 88 },
    { id: 'lds',         name: 'Latter-day Saints',  family: 'Latter Day Saint movement', locus: 'Open canon and living prophets', spectrum: 93 }
  ];

  /* ================= POSITIONS ================= */
  /* Key format: "traditionId:axisId" */

  var P = {};

  function set(trad, axis, obj) { P[trad + ':' + axis] = obj; }

  /* ---------- AXIS: authority ---------- */

  set('catholic', 'authority', {
    what: 'Scripture and <span data-term="sacred-tradition">Sacred Tradition</span> are two modes of transmitting one deposit of revelation, and the <span data-term="magisterium">Magisterium</span> is charged with interpreting it authentically. Catholic teaching describes the teaching office as serving the Word of God, not standing above it.',
    why: 'The Church existed and preached before a single New Testament book was written, and it was the Church that recognised which books were apostolic. On this reading, a Bible detached from the community that produced and canonised it has no way to settle disputed readings, and the history of division is taken as evidence of that.',
    texts: ['2 Thessalonians 2:15', '1 Timothy 3:15', 'Matthew 16:18–19', 'Acts 15:1–29'],
    sources: [
      { ref: 'Dei Verbum 9–10 (Second Vatican Council, 1965)', verify: true },
      { ref: 'Catechism of the Catholic Church 80–87', verify: true }
    ],
    caution: 'Frequently caricatured as "the Bible plus extra rules." That is a two-source theory the Church itself rejected in the drafting of Dei Verbum. State it as one source in two modes.'
  });

  set('orthodox', 'authority', {
    what: 'Scripture exists <em>within</em> Holy Tradition rather than alongside it. Tradition is the whole life of the Spirit in the Church — Scripture, the seven <span data-term="ecumenical-council">ecumenical councils</span>, the Fathers, the liturgy and the icons — and Scripture is the Church\'s own book, read inside that life.',
    why: 'If the Church, guided by the Spirit, is what recognised the canon, then the Church\'s continuing mind is the natural context for reading it. Orthodoxy resists locating final authority in any single office, holding instead that the whole body of the faithful guards the faith, which is why a council is received as true rather than true by decree.',
    texts: ['2 Thessalonians 2:15', 'John 16:13', '1 Timothy 3:15', 'Acts 15:28'],
    sources: [
      { ref: 'Confession of Dositheus (Synod of Jerusalem, 1672)', verify: true },
      { ref: 'Encyclical of the Eastern Patriarchs (1848)', verify: true }
    ],
    caution: 'Not "Scripture plus councils." Tradition is the interpretive matrix, not a supplement.'
  });

  set('lutheran', 'authority', {
    what: 'Scripture is the <span data-term="norma-normans">norma normans</span> — the only rule and norm by which all teachers and teachings are judged. The ecumenical creeds and the Lutheran confessions are binding as normed norms: authoritative because, and insofar as, they agree with Scripture.',
    why: 'Confessions exist so that "Scripture alone" does not collapse into "my reading alone." A public, subscribable statement of what the church teaches lets a congregation hold its pastors accountable to something checkable, while leaving the confession itself answerable to the text.',
    texts: ['2 Timothy 3:15–17', 'Galatians 1:8–9', 'John 5:39'],
    sources: [
      { ref: 'Formula of Concord, Epitome, "Of the Comprehensive Summary, Rule and Norm"', verify: true },
      { ref: 'Book of Concord (1580)', verify: true }
    ]
  });

  set('reformed', 'authority', {
    what: 'Scripture is the only infallible rule of faith and practice, and its authority rests on God as its author rather than on the church\'s testimony. What is necessary is either stated in Scripture or may be deduced from it by good and necessary consequence.',
    why: 'The church can err and has erred, so an authority that could correct the church has to stand outside it. The inward witness of the Spirit, not an institutional ruling, is what finally persuades a reader that Scripture is God\'s word — which keeps the ultimate authority from being an office that could itself go wrong.',
    texts: ['2 Timothy 3:16–17', 'Isaiah 8:20', 'Acts 17:11', '1 Corinthians 4:6'],
    sources: [
      { ref: 'Westminster Confession of Faith 1.4–1.6, 1.10 (1646)', verify: true }
    ]
  });

  set('anglican', 'authority', {
    what: 'Scripture contains all things necessary to salvation, so nothing may be required as an article of faith that cannot be proved from it. The Church has authority in controversies of faith and may order rites and ceremonies, but may not decree anything contrary to Scripture, and councils may err.',
    why: 'This leaves a deliberately wide field of <span data-term="adiaphora">adiaphora</span> — matters Scripture does not settle, where the church may order its common life by reason and received custom. The aim is a church that can hold real internal disagreement without either binding consciences beyond Scripture or dissolving into private judgement.',
    texts: ['2 Timothy 3:16–17', 'Acts 15:28', '1 Corinthians 14:40'],
    sources: [
      { ref: 'Thirty-Nine Articles VI, XX, XXI (1571)', verify: true },
      { ref: 'Richard Hooker, Of the Laws of Ecclesiastical Polity (1593–97)', verify: true }
    ],
    caution: 'The "three-legged stool" of equal legs is a 20th-century popularisation. Hooker ordered them, with Scripture supreme.'
  });

  set('baptist', 'authority', {
    what: 'Scripture is the sole authority for faith and practice, with no binding creed above it. Confessions are published as testimony of what a body of churches believes, but they are advisory, and each congregation is finally answerable to the text itself.',
    why: 'Baptists came out of a conviction that neither state nor bishop may bind a conscience, and that a church is a gathered body of believers who have read and responded for themselves. Making any confession binding would recreate the very authority they left, so the text alone is left standing over every congregation equally.',
    texts: ['2 Timothy 3:16–17', 'Acts 17:11', 'Matthew 15:6–9'],
    sources: [
      { ref: 'Second London Baptist Confession 1.1–1.10 (1689)', verify: true },
      { ref: 'Baptist Faith and Message, Article I (1925, rev. 1963, 2000)', verify: true }
    ]
  });

  set('methodist', 'authority', {
    what: '<span data-term="prima-scriptura">Prima scriptura</span>: Scripture is primary, and tradition, reason and experience are genuine but subordinate authorities used to read and apply it. This is often called the Wesleyan Quadrilateral.',
    why: 'A doctrine that cannot be recognised in Christian history, cannot survive examination, and has no answering witness in a believer\'s life is treated as suspect for that reason. The three secondary sources are not rival authorities but the ordinary means by which Scripture is understood rather than merely quoted.',
    texts: ['2 Timothy 3:16–17', 'Acts 15:28', 'Romans 8:16', 'Luke 24:32'],
    sources: [
      { ref: 'Articles of Religion V (1784)', verify: true },
      { ref: 'United Methodist Book of Discipline, "Our Theological Task"', verify: true }
    ],
    caution: 'The term "quadrilateral" was coined by Albert Outler, not by Wesley, and Outler later regretted it because it implied four equal sides. Scripture is primary.'
  });

  set('anabaptist', 'authority', {
    what: 'Scripture is authoritative, read through a Christ-centred and New-Testament-prioritising lens, and interpreted by the gathered congregation rather than by scholars or officials. Discipleship is treated as the key that unlocks the text.',
    why: 'On this reading the New Testament fulfils and reinterprets the Old, so Christ\'s teaching and example govern how earlier commands apply. Interpretation belongs to the assembled community because a text meant to be lived is tested by whether a body of people can actually live it together.',
    texts: ['Matthew 5:17–48', 'Matthew 18:15–20', '1 Corinthians 14:29', 'John 13:34–35'],
    sources: [
      { ref: 'Schleitheim Confession (1527)', verify: true },
      { ref: 'Dordrecht Confession (1632)', verify: true }
    ]
  });

  set('restoration', 'authority', {
    what: 'Scripture alone, with creeds and post-apostolic tradition explicitly rejected as authoritative. The classic hermeneutic is <span data-term="ceni">command, example and necessary inference</span>, paired with a law of silence: where Scripture does not speak, the church does not either.',
    why: 'Every creed in history was written by someone, and each one became a new test of fellowship that divided Christians further. Restoring the practice of the New Testament church exactly — and adding nothing to it — is understood as the only ground on which all Christians could unite, because it is the only ground nobody invented.',
    texts: ['1 Peter 4:11', 'Colossians 3:17', 'Revelation 22:18–19', '2 John 9'],
    sources: [
      { ref: 'Thomas Campbell, Declaration and Address (1809)', verify: true }
    ]
  });

  set('pentecostal', 'authority', {
    what: 'Scripture is the infallible and authoritative rule of faith and conduct. Prophecy, tongues and other gifts are expected to continue, but are explicitly tested by and subordinate to Scripture, so they guide and confirm rather than add doctrine.',
    why: 'The book of Acts is read as descriptive of normal church life rather than of a closed apostolic era, so a church without the gifts looks truncated. Because a subjective impression can be wrong, Scripture is kept as the fixed standard against which every claimed word is weighed.',
    texts: ['Acts 2:17–18', '1 Corinthians 14:29–33', '1 Thessalonians 5:19–21', 'Joel 2:28'],
    sources: [
      { ref: 'Assemblies of God, Statement of Fundamental Truths, Truth 1', verify: true }
    ]
  });

  set('nondenom', 'authority', {
    what: 'Scripture alone, usually with a short statement of faith and no formal confessional tradition. Authority in practice sits with the local congregation and its teaching pastor rather than with any denominational body.',
    why: 'Denominational machinery is seen as an accumulation of human decisions that obscures a plain text and divides Christians over matters the Bible does not require. A short doctrinal basis is meant to secure the essentials while leaving everything else free.',
    texts: ['2 Timothy 3:16–17', 'Acts 17:11', 'Ephesians 4:4–6'],
    sources: [
      { ref: 'Varies by congregation — no single normative document', verify: false }
    ],
    caution: 'This is the least uniform entry on the site. Individual churches range from near-Reformed to near-Pentecostal.'
  });

  set('quaker', 'authority', {
    what: 'The primary rule is the immediate revelation of the Spirit — the <span data-term="inner-light">Inner Light</span> — speaking to the individual and the gathered meeting. Scripture is received as a true declaration of the fountain, and as a secondary rule subordinate to the Spirit who gave it.',
    why: 'The reasoning is that the Spirit who inspired the text must be present to open it, or reading produces only the letter. Since the same Spirit does not contradict himself, a leading is tested against Scripture and against the discernment of the meeting rather than taken as private licence.',
    texts: ['John 1:9', 'John 16:13', 'Jeremiah 31:33–34', '1 John 2:27'],
    sources: [
      { ref: 'Robert Barclay, Apology, Propositions 2–3 (1676)', verify: true }
    ],
    caution: 'Uniquely among the groups here, this places experience above the written text in formal rank.'
  });

  set('adventist', 'authority', {
    what: 'Scripture is affirmed as the sole standard by which all teaching is tested. Alongside this, the writings of Ellen G. White are recognised as an authoritative expression of the prophetic gift — described within the tradition as a lesser light leading to the greater light of Scripture.',
    why: 'If the gift of prophecy is listed among the gifts given to the church, then its presence is expected rather than surprising, and its function is to apply and confirm Scripture rather than to supply new doctrine. Scripture is deliberately retained as the court of appeal so the prophetic gift remains testable.',
    texts: ['Isaiah 8:20', 'Revelation 12:17', 'Revelation 19:10', 'Joel 2:28', '1 Thessalonians 5:20–21'],
    sources: [
      { ref: '28 Fundamental Beliefs, 1 (The Holy Scriptures) and 18 (The Gift of Prophecy)', verify: true }
    ],
    caution: 'The relationship between formal sola scriptura and a functioning prophetic authority is discussed and disputed inside the tradition itself, not only by outsiders.'
  });

  set('oneness', 'authority', {
    what: 'Scripture is the sole authority, read through what is understood as the apostolic pattern — that the practice recorded in Acts shows how the apostles actually applied Christ\'s commands, and is therefore normative.',
    why: 'On this reading, later creeds introduced philosophical categories the apostles never used, so the way to recover apostolic Christianity is to return to what the apostles are recorded as doing. Acts is treated as the interpretive key to the epistles rather than the reverse.',
    texts: ['Acts 2:38', 'Acts 4:12', 'John 5:39', 'Colossians 3:17'],
    sources: [
      { ref: 'United Pentecostal Church International, Articles of Faith', verify: true }
    ]
  });

  set('jw', 'authority', {
    what: 'The Bible is held to be the sole authority, published in the New World Translation. Authoritative understanding of it is provided by the Governing Body, identified as the faithful and discreet slave appointed to give spiritual food at the proper time.',
    why: 'The argument is that Scripture itself shows people needing a guide to understand what they read, and that Christ promised an appointed channel to feed his household. A single teaching channel is understood as the means by which the congregation stays united in doctrine rather than fragmenting.',
    texts: ['Matthew 24:45–47', 'Acts 8:30–31', '1 Corinthians 1:10'],
    sources: [
      { ref: 'Watch Tower publications on the faithful and discreet slave', verify: true }
    ],
    caution: 'Formally biblicist, functionally magisterial. State both; the site does not adjudicate whether that is a contradiction.'
  });

  set('lds', 'authority', {
    what: 'An open canon and <span data-term="continuing-revelation">continuing revelation</span> through living prophets. The Bible is received as the word of God as far as it is translated correctly, alongside the Book of Mormon, the Doctrine and Covenants and the Pearl of Great Price.',
    why: 'The reasoning is that God has always dealt with his people through prophets, and that nothing in Scripture announces the practice would stop. A living prophetic office is understood as the way God addresses circumstances the ancient text does not speak to, and as the reason the canon was never formally closed.',
    texts: ['Amos 3:7', 'Ephesians 2:20', 'James 1:5', 'Revelation 14:6'],
    sources: [
      { ref: 'Articles of Faith 8–9 (1842)', verify: true }
    ]
  });

  /* ---------- AXIS: canon ---------- */

  set('catholic', 'canon', {
    what: '73 books: the 66 received by Protestants plus the <span data-term="deuterocanon">deuterocanonical</span> books, defined at the Council of Trent. The canon is closed; public revelation ended with the apostolic age.',
    why: 'These books were in the Greek Old Testament used by the early Church and were read as Scripture for centuries before anyone proposed removing them. Trent\'s definition is understood as ratifying long-standing use rather than inventing a canon.',
    texts: [],
    sources: [{ ref: 'Council of Trent, Session IV (1546)', verify: true }]
  });

  set('orthodox', 'canon', {
    what: 'A wider Old Testament than the Protestant canon, including the <span data-term="anagignoskomena">anagignoskomena</span>. Lists vary somewhat between local churches; the Ethiopian Orthodox canon is broader still. The New Testament of 27 books is universally received and the canon is closed.',
    why: 'The canon is understood as settled by the Church\'s use in worship over time rather than by a single defining decree, which is why some variation between local churches is tolerated without alarm.',
    texts: [],
    sources: [{ ref: 'Received canon lists of the local Orthodox churches', verify: true }]
  });

  set('lutheran', 'canon', {
    what: '66 books. The Apocrypha are valued as useful and good to read but are not held to be Scripture and cannot establish doctrine. The canon is closed.',
    why: 'The distinction preserves the historic Christian practice of reading these books while denying them the power to settle a doctrinal dispute, on the ground that the Hebrew canon is the Old Testament the apostles treated as Scripture.',
    texts: [],
    sources: [{ ref: 'Luther\'s Bible (1534) placement of the Apocrypha between the Testaments', verify: true }]
  });

  set('reformed', 'canon', {
    what: '66 books, with the Apocrypha explicitly excluded and given no authority in the Church beyond that of other human writings. The canon is closed.',
    why: 'If the canon\'s authority comes from God rather than from the Church\'s recognition, then books that the Hebrew Scriptures never included cannot be added to it by later ecclesiastical decision.',
    texts: [],
    sources: [{ ref: 'Westminster Confession of Faith 1.2–1.3 (1646)', verify: true }]
  });

  set('anglican', 'canon', {
    what: '66 books as the doctrinal canon. The Apocrypha are read for example of life and instruction of manners, but not used to establish any doctrine. The canon is closed.',
    why: 'This keeps the ancient lectionary practice of reading these books publicly while limiting their function, which is characteristic of the wider Anglican approach to inherited custom.',
    texts: [],
    sources: [{ ref: 'Thirty-Nine Articles VI (1571)', verify: true }]
  });

  set('baptist', 'canon', { what: '66 books. The Apocrypha are not Scripture and carry no authority in the church. The canon is closed.', why: 'Follows the Reformed settlement on the canon; the Second London Confession reproduces the Westminster list closely.', texts: [], sources: [{ ref: 'Second London Baptist Confession 1.2–1.3 (1689)', verify: true }] });

  set('methodist', 'canon', { what: '66 books as the canon of doctrine, following the Anglican article on sufficiency. The canon is closed.', why: 'Wesley\'s Articles of Religion abridged the Thirty-Nine Articles and retained the article on the sufficiency of Scripture largely intact.', texts: [], sources: [{ ref: 'Articles of Religion V (1784)', verify: true }] });

  set('anabaptist', 'canon', { what: '66 books, with a working priority given to the New Testament where the two Testaments appear to point different directions. The canon is closed.', why: 'The Old Testament is read as fulfilled and reinterpreted in Christ, so his teaching governs how earlier commands — especially about the sword and the oath — apply now.', texts: ['Matthew 5:38–48'], sources: [{ ref: 'Dordrecht Confession (1632)', verify: true }] });

  set('restoration', 'canon', { what: '66 books, with a strong working distinction between the Old Testament as history and the New Testament as the church\'s law. The canon is closed.', why: 'The old covenant is understood to have ended at the cross, so authority for church practice is drawn from the New Testament, and specifically from Acts and the epistles.', texts: ['Colossians 2:14', 'Hebrews 9:15–17'], sources: [{ ref: 'Declaration and Address (1809)', verify: true }] });

  set('pentecostal', 'canon', { what: '66 books, closed. Continuing prophecy is affirmed but is explicitly not canonical and never adds to Scripture.', why: 'Keeping the canon closed is what allows the gifts to be tested; a prophecy that could amend Scripture would leave nothing fixed to test it against.', texts: ['1 Thessalonians 5:20–21'], sources: [{ ref: 'Assemblies of God, Statement of Fundamental Truths, Truth 1', verify: true }] });

  set('nondenom', 'canon', { what: '66 books, closed. Typically stated briefly in a short statement of faith without further elaboration.', why: 'The Protestant canon is assumed rather than argued, since these congregations generally inherit it without a confessional tradition that debates it.', texts: [], sources: [{ ref: 'Varies by congregation', verify: false }] });

  set('quaker', 'canon', { what: '66 books, closed as a canon. But because Scripture is a secondary rule under the Spirit, the boundary of the canon carries less weight here than in traditions where the text is the final authority.', why: 'If the Spirit is the primary rule, then settling the exact list of books is less decisive than discerning what the Spirit is saying through them now.', texts: [], sources: [{ ref: 'Barclay, Apology, Proposition 3 (1676)', verify: true }] });

  set('adventist', 'canon', { what: '66 books, closed. Ellen G. White\'s writings are explicitly not added to the canon and are described within the tradition as a lesser light pointing to the greater.', why: 'The canon is kept closed precisely so that the prophetic gift remains subject to a fixed standard rather than becoming a rival to it.', texts: ['Isaiah 8:20'], sources: [{ ref: '28 Fundamental Beliefs, 1 and 18', verify: true }] });

  set('oneness', 'canon', { what: '66 books, closed.', why: 'Shares the Protestant canon; the distinctive commitments lie in how Acts is used to interpret the rest, not in which books are received.', texts: [], sources: [{ ref: 'UPCI Articles of Faith', verify: true }] });

  set('jw', 'canon', { what: '66 books, closed, published as the New World Translation. The divine name is restored in the text at many points where other translations render it LORD.', why: 'Restoring the divine name is understood as recovering something obscured in transmission, and as central to worship rather than a matter of translation preference.', texts: ['Psalm 83:18', 'Exodus 3:15'], sources: [{ ref: 'New World Translation, appendix on the divine name', verify: true }] });

  set('lds', 'canon', { what: 'An open canon. The standard works are the Bible (King James Version), the Book of Mormon, the Doctrine and Covenants and the Pearl of Great Price, and further revelation may yet be added.', why: 'If God speaks through living prophets, then a permanently closed list would foreclose what he might still say. The canon is treated as the record of revelation rather than as its boundary.', texts: ['Amos 3:7', 'Revelation 14:6'], sources: [{ ref: 'Articles of Faith 8–9 (1842)', verify: true }] });

  /* ---------- AXIS: godhead ---------- */

  var NICENE_WHY = 'The reasoning is that Scripture calls Father, Son and Spirit God while insisting God is one, and addresses them as distinct — the Son prays to the Father, the Spirit is sent. <span data-term="homoousios">Homoousios</span> was adopted to hold both without collapsing the distinctions or dividing the being.';
  var NICENE_TEXTS = ['Matthew 28:19', 'John 1:1–14', 'John 17:5', '2 Corinthians 13:14', 'Deuteronomy 6:4'];

  function nicene(extraWhat, source, caution) {
    return {
      what: 'One God in three coequal, coeternal persons — Father, Son and Holy Spirit — of one being. ' + (extraWhat || ''),
      why: NICENE_WHY,
      texts: NICENE_TEXTS,
      sources: [{ ref: source || 'Nicene-Constantinopolitan Creed (381)', verify: true }],
      caution: caution
    };
  }

  set('catholic', 'godhead', nicene('The creed is confessed with the <span data-term="filioque">filioque</span>: the Spirit proceeds from the Father and the Son.', 'Catechism of the Catholic Church 232–267', null));
  set('orthodox', 'godhead', nicene('The creed is confessed without the <span data-term="filioque">filioque</span>: the Spirit proceeds from the Father.', 'Nicene-Constantinopolitan Creed (381), original form', 'The dispute is both about the doctrine and about whether any part of the Church may amend an ecumenical creed unilaterally.'));
  set('lutheran', 'godhead', nicene('The three ecumenical creeds are received and printed at the head of the confessions.', 'Book of Concord, the three ecumenical creeds', null));
  set('reformed', 'godhead', nicene('', 'Westminster Confession of Faith 2.3 (1646)', null));
  set('anglican', 'godhead', nicene('', 'Thirty-Nine Articles I and V (1571)', null));
  set('baptist', 'godhead', nicene('', 'Baptist Faith and Message, Article II', null));
  set('methodist', 'godhead', nicene('', 'Articles of Religion I (1784)', null));
  set('anabaptist', 'godhead', nicene('', 'Dordrecht Confession, Article I (1632)', null));
  set('restoration', 'godhead', nicene('Affirmed from Scripture directly; the creed itself is not used as a test of fellowship.', 'Held from Scripture rather than by creedal subscription', null));
  set('pentecostal', 'godhead', nicene('', 'Assemblies of God, Statement of Fundamental Truths, Truth 2', null));
  set('nondenom', 'godhead', nicene('', 'Typically stated in the congregation\'s short statement of faith', null));
  set('quaker', 'godhead', nicene('Historically affirmed, though some unprogrammed meetings today hold a range of views and do not require subscription.', 'Barclay, Apology (1676)', 'Modern liberal Friends vary considerably. State the historic position and the present range.'));
  set('adventist', 'godhead', nicene('', '28 Fundamental Beliefs, 2–5', null));

  set('oneness', 'godhead', {
    what: 'One God who is one person, revealed in three <span data-term="modalism">modes or manifestations</span> — as Father in creation, Son in redemption, Spirit in the church. Jesus is understood as the name of the one God in the flesh, so Father, Son and Spirit are titles of one indivisible person.',
    why: 'The reasoning is that the Old Testament is emphatic that God is one and alone, that the fullness of deity is said to dwell bodily in Christ, and that the apostles baptised in the single name of Jesus rather than reciting a formula of three. On this reading, three persons is the philosophical import the apostles never made.',
    texts: ['Deuteronomy 6:4', 'Isaiah 9:6', 'Colossians 2:9', 'John 14:9', 'Acts 2:38'],
    sources: [{ ref: 'UPCI Articles of Faith, the Fundamental Doctrine', verify: true }],
    caution: 'Oneness believers generally reject the label "modalist" as a description imported by critics. The historic bodies classify this as outside the Nicene consensus; the group disputes that classification. The site reports both and renders no verdict.'
  });

  set('lds', 'godhead', {
    what: 'The Godhead is three distinct beings — the Father, the Son and the Holy Ghost — perfectly one in purpose, will and glory but not one in substance. The Father and the Son are held to have glorified physical bodies; the Holy Ghost is a personage of spirit.',
    why: 'The reasoning rests on passages where the Son is seen as distinct from and addressing the Father, on the account of the First Vision, and on a reading of scriptural oneness as unity of will rather than unity of substance. Nicene language is regarded as a later philosophical construction rather than an apostolic teaching.',
    texts: ['John 17:20–23', 'Acts 7:55–56', 'Matthew 3:16–17', 'John 14:28'],
    sources: [{ ref: 'Articles of Faith 1 (1842); Doctrine and Covenants 130:22', verify: true }],
    caution: 'The historic bodies classify this as outside the Nicene consensus; Latter-day Saints self-identify as Christian and dispute that classification. The site reports both and renders no verdict.'
  });

  set('jw', 'godhead', {
    what: 'Jehovah alone is God. Jesus is his first and only direct creation, the one through whom all other things were made, and is not equal to the Father. The holy spirit is God\'s active force rather than a person.',
    why: 'The reasoning rests on texts where the Son is called firstborn of creation and beginning of the creation of God, where he states the Father is greater than he is, and where he is shown subject to the Father. The absence of the word "Trinity" from Scripture is treated as significant, and the doctrine is understood as a post-apostolic development.',
    texts: ['John 14:28', 'Colossians 1:15', 'Revelation 3:14', '1 Corinthians 15:28', 'John 17:3'],
    sources: [{ ref: 'Watch Tower publications on the nature of God', verify: true }],
    caution: 'The historic bodies classify this as outside the Nicene consensus; Jehovah\'s Witnesses self-identify as Christian and dispute that classification. The site reports both and renders no verdict.'
  });

  /* ================= TEST ================= */
  /* Each option lists the traditions whose stated position it matches. */
  /* Keep options descriptive, never evaluative, and never use loaded words. */

  var questions = [
    {
      id: 'q-auth-final',
      axis: 'authority',
      text: 'Two sincere Christians read the same passage and reach opposite conclusions. What finally settles it?',
      options: [
        { label: 'Scripture itself, read more carefully — nothing outside it can overrule it', t: ['reformed','baptist','lutheran','restoration','nondenom','oneness','adventist'] },
        { label: 'Scripture read within the continuous teaching of the historic Church', t: ['orthodox','catholic','anglican'] },
        { label: 'The church\'s appointed teaching authority gives the binding reading', t: ['catholic','jw'] },
        { label: 'The Spirit gives understanding directly, to a person or a gathered body', t: ['quaker','pentecostal','anabaptist','lds'] }
      ]
    },
    {
      id: 'q-auth-creeds',
      axis: 'authority',
      text: 'What standing do the historic creeds have?',
      options: [
        { label: 'Binding, as authentic statements of the faith', t: ['catholic','orthodox','lutheran','anglican'] },
        { label: 'Authoritative but subordinate — correctable by Scripture', t: ['reformed','methodist','baptist','anabaptist','adventist','pentecostal','nondenom'] },
        { label: 'Useful summaries with no authority at all', t: ['restoration'] },
        { label: 'Not binding, and in some respects mistaken', t: ['quaker','lds','jw','oneness'] }
      ]
    },
    {
      id: 'q-auth-tradition',
      axis: 'authority',
      text: 'A practice has been held by the Church for many centuries but is not stated in Scripture. What follows?',
      options: [
        { label: 'It should be dropped — silence is prohibition', t: ['restoration','baptist'] },
        { label: 'It is permitted but cannot be required of anyone', t: ['reformed','lutheran','anglican','methodist','nondenom','pentecostal','adventist','anabaptist','oneness'] },
        { label: 'Long use in the Church is itself a form of authority', t: ['catholic','orthodox'] },
        { label: 'It depends entirely on whether the Spirit leads to it now', t: ['quaker','lds','jw'] }
      ]
    },
    {
      id: 'q-auth-prophecy',
      axis: 'authority',
      text: 'Does God still give authoritative revelation today?',
      options: [
        { label: 'No — revelation closed with the apostles', t: ['reformed','lutheran','baptist','restoration','anglican','methodist','catholic','orthodox','anabaptist','nondenom','oneness'] },
        { label: 'The Spirit still speaks, but never in a way that adds to Scripture', t: ['pentecostal','quaker'] },
        { label: 'Yes, through a recognised prophetic gift under Scripture', t: ['adventist'] },
        { label: 'Yes, through living prophets or an appointed channel', t: ['lds','jw'] }
      ]
    },
    {
      id: 'q-canon-books',
      axis: 'canon',
      text: 'Which books belong in the Bible?',
      options: [
        { label: '66 — the Protestant canon', t: ['reformed','lutheran','baptist','methodist','anglican','anabaptist','restoration','pentecostal','nondenom','quaker','adventist','oneness','jw'] },
        { label: '73 — including the deuterocanonical books', t: ['catholic'] },
        { label: 'A wider canon, as received in the Eastern churches', t: ['orthodox'] },
        { label: 'The Bible together with additional modern scripture', t: ['lds'] }
      ]
    },
    {
      id: 'q-canon-closed',
      axis: 'canon',
      text: 'Is the canon closed?',
      options: [
        { label: 'Yes, permanently', t: ['reformed','lutheran','baptist','methodist','anglican','anabaptist','restoration','pentecostal','nondenom','catholic','orthodox','quaker','adventist','oneness','jw'] },
        { label: 'No — God may yet add to it', t: ['lds'] }
      ]
    },
    {
      id: 'q-god-nature',
      axis: 'godhead',
      text: 'What is the relationship between Father, Son and Spirit?',
      options: [
        { label: 'Three coequal persons in one being', t: ['catholic','orthodox','lutheran','reformed','anglican','baptist','methodist','anabaptist','restoration','pentecostal','nondenom','quaker','adventist'] },
        { label: 'One person revealed in three modes or manifestations', t: ['oneness'] },
        { label: 'Three distinct beings, perfectly united in purpose', t: ['lds'] },
        { label: 'The Father alone is God; the Son is his created agent', t: ['jw'] }
      ]
    },
    {
      id: 'q-god-christ',
      axis: 'godhead',
      text: 'What is Christ in relation to the Father?',
      options: [
        { label: 'Eternally begotten, of the same being as the Father', t: ['catholic','orthodox','lutheran','reformed','anglican','baptist','methodist','anabaptist','restoration','pentecostal','nondenom','quaker','adventist'] },
        { label: 'The one God himself, in human flesh', t: ['oneness'] },
        { label: 'A distinct divine being, subordinate to the Father in his beginning', t: ['lds'] },
        { label: 'The first and only direct creation of God', t: ['jw'] }
      ]
    }
  ];

  return {
    glossary: glossary,
    axes: axes,
    traditions: traditions,
    positions: P,
    questions: questions,
    meta: {
      site: 'Doctrinal Compass',
      promise: 'Every position stated in its own words, given its strongest scriptural case. No verdict rendered.'
    }
  };
})();
