/**
 * Kenya County, Sub-County, and Ward data for 10 target counties.
 * Based on IEBC (Independent Electoral and Boundaries Commission) gazetted boundaries
 * under the 2010 Constitution of Kenya.
 *
 * Used in the location picker/search for the Ardhi Safi real estate website.
 */

export interface Ward {
  name: string;
}

export interface SubCounty {
  name: string;
  wards: Ward[];
}

export interface County {
  name: string;
  code: number; // Kenya county code (1-47)
  subCounties: SubCounty[];
}

export const countyLocations: County[] = [
  // ─────────────────────────────────────────────
  // 1. NAIROBI (County Code 47)
  // ─────────────────────────────────────────────
  {
    name: "Nairobi",
    code: 47,
    subCounties: [
      {
        name: "Westlands",
        wards: [
          { name: "Kitisuru" },
          { name: "Parklands/Highridge" },
          { name: "Karura" },
          { name: "Kangemi" },
          { name: "Mountain View" },
        ],
      },
      {
        name: "Dagoretti North",
        wards: [
          { name: "Kilimani" },
          { name: "Kawangware" },
          { name: "Gatina" },
          { name: "Kileleshwa" },
          { name: "Kabiro" },
        ],
      },
      {
        name: "Dagoretti South",
        wards: [
          { name: "Mutu-ini" },
          { name: "Ngando" },
          { name: "Riruta" },
          { name: "Uthiru/Ruthimitu" },
          { name: "Waithaka" },
        ],
      },
      {
        name: "Langata",
        wards: [
          { name: "Karen" },
          { name: "Nairobi West" },
          { name: "Mugumo-ini" },
          { name: "South C" },
          { name: "Nyayo Highrise" },
        ],
      },
      {
        name: "Kibra",
        wards: [
          { name: "Laini Saba" },
          { name: "Lindi" },
          { name: "Makina" },
          { name: "Woodley/Kenyatta Golf Course" },
          { name: "Sarangombe" },
        ],
      },
      {
        name: "Roysambu",
        wards: [
          { name: "Githurai" },
          { name: "Kahawa West" },
          { name: "Zimmerman" },
          { name: "Roysambu" },
          { name: "Kahawa" },
        ],
      },
      {
        name: "Kasarani",
        wards: [
          { name: "Clay City" },
          { name: "Mwiki" },
          { name: "Kasarani" },
          { name: "Njiru" },
          { name: "Ruai" },
        ],
      },
      {
        name: "Ruaraka",
        wards: [
          { name: "Babadogo" },
          { name: "Utalii" },
          { name: "Mathare North" },
          { name: "Lucky Summer" },
          { name: "Korogocho" },
        ],
      },
      {
        name: "Embakasi South",
        wards: [
          { name: "Imara Daima" },
          { name: "Kwa Njenga" },
          { name: "Kwa Reuben" },
          { name: "Pipeline" },
          { name: "Kware" },
        ],
      },
      {
        name: "Embakasi North",
        wards: [
          { name: "Kariobangi North" },
          { name: "Dandora Area I" },
          { name: "Dandora Area II" },
          { name: "Dandora Area III" },
          { name: "Dandora Area IV" },
        ],
      },
      {
        name: "Embakasi Central",
        wards: [
          { name: "Kayole North" },
          { name: "Kayole Central" },
          { name: "Kayole South" },
          { name: "Komarock" },
          { name: "Matopeni/Spring Valley" },
        ],
      },
      {
        name: "Embakasi East",
        wards: [
          { name: "Upper Savanna" },
          { name: "Lower Savanna" },
          { name: "Embakasi" },
          { name: "Utawala" },
          { name: "Mihango" },
        ],
      },
      {
        name: "Embakasi West",
        wards: [
          { name: "Umoja I" },
          { name: "Umoja II" },
          { name: "Mowlem" },
          { name: "Kariobangi South" },
        ],
      },
      {
        name: "Makadara",
        wards: [
          { name: "Maringo/Hamza" },
          { name: "Viwandani" },
          { name: "Harambee" },
          { name: "Makongeni" },
        ],
      },
      {
        name: "Kamukunji",
        wards: [
          { name: "Pumwani" },
          { name: "Eastleigh North" },
          { name: "Eastleigh South" },
          { name: "Airbase" },
          { name: "California" },
        ],
      },
      {
        name: "Starehe",
        wards: [
          { name: "Nairobi Central" },
          { name: "Ngara" },
          { name: "Pangani" },
          { name: "Ziwani/Kariokor" },
          { name: "Landimawe" },
          { name: "Nairobi South" },
        ],
      },
      {
        name: "Mathare",
        wards: [
          { name: "Hospital" },
          { name: "Mabatini" },
          { name: "Huruma" },
          { name: "Ngei" },
          { name: "Mlango Kubwa" },
          { name: "Kiamaiko" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. KIAMBU (County Code 22)
  // ─────────────────────────────────────────────
  {
    name: "Kiambu",
    code: 22,
    subCounties: [
      {
        name: "Gatundu South",
        wards: [
          { name: "Kiamwangi" },
          { name: "Kiganjo" },
          { name: "Ndarugu" },
          { name: "Ngenda" },
        ],
      },
      {
        name: "Gatundu North",
        wards: [
          { name: "Gituamba" },
          { name: "Githobokoni" },
          { name: "Chania" },
          { name: "Mangu" },
        ],
      },
      {
        name: "Juja",
        wards: [
          { name: "Muirigo" },
          { name: "Theta" },
          { name: "Juja" },
          { name: "Witeithie" },
          { name: "Kalimoni" },
        ],
      },
      {
        name: "Thika Town",
        wards: [
          { name: "Township" },
          { name: "Kamenu" },
          { name: "Hospital" },
          { name: "Gatuanyaga" },
          { name: "Ngoliba" },
        ],
      },
      {
        name: "Ruiru",
        wards: [
          { name: "Gitothua" },
          { name: "Biashara" },
          { name: "Gatongora" },
          { name: "Kahawa Sukari" },
          { name: "Kahawa Wendani" },
          { name: "Kiuu" },
          { name: "Mwiki" },
          { name: "Mwihoko" },
        ],
      },
      {
        name: "Githunguri",
        wards: [
          { name: "Githunguri" },
          { name: "Githiga" },
          { name: "Ikinu" },
          { name: "Ngewa" },
          { name: "Komothai" },
        ],
      },
      {
        name: "Kiambu Town",
        wards: [
          { name: "Township" },
          { name: "Ting'ang'a" },
          { name: "Ndumberi" },
          { name: "Riabai" },
        ],
      },
      {
        name: "Kiambaa",
        wards: [
          { name: "Cianda" },
          { name: "Karuri" },
          { name: "Ndenderu" },
          { name: "Muchatha" },
          { name: "Kihara" },
        ],
      },
      {
        name: "Kabete",
        wards: [
          { name: "Gitaru" },
          { name: "Muguga" },
          { name: "Nyadhuna" },
          { name: "Kabete" },
          { name: "Uthiru" },
        ],
      },
      {
        name: "Kikuyu",
        wards: [
          { name: "Karai" },
          { name: "Nachu" },
          { name: "Sigona" },
          { name: "Kikuyu" },
          { name: "Kinoo" },
        ],
      },
      {
        name: "Limuru",
        wards: [
          { name: "Bibirioni" },
          { name: "Limuru Central" },
          { name: "Ndeiya" },
          { name: "Limuru East" },
          { name: "Ngecha Tigoni" },
        ],
      },
      {
        name: "Lari",
        wards: [
          { name: "Kijabe" },
          { name: "Nyanduma" },
          { name: "Kamburu" },
          { name: "Lari/Kirenga" },
          { name: "Kinale" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. MACHAKOS (County Code 16)
  // ─────────────────────────────────────────────
  {
    name: "Machakos",
    code: 16,
    subCounties: [
      {
        name: "Machakos Town",
        wards: [
          { name: "Kalama" },
          { name: "Mua" },
          { name: "Mutituni" },
          { name: "Machakos Central" },
          { name: "Mumbuni North" },
          { name: "Muvuti/Kiima Kimwe" },
          { name: "Kola" },
        ],
      },
      {
        name: "Mavoko",
        wards: [
          { name: "Athi River" },
          { name: "Kinanie" },
          { name: "Muthwani" },
          { name: "Syokimau/Mulolongo" },
        ],
      },
      {
        name: "Kangundo",
        wards: [
          { name: "Kangundo North" },
          { name: "Kangundo Central" },
          { name: "Kangundo East" },
          { name: "Kangundo West" },
        ],
      },
      {
        name: "Matungulu",
        wards: [
          { name: "Tala" },
          { name: "Matungulu North" },
          { name: "Matungulu East" },
          { name: "Matungulu West" },
          { name: "Kyeleni" },
        ],
      },
      {
        name: "Kathiani",
        wards: [
          { name: "Mitamboni" },
          { name: "Kathiani Central" },
          { name: "Upper Kaewa/Iveti" },
          { name: "Lower Kaewa/Kaani" },
        ],
      },
      {
        name: "Yatta",
        wards: [
          { name: "Ikombe" },
          { name: "Katangi" },
          { name: "Kithimani" },
          { name: "Matuu" },
          { name: "Ndalani" },
        ],
      },
      {
        name: "Masinga",
        wards: [
          { name: "Muthesya" },
          { name: "Masinga Central" },
          { name: "Ekalakala" },
          { name: "Muminji" },
          { name: "Kivaa" },
        ],
      },
      {
        name: "Mwala",
        wards: [
          { name: "Mbiuni" },
          { name: "Makutano/Mwala" },
          { name: "Masii" },
          { name: "Muthetheni" },
          { name: "Wamunyu" },
          { name: "Kibauni" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. KAJIADO (County Code 34)
  // ─────────────────────────────────────────────
  {
    name: "Kajiado",
    code: 34,
    subCounties: [
      {
        name: "Kajiado North",
        wards: [
          { name: "Ongata Rongai" },
          { name: "Nkaimurunya" },
          { name: "Oloolua" },
          { name: "Ngong" },
          { name: "Olkeri" },
        ],
      },
      {
        name: "Kajiado Central",
        wards: [
          { name: "Purko" },
          { name: "Ildamat" },
          { name: "Dalalekutuk" },
          { name: "Matapato North" },
          { name: "Matapato South" },
        ],
      },
      {
        name: "Kajiado East",
        wards: [
          { name: "Kaputiei North" },
          { name: "Kitengela" },
          { name: "Oloosirkon/Sholinke" },
          { name: "Kenyawa-Poka" },
          { name: "Imaroro" },
        ],
      },
      {
        name: "Kajiado West",
        wards: [
          { name: "Keekonyokie" },
          { name: "Iloodokilani" },
          { name: "Magadi" },
          { name: "Ewuaso Oo Nkidong'i" },
          { name: "Mosiro" },
        ],
      },
      {
        name: "Kajiado South (Loitokitok)",
        wards: [
          { name: "Entonet/Lenkisim" },
          { name: "Mbirikani/Eselengei" },
          { name: "Kuku" },
          { name: "Rombo" },
          { name: "Kimana" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. MOMBASA (County Code 1)
  // ─────────────────────────────────────────────
  {
    name: "Mombasa",
    code: 1,
    subCounties: [
      {
        name: "Mvita",
        wards: [
          { name: "Mji wa Kale/Makadara" },
          { name: "Tudor" },
          { name: "Tononoka" },
          { name: "Shimanzi/Ganjoni" },
          { name: "Majengo" },
        ],
      },
      {
        name: "Nyali",
        wards: [
          { name: "Frere Town" },
          { name: "Ziwa la Ng'ombe" },
          { name: "Mkomani" },
          { name: "Kongowea" },
          { name: "Kadzandani" },
        ],
      },
      {
        name: "Kisauni",
        wards: [
          { name: "Mjambere" },
          { name: "Junda" },
          { name: "Bamburi" },
          { name: "Mwakirunge" },
          { name: "Mtopanga" },
          { name: "Magogoni" },
          { name: "Shanzu" },
        ],
      },
      {
        name: "Likoni",
        wards: [
          { name: "Mtongwe" },
          { name: "Shika Adabu" },
          { name: "Bofu" },
          { name: "Likoni" },
          { name: "Timbwani" },
        ],
      },
      {
        name: "Changamwe",
        wards: [
          { name: "Port Reitz" },
          { name: "Kipevu" },
          { name: "Airport" },
          { name: "Changamwe" },
          { name: "Chaani" },
        ],
      },
      {
        name: "Jomvu",
        wards: [
          { name: "Jomvu Kuu" },
          { name: "Miritini" },
          { name: "Mikindani" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. NAKURU (County Code 32)
  // ─────────────────────────────────────────────
  {
    name: "Nakuru",
    code: 32,
    subCounties: [
      {
        name: "Nakuru Town East",
        wards: [
          { name: "Biashara" },
          { name: "Kivumbini" },
          { name: "Flamingo" },
          { name: "Menengai" },
          { name: "Nakuru East" },
        ],
      },
      {
        name: "Nakuru Town West",
        wards: [
          { name: "London" },
          { name: "Section 58" },
          { name: "Barut" },
          { name: "Kapkures" },
          { name: "Rhoda" },
          { name: "Shabab" },
        ],
      },
      {
        name: "Naivasha",
        wards: [
          { name: "Biashara" },
          { name: "Hells Gate" },
          { name: "Lake View" },
          { name: "Mai Mahiu" },
          { name: "Maiella" },
          { name: "Olkaria" },
          { name: "Naivasha East" },
          { name: "Viwandani" },
        ],
      },
      {
        name: "Gilgil",
        wards: [
          { name: "Gilgil" },
          { name: "Elementaita" },
          { name: "Mbaruk/Eburu" },
          { name: "Malewa West" },
          { name: "Murindati" },
        ],
      },
      {
        name: "Subukia",
        wards: [
          { name: "Subukia" },
          { name: "Waseges" },
          { name: "Kabazi" },
        ],
      },
      {
        name: "Njoro",
        wards: [
          { name: "Mau Narok" },
          { name: "Mauche" },
          { name: "Kihingo" },
          { name: "Nessuit" },
          { name: "Lare" },
          { name: "Njoro" },
        ],
      },
      {
        name: "Molo",
        wards: [
          { name: "Mariashoni" },
          { name: "Elburgon" },
          { name: "Turi" },
          { name: "Molo" },
        ],
      },
      {
        name: "Kuresoi North",
        wards: [
          { name: "Kiptororo" },
          { name: "Nyota" },
          { name: "Sirikwa" },
          { name: "Kamara" },
        ],
      },
      {
        name: "Kuresoi South",
        wards: [
          { name: "Amalo" },
          { name: "Keringet" },
          { name: "Kiptagich" },
          { name: "Tinet" },
        ],
      },
      {
        name: "Rongai",
        wards: [
          { name: "Menengai West" },
          { name: "Soin" },
          { name: "Visoi" },
          { name: "Mosop" },
          { name: "Solai" },
        ],
      },
      {
        name: "Bahati",
        wards: [
          { name: "Bahati" },
          { name: "Dundori" },
          { name: "Kabatini" },
          { name: "Kiamaina" },
          { name: "Lanet/Umoja" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 7. UASIN GISHU (County Code 27) - Eldoret
  // ─────────────────────────────────────────────
  {
    name: "Uasin Gishu",
    code: 27,
    subCounties: [
      {
        name: "Ainabkoi",
        wards: [
          { name: "Ainabkoi/Olare" },
          { name: "Kaptagat" },
          { name: "Kapsoya" },
        ],
      },
      {
        name: "Kapseret",
        wards: [
          { name: "Simat/Kapseret" },
          { name: "Kipkenyo" },
          { name: "Ngeria" },
          { name: "Megun" },
          { name: "Langas" },
        ],
      },
      {
        name: "Kesses",
        wards: [
          { name: "Racecourse" },
          { name: "Cheptiret/Kipchamo" },
          { name: "Tulwet/Chuiyat" },
          { name: "Tarakwa" },
        ],
      },
      {
        name: "Moiben",
        wards: [
          { name: "Tembelio" },
          { name: "Sergoit" },
          { name: "Karuna/Meibeki" },
          { name: "Moiben" },
          { name: "Kimumu" },
        ],
      },
      {
        name: "Soy",
        wards: [
          { name: "Moi's Bridge" },
          { name: "Kapkures" },
          { name: "Ziwa" },
          { name: "Segero/Barsombe" },
          { name: "Kipsomba" },
          { name: "Soy" },
        ],
      },
      {
        name: "Turbo",
        wards: [
          { name: "Tapsagoi" },
          { name: "Kamagut" },
          { name: "Kiplombe" },
          { name: "Kapsaos" },
          { name: "Huruma" },
          { name: "Ngenyilel" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 8. TRANS NZOIA (County Code 26) - Kitale
  // ─────────────────────────────────────────────
  {
    name: "Trans Nzoia",
    code: 26,
    subCounties: [
      {
        name: "Trans Nzoia West (Kiminini)",
        wards: [
          { name: "Kiminini" },
          { name: "Waitaluk" },
          { name: "Sirende" },
          { name: "Hospital" },
          { name: "Sikhendu" },
          { name: "Nabiswa" },
        ],
      },
      {
        name: "Trans Nzoia East (Cherangany)",
        wards: [
          { name: "Sinyerere" },
          { name: "Makutano" },
          { name: "Kaplamai" },
          { name: "Motosiet" },
          { name: "Cherangany/Suwerwa" },
          { name: "Chepsiro/Kiptoror" },
        ],
      },
      {
        name: "Kwanza",
        wards: [
          { name: "Kapomboi" },
          { name: "Kwanza" },
          { name: "Keiyo" },
          { name: "Bidii" },
        ],
      },
      {
        name: "Endebess",
        wards: [
          { name: "Endebess" },
          { name: "Chepchoina" },
          { name: "Matumbei" },
        ],
      },
      {
        name: "Saboti",
        wards: [
          { name: "Kinyoro" },
          { name: "Matisi" },
          { name: "Tuwani" },
          { name: "Saboti" },
          { name: "Machewa" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 9. KISII (County Code 45)
  // ─────────────────────────────────────────────
  {
    name: "Kisii",
    code: 45,
    subCounties: [
      {
        name: "Bobasi",
        wards: [
          { name: "Bobasi Central" },
          { name: "Bobasi Bogetaorio" },
          { name: "Bobasi Chache" },
          { name: "Nyacheki" },
          { name: "Sameta/Mokwerero" },
          { name: "Bobasi Ebenezer" },
        ],
      },
      {
        name: "Bomachoge Borabu",
        wards: [
          { name: "Bomariba" },
          { name: "Bokimonge" },
          { name: "Magenche" },
          { name: "Bombaba Borabu" },
        ],
      },
      {
        name: "Bomachoge Chache",
        wards: [
          { name: "Majoge Basi" },
          { name: "Boochi/Tendere" },
          { name: "Bosoti/Sengera" },
          { name: "Ichuni" },
        ],
      },
      {
        name: "Bonchari",
        wards: [
          { name: "Bomorenda" },
          { name: "Riana" },
          { name: "Tabaka" },
          { name: "Bogiakumu" },
          { name: "Suneka" },
        ],
      },
      {
        name: "Kitutu Chache North",
        wards: [
          { name: "Monyerero" },
          { name: "Sensi" },
          { name: "Marani" },
          { name: "Kegogi" },
        ],
      },
      {
        name: "Kitutu Chache South",
        wards: [
          { name: "Bogusero" },
          { name: "Bogeka" },
          { name: "Nyakoe" },
          { name: "Kitutu Central" },
          { name: "Nyatieko" },
        ],
      },
      {
        name: "Nyaribari Chache",
        wards: [
          { name: "Kisii Central" },
          { name: "Keumbu" },
          { name: "Kiogoro" },
          { name: "Birongo" },
          { name: "Ibeno" },
        ],
      },
      {
        name: "Nyaribari Masaba",
        wards: [
          { name: "Ichuni" },
          { name: "Nyamasibi" },
          { name: "Masimba" },
          { name: "Gesusu" },
          { name: "Moticho" },
        ],
      },
      {
        name: "South Mugirango",
        wards: [
          { name: "Tabaka" },
          { name: "Boikanga" },
          { name: "Bogetenga" },
          { name: "Borabu/Chitago" },
          { name: "Moticho" },
          { name: "Getenga" },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 10. KISUMU (County Code 42)
  // ─────────────────────────────────────────────
  {
    name: "Kisumu",
    code: 42,
    subCounties: [
      {
        name: "Kisumu Central",
        wards: [
          { name: "Railways" },
          { name: "Migosi" },
          { name: "Shaurimoyo Kaloleni" },
          { name: "Market Milimani" },
          { name: "Kondele" },
          { name: "Nyalenda B" },
        ],
      },
      {
        name: "Kisumu East",
        wards: [
          { name: "Kajulu" },
          { name: "Kolwa East" },
          { name: "Manyatta B" },
          { name: "Nyalenda A" },
          { name: "Kolwa Central" },
        ],
      },
      {
        name: "Kisumu West",
        wards: [
          { name: "South West Kisumu" },
          { name: "Central Kisumu" },
          { name: "Kisumu North" },
          { name: "West Kisumu" },
          { name: "North West Kisumu" },
        ],
      },
      {
        name: "Seme",
        wards: [
          { name: "West Seme" },
          { name: "Central Seme" },
          { name: "East Seme" },
          { name: "North Seme" },
        ],
      },
      {
        name: "Nyando",
        wards: [
          { name: "East Kano/Wawidhi" },
          { name: "Awasi/Onjiko" },
          { name: "Ahero" },
          { name: "Kabonyo/Kanyagwal" },
          { name: "Kobura" },
        ],
      },
      {
        name: "Muhoroni",
        wards: [
          { name: "Muhoroni/Koru" },
          { name: "Miwani" },
          { name: "Ombeyi" },
          { name: "Masogo/Nyang'oma" },
          { name: "Chemelil" },
        ],
      },
      {
        name: "Nyakach",
        wards: [
          { name: "South West Nyakach" },
          { name: "North Nyakach" },
          { name: "Central Nyakach" },
          { name: "West Nyakach" },
          { name: "South East Nyakach" },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────

/** Get all county names */
export function getCountyNames(): string[] {
  return countyLocations.map((c) => c.name);
}

/** Get sub-counties for a given county */
export function getSubCounties(countyName: string): string[] {
  const county = countyLocations.find(
    (c) => c.name.toLowerCase() === countyName.toLowerCase()
  );
  return county ? county.subCounties.map((sc) => sc.name) : [];
}

/** Get wards for a given county and sub-county */
export function getWards(countyName: string, subCountyName: string): string[] {
  const county = countyLocations.find(
    (c) => c.name.toLowerCase() === countyName.toLowerCase()
  );
  if (!county) return [];
  const subCounty = county.subCounties.find(
    (sc) => sc.name.toLowerCase() === subCountyName.toLowerCase()
  );
  return subCounty ? subCounty.wards.map((w) => w.name) : [];
}

/** Search across all locations (county, sub-county, or ward) */
export function searchLocations(query: string): {
  county: string;
  subCounty?: string;
  ward?: string;
}[] {
  const results: { county: string; subCounty?: string; ward?: string }[] = [];
  const q = query.toLowerCase();

  for (const county of countyLocations) {
    if (county.name.toLowerCase().includes(q)) {
      results.push({ county: county.name });
    }
    for (const subCounty of county.subCounties) {
      if (subCounty.name.toLowerCase().includes(q)) {
        results.push({ county: county.name, subCounty: subCounty.name });
      }
      for (const ward of subCounty.wards) {
        if (ward.name.toLowerCase().includes(q)) {
          results.push({
            county: county.name,
            subCounty: subCounty.name,
            ward: ward.name,
          });
        }
      }
    }
  }

  return results;
}

/** Get a flat list of all locations for autocomplete */
export function getAllLocationLabels(): string[] {
  const labels: string[] = [];
  for (const county of countyLocations) {
    labels.push(county.name);
    for (const subCounty of county.subCounties) {
      labels.push(`${subCounty.name}, ${county.name}`);
      for (const ward of subCounty.wards) {
        labels.push(`${ward.name}, ${subCounty.name}, ${county.name}`);
      }
    }
  }
  return labels;
}
