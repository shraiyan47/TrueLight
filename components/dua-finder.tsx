"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import {
    Search,
    Filter,
    BookOpen,
    Heart,
    Copy,
    ChevronDown,
    ChevronUp,
    X,
    Pause,
    Play,
    SkipBack,
    Volume1,
    VolumeIcon,
    VolumeX,
    Loader2,
} from "lucide-react"

interface Dua {
    id: string
    title: string
    arabic: string
    transliteration: string
    translation: string
    reference: string
    category: string[]
    tags: string[]
    when_to_recite: string
    virtues: string
    audio_url: string // Added audio URL field
}

export default function DuaFinder() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [expandedDua, setExpandedDua] = useState<string | null>(null)
    const [filteredDuas, setFilteredDuas] = useState<Dua[]>([])
    const [showFilters, setShowFilters] = useState(false)
    const [copiedId, setCopiedId] = useState<string | null>(null)

    // Audio player states
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null)
    const [audioProgress, setAudioProgress] = useState(0)
    const [audioDuration, setAudioDuration] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [volume, setVolume] = useState(0.7)
    const [showVolumeControl, setShowVolumeControl] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Audio element reference
    const audioRef = useRef<HTMLAudioElement | null>(null)
    // Progress interval reference
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

    // All available categories
    const categories = [
        "Morning & Evening",
        "Distress & Anxiety",
        "Protection",
        "Forgiveness",
        "Guidance",
        "Health & Healing",
        "Family",
        "Prosperity",
        "Travel",
        "Sleep",
        "Food & Drink",
        "Worship",
        "Quran",
    ]

    // Sample duas data with audio URLs
    const duas: Dua[] = [
        {
            id: "dua-1",
            title: "Dua for Anxiety and Worry",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
            transliteration:
                "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dhala'id-daini wa ghalabatir-rijal",
            translation:
                "O Allah, I seek refuge in You from worry and grief, from helplessness and laziness, from miserliness and cowardice, from being heavily in debt and from being overpowered by men.",
            reference: "Sahih al-Bukhari",
            category: ["Distress & Anxiety", "Protection"],
            tags: ["anxiety", "worry", "stress", "debt", "fear"],
            when_to_recite: "Recite when feeling anxious, worried, or overwhelmed by life's challenges.",
            virtues:
                "The Prophet Muhammad (peace be upon him) regularly sought refuge in Allah with this dua. It addresses many of the common causes of distress and anxiety in our lives.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/anxiety_worry.mp3",
        },
        {
            id: "dua-2",
            title: "Dua for Protection (The Three Quls)",
            arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ ... قُلْ هُوَ اللَّهُ أَحَدٌ ...",
            transliteration: "Qul a'udhu bi rabbil-falaq ... Qul a'udhu bi rabbin-nas ... Qul huwa Allahu ahad ...",
            translation:
                "Say: I seek refuge with the Lord of the Daybreak... Say: I seek refuge with the Lord of Mankind... Say: He is Allah, the One...",
            reference: "Surah Al-Falaq, Al-Nas, and Al-Ikhlas (Quran 113, 114, 112)",
            category: ["Protection", "Morning & Evening"],
            tags: ["protection", "evil", "morning", "evening", "sleep"],
            when_to_recite:
                "Recite these three surahs together in the morning and evening, before sleeping, and when seeking protection from evil or harm.",
            virtues:
                "The Prophet (peace be upon him) said: 'Recite Surat Al-Ikhlas and Al-Mu'awwidhatayn (Al-Falaq and An-Nas) three times in the morning and evening, and they will suffice you against everything.' (Abu Dawud, At-Tirmidhi)",
            audio_url: "https://audio.islamicfinder.org/audio/dua/three_quls.mp3",
        },
        {
            id: "dua-3",
            title: "Dua for Seeking Forgiveness (Sayyid al-Istighfar)",
            arabic:
                "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
            transliteration:
                "Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana abduka, wa ana 'ala ahdika wa wa'dika ma istata'tu, a'udhu bika min sharri ma sana'tu, abu'u laka bini'matika 'alayya, wa abu'u bidhanbi faghfir li fa innahu la yaghfiru adh-dhunuba illa anta",
            translation:
                "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil of what I have done. I acknowledge Your blessing upon me, and I acknowledge my sin, so forgive me, for there is none who can forgive sins except You.",
            reference: "Sahih al-Bukhari",
            category: ["Forgiveness", "Morning & Evening"],
            tags: ["forgiveness", "repentance", "morning", "evening"],
            when_to_recite:
                "Recite in the morning and evening. Also beneficial when seeking forgiveness for sins or feeling regretful.",
            virtues:
                "The Prophet (peace be upon him) said: 'Whoever recites this with conviction in the evening and dies that night will enter Paradise, and whoever recites it with conviction in the morning and dies that day will enter Paradise.' (Bukhari)",
            audio_url: "https://audio.islamicfinder.org/audio/dua/sayyid_istighfar.mp3",
        },
        {
            id: "dua-4",
            title: "Dua for Guidance and Protection",
            arabic:
                "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، فَإِنَّكَ تَقْضِي وَلَا يُقْضَى عَلَيْكَ، إِنَّهُ لَا يَذِلُّ مَنْ وَالَيْتَ، وَلَا يَعِزُّ مَنْ عَادَيْتَ، تَبَارَكْتَ رَبَّنَا وَتَعَالَيْتَ",
            transliteration:
                "Allahumma ihdini fiman hadayta, wa 'afini fiman 'afayta, wa tawallani fiman tawallayta, wa barik li fima a'tayta, wa qini sharra ma qadayta, fa innaka taqdi wa la yuqda 'alayka, innahu la yadhillu man walayta, wa la ya'izzu man 'adayta, tabarakta Rabbana wa ta'alayta",
            translation:
                "O Allah, guide me among those whom You have guided, pardon me among those whom You have pardoned, turn to me in friendship among those on whom You have turned in friendship, bless me in what You have bestowed, and save me from the evil of what You have decreed. For indeed You decree and none can decree against You. He whom You befriend is not humbled. Blessed are You, O Lord, and Exalted.",
            reference: "Sunan Abu Dawud, Sunan at-Tirmidhi",
            category: ["Guidance", "Protection", "Worship"],
            tags: ["guidance", "protection", "blessing", "decree", "witr prayer"],
            when_to_recite: "Recite during Qunut in Witr prayer, or at any time when seeking guidance and protection.",
            virtues:
                "This dua, known as Dua al-Qunut, was taught by the Prophet (peace be upon him) to Hasan ibn Ali. It comprehensively asks for guidance, protection, and blessings from Allah.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/qunut.mp3",
        },
        {
            id: "dua-5",
            title: "Dua for Healing",
            arabic: "اللَّهُمَّ رَبَّ النَّاسِ، أَذْهِبِ الْبَأْسَ، اشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا",
            transliteration:
                "Allahumma Rabban-nas, adhhibil-ba's, ishfi antash-Shafi, la shifa'a illa shifa'uka, shifa'an la yughadiru saqaman",
            translation:
                "O Allah, Lord of mankind, remove the affliction, grant healing for You are the Healer. There is no healing except Your healing, a healing that leaves no illness behind.",
            reference: "Sahih al-Bukhari, Sahih Muslim",
            category: ["Health & Healing"],
            tags: ["healing", "sickness", "illness", "health", "recovery"],
            when_to_recite:
                "Recite when sick or visiting someone who is sick. Place your right hand on the area of pain while reciting.",
            virtues:
                "The Prophet (peace be upon him) used to visit the sick among his family and would touch the sick person with his right hand while reciting this dua.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/healing.mp3",
        },
        {
            id: "dua-6",
            title: "Dua Before Sleep",
            arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
            transliteration: "Bismika Allahumma amutu wa ahya",
            translation: "In Your name, O Allah, I die and I live.",
            reference: "Sahih al-Bukhari",
            category: ["Sleep", "Protection"],
            tags: ["sleep", "night", "protection", "rest"],
            when_to_recite: "Recite before going to sleep each night.",
            virtues:
                "The Prophet (peace be upon him) instructed his companions to recite this dua before sleeping. It acknowledges that our sleep is like a minor death and our awakening is like resurrection, both under Allah's control.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/before_sleep.mp3",
        },
        {
            id: "dua-7",
            title: "Dua for Entering the Marketplace",
            arabic:
                "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ، وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
            transliteration:
                "La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu, yuhyi wa yumitu, wa huwa hayyun la yamutu, biyadihil-khayr, wa huwa 'ala kulli shay'in qadir",
            translation:
                "There is no god but Allah alone, Who has no partner. His is the dominion and His is the praise. He gives life and causes death, and He is Living and does not die. In His Hand is all good, and He has power over all things.",
            reference: "Sunan at-Tirmidhi",
            category: ["Prosperity", "Protection"],
            tags: ["market", "shopping", "business", "protection", "blessing"],
            when_to_recite: "Recite when entering a marketplace, shopping mall, or any place of business.",
            virtues:
                "The Prophet (peace be upon him) said: 'Whoever enters a marketplace and says this dua, Allah will write for him a million good deeds, erase a million of his bad deeds, raise him a million levels, and build for him a house in Paradise.' (At-Tirmidhi)",
            audio_url: "https://audio.islamicfinder.org/audio/dua/marketplace.mp3",
        },
        {
            id: "dua-8",
            title: "Dua for Beginning a Meal",
            arabic: "بِسْمِ اللَّهِ",
            transliteration: "Bismillah",
            translation: "In the name of Allah",
            reference: "Sahih al-Bukhari, Sahih Muslim",
            category: ["Food & Drink"],
            tags: ["food", "eating", "meal", "blessing"],
            when_to_recite: "Recite before beginning to eat or drink.",
            virtues:
                "The Prophet (peace be upon him) said: 'When one of you eats, he should mention Allah's name (say Bismillah); if he forgets to mention Allah's name at the beginning, he should say: Bismillahi fi awwalihi wa akhirihi (In the name of Allah at its beginning and at its end).' (Abu Dawud, At-Tirmidhi)",
            audio_url: "https://audio.islamicfinder.org/audio/dua/bismillah.mp3",
        },
        {
            id: "dua-9",
            title: "Dua for Parents",
            arabic: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
            transliteration: "Rabbi irhamhuma kama rabbayani sagheera",
            translation: "My Lord, have mercy upon them as they brought me up when I was small.",
            reference: "Quran 17:24",
            category: ["Family"],
            tags: ["parents", "family", "mercy", "kindness"],
            when_to_recite: "Recite regularly for your parents, especially after prayers.",
            virtues:
                "This dua is mentioned in the Quran as part of the commandment to be good to parents. Making this dua for parents is a way to fulfill the obligation of kindness and gratitude towards them.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/parents.mp3",
        },
        {
            id: "dua-10",
            title: "Dua for Seeking Knowledge",
            arabic: "رَبِّ زِدْنِي عِلْمًا",
            transliteration: "Rabbi zidni 'ilma",
            translation: "My Lord, increase me in knowledge.",
            reference: "Quran 20:114",
            category: ["Guidance", "Quran"],
            tags: ["knowledge", "learning", "wisdom", "study"],
            when_to_recite: "Recite when seeking knowledge, before studying, or when facing difficulty in understanding.",
            virtues:
                "This concise yet powerful dua is mentioned in the Quran. The Prophet (peace be upon him) was commanded to make this dua, highlighting the importance of seeking beneficial knowledge.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/knowledge.mp3",
        },
        {
            id: "dua-11",
            title: "Dua for Protection When Leaving Home",
            arabic: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
            transliteration: "Bismillah, tawakkaltu 'alallah, wa la hawla wa la quwwata illa billah",
            translation:
                "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.",
            reference: "Sunan Abu Dawud, Sunan at-Tirmidhi",
            category: ["Protection", "Travel"],
            tags: ["home", "travel", "protection", "morning"],
            when_to_recite: "Recite when leaving your home for any purpose.",
            virtues:
                "The Prophet (peace be upon him) said: 'Whoever says this dua when leaving his house will be told: 'You are guided, you are taken care of, and you are protected.' The devils will go far away from him.' (Abu Dawud, At-Tirmidhi)",
            audio_url: "https://audio.islamicfinder.org/audio/dua/leaving_home.mp3",
        },
        {
            id: "dua-12",
            title: "Dua for Entering the Mosque",
            arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
            transliteration: "Allahumma iftah li abwaba rahmatik",
            translation: "O Allah, open for me the gates of Your mercy.",
            reference: "Sahih Muslim",
            category: ["Worship"],
            tags: ["mosque", "prayer", "mercy", "worship"],
            when_to_recite: "Recite when entering a mosque.",
            virtues:
                "The Prophet (peace be upon him) taught his companions to say this dua when entering the mosque, seeking Allah's mercy while in His house of worship.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/entering_mosque.mp3",
        },
        {
            id: "dua-13",
            title: "Dua for Leaving the Mosque",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ",
            transliteration: "Allahumma inni as'aluka min fadlik",
            translation: "O Allah, I ask You of Your bounty.",
            reference: "Sahih Muslim",
            category: ["Worship"],
            tags: ["mosque", "prayer", "bounty", "worship"],
            when_to_recite: "Recite when leaving a mosque.",
            virtues:
                "The Prophet (peace be upon him) taught his companions to say this dua when leaving the mosque, seeking Allah's bounty as they return to worldly affairs.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/leaving_mosque.mp3",
        },
        {
            id: "dua-14",
            title: "Dua for Traveling",
            arabic:
                "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ",
            transliteration:
                "Allahu Akbar, Allahu Akbar, Allahu Akbar, Subhanal-ladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun. Allahumma inna nas'aluka fi safarina hadha al-birra wat-taqwa, wa minal-'amali ma tarda. Allahumma hawwin 'alayna safarana hadha watwi 'anna bu'dahu. Allahumma antas-sahibu fis-safar, wal-khalifatu fil-ahl. Allahumma inni a'udhu bika min wa'tha'is-safar, wa ka'abatil-manzar, wa su'il-munqalabi fil-mali wal-ahl",
            translation:
                "Allah is the Greatest, Allah is the Greatest, Allah is the Greatest. Glory to Him Who has subjected this to us, for we could never have accomplished it by ourselves, and indeed to our Lord we shall return. O Allah, we ask You on this journey of ours for righteousness and piety, and for deeds that please You. O Allah, make this journey easy for us and shorten its distance. O Allah, You are our Companion in the journey and the Guardian of our family. O Allah, I seek refuge in You from the hardships of travel, from having a change of heart, and from being ill-treated in wealth and family.",
            reference: "Sahih Muslim",
            category: ["Travel", "Protection"],
            tags: ["travel", "journey", "protection", "safety"],
            when_to_recite: "Recite when setting out on a journey.",
            virtues:
                "The Prophet (peace be upon him) would recite this dua whenever he set out on a journey. It seeks protection, ease, and blessing for the journey ahead.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/travel.mp3",
        },
        {
            id: "dua-15",
            title: "Dua for Waking Up",
            arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ",
            transliteration: "Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur",
            translation:
                "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.",
            reference: "Sahih al-Bukhari",
            category: ["Morning & Evening", "Sleep"],
            tags: ["morning", "waking", "gratitude", "resurrection"],
            when_to_recite: "Recite immediately upon waking up.",
            virtues:
                "The Prophet (peace be upon him) instructed his companions to recite this dua upon waking up. It expresses gratitude to Allah for the blessing of life and acknowledges the reality of resurrection.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/waking_up.mp3",
        },
        // Additional duas for specific situations and needs
        {
            id: "dua-16",
            title: "Dua for Financial Difficulty",
            arabic: "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
            transliteration: "Allahumma-kfini bi halaalika 'an haraamika wa aghnini bi fadhlika 'amman siwaaka",
            translation:
                "O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You.",
            reference: "Sunan at-Tirmidhi",
            category: ["Distress & Anxiety", "Prosperity"],
            tags: ["financial", "money", "debt", "poverty", "wealth", "provision"],
            when_to_recite: "Recite during times of financial hardship, debt, or when seeking provision from Allah.",
            virtues:
                "The Prophet Muhammad (peace be upon him) taught this dua to help believers seek halal provision and contentment with what Allah has provided. It helps develop reliance on Allah rather than people.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/financial_difficulty.mp3",
        },
        {
            id: "dua-17",
            title: "Dua for Marriage",
            arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
            transliteration: "Baarakallahu laka wa baaraka 'alaika wa jama'a bainakumaa fi khair",
            translation: "May Allah bless you and shower His blessings upon you, and may He join you together in goodness.",
            reference: "Sunan Abu Dawud, Sunan at-Tirmidhi",
            category: ["Family", "Prosperity"],
            tags: ["marriage", "wedding", "spouse", "relationship", "blessing"],
            when_to_recite:
                "Recite for newlyweds or when attending a wedding. Also beneficial to recite for your own marriage.",
            virtues:
                "This is the dua that the Prophet (peace be upon him) would say to congratulate someone who got married. It asks for Allah's blessings on the marriage and for the couple to be joined in goodness.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/marriage.mp3",
        },
        {
            id: "dua-18",
            title: "Dua for Grief and Sorrow",
            arabic:
                "اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ، سَمَّيْتَ بِهِ نَفْسَكَ، أَوْ أَنْزَلْتَهُ فِي كِتَابِكَ، أَوْ عَلَّمْتَهُ أَحَدًا مِنْ خَلْقِكَ، أَوِ اسْتَأْثَرْتَ بِهِ فِي عِلْمِ الْغَيْبِ عِنْدَكَ، أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي",
            transliteration:
                "Allahumma inni 'abduka, ibnu 'abdika, ibnu amatika, nasiyati biyadika, madhin fiyya hukmuka, 'adlun fiyya qada'uka, as'aluka bikulli ismin huwa laka, sammayta bihi nafsaka, aw anzaltahu fi kitabika, aw 'allamtahu ahadan min khalqika, aw ista'tharta bihi fi 'ilmil-ghaybi 'indaka, an taj'alal-Qur'ana rabi'a qalbi, wa nura sadri, wa jala'a huzni, wa dhahaba hammi",
            translation:
                "O Allah, I am Your servant, the son of Your servant, the son of Your maidservant. My forelock is in Your Hand. Your command concerning me prevails, and Your decision concerning me is just. I call upon You by every one of the beautiful names with which You have described Yourself, or which You have revealed in Your Book, or have taught to any of Your creatures, or which You have chosen to keep in the knowledge of the unseen with You, to make the Quran the spring of my heart, and the light of my chest, and the banisher of my grief, and the reliever of my distress.",
            reference: "Musnad Ahmad",
            category: ["Distress & Anxiety", "Guidance"],
            tags: ["grief", "sorrow", "depression", "sadness", "anxiety", "emotional healing"],
            when_to_recite: "Recite during times of grief, sadness, depression, or emotional distress.",
            virtues:
                "The Prophet (peace be upon him) said: 'No person suffers any anxiety or grief, and says this supplication, but Allah will remove his anxiety and grief, and replace it with joy.' When asked if one should learn this dua, he replied, 'Yes, whoever hears it should learn it.'",
            audio_url: "https://audio.islamicfinder.org/audio/dua/grief_sorrow.mp3",
        },
        {
            id: "dua-19",
            title: "Dua for Seeking Allah's Forgiveness and Paradise",
            arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ، وَأَعُوذُ بِكَ مِنَ النَّارِ وَمَا قَرَّبَ إِلَيْهَا مِنْ قَوْلٍ أَوْ عَمَلٍ",
            transliteration:
                "Allahumma inni as'alukal-jannata wa ma qarraba ilayha min qawlin aw 'amal, wa a'udhu bika minan-nari wa ma qarraba ilayha min qawlin aw 'amal",
            translation:
                "O Allah, I ask You for Paradise and whatever brings me closer to it of words and deeds, and I seek refuge in You from the Fire and whatever brings me closer to it of words and deeds.",
            reference: "Sunan Ibn Majah",
            category: ["Forgiveness", "Guidance"],
            tags: ["paradise", "hellfire", "forgiveness", "repentance", "salvation"],
            when_to_recite: "Recite after prayers, especially after obligatory prayers, and during times of self-reflection.",
            virtues:
                "This comprehensive dua asks for the ultimate goal of every believer - Paradise - and protection from the Fire. It acknowledges that both words and actions can lead to either outcome, encouraging mindfulness in speech and behavior.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/paradise.mp3",
        },
        {
            id: "dua-20",
            title: "Dua for Seeking Knowledge and Understanding",
            arabic: "اللَّهُمَّ عَلِّمْنِي مَا يَنْفَعُنِي وَانْفَعْنِي بِمَا عَلَّمْتَنِي وَزِدْنِي عِلْمًا",
            transliteration: "Allahumma 'allimni ma yanfa'uni, wanfa'ni bima 'allamtani, wa zidni 'ilma",
            translation:
                "O Allah, teach me that which benefits me, benefit me with what You have taught me, and increase me in knowledge.",
            reference: "Sunan Ibn Majah",
            category: ["Guidance", "Quran"],
            tags: ["knowledge", "learning", "understanding", "wisdom", "study", "education"],
            when_to_recite:
                "Recite before studying, seeking knowledge, or when facing difficulty in understanding a concept.",
            virtues:
                "This dua combines the request for beneficial knowledge with the plea to benefit from what has already been learned. It acknowledges that knowledge without implementation has little value, and that continuous learning is essential for growth.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/knowledge_understanding.mp3",
        },
        {
            id: "dua-21",
            title: "Dua for Protection from Evil Eye",
            arabic: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّةِ مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ",
            transliteration: "A'udhu bikalimatil-lahit-tammati min kulli shaytanin wa hammatin, wa min kulli 'aynin lammatin",
            translation:
                "I seek refuge in the perfect words of Allah from every devil, harmful thing, and from every envious evil eye.",
            reference: "Sahih al-Bukhari",
            category: ["Protection"],
            tags: ["evil eye", "envy", "jealousy", "protection", "harm"],
            when_to_recite:
                "Recite for protection from the evil eye, especially when displaying blessings or when children are vulnerable.",
            virtues:
                "The Prophet (peace be upon him) used to seek refuge with Allah for Hasan and Husayn (his grandsons) with these words, saying: 'Your father (Ibrahim) used to seek refuge with Allah for Isma'il and Ishaq with these same words.'",
            audio_url: "https://audio.islamicfinder.org/audio/dua/evil_eye.mp3",
        },
        {
            id: "dua-22",
            title: "Dua for Patience and Steadfastness",
            arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
            transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana wansurna 'alal-qawmil-kafirin",
            translation:
                "Our Lord, pour upon us patience, make our foothold sure, and give us victory over the disbelieving people.",
            reference: "Quran 2:250",
            category: ["Distress & Anxiety", "Protection"],
            tags: ["patience", "steadfastness", "perseverance", "strength", "victory", "challenges"],
            when_to_recite: "Recite when facing challenges, difficulties, or when in need of patience and steadfastness.",
            virtues:
                "This dua was made by the believers when they faced Goliath and his army. It teaches us to ask Allah for patience first, then for steadfastness, and finally for victory. This sequence emphasizes that success comes through patience and firmness in faith.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/patience.mp3",
        },
        {
            id: "dua-23",
            title: "Dua for Seeking Good in All Affairs",
            arabic: "اللَّهُمَّ خِرْ لِي وَاخْتَرْ لِي",
            transliteration: "Allahumma khir li wakhtarli",
            translation: "O Allah, choose what is best for me and make the choice for me.",
            reference: "Sunan at-Tirmidhi",
            category: ["Guidance", "Prosperity"],
            tags: ["decision", "choice", "guidance", "istikhara", "affairs", "future"],
            when_to_recite: "Recite when facing important decisions or when unsure about which path to take.",
            virtues:
                "This concise dua is a simplified version of the Istikhara prayer. It acknowledges Allah's perfect knowledge and wisdom, and entrusts our affairs to Him, recognizing that He knows what is best for us even when we do not.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/seeking_good.mp3",
        },
        {
            id: "dua-24",
            title: "Dua for Protection from Debt",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْمَأْثَمِ وَالْمَغْرَمِ",
            transliteration: "Allahumma inni a'udhu bika minal-ma'thami wal-maghram",
            translation: "O Allah, I seek refuge in You from sin and debt.",
            reference: "Sahih al-Bukhari",
            category: ["Protection", "Prosperity"],
            tags: ["debt", "loan", "financial", "burden", "relief"],
            when_to_recite:
                "Recite regularly to seek protection from falling into debt or to seek relief from existing debt.",
            virtues:
                "The Prophet (peace be upon him) used to seek refuge from debt frequently. When asked why he sought refuge from debt so often, he replied: 'When a person gets into debt, he speaks and tells lies, and he makes promises and breaks them.'",
            audio_url: "https://audio.islamicfinder.org/audio/dua/debt.mp3",
        },
        {
            id: "dua-25",
            title: "Dua for Seeking a Righteous Spouse",
            arabic: "رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
            transliteration: "Rabbi hab li min ladunka dhurriyyatan tayyibatan innaka sami'ud-du'a",
            translation: "My Lord, grant me from Yourself a righteous offspring. Indeed, You are the Hearer of supplication.",
            reference: "Quran 3:38",
            category: ["Family"],
            tags: ["marriage", "spouse", "partner", "family", "children"],
            when_to_recite: "Recite when seeking a righteous spouse or when hoping to start a family.",
            virtues:
                "This was the dua of Prophet Zakariya (peace be upon him) when he asked Allah for a child in his old age. It teaches us to turn to Allah with our desires for family and to emphasize righteousness in our requests for a spouse and children.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/righteous_spouse.mp3",
        },
        {
            id: "dua-26",
            title: "Dua for Protection During Travel by Sea",
            arabic: "بِسْمِ اللَّهِ مَجْرَاهَا وَمُرْسَاهَا إِنَّ رَبِّي لَغَفُورٌ رَحِيمٌ",
            transliteration: "Bismillahi majraha wa mursaha, inna Rabbi laGhafurun Rahim",
            translation: "In the name of Allah is its sailing and its anchoring. Indeed, my Lord is Forgiving and Merciful.",
            reference: "Quran 11:41",
            category: ["Travel", "Protection"],
            tags: ["sea", "ship", "boat", "travel", "journey", "water"],
            when_to_recite: "Recite when traveling by sea, ship, boat, or any water vessel.",
            virtues:
                "This was the dua that Prophet Nuh (Noah, peace be upon him) instructed his people to say when boarding the ark. It reminds us that all journeys, especially those over water, are under Allah's control and protection.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/sea_travel.mp3",
        },
        {
            id: "dua-27",
            title: "Dua for Seeking Refuge from Laziness",
            arabic:
                "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكَسَلِ وَالْهَرَمِ وَالْمَأْثَمِ وَالْمَغْرَمِ وَمِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ الْقَبْرِ وَمِنْ فِتْنَةِ النَّارِ وَعَذَابِ النَّارِ وَمِنْ شَرِّ فِتْنَةِ الْغِنَى وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الْفَقْرِ",
            transliteration:
                "Allahumma inni a'udhu bika minal-kasali wal-harami wal-ma'thami wal-maghrami, wa min fitnatil-qabri wa 'adhabil-qabri, wa min fitnatin-nari wa 'adhabin-nari, wa min sharri fitnatil-ghina, wa a'udhu bika min fitnatil-faqr",
            translation:
                "O Allah, I seek refuge in You from laziness, senility, sin, debt, the trial and punishment of the grave, the trial and punishment of the Fire, and from the evil of the trial of wealth, and I seek refuge in You from the trial of poverty.",
            reference: "Sahih al-Bukhari, Sahih Muslim",
            category: ["Protection", "Guidance"],
            tags: ["laziness", "procrastination", "productivity", "energy", "motivation"],
            when_to_recite: "Recite in the morning and evening, and when feeling lazy or lacking motivation.",
            virtues:
                "The Prophet (peace be upon him) regularly sought refuge from laziness, recognizing it as a significant obstacle to fulfilling our duties to Allah and achieving our potential in this life.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/laziness.mp3",
        },
        {
            id: "dua-28",
            title: "Dua for Seeking Beneficial Rain",
            arabic: "اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا، اللَّهُمَّ أَغِثْنَا",
            transliteration: "Allahumma aghithna, Allahumma aghithna, Allahumma aghithna",
            translation: "O Allah, send us rain. O Allah, send us rain. O Allah, send us rain.",
            reference: "Sahih al-Bukhari, Sahih Muslim",
            category: ["Distress & Anxiety", "Prosperity"],
            tags: ["rain", "drought", "water", "crops", "agriculture", "weather"],
            when_to_recite: "Recite during times of drought or when rain is needed for crops and water supply.",
            virtues:
                "The Prophet (peace be upon him) would raise his hands and recite this dua when people came to him complaining of drought. It teaches us to turn to Allah directly for our basic needs, including the natural elements that sustain life.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/rain.mp3",
        },
        {
            id: "dua-29",
            title: "Dua for Seeking Refuge from Difficult Trials",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ جَهْدِ الْبَلَاءِ، وَدَرَكِ الشَّقَاءِ، وَسُوءِ الْقَضَاءِ، وَشَمَاتَةِ الْأَعْدَاءِ",
            transliteration:
                "Allahumma inni a'udhu bika min jahdil-bala', wa darakish-shaqa', wa su'il-qada', wa shamatati-l-a'da'",
            translation:
                "O Allah, I seek refuge in You from the distress of trial, from the lowest level of misery, from the evil of destiny, and from the gloating of enemies.",
            reference: "Sahih al-Bukhari, Sahih Muslim",
            category: ["Protection", "Distress & Anxiety"],
            tags: ["trials", "hardship", "enemies", "destiny", "misery", "protection"],
            when_to_recite:
                "Recite when facing difficult trials, when fearing the gloating of enemies, or when concerned about one's destiny.",
            virtues:
                "The Prophet (peace be upon him) taught this comprehensive dua to seek protection from various types of hardship. It acknowledges that trials, misery, unfavorable destiny, and the mockery of enemies are all significant challenges that require divine protection.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/difficult_trials.mp3",
        },
        {
            id: "dua-30",
            title: "Dua for Seeking Refuge from Bad Character",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ مُنْكَرَاتِ الْأَخْلَاقِ وَالْأَعْمَالِ وَالْأَهْوَاءِ",
            transliteration: "Allahumma inni a'udhu bika min munkaratil-akhlaqi wal-a'mali wal-ahwa'",
            translation: "O Allah, I seek refuge in You from evil character, evil actions, and evil desires.",
            reference: "Sunan at-Tirmidhi",
            category: ["Protection", "Guidance"],
            tags: ["character", "morals", "ethics", "behavior", "desires", "self-improvement"],
            when_to_recite:
                "Recite when seeking to improve character, when struggling with bad habits, or when facing temptations.",
            virtues:
                "This dua recognizes that our character, actions, and desires are interconnected. By seeking refuge from evil in all three areas, we acknowledge that good character leads to good actions, which stem from pure desires and intentions.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/bad_character.mp3",
        },
        {
            id: "dua-31",
            title: "Dua for Success in Exams and Tests",
            arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
            transliteration: "Rabbish-rahli sadri wa yassirli amri wahlul 'uqdatan min lisani yafqahu qawli",
            translation:
                "My Lord, expand for me my chest, ease for me my task, and remove the impediment from my speech so they may understand my speech.",
            reference: "Quran 20:25-28",
            category: ["Guidance"],
            tags: ["exam", "test", "study", "education", "success", "memory"],
            when_to_recite:
                "Recite before and during exams, tests, interviews, or any situation requiring clear communication.",
            virtues:
                "This was the dua of Prophet Musa (Moses, peace be upon him) when Allah sent him to Pharaoh. It asks for confidence (expanded chest), ease in difficult tasks, and clarity in expression - all essential for success in exams and tests.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/exams.mp3",
        },
        {
            id: "dua-32",
            title: "Dua for Seeking a Good End (Husn al-Khatimah)",
            arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
            transliteration: "Ya muqallibal-qulub, thabbit qalbi 'ala dinik",
            translation: "O Turner of hearts, make my heart firm upon Your religion.",
            reference: "Sunan at-Tirmidhi",
            category: ["Guidance", "Protection"],
            tags: ["death", "end", "steadfastness", "faith", "heart", "final moments"],
            when_to_recite: "Recite regularly to seek steadfastness in faith and a good end to life.",
            virtues:
                "The Prophet (peace be upon him) frequently recited this dua, recognizing that hearts can change and that steadfastness until death requires Allah's help. A good end (dying upon faith) is the ultimate success for a believer.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/good_end.mp3",
        },
        {
            id: "dua-33",
            title: "Dua for Seeking Refuge from Sudden Death",
            arabic:
                "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَدْمِ، وَأَعُوذُ بِكَ مِنَ التَّرَدِّي، وَأَعُوذُ بِكَ مِنَ الْغَرَقِ وَالْحَرَقِ وَالْهَرَمِ، وَأَعُوذُ بِكَ أَنْ يَتَخَبَّطَنِي الشَّيْطَانُ عِنْدَ الْمَوْتِ، وَأَعُوذُ بِكَ أَنْ أَمُوتَ فِي سَبِيلِكَ مُدْبِرًا، وَأَعُوذُ بِكَ أَنْ أَمُوتَ لَدِيغًا",
            transliteration:
                "Allahumma inni a'udhu bika minal-hadmi, wa a'udhu bika minat-taraddi, wa a'udhu bika minal-gharaqi wal-haraqi wal-harami, wa a'udhu bika an yatakhabba-tanish-shaytanu 'indal-mawti, wa a'udhu bika an amuta fi sabilika mudbiran, wa a'udhu bika an amuta ladighan",
            translation:
                "O Allah, I seek refuge in You from being buried alive, from falling from a high place, from drowning, burning, and senility. I seek refuge in You from being tempted by Satan at the time of death, from dying while fleeing from the battlefield, and from dying from the bite of a poisonous creature.",
            reference: "Sunan Abu Dawud, Sunan an-Nasa'i",
            category: ["Protection"],
            tags: ["death", "sudden", "accident", "protection", "safety"],
            when_to_recite: "Recite regularly for protection from sudden or unprepared death.",
            virtues:
                "This comprehensive dua seeks protection from various forms of sudden death that might prevent proper preparation for meeting Allah. It reflects the Islamic emphasis on being prepared for death at all times while seeking protection from difficult ends.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/sudden_death.mp3",
        },
        {
            id: "dua-34",
            title: "Dua for Seeking Refuge from Shirk (Associating Partners with Allah)",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ أَنْ أُشْرِكَ بِكَ وَأَنَا أَعْلَمُ، وَأَسْتَغْفِرُكَ لِمَا لَا أَعْلَمُ",
            transliteration: "Allahumma inni a'udhu bika an ushrika bika wa ana a'lamu, wa astaghfiruka lima la a'lamu",
            translation:
                "O Allah, I seek refuge in You from knowingly associating partners with You, and I seek Your forgiveness for what I do unknowingly.",
            reference: "Musnad Ahmad",
            category: ["Protection", "Forgiveness"],
            tags: ["shirk", "polytheism", "monotheism", "tawhid", "faith", "belief"],
            when_to_recite:
                "Recite regularly to protect one's faith and to seek forgiveness for unintentional errors in worship.",
            virtues:
                "This dua acknowledges the severity of shirk (the greatest sin) while recognizing human fallibility. It combines seeking protection from conscious shirk with seeking forgiveness for unconscious errors, reflecting the balance between fear and hope in Islam.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/shirk.mp3",
        },
        {
            id: "dua-35",
            title: "Dua for Seeking Refuge from Disbelief and Poverty",
            arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْكُفْرِ وَالْفَقْرِ",
            transliteration: "Allahumma inni a'udhu bika minal-kufri wal-faqr",
            translation: "O Allah, I seek refuge in You from disbelief and poverty.",
            reference: "Sunan Abu Dawud, Sunan an-Nasa'i",
            category: ["Protection", "Prosperity"],
            tags: ["disbelief", "poverty", "faith", "provision", "wealth"],
            when_to_recite: "Recite regularly to protect one's faith and to seek sufficient provision.",
            virtues:
                "This concise dua seeks protection from two major trials: disbelief, which is spiritual poverty, and material poverty, which can sometimes lead to disbelief. The Prophet (peace be upon him) taught us to seek refuge from both, recognizing their interconnected dangers.",
            audio_url: "https://audio.islamicfinder.org/audio/dua/disbelief_poverty.mp3",
        },
    ]

    // Filter duas based on search query and selected categories
    useEffect(() => {
        let filtered = duas

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered = filtered.filter(
                (dua) =>
                    dua.title.toLowerCase().includes(query) ||
                    dua.translation.toLowerCase().includes(query) ||
                    dua.tags.some((tag) => tag.toLowerCase().includes(query)),
            )
        }

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((dua) => dua.category.some((cat) => selectedCategories.includes(cat)))
        }

        setFilteredDuas(filtered)
    }, [searchQuery, selectedCategories])

    // Initialize filtered duas on component mount
    useEffect(() => {
        setFilteredDuas(duas)
    }, [])

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new Audio()

        // Add event listeners to audio element
        audioRef.current.addEventListener("loadstart", () => setIsLoading(true))
        audioRef.current.addEventListener("canplay", () => setIsLoading(false))
        audioRef.current.addEventListener("ended", handleAudioEnded)
        audioRef.current.addEventListener("loadedmetadata", () => {
            if (audioRef.current) {
                setAudioDuration(audioRef.current.duration)
            }
        })

        // Set initial volume
        if (audioRef.current) {
            audioRef.current.volume = volume
        }

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
                audioRef.current.removeEventListener("loadstart", () => setIsLoading(true))
                audioRef.current.removeEventListener("canplay", () => setIsLoading(false))
                audioRef.current.removeEventListener("ended", handleAudioEnded)
                audioRef.current.removeEventListener("loadedmetadata", () => {
                    if (audioRef.current) {
                        setAudioDuration(audioRef.current.duration)
                    }
                })
            }

            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
        }
    }, [])

    // Handle audio ended event
    const handleAudioEnded = () => {
        setIsPlaying(false)
        setAudioProgress(0)
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current)
        }
    }

    // Toggle category selection
    const toggleCategory = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }

    // Toggle dua expansion
    const toggleDuaExpansion = (id: string) => {
        if (expandedDua === id) {
            setExpandedDua(null)
        } else {
            setExpandedDua(id)
        }
    }

    // Clear all filters
    const clearFilters = () => {
        setSearchQuery("")
        setSelectedCategories([])
    }

    // Copy dua text to clipboard
    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text)
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    // Play or pause audio
    const toggleAudio = (duaId: string, audioUrl: string) => {
        // If already playing this audio, pause it
        if (isPlaying && currentlyPlayingId === duaId) {
            if (audioRef.current) {
                audioRef.current.pause()
            }
            setIsPlaying(false)
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
            return
        }

        // If playing a different audio, stop it first
        if (isPlaying && currentlyPlayingId !== duaId) {
            if (audioRef.current) {
                audioRef.current.pause()
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current)
            }
        }

        // Start playing the new audio
        if (audioRef.current) {
            setIsLoading(true)
            setCurrentlyPlayingId(duaId)

            // Add error handling for audio loading
            audioRef.current.onerror = () => {
                setIsLoading(false)
                setIsPlaying(false)
                alert("Sorry, the audio file could not be loaded. This is a demo with placeholder URLs.")
            }

            audioRef.current.src = audioUrl
            audioRef.current
                .play()
                .then(() => {
                    setIsPlaying(true)
                    setAudioProgress(0)

                    // Update progress
                    if (progressIntervalRef.current) {
                        clearInterval(progressIntervalRef.current)
                    }

                    progressIntervalRef.current = setInterval(() => {
                        if (audioRef.current) {
                            setAudioProgress(audioRef.current.currentTime)
                        }
                    }, 100)
                })
                .catch((error) => {
                    console.error("Error playing audio:", error)
                    setIsLoading(false)
                    alert("Sorry, the audio file could not be played. This is a demo with placeholder URLs.")
                })
        }
    }

    // Restart audio from beginning
    const restartAudio = () => {
        if (audioRef.current && currentlyPlayingId) {
            audioRef.current.currentTime = 0
            setAudioProgress(0)

            if (!isPlaying) {
                audioRef.current
                    .play()
                    .then(() => {
                        setIsPlaying(true)

                        if (progressIntervalRef.current) {
                            clearInterval(progressIntervalRef.current)
                        }

                        progressIntervalRef.current = setInterval(() => {
                            if (audioRef.current) {
                                setAudioProgress(audioRef.current.currentTime)
                            }
                        }, 100)
                    })
                    .catch(console.error)
            }
        }
    }

    // Update audio progress when slider is moved
    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number.parseFloat(e.target.value)
        if (audioRef.current) {
            audioRef.current.currentTime = newTime
            setAudioProgress(newTime)
        }
    }

    // Toggle mute
    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    // Change volume
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number.parseFloat(e.target.value)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
            setVolume(newVolume)

            if (newVolume === 0) {
                setIsMuted(true)
                audioRef.current.muted = true
            } else if (isMuted) {
                setIsMuted(false)
                audioRef.current.muted = false
            }
        }
    }

    // Format time (seconds to MM:SS)
    const formatTime = (timeInSeconds: number) => {
        if (isNaN(timeInSeconds)) return "00:00"

        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)

        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    // Get volume icon based on current volume
    const getVolumeIcon = () => {
        if (isMuted || volume === 0) {
            return <VolumeX className="h-4 w-4" />
        } else if (volume < 0.5) {
            return <Volume1 className="h-4 w-4" />
        } else {
            return <VolumeIcon className="h-4 w-4" />
        }
    }

    // Add a function to check if audio is available
    const isAudioAvailable = () => {
        // For demo purposes, return false since we're using placeholder URLs
        return false
    }

    return (
        <div>
            {/* Search and Filter Section */}
            <div className="mb-8 bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-6 card-bg transition-colors">
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
                    <div className="relative w-full md:w-2/3">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search duas by title, content, or situation..."
                            className="w-full p-3 pl-10 border border-green-200 dark:border-night-200 rounded-md bg-white dark:bg-night-300 text-green-900 dark:text-sand-200 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-sand-600 input-field transition-colors"
                        />
                        <Search className="absolute left-3 top-3.5 h-4 w-4 text-green-500 dark:text-sand-500 icon-secondary transition-colors" />
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-green-100 dark:bg-night-400 text-green-700 dark:text-sand-400 rounded-md hover:bg-green-200 dark:hover:bg-night-300 btn-secondary transition-colors"
                    >
                        <Filter className="h-4 w-4" />
                        <span>Filter by Category</span>
                        {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                </div>

                {/* Category Filters */}
                {showFilters && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => toggleCategory(category)}
                                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${selectedCategories.includes(category)
                                            ? "bg-green-600 text-white dark:bg-sand-700 dark:text-sand-100 btn-primary"
                                            : "bg-green-100 text-green-700 dark:bg-night-400 dark:text-sand-400 hover:bg-green-200 dark:hover:bg-night-300 btn-secondary"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {(selectedCategories.length > 0 || searchQuery) && (
                            <div className="mt-4 flex items-center">
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-1 text-sm text-green-600 dark:text-sand-400 hover:text-green-800 dark:hover:text-sand-300 nav-link transition-colors"
                                >
                                    <X className="h-3.5 w-3.5" />
                                    Clear all filters
                                </button>
                                <span className="ml-3 text-sm text-green-600 dark:text-sand-500 card-muted transition-colors">
                                    Showing {filteredDuas.length} of {duas.length} duas
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Duas List */}
            {filteredDuas.length > 0 ? (
                <div className="space-y-6">
                    {filteredDuas.map((dua) => (
                        <div
                            key={dua.id}
                            className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 overflow-hidden card-bg transition-colors"
                        >
                            {/* Dua Header */}
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-green-50 dark:hover:bg-night-400 transition-colors"
                                onClick={() => toggleDuaExpansion(dua.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <BookOpen className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                                    <h3 className="font-medium text-green-800 dark:text-sand-300 card-title transition-colors">
                                        {dua.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-wrap gap-1">
                                        {dua.category.slice(0, 2).map((cat) => (
                                            <span
                                                key={cat}
                                                className="text-xs px-2 py-0.5 bg-green-100 dark:bg-night-400 text-green-800 dark:text-sand-300 rounded-full badge transition-colors"
                                            >
                                                {cat}
                                            </span>
                                        ))}
                                        {dua.category.length > 2 && (
                                            <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-night-400 text-green-800 dark:text-sand-300 rounded-full badge transition-colors">
                                                +{dua.category.length - 2}
                                            </span>
                                        )}
                                    </div>
                                    {expandedDua === dua.id ? (
                                        <ChevronUp className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                                    ) : (
                                        <ChevronDown className="h-5 w-5 text-green-600 dark:text-sand-400 icon-primary transition-colors" />
                                    )}
                                </div>
                            </div>

                            {/* Expanded Dua Content */}
                            {expandedDua === dua.id && (
                                <div className="p-6 border-t border-green-100 dark:border-night-300 divider transition-colors">
                                    {/* Arabic Text */}
                                    <div className="mb-6 text-right">
                                        <p className="text-xl arabic-text leading-loose text-green-900 dark:text-sand-200 card-text transition-colors">
                                            {dua.arabic}
                                        </p>
                                    </div>

                                    {/* Transliteration */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                                            Transliteration
                                        </h4>
                                        <p className="italic text-green-800 dark:text-sand-300 card-title transition-colors">
                                            {dua.transliteration}
                                        </p>
                                    </div>

                                    {/* Translation */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                                            Translation
                                        </h4>
                                        <p className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                                            {dua.translation}
                                        </p>
                                    </div>

                                    {/* Audio Player */}
                                    {/* <div className="mb-6 p-4 bg-green-50 dark:bg-night-400 rounded-md">
                                        {isAudioAvailable() ? (
                                            <>
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => toggleAudio(dua.id, dua.audio_url)}
                                                            disabled={isLoading}
                                                            className="p-2 rounded-full bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 btn-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            aria-label={isPlaying && currentlyPlayingId === dua.id ? "Pause" : "Play"}
                                                        >
                                                            {isLoading && currentlyPlayingId === dua.id ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : isPlaying && currentlyPlayingId === dua.id ? (
                                                                <Pause className="h-4 w-4" />
                                                            ) : (
                                                                <Play className="h-4 w-4" />
                                                            )}
                                                        </button>

                                                        <button
                                                            onClick={restartAudio}
                                                            disabled={!currentlyPlayingId || currentlyPlayingId !== dua.id}
                                                            className="p-2 rounded-full bg-green-100 dark:bg-night-300 text-green-700 dark:text-sand-400 hover:bg-green-200 dark:hover:bg-night-200 btn-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                            aria-label="Restart"
                                                        >
                                                            <SkipBack className="h-4 w-4" />
                                                        </button>

                                                        <div className="relative">
                                                            <button
                                                                onClick={() => setShowVolumeControl(!showVolumeControl)}
                                                                className="p-2 rounded-full bg-green-100 dark:bg-night-300 text-green-700 dark:text-sand-400 hover:bg-green-200 dark:hover:bg-night-200 btn-secondary transition-colors"
                                                                aria-label="Volume"
                                                            >
                                                                {getVolumeIcon()}
                                                            </button>

                                                            {showVolumeControl && (
                                                                <div className="absolute bottom-full left-0 mb-2 p-2 bg-white dark:bg-night-300 rounded-md shadow-lg z-10 w-32">
                                                                    <input
                                                                        type="range"
                                                                        min="0"
                                                                        max="1"
                                                                        step="0.01"
                                                                        value={volume}
                                                                        onChange={handleVolumeChange}
                                                                        className="w-full accent-green-600 dark:accent-sand-600"
                                                                    />
                                                                    <div className="flex justify-between mt-1 text-xs text-green-700 dark:text-sand-400">
                                                                        <span>0%</span>
                                                                        <span>{Math.round(volume * 100)}%</span>
                                                                        <span>100%</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                                                        {currentlyPlayingId === dua.id ? (
                                                            <>
                                                                {formatTime(audioProgress)} / {formatTime(audioDuration)}
                                                            </>
                                                        ) : (
                                                            "00:00 / 00:00"
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-2">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max={audioDuration || 100}
                                                        value={currentlyPlayingId === dua.id ? audioProgress : 0}
                                                        onChange={handleProgressChange}
                                                        disabled={currentlyPlayingId !== dua.id}
                                                        className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-600 dark:accent-sand-600 disabled:opacity-50"
                                                    />
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex items-center justify-center py-4">
                                                <div className="text-center">
                                                    <p className="text-green-700 dark:text-sand-400 mb-2">
                                                        Audio recitation is not available in this demo version.
                                                    </p>
                                                    <p className="text-sm text-green-600 dark:text-sand-500">
                                                        In a production environment, this would play the correct recitation of the dua.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div> */}

                                    {/* Reference */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                                            Reference
                                        </h4>
                                        <p className="text-sm text-green-600 dark:text-sand-500 card-muted transition-colors">
                                            {dua.reference}
                                        </p>
                                    </div>

                                    {/* When to Recite */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                                            When to Recite
                                        </h4>
                                        <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                                            {dua.when_to_recite}
                                        </p>
                                    </div>

                                    {/* Virtues */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-green-800 dark:text-sand-300 mb-1 card-title transition-colors">
                                            Virtues
                                        </h4>
                                        <p className="text-sm text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                                            {dua.virtues}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                                            Tags
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {dua.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-xs px-2 py-1 bg-green-100 dark:bg-night-400 text-green-800 dark:text-sand-300 rounded-full badge transition-colors"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-green-100 dark:border-night-300 divider transition-colors">
                                        <button
                                            onClick={() =>
                                                copyToClipboard(`${dua.arabic}\n\n${dua.transliteration}\n\n${dua.translation}`, dua.id)
                                            }
                                            className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-night-400 text-green-700 dark:text-sand-400 rounded-md hover:bg-green-200 dark:hover:bg-night-300 btn-secondary transition-colors"
                                        >
                                            <Copy className="h-4 w-4" />
                                            <span>{copiedId === dua.id ? "Copied!" : "Copy"}</span>
                                        </button>

                                        {!isAudioAvailable() ? (
                                            <button
                                                className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-night-400 text-green-700 dark:text-sand-400 rounded-md opacity-50 cursor-not-allowed"
                                                disabled
                                            >
                                                <Play className="h-4 w-4" />
                                                <span>Audio Unavailable</span>
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => toggleAudio(dua.id, dua.audio_url)}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-night-400 text-green-700 dark:text-sand-400 rounded-md hover:bg-green-200 dark:hover:bg-night-300 btn-secondary transition-colors"
                                            >
                                                {isLoading && currentlyPlayingId === dua.id ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        <span>Loading...</span>
                                                    </>
                                                ) : isPlaying && currentlyPlayingId === dua.id ? (
                                                    <>
                                                        <Pause className="h-4 w-4" />
                                                        <span>Pause</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Play className="h-4 w-4" />
                                                        <span>Listen</span>
                                                    </>
                                                )}
                                            </button>
                                        )}

                                        <button className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-night-400 text-green-700 dark:text-sand-400 rounded-md hover:bg-green-200 dark:hover:bg-night-300 btn-secondary transition-colors">
                                            <Heart className="h-4 w-4" />
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-night-500 rounded-lg shadow border border-green-100 dark:border-night-300 p-8 text-center card-bg transition-colors">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-green-500 dark:text-sand-500 icon-secondary transition-colors" />
                    <h3 className="text-lg font-medium text-green-800 dark:text-sand-300 mb-2 card-title transition-colors">
                        No duas found
                    </h3>
                    <p className="text-green-700 dark:text-sand-400 card-subtitle transition-colors">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button
                        onClick={clearFilters}
                        className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-white dark:text-sand-100 rounded-md btn-primary transition-colors"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    )
}
