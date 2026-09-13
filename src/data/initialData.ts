import {
  UjuriRecord,
  OfficeMonitoringRecord,
  DressTimeRecord,
  CitizenSurveyRecord,
  InvestigationRecord,
  TechnicalAuditRecord,
  ProjectMonitoringRecord,
  PromotionalProgramRecord,
  PromotionalRecord,
  CalendarMeetingEvent,
  CalendarEvent,
  UserAccount,
  SystemUser,
  AuditLogItem,
  AuditLogEntry
} from '../types';

export const INITIAL_UJURI_RECORDS: UjuriRecord[] = [
  {
    id: 'UJ-1130',
    registrationNumber: '११३०/स्वास्थ्य',
    registrationDate: '२०८३-०४-२५',
    complainantName: 'आशिष श्रेष्ठ',
    opponentName: 'भक्तपुर क्यान्सर अस्पताल',
    ministry: 'स्वास्थ्य तथा जनसङ्ख्या मन्त्रालय',
    province: 'बागमती प्रदेश',
    district: 'भक्तपुर',
    municipality: 'भक्तपुर नगरपालिका',
    complaintType: 'सार्वजनिक खरिद',
    complaintSource: 'केन्द्रमा दर्ता भएका उजुरी',
    priority: 'उच्च',
    complaintDescription: 'अस्पतालका सञ्चालक समितिका पदाधिकारीद्वारा अनियमित नियुक्ति र खरिद प्रक्रियामा आर्थिक अनियमितता भएको सम्बन्धी उजुरी।',
    committeeDecision: 'प्रारम्भिक छानबिनका लागि तीन सदस्यीय समिति गठन। सम्बद्ध कागजात माग गरिएको।',
    finalDecisionType: 'छानविन तथा कारबाही गरी जानकारी दिन लेखी पठाइएको',
    finalDecision: 'सम्बन्धित निकायलाई १५ दिनभित्र छानविन प्रतिवेदन पेश गर्न निर्देशन पठाइयो।',
    decisionDate: '२०८३-०५-०२',
    assignedDepartment: 'उजुरी छानविन तथा अन्वेषण शाखा',
    status: 'in_progress',
    remarks: 'थप प्रमाण संकलन भइरहेको'
  },
  {
    id: 'UJ-1131',
    registrationNumber: '११३१/यातायात',
    registrationDate: '२०८३-०४-२०',
    complainantName: 'सुनिता तामाङ',
    opponentName: 'यातायात व्यवस्था कार्यालय, एकान्तकुना',
    ministry: 'भौतिक पूर्वाधार तथा यातायात मन्त्रालय',
    province: 'बागमती प्रदेश',
    district: 'ललितपुर',
    municipality: 'ललितपुर महानगरपालिका',
    complaintType: 'सेवा प्रवाह',
    complaintSource: 'हेलो सरकारबाट प्राप्त उजुरी',
    priority: 'मध्यम',
    complaintDescription: 'सवारी चालक अनुमतिपत्र नवीकरणमा तोकिएभन्दा बढी दस्तुर असुली र बिचौलिया प्रवेश गराएको सम्बन्धी गुनासो।',
    committeeDecision: 'प्रारम्भिक छानबिन जारी। सम्बन्धित कार्यालयबाट सीसीटीभी फुटेज तथा विवरण झिकाइएको।',
    finalDecisionType: 'सतर्क',
    finalDecision: 'कार्यालय प्रमुखलाई बिचौलिया नियन्त्रण गरी दैनिक सेवा प्रवाह पारदर्शी बनाउन सतर्क गराइयो।',
    decisionDate: '२०८३-०४-२८',
    assignedDepartment: 'सूचना सङ्‍कलन तथा उजुरी व्यवस्थापन शाखा',
    status: 'resolved',
    remarks: 'सतर्क पत्र जारी भयो'
  },
  {
    id: 'UJ-1132',
    registrationNumber: '११३२/खरिद',
    registrationDate: '२०८३-०४-१५',
    complainantName: 'विनोद अधिकारी',
    opponentName: 'सडक डिभिजन कार्यालय, बुटवल',
    ministry: 'भौतिक पूर्वाधार तथा यातायात मन्त्रालय',
    province: 'लुम्बिनी प्रदेश',
    district: 'रुपन्देही',
    municipality: 'बुटवल उपमहानगरपालिका',
    complaintType: 'पूर्वाधार निर्माण',
    complaintSource: 'अनलाइन उजुरी',
    priority: 'उच्च',
    complaintDescription: 'सडक स्तरोन्नति ठेक्कामा गुणस्तरहीन निर्माण सामग्री प्रयोग गरी मापदण्ड विपरित कालोपत्रे गरिएको।',
    committeeDecision: 'प्राविधिक परीक्षण टोली खटाइयो। ल्याब परीक्षणको प्रतिवेदन प्राप्त भई गुणस्तर नपुगेको पुष्टी।',
    finalDecisionType: 'अ.दु.अ.आ.मा पठाइएको',
    finalDecision: 'गुणस्तरहीन काम गर्ने ठेकेदार र भुक्तानी दिने प्राविधिक अधिकृत उपर थप अनुसन्धानका लागि अख्तियारमा लेखी पठाइएको।',
    decisionDate: '२०८३-०४-३०',
    assignedDepartment: 'प्राविधिक छानविन तथा अनुगमन शाखा',
    status: 'resolved',
    remarks: 'अख्तियार दुरुपयोग अनुसन्धान आयोग पठाइयो'
  },
  {
    id: 'UJ-1133',
    registrationNumber: '११३३/राजस्व',
    registrationDate: '२०८३-०४-१०',
    complainantName: 'बेनामी (नागरिक)',
    opponentName: 'मालपोत कार्यालय, डिल्लीबजार',
    ministry: 'भूमि व्यवस्था, सहकारी तथा गरिबी निवारण मन्त्रालय',
    province: 'बागमती प्रदेश',
    district: 'काठमाडौं',
    municipality: 'काठमाडौं महानगरपालिका',
    complaintType: 'घुस/रिसवत',
    complaintSource: 'हटलाइन उजुरी',
    priority: 'उच्च',
    complaintDescription: 'जग्गा रजिस्ट्रेसन तथा नामसारी प्रक्रियामा तोकिएभन्दा बढी अतिरिक्त रकम माग गरिएको गुनासो।',
    committeeDecision: 'छड्के अनुगमन टोली खटाइएको र सीसीटीभी विवरण विश्लेषण गरिएको।',
    finalDecisionType: 'सुझाव/निर्देशन',
    finalDecision: 'विभागीय कारबाही सुरु गर्न र टोकन प्रणाली कडा रूपमा लागू गर्न निर्देशन दिइयो।',
    decisionDate: '२०८३-०४-२२',
    assignedDepartment: 'प्रहरी महाशाखा',
    status: 'resolved',
    remarks: 'निर्देशन पत्र पठाइएको'
  },
  {
    id: 'UJ-1134',
    registrationNumber: '११३४/ऊर्जा',
    registrationDate: '२०८३-०४-०५',
    complainantName: 'रमेश गुरुङ',
    opponentName: 'नेपाल विद्युत् प्राधिकरण, वितरण केन्द्र पोखरा',
    ministry: 'ऊर्जा, जलस्रोत तथा सिंचाइ मन्त्रालय',
    province: 'गण्डकी प्रदेश',
    district: 'कास्की',
    municipality: 'पोखरा महानगरपालिका',
    complaintType: 'सेवा प्रवाह',
    complaintSource: 'केन्द्रमा दर्ता भएका उजुरी',
    priority: 'सामान्य',
    complaintDescription: 'विद्युत् मिटर रिडिङमा हेरफेर गरी अत्यधिक बिल असुली र ट्रान्सफर्मर फेर्न ढिलाइ गरेको सम्बन्धी उजुरी।',
    committeeDecision: 'प्राविधिक जाँच टोली खटाउन निर्देशन दिइएको।',
    finalDecisionType: 'तामेली',
    finalDecision: 'समस्या समाधान भई मिटर सुधार भएको र सेवाग्राही सन्तुष्ट भएकाले तामेलीमा राखिएको।',
    decisionDate: '२०८३-०४-१८',
    assignedDepartment: 'प्राविधिक परीक्षण शाखा',
    status: 'resolved',
    remarks: 'कार्यान्वयन भइसकेको'
  },
  {
    id: 'UJ-1135',
    registrationNumber: '११३५/शिक्षा',
    registrationDate: '२०८३-०३-२८',
    complainantName: 'दिनेश चौधरी',
    opponentName: 'शिक्षा विकास तथा समन्वय इकाई, धनगढी',
    ministry: 'शिक्षा, विज्ञान तथा प्रविधि मन्त्रालय',
    province: 'सुदूरपश्चिम प्रदेश',
    district: 'कैलाली',
    municipality: 'धनगढी उपमहानगरपालिका',
    complaintType: 'कर्मचारी आचरण',
    complaintSource: 'अनलाइन उजुरी',
    priority: 'मध्यम',
    complaintDescription: 'शिक्षक पदपूर्ति तथा सरुवामा आर्थिक लेनदेन र नियम विपरित काज खटाइएको सम्बन्धी उजुरी।',
    committeeDecision: 'सम्बन्धित मन्त्रालयबाट फाइल मगाइएको।',
    finalDecisionType: 'छानविन तथा कारबाही गरी जानकारी दिन लेखी पठाइएको',
    finalDecision: 'मन्त्रालयको आन्तरिक छानविन समितिले कारबाही गरी केन्द्रलाई जानकारी गराउनु।',
    decisionDate: '२०८३-०४-१२',
    assignedDepartment: 'कानुनी राय तथा परामर्श शाखा',
    status: 'in_progress',
    remarks: 'प्रक्रिया जारी'
  }
];

export const INITIAL_OFFICE_MONITORING: OfficeMonitoringRecord[] = [
  {
    id: 'OM-2083-01',
    officeName: 'मालपोत कार्यालय, भक्तपुर',
    officeType: 'मालपोत',
    province: 'बागमती प्रदेश',
    district: 'भक्तपुर',
    municipality: 'भक्तपुर नगरपालिका',
    monitoringDate: '२०८३-०४-१२',
    monitoringTeam: 'सुरेश थापा - उपसचिव',
    monitoringPosition: 'उपसचिव',
    address: 'भक्तपुर, दरवार स्क्वायर नजिक',
    serviceFlow: {
      'नागरिक बडापत्र (डिजिटल/अडियो)': 'स्पष्ट बुझिने',
      'सेवा प्रक्रिया, लागत र समय': 'स्पष्ट उल्लेख भएको',
      'शाखागत व्यवस्था र नामावली': 'उल्लेख भएको',
      'नागरिक बडापत्रमा क्षतिपूर्ति': 'भएको',
      'मध्यस्थकर्ताको प्रवेश': 'देखिएन',
      'वेबसाइटमा अपलोड': 'भएको',
      'हाजिरीको अवस्था': 'ई-हाजिरी',
      'सरसफाइको अवस्था': 'राम्रो'
    },
    facilities: [
      { name: 'सेवाग्राही सहायता कक्ष (Help Desk)', status: 'cha' },
      { name: 'अपाङ्गमैत्री कार्यस्थल', status: 'cha' },
      { name: 'प्रतिक्षालय', status: 'cha' },
      { name: 'शौचालय (महिला/पुरुष)', status: 'cha' },
      { name: 'खानेपानीको उचित व्यवस्था', status: 'cha' },
      { name: 'स्तनपान कक्ष/स्थान', status: 'samanya' },
      { name: 'उजुरी पेटिका', status: 'cha' }
    ],
    totalStaff: 32,
    workingStaff: 28,
    vacantStaff: 4,
    mainServices: 'जग्गा रजिस्ट्रेसन, नामसारी, रोक्का, फुकुवा',
    issuesFound: 'अनलाइन सर्भर बेलाबेलामा ढिलो हुने, प्रतिक्षालयमा फ्यान मर्मत गर्नुपर्ने',
    recommendations: 'ई-हाजिरी नियमित अनुगमन गर्ने, हेल्पडेस्कमा थप एक जना कर्मचारी खटाउने',
    remarks: 'समग्र सेवा प्रवाह सन्तोषजनक',
    status: 'done'
  },
  {
    id: 'OM-2083-02',
    officeName: 'यातायात व्यवस्था कार्यालय, कास्की',
    officeType: 'यातायात',
    province: 'गण्डकी प्रदेश',
    district: 'कास्की',
    municipality: 'पोखरा महानगरपालिका',
    monitoringDate: '२०८३-०४-१८',
    monitoringTeam: 'हरिप्रसाद पराजुली - सिनियर डिभिजनल इन्जिनियर',
    monitoringPosition: 'सि.डि.ई.',
    address: 'पोखरा, पृथ्वीचोक',
    serviceFlow: {
      'नागरिक बडापत्र (डिजिटल/अडियो)': 'स्पष्ट नबुझिने',
      'सेवा प्रक्रिया, लागत र समय': 'आंशिक',
      'शाखागत व्यवस्था र नामावली': 'उल्लेख भएको',
      'नागरिक बडापत्रमा क्षतिपूर्ति': 'नभएको',
      'मध्यस्थकर्ताको प्रवेश': 'देखियो',
      'वेबसाइटमा अपलोड': 'नभएको',
      'हाजिरीको अवस्था': 'रजिष्टर',
      'सरसफाइको अवस्था': 'ठीकै'
    },
    facilities: [
      { name: 'सेवाग्राही सहायता कक्ष (Help Desk)', status: 'chaina' },
      { name: 'अपाङ्गमैत्री कार्यस्थल', status: 'samanya' },
      { name: 'प्रतिक्षालय', status: 'samanya' },
      { name: 'शौचालय (महिला/पुरुष)', status: 'cha' },
      { name: 'खानेपानीको उचित व्यवस्था', status: 'chaina' },
      { name: 'उजुरी पेटिका', status: 'cha' }
    ],
    totalStaff: 45,
    workingStaff: 36,
    vacantStaff: 9,
    mainServices: 'सवारी दर्ता, लाइसेन्स नवीकरण, कर संकलन',
    issuesFound: 'बिचौलियाको चहलपहल देखिएको, टोकन मेसिन बिग्रिएको, कर्मचारी समयमा उपस्थित नभएको',
    recommendations: 'तुरुन्त ई-टोकन सुचारु गर्ने, परिसरबाट बिचौलिया हटाउन प्रहरी समन्वय गर्ने',
    remarks: 'सुधार योजना ७ दिनभित्र पेश गर्न निर्देशन',
    status: 'pending'
  }
];

export const INITIAL_DRESS_TIME_RECORDS: DressTimeRecord[] = [
  {
    id: 'DT-2083-01',
    province: 'बागमती प्रदेश',
    district: 'काठमाडौं',
    localLevel: 'काठमाडौं महानगरपालिका',
    officeName: 'भूमि सुधार तथा मालपोत कार्यालय, डिल्लीबजार',
    officePhone: '०१-४४१२३४५',
    monitoringDate: '२०८३-०४-२२',
    monitoringTime: '१०:१५:००',
    totalStaff: 48,
    activeStaff: 38,
    vacantStaff: 10,
    staffViolations: [
      {
        id: 'sv-1',
        category: 'अनुपस्थिति',
        position: 'नायब सुब्बा',
        symbolNo: '१८२३४',
        employeeName: 'गोपाल खनाल',
        remarks: 'बिना जानकारी १०:३० सम्म अनुपस्थित'
      },
      {
        id: 'sv-2',
        category: 'पोशाक पालना नगरेका',
        position: 'खरिदार',
        symbolNo: '२१४५६',
        employeeName: 'प्रमोद श्रेष्ठ',
        remarks: 'तोकिएको पोशाक नलगाएको'
      }
    ],
    teamLeader: 'महेन्द्र पन्त',
    teamLeaderPost: 'निर्देशक',
    officialName: 'रामचन्द्र अधिकारी',
    officialPost: 'प्रमुख मालपोत अधिकृत',
    timeViolationsCount: 3,
    dressViolationsCount: 2,
    totalViolations: 5
  },
  {
    id: 'DT-2083-02',
    province: 'गण्डकी प्रदेश',
    district: 'तनहुँ',
    localLevel: 'ब्यास नगरपालिका',
    officeName: 'जिल्ला प्रशासन कार्यालय, तनहुँ',
    officePhone: '०६५-५६०१२३',
    monitoringDate: '२०८३-०४-२५',
    monitoringTime: '१०:०५:००',
    totalStaff: 30,
    activeStaff: 28,
    vacantStaff: 2,
    staffViolations: [
      {
        id: 'sv-3',
        category: 'पोशाक पालना नगरेका',
        position: 'सहायक कम्प्युटर अपरेटर',
        symbolNo: '३३१२१',
        employeeName: 'कल्पना गुरुङ',
        remarks: 'परिचयपत्र नझुन्ड्याएको'
      }
    ],
    teamLeader: 'विष्णु पोखरेल',
    teamLeaderPost: 'अधिकृत',
    officialName: 'जनार्दन गौतम',
    officialPost: 'प्रमुख जिल्ला अधिकारी',
    timeViolationsCount: 0,
    dressViolationsCount: 1,
    totalViolations: 1
  }
];

export const INITIAL_CITIZEN_SURVEYS: CitizenSurveyRecord[] = [
  {
    id: 'CS-01',
    surveyDate: '२०८३-०४-२८',
    province: 'बागमती प्रदेश',
    district: 'काठमाडौं',
    localLevel: 'काठमाडौं महानगरपालिका',
    fullAddress: 'काठमाडौं-१०, बानेश्वर',
    gender: 'महिला',
    officeVisited: 'यातायात व्यवस्था कार्यालय',
    overallSatisfaction: 4,
    isSatisfied: true,
    satisfactionReasons: ['समयमै काम भएको', 'प्रक्रिया सहज भएको'],
    serviceQuality: 'राम्रो',
    tookOutsideHelp: false,
    paidBribe: false,
    knowsCitizenCharter: true,
    receivedServiceInTime: true,
    filedComplaint: false,
    attendedPublicHearing: false,
    knowsRightToInformation: true,
    goodOffices: 'राष्ट्रिय परिचयपत्र व्यवस्थापन कार्यालय',
    weakOffices: 'नापी कार्यालय',
    suggestions: 'अनलाइन प्रणाली अझ छिटो र सरल बनाउनु पर्नेछ।'
  },
  {
    id: 'CS-02',
    surveyDate: '२०८३-०४-२६',
    province: 'मधेश प्रदेश',
    district: 'धनुषा',
    localLevel: 'जनकपुरधाम उपमहानगरपालिका',
    fullAddress: 'जनकपुर-४, मुजेलिया',
    gender: 'पुरुष',
    officeVisited: 'मालपोत कार्यालय जनकपुर',
    overallSatisfaction: 2,
    isSatisfied: false,
    dissatisfactionReasons: ['समयमै काम नभएको', 'कर्मचारीको व्यवहार राम्रो नभएको', 'अतिरिक्त रकम मागिएको'],
    serviceQuality: 'कमजोर',
    tookOutsideHelp: true,
    outsideHelper: 'लेखापढी व्यवसायी मार्फत',
    paidBribe: true,
    bribeRecipient: 'लेखापढी व्यवसायी मार्फत',
    knowsCitizenCharter: false,
    receivedServiceInTime: false,
    delayReason: 'अतिरिक्त रकम नदिएकोले काम अड्काइयो',
    filedComplaint: true,
    attendedPublicHearing: false,
    knowsRightToInformation: false,
    goodOffices: 'हुलाक कार्यालय',
    weakOffices: 'मालपोत कार्यालय जनकपुर',
    suggestions: 'बिचौलिया प्रथा पूर्ण रूपमा बन्द हुनुपर्छ र डिजिटल टोकन प्रणाली लागू गरियोस्।'
  }
];

export const INITIAL_INVESTIGATION_RECORDS: InvestigationRecord[] = [
  {
    id: 'INV-01',
    sn: 1,
    regNo: '५४२/२०८२-८३',
    regDate: '२०८२-११-१४',
    complainant: 'स्थानीय उपभोक्ता समिति',
    respondent: 'खानेपानी तथा सरसफाइ डिभिजन, चितवन',
    office: 'चितवन',
    details: 'खानेपानी आयोजना पाइपलाइन खरिदमा स्वीकृत इस्टिमेट विपरित कमसल पाइप प्रयोग र बिल भुक्तानी भएको।',
    investigationDate: '२०८३-०२-११',
    reportDate: '२०८३-०४-१५',
    reportSummary: 'कमसल पाइप खरिद पुष्टी भएको, रु. १८ लाख बराबरको सरकारी रकम हिनामिना भएको ठहर गरी विभागीय कारबाही सिफारिस।',
    status: 'completed'
  },
  {
    id: 'INV-02',
    sn: 2,
    regNo: '६८०/२०८३-८४',
    regDate: '२०८३-०१-१९',
    complainant: 'हरिकृष्ण पौडेल',
    respondent: 'नापी शाखा प्रमुख, सिन्धुपाल्चोक',
    office: 'सिन्धुपाल्चोक',
    details: 'सार्वजनिक जग्गा व्यक्तिको नाममा दर्ता गर्न फिल्डबुक हेरफेर गरेको आरोप।',
    investigationDate: '२०८३-०३-२२',
    reportDate: '',
    reportSummary: 'फिल्डबुक र नक्सा प्रमाण संकलन भइरहेको, स्थलगत नापजाँच टोली खटिएको।',
    status: 'ongoing'
  }
];

export const INITIAL_TECHNICAL_AUDITS: TechnicalAuditRecord[] = [
  {
    id: 'TA-01',
    sn: 1,
    projectName: 'मुग्लिन-पोखरा सडक स्तरोन्नति आयोजना (पूर्वी खण्ड)',
    relatedAgency: 'सडक विभाग / आयोजना निर्देशनालय',
    projectType: 'सडक',
    auditDate: '२०८३-०३-१५',
    status: 'completed',
    ncrList: [
      'बेस कोर्सको कम्प्याक्सन मापदण्डभन्दा ४% कम पाइएको',
      'सडक सुरक्षा संकेत तथा ब्यारियर पर्याप्त नभएको',
      'ड्रेनेज आउटलेटमा ढुंगाको सोलिङ कमजोर'
    ],
    disposalDate: '२०८३-०४-१०',
    disposalInfoDate: '२०८३-०४-२८',
    remarks: 'पुनः कम्प्याक्सन गराई सुधार प्रतिवेदन प्राप्त भएको'
  },
  {
    id: 'TA-02',
    sn: 2,
    projectName: 'सिक्टा सिंचाई आयोजना (शाखा नहर निर्माण)',
    relatedAgency: 'जलस्रोत तथा सिंचाई विभाग',
    projectType: 'सिंचाई',
    auditDate: '२०८३-०४-०२',
    status: 'in_progress',
    ncrList: [
      'घुलनशील माटोको उपयुक्त ट्रिटमेन्ट नगरी लाइनिङ गरिएको',
      'कंक्रीटको कम्प्रेसिभ स्ट्रेन्थ तोकिएको भन्दा कम'
    ],
    disposalDate: '',
    disposalInfoDate: '',
    remarks: 'पुनः नमूना संकलन र प्रयोगशाला परीक्षण प्रक्रिया जारी'
  }
];

export const INITIAL_PROJECT_MONITORING: ProjectMonitoringRecord[] = [
  {
    id: 'PM-01',
    projectName: 'भेरी करिडोर सडक निर्माण तथा कालोपत्रे',
    province: 'कर्णाली प्रदेश',
    district: 'जाजरकोट',
    localLevel: 'भेरी नगरपालिका',
    wardNo: '४',
    fullAddress: 'जाजरकोट खलंगा बजार क्षेत्र',
    sector: 'सडक',
    implementingBody: 'सडक डिभिजन कार्यालय चौरजहारी',
    contractorName: 'अनमोल निर्माण कम्पनी प्रा.लि.',
    agreementNo: 'सम्झौता-२४/२०८१-८२',
    agreementDate: '२०८१-१०-१५',
    startDate: '२०८१-११-०१',
    expectedEndDate: '२०८३-०६-३०',
    approvedCost: 45000000,
    expenditureSoFar: 32000000,
    physicalProgress: 72,
    monitoringDate: '२०८३-०४-२४',
    status: 'progress',
    isRisk: false,
    issuesCount: 1,
    overallRemarks: 'काम सन्तोषजनक गतिमा अघि बढिरहेको, तोकिएको समयमै सम्पन्न हुने देखिन्छ।',
    suggestions: 'वर्षातको समयमा पहिरो रोकथामका लागि ग्याबियन जाली तत्काल थप्नुपर्ने।',
    teamMembers: [
      { name: 'प्रकाश बस्नेत', role: 'इन्जिनियर / टोली प्रमुख', date: '२०८३-०४-२४' },
      { name: 'सरोज पाण्डे', role: 'शाखा अधिकृत', date: '२०८३-०४-२४' }
    ],
    checklists: [
      {
        categoryKey: 'obj',
        categoryLabel: 'उद्देश्य तथा लक्ष्य सम्बन्धी',
        items: [
          { topic: 'आयोजना निर्धारित उद्देश्य अनुरूप कार्यान्वयन भए/नभएको', answer: 'yes', remark: 'उद्देश्य अनुरूप' },
          { topic: 'तोकिएको लक्ष्य अनुरूप काम प्रगति भए/नभएको', answer: 'yes', remark: 'प्रगति सन्तोषजनक' }
        ]
      },
      {
        categoryKey: 'qual',
        categoryLabel: 'गुणस्तर तथा प्राविधिक पक्ष',
        items: [
          { topic: 'निर्माण सामग्रीको गुणस्तर स्पेसिफिकेशन अनुरूप भए/नभएको', answer: 'yes', remark: 'ल्याब टेस्ट प्रमाणित' },
          { topic: 'प्रयोगशाला परीक्षण (Lab Test) नियमित गरिएको', answer: 'yes', remark: 'अभिलेख राखिएको' }
        ]
      }
    ]
  },
  {
    id: 'PM-02',
    projectName: 'बृहत खानेपानी तथा सरसफाइ आयोजना, कपिलवस्तु',
    province: 'लुम्बिनी प्रदेश',
    district: 'कपिलवस्तु',
    localLevel: 'शिवराज नगरपालिका',
    wardNo: '५',
    fullAddress: 'चन्द्रौटा बजार क्षेत्र',
    sector: 'खानेपानी',
    implementingBody: 'संघीय खानेपानी तथा ढल व्यवस्थापन आयोजना',
    contractorName: 'जनकल्याण बिल्डर्स',
    agreementNo: 'सम्झौता-११/२०८०-८१',
    agreementDate: '२०८०-०९-१०',
    startDate: '२०८०-१०-०१',
    expectedEndDate: '२०८२-१२-३०',
    approvedCost: 28000000,
    expenditureSoFar: 26000000,
    physicalProgress: 42,
    monitoringDate: '२०८३-०४-११',
    status: 'slow',
    isRisk: true,
    issuesCount: 5,
    overallRemarks: 'लागत खर्च अत्यधिक भएको तर भौतिक प्रगति न्यून रहेको, म्याद गुज्रिसकेको।',
    suggestions: 'ठेकेदारलाई स्पष्टीकरण सोध्ने र काम गति नलिए ठेक्का तोड्ने प्रक्रिया सुरु गर्ने।',
    teamMembers: [
      { name: 'इन्द्रजित थारु', role: 'उपसचिव / टोली प्रमुख', date: '२०८३-०४-११' }
    ],
    checklists: [
      {
        categoryKey: 'fin',
        categoryLabel: 'आर्थिक तथा समय व्यवस्थापन',
        items: [
          { topic: 'तोकिएको समय तालिका अनुसार काम अगाडि बढेको', answer: 'no', remark: 'अत्यन्तै ढिलाइ' },
          { topic: 'लागत वृद्धि (Cost Overrun) नभएको', answer: 'no', remark: 'लागत भन्दा प्रगति कम' }
        ]
      }
    ]
  }
];

export const INITIAL_PROMOTIONAL_PROGRAMS: PromotionalProgramRecord[] = [
  {
    id: 'PROG-01',
    name: 'भ्रष्टाचार विरुद्ध विद्यार्थी सचेतना अन्तरक्रिया',
    quarter: 'पहिलो',
    date: '२०८३/०४/१६',
    place: 'काठमाडौं, बागमती प्रदेश',
    targetGroup: 'माध्यमिक तहका विद्यार्थी तथा शिक्षक',
    expectedParticipants: 250,
    status: 'done',
    fiscalYear: '२०८३/८४'
  },
  {
    id: 'PROG-02',
    name: 'सार्वजनिक सेवा प्रवाह र सदाचारिता अभिमुखीकरण गोष्ठी',
    quarter: 'पहिलो',
    date: '२०८३/०४/२८',
    place: 'हेटौंडा, बागमती प्रदेश',
    targetGroup: 'प्रदेश तथा स्थानीय तहका कर्मचारीहरू',
    expectedParticipants: 120,
    status: 'done',
    fiscalYear: '२०८३/८४'
  },
  {
    id: 'PROG-03',
    name: 'सार्वजनिक खरिद र निर्माण अनुगमन सचेतना तालिम',
    quarter: 'पहिलो',
    date: '२०८३/०५/०८',
    place: 'बुटवल, लुम्बिनी प्रदेश',
    targetGroup: 'उपभोक्ता समिति र प्राविधिक कर्मचारी',
    expectedParticipants: 180,
    status: 'upcoming',
    fiscalYear: '२०८३/८४'
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarMeetingEvent[] = [
  {
    id: 'CAL-01',
    date: '2083-05-04',
    time: '11:00',
    title: 'उजुरी व्यवस्थापन समिति बैठक',
    type: 'उजुरी व्यवस्थापन समिति बैठक',
    description: 'साउन महिनामा दर्ता भएका नयाँ उजुरीहरूको प्रारम्भिक छानबिन प्रतिवेदन र तामेली सिफारिस माथि छलफल।',
    location: 'केन्द्रको मुख्य सभाहल, सिंहदरवार'
  },
  {
    id: 'CAL-02',
    date: '2083-05-12',
    time: '14:00',
    title: 'मासिक समीक्षा बैठक',
    type: 'मासिक समीक्षा बैठक',
    description: 'सम्पूर्ण महाशाखा तथा शाखाहरूको मासिक कार्यसम्पादन, प्रगति समीक्षा र आगामी योजना तर्जुमा।',
    location: 'बैठक कक्ष १'
  },
  {
    id: 'CAL-03',
    date: '2083-05-20',
    time: '13:00',
    title: 'अन्य बैठक/कार्यक्रम',
    type: 'अन्य बैठक/कार्यक्रम',
    description: 'प्राविधिक परीक्षण निर्देशिका परिमार्जन सम्बन्धी विज्ञ परामर्श बैठक।',
    location: 'मन्त्रालय समन्वय कक्ष'
  }
];

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'USR-01',
    username: 'admin',
    email: 'admin@nvc.gov.np',
    role: 'admin',
    mahashakha: 'प्रशासन तथा सूचना सङ्कलन महाशाखा',
    shakha: 'प्रशासन, योजना तथा अनुगमन शाखा',
    status: 'active',
    createdAt: '२०८१-०१-०१'
  },
  {
    id: 'USR-02',
    username: 'ujuri_officer',
    email: 'ujuri@nvc.gov.np',
    role: 'shakha',
    mahashakha: 'प्रशासन तथा सूचना सङ्कलन महाशाखा',
    shakha: 'सूचना सङ्‍कलन तथा उजुरी व्यवस्थापन शाखा',
    status: 'active',
    createdAt: '२०८१-०४-१५'
  },
  {
    id: 'USR-03',
    username: 'tech_audit',
    email: 'audit@nvc.gov.np',
    role: 'mahashakha',
    mahashakha: 'प्राविधिक परीक्षण तथा अनुगमन महाशाखा',
    shakha: 'प्राविधिक परीक्षण शाखा',
    status: 'active',
    createdAt: '२०८१-०७-२०'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'LOG-01',
    instanceId: 'INST-20830913',
    instanceName: 'NVC-Core-Server-01',
    activity: 'login',
    user: 'admin',
    timestamp: '२०८३-०५-२८ १०:१४:०२',
    status: 'success',
    details: 'एडमिन प्रणालीमा सफलतापूर्वक लगइन भयो'
  },
  {
    id: 'LOG-02',
    instanceId: 'INST-20830913',
    instanceName: 'NVC-Core-Server-01',
    activity: 'create',
    user: 'ujuri_officer',
    timestamp: '२०८३-०५-२८ ०९:३०:४५',
    status: 'success',
    details: 'नयाँ उजुरी दर्ता भयो: ११३०/स्वास्थ्य'
  },
  {
    id: 'LOG-03',
    instanceId: 'INST-20830913',
    instanceName: 'NVC-Core-Server-01',
    activity: 'update',
    user: 'tech_audit',
    timestamp: '२०८३-०५-२७ १६:४०:१२',
    status: 'success',
    details: 'प्राविधिक परीक्षण स्थिति अद्यावधिक: TA-01'
  }
];

// Aliases for compatibility
export const INITIAL_DRESS_TIME_MONITORING: DressTimeRecord[] = INITIAL_DRESS_TIME_RECORDS;
export const INITIAL_SURVEYS: CitizenSurveyRecord[] = INITIAL_CITIZEN_SURVEYS;
export const INITIAL_INVESTIGATIONS: InvestigationRecord[] = INITIAL_INVESTIGATION_RECORDS;

export const INITIAL_PROMOTIONAL_RECORDS: PromotionalRecord[] = [
  {
    id: 'PR-01',
    sn: 1,
    programName: 'सार्वजनिक सेवा प्रवाह र सदाचारिता सम्बन्धी सचेतना गोष्ठी',
    programType: 'सचेतनामूलक गोष्ठी',
    targetGroup: 'स्थानीय तहका जनप्रतिनिधि तथा कर्मचारी',
    location: 'काठमाडौं',
    date: '२०८३-०४-२५',
    participantsCount: 85,
    budget: '१,५०,०००',
    objectives: 'सार्वजनिक सेवा प्रवाहमा सुशासन, जवाफदेहिता र सदाचार प्रवर्द्धन गर्ने।',
    outcomes: 'सहभागीहरूले सेवा प्रवाहमा पारदर्शिता कायम गर्ने प्रतिबद्धता व्यक्त गरे।',
    status: 'completed'
  },
  {
    id: 'PR-02',
    sn: 2,
    programName: 'सार्वजनिक खरिद र निर्माण अनुगमन सचेतना तालिम',
    programType: 'अभिमुखीकरण तालिम',
    targetGroup: 'उपभोक्ता समिति र इन्जिनियरहरू',
    location: 'पोखरा, कास्की',
    date: '२०८३-०५-१०',
    participantsCount: 60,
    budget: '२,००,०००',
    objectives: 'निर्माण कार्यको गुणस्तर नियन्त्रण र प्राविधिक परीक्षण विधिबारे जानकारी।',
    outcomes: 'सचेतनामूलक निर्देशिका वितरण गरियो।',
    status: 'upcoming'
  },
  {
    id: 'PR-03',
    sn: 3,
    programName: 'विद्यालय तहमा भ्रष्टाचार विरुद्ध सचेतना तथा वक्तृत्वकला',
    programType: 'अन्तरक्रिया कार्यक्रम',
    targetGroup: 'माध्यमिक विद्यालयका विद्यार्थीहरू',
    location: 'बुटवल, रुपन्देही',
    date: '२०८३-०४-१२',
    participantsCount: 120,
    budget: '८०,०००',
    objectives: 'युवा पुस्तामा भ्रष्टाचार विरुद्ध शून्य सहनशीलताको भावना विकास गर्ने।',
    outcomes: 'उत्कृष्ट ३ जना विद्यार्थीलाई पुरस्कृत गरियो।',
    status: 'completed'
  }
];

export const INITIAL_CALENDAR_EVENTS_LIST: CalendarEvent[] = [
  {
    id: 'EV-01',
    title: 'काठमाडौं उपत्यका मालपोत तथा नापी कार्यालय छड्के अनुगमन',
    date: '२०८३-०४-१८',
    time: '१०:१५',
    type: 'monitoring',
    location: 'काठमाडौं उपत्यका',
    description: 'समय पालना, पोशाक तथा नागरिक बडापत्र कार्यान्वयन स्थिति आकस्मिक निरीक्षण।'
  },
  {
    id: 'EV-02',
    title: 'उजुरी व्यवस्थापन तथा छानबिन समिति बैठक',
    date: '२०८३-०४-२२',
    time: '११:३०',
    type: 'meeting',
    location: 'केन्द्रको सभाहल, सिंहदरवार',
    description: 'साउन महिनामा दर्ता भएका नयाँ उजुरीहरूको प्रारम्भिक छानबिन प्रतिवेदन माथि छलफल।'
  },
  {
    id: 'EV-03',
    title: 'मुग्लिन-पोखरा सडक प्राविधिक परीक्षण स्थलगत निरीक्षण',
    date: '२०८३-०४-२६',
    time: '०९:००',
    type: 'monitoring',
    location: 'तनहुँ / कास्की खण्ड',
    description: 'ल्याब परीक्षण नतिजा अनुसार सुधारात्मक कामको पुनः परीक्षण।'
  },
  {
    id: 'EV-04',
    title: 'सुशासन तथा भ्रष्टाचार निवारण सार्वजनिक सुनुवाई',
    date: '२०८३-०५-०५',
    time: '१३:००',
    type: 'hearing',
    location: 'जिल्ला समन्वय समिति, धादिङ',
    description: 'सेवाग्राही र नागरिक समाजसँग प्रत्यक्ष छलफल तथा सुझाव संकलन।'
  }
];

export const INITIAL_SYSTEM_USERS: SystemUser[] = [
  {
    id: 'USR-01',
    name: 'रामप्रसाद शर्मा',
    username: 'admin',
    email: 'admin@nvc.gov.np',
    phone: '९८५१०१२३४५',
    designation: 'सहसचिव / महानिर्देशक',
    branch: 'केन्द्र प्रमुख',
    role: 'super_admin',
    status: 'active',
    lastLogin: '२०८३-०५-२८ ०९:१५'
  },
  {
    id: 'USR-02',
    name: 'सुरेश थापा',
    username: 'stha_officer',
    email: 'sthapa@nvc.gov.np',
    phone: '९८४१२३४५६७',
    designation: 'उपसचिव',
    branch: 'उजुरी छानविन तथा अन्वेषण शाखा',
    role: 'admin',
    status: 'active',
    lastLogin: '२०८३-०५-२८ ०८:४०'
  },
  {
    id: 'USR-03',
    name: 'हरिप्रसाद पराजुली',
    username: 'hp_engineer',
    email: 'hp@nvc.gov.np',
    phone: '९८५६०१२३४५',
    designation: 'सिनियर डिभिजनल इन्जिनियर',
    branch: 'प्राविधिक परीक्षण शाखा',
    role: 'officer',
    status: 'active',
    lastLogin: '२०८३-०५-२७ १७:१०'
  },
  {
    id: 'USR-04',
    name: 'मनिषा श्रेष्ठ',
    username: 'mshrestha',
    email: 'manisha@nvc.gov.np',
    phone: '९८१२३४५६७८',
    designation: 'सहायक कम्प्युटर अपरेटर',
    branch: 'सूचना तथा प्रविधि शाखा',
    role: 'operator',
    status: 'active',
    lastLogin: '२०८३-०५-२८ ०९:००'
  }
];

export const INITIAL_AUDIT_LOG_ENTRIES: AuditLogEntry[] = [
  {
    id: 'LOG-01',
    timestamp: '२०८३-०५-२८ १०:१४:०२',
    user: 'रामप्रसाद शर्मा (admin)',
    role: 'सुपर प्रशासक',
    action: 'प्रणाली लगइन',
    details: 'राष्ट्रिय सतर्कता केन्द्र एकीकृत ड्यासबोर्डमा सफल प्रवेश',
    ipAddress: '१९२.१६८.१.१०५'
  },
  {
    id: 'LOG-02',
    timestamp: '२०८३-०५-२८ ०९:३०:४५',
    user: 'सुरेश थापा (stha_officer)',
    role: 'प्रशासक',
    action: 'नयाँ उजुरी दर्ता',
    details: 'दर्ता नं ११३०/स्वास्थ्य प्रणालीमा प्रविष्टि गरियो',
    ipAddress: '१९२.१६८.१.१२'
  },
  {
    id: 'LOG-03',
    timestamp: '२०८३-०५-२७ १६:४०:१२',
    user: 'हरिप्रसाद पराजुली (hp_engineer)',
    role: 'अनुगमन अधिकृत',
    action: 'प्राविधिक परीक्षण स्थिति अद्यावधिक',
    details: 'मुग्लिन-पोखरा सडक स्तरोन्नति आयोजना (TA-01) प्रतिवेदन पेश',
    ipAddress: '१९२.१६८.१.३४'
  },
  {
    id: 'LOG-04',
    timestamp: '२०८३-०५-२७ १३:१५:००',
    user: 'मनिषा श्रेष्ठ (mshrestha)',
    role: 'डाटा अपरेटर',
    action: 'कार्यालय अनुगमन अभिलेख',
    details: 'मालपोत कार्यालय भक्तपुर अनुगमन विवरण अद्यावधिक गरियो',
    ipAddress: '१९२.१६८.१.४५'
  }
];
