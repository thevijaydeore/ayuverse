import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'English' | 'हिंदी' | 'मराठी';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  English: {
    // Dashboard
    'dashboard.title': 'Doctor Dashboard',
    'dashboard.subtitle': 'Ayurvedic Diet Management',
    'dashboard.welcome': 'Welcome back, Dr. Priya!',
    'dashboard.appointments': 'You have 5 appointments today and 12 diet plans pending review.',
    'dashboard.viewSchedule': 'View Schedule',
    'dashboard.quickActions': 'Quick Actions',
    
    // Navigation
    'nav.overview': 'Dashboard',
    'nav.patients': 'Patients',
    'nav.foodDatabase': 'Food Database',
    'nav.dietGenerator': 'Generate Diet',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    
    // Patient Management
    'patients.title': 'Patient Management',
    'patients.subtitle': 'Manage your patients and their Ayurvedic profiles',
    'patients.addPatient': 'Add Patient',
    'patients.searchPlaceholder': 'Search patients by name or dosha...',
    'patients.total': 'Total',
    'patients.active': 'Active',
    'patients.noPatients': 'No Patients Found',
    
    // Quick Actions
    'actions.addNewPatient': 'Add New Patient',
    'actions.generateDietPlan': 'Generate Diet Plan',
    'actions.viewReports': 'View Reports',
    'actions.foodDatabase': 'Food Database',
    
    // Stats
    'stats.totalPatients': 'Total Patients',
    'stats.dietPlansCreated': 'Diet Plans Created',
    'stats.consultations': 'This Month Consultations',
    'stats.successRate': 'Success Rate',
    'stats.recentPatients': 'Recent Patients',
    'stats.monthlyProgress': 'Monthly Progress',
    
    // Notifications
    'notifications.title': 'Notifications',
    'notifications.newPatient': 'New patient registered: Rahul Sharma',
    'notifications.dietPlanReady': 'Diet plan ready for review: Priya Verma',
    'notifications.appointment': 'Upcoming appointment in 30 minutes',
    
    // Food Database
    'food.title': 'Food & Recipe Database',
    'food.subtitle': 'Comprehensive Ayurvedic food database with nutritional information',
    
    // Diet Generator
    'diet.title': 'Automated Diet Plan Generator',
    'diet.subtitle': 'Generate personalized Ayurvedic diet plans for your patients',
    
    // Reports
    'reports.title': 'Reports & Analytics',
    'reports.subtitle': 'Generate and export detailed reports for your practice',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Manage your account, preferences, and security settings',
    
    // Patient Details
    'patient.viewInfo': 'View Info',
    'patient.editInfo': 'Edit Info',
    'patient.patientDetails': 'Patient Details',
    'patient.constitution': 'Constitution',
    'patient.contactInfo': 'Contact Information',
    'patient.healthProfile': 'Health Profile',
    'patient.editPatient': 'Edit Patient',
    'patient.saveChanges': 'Save Changes',
    'patient.cancel': 'Cancel',
    
    // Food Database Enhanced
    'food.addFoodItem': 'Add Food Item',
    'food.searchFood': 'Search food items...',
    'food.category': 'Category',
    'food.allCategories': 'All Categories',
    'food.grains': 'Grains',
    'food.vegetables': 'Vegetables',
    'food.fruits': 'Fruits',
    'food.spices': 'Spices',
    'food.dairy': 'Dairy',
    'food.nutritionalInfo': 'Nutritional Information',
    'food.ayurvedicProperties': 'Ayurvedic Properties',
    'food.calories': 'Calories',
    'food.protein': 'Protein',
    'food.carbs': 'Carbohydrates',
    'food.fats': 'Fats',
    'food.fiber': 'Fiber',
    'food.rasa': 'Rasa (Taste)',
    'food.virya': 'Virya (Potency)',
    'food.vipaka': 'Vipaka (Post-digestive effect)',
    'food.doshaEffect': 'Dosha Effect',
    'food.addNewFood': 'Add New Food Item',
    'food.foodName': 'Food Name',
    'food.description': 'Description',
    'food.save': 'Save',
    
    // Diet Generator Enhanced
    'diet.selectPatient': 'Select Patient',
    'diet.generatePlan': 'Generate Plan',
    'diet.generating': 'Generating...',
    'diet.dailyMeals': 'Daily Meals',
    'diet.guidelines': 'Guidelines',
    'diet.herbs': 'Herbs & Supplements',
    'diet.breakfast': 'Breakfast',
    'diet.lunch': 'Lunch',
    'diet.evening': 'Evening Snack',
    'diet.dinner': 'Dinner',
    'diet.downloadPdf': 'Download PDF',
    'diet.savePlan': 'Save Plan',
    'diet.planFor': 'Diet Plan for',
    'diet.constitution': 'Constitution',
    'diet.duration': 'Duration',
    'diet.caloriesPerDay': 'cal/day',
    
    // Reports Enhanced
    'reports.overview': 'Overview',
    'reports.dietPlans': 'Diet Plans',
    'reports.analytics': 'Analytics',
    'reports.generateReport': 'Generate Report',
    'reports.totalPatients': 'Total Patients',
    'reports.activePlans': 'Active Plans',
    'reports.completedPlans': 'Completed Plans',
    'reports.avgCompliance': 'Avg Compliance',
    'reports.doshaDistribution': 'Patient Dosha Distribution',
    'reports.monthlyProgress': 'Monthly Progress',
    'reports.successMetrics': 'Success Metrics',
    'reports.planCompletion': 'Plan Completion Rate',
    'reports.patientSatisfaction': 'Patient Satisfaction',
    'reports.followupAdherence': 'Follow-up Adherence',
    'reports.view': 'View',
    'reports.download': 'Download',
    'reports.compliance': 'compliance',
    
    // Settings
    'settings.profile': 'Profile',
    'settings.preferences': 'Preferences',
    'settings.notifications': 'Notifications',
    'settings.security': 'Security',
    'settings.profileInfo': 'Profile Information',
    'settings.updateInfo': 'Update your personal and professional information',
    'settings.fullName': 'Full Name',
    'settings.emailAddress': 'Email Address',
    'settings.phoneNumber': 'Phone Number',
    'settings.specialization': 'Specialization',
    'settings.experience': 'Experience',
    'settings.clinic': 'Clinic/Organization',
    'settings.saveProfile': 'Save Profile',
    'settings.appPreferences': 'Application Preferences',
    'settings.customizeExperience': 'Customize your application experience',
    'settings.language': 'Language',
    'settings.timezone': 'Timezone',
    'settings.dateFormat': 'Date Format',
    'settings.theme': 'Theme',
    'settings.savePreferences': 'Save Preferences',
    'settings.notificationSettings': 'Notification Settings',
    'settings.configureNotifications': 'Configure how and when you receive notifications',
    'settings.emailNotifications': 'Email Notifications',
    'settings.emailNotificationsDesc': 'Receive general notifications via email',
    'settings.appointmentReminders': 'Appointment Reminders',
    'settings.appointmentRemindersDesc': 'Get reminded about upcoming appointments',
    'settings.dietPlanUpdates': 'Diet Plan Updates',
    'settings.dietPlanUpdatesDesc': 'Notifications when patients update their diet plans',
    'settings.systemUpdates': 'System Updates',
    'settings.systemUpdatesDesc': 'Important system updates and maintenance notices',
    'settings.marketingEmails': 'Marketing Emails',
    'settings.marketingEmailsDesc': 'Promotional emails and feature announcements',
    'settings.saveNotifications': 'Save Notifications',
    'settings.securitySettings': 'Security Settings',
    'settings.manageSecuritySettings': 'Manage your account security and privacy settings',
    'settings.twoFactorAuth': 'Two-Factor Authentication',
    'settings.twoFactorAuthDesc': 'Add an extra layer of security to your account',
    'settings.loginAlerts': 'Login Alerts',
    'settings.loginAlertsDesc': 'Get notified when your account is accessed',
    'settings.sessionTimeout': 'Session Timeout (minutes)',
    'settings.passwordManagement': 'Password Management',
    'settings.changePassword': 'Change Password',
    'settings.downloadData': 'Download Data',
    'settings.deleteAccount': 'Delete Account',
    'settings.saveSecuritySettings': 'Save Security Settings',
    
    // Profile
    'profile.doctorProfile': 'Doctor Profile',
    'profile.manageProfessionalProfile': 'Manage your professional profile and credentials',
    'profile.editProfile': 'Edit Profile',
    'profile.saveChanges': 'Save Changes',
    'profile.professionalInfo': 'Professional Information',
    'profile.contactInfo': 'Contact Information',
    'profile.achievements': 'Achievements & Certifications',
    'profile.addAchievement': '+ Add Achievement',
    'profile.professionalBio': 'Professional Bio',
    'profile.writeBio': 'Write a brief professional bio...',
    'profile.totalPatients': 'Total Patients',
    'profile.dietPlansCreated': 'Diet Plans Created',
    'profile.successRate': 'Success Rate',
    'profile.experienceYears': 'Experience',
    'profile.years': 'Years',
    'profile.licensed': 'Licensed',
    'profile.licenseNumber': 'License Number',
    'profile.education': 'Education',
    'profile.location': 'Location',
  },
  
  हिंदी: {
    // Dashboard
    'dashboard.title': 'डॉक्टर डैशबोर्ड',
    'dashboard.subtitle': 'आयुर्वेदिक आहार प्रबंधन',
    'dashboard.welcome': 'स्वागत है, डॉ. प्रिया!',
    'dashboard.appointments': 'आज आपके 5 अपॉइंटमेंट हैं और 12 आहार योजनाएं समीक्षा की प्रतीक्षा में हैं।',
    'dashboard.viewSchedule': 'शेड्यूल देखें',
    'dashboard.quickActions': 'त्वरित कार्य',
    
    // Navigation
    'nav.overview': 'डैशबोर्ड',
    'nav.patients': 'मरीज़',
    'nav.foodDatabase': 'भोजन डेटाबेस',
    'nav.dietGenerator': 'आहार योजना बनाएं',
    'nav.reports': 'रिपोर्ट्स',
    'nav.settings': 'सेटिंग्स',
    
    // Patient Management
    'patients.title': 'मरीज़ प्रबंधन',
    'patients.subtitle': 'अपने मरीज़ों और उनके आयुर्वेदिक प्रोफाइल का प्रबंधन करें',
    'patients.addPatient': 'मरीज़ जोड़ें',
    'patients.searchPlaceholder': 'नाम या दोष के आधार पर मरीज़ खोजें...',
    'patients.total': 'कुल',
    'patients.active': 'सक्रिय',
    'patients.noPatients': 'कोई मरीज़ नहीं मिला',
    
    // Quick Actions
    'actions.addNewPatient': 'नया मरीज़ जोड़ें',
    'actions.generateDietPlan': 'आहार योजना बनाएं',
    'actions.viewReports': 'रिपोर्ट्स देखें',
    'actions.foodDatabase': 'भोजन डेटाबेस',
    
    // Stats
    'stats.totalPatients': 'कुल मरीज़',
    'stats.dietPlansCreated': 'बनाई गई आहार योजनाएं',
    'stats.consultations': 'इस महीने परामर्श',
    'stats.successRate': 'सफलता दर',
    'stats.recentPatients': 'हाल के मरीज़',
    'stats.monthlyProgress': 'मासिक प्रगति',
    
    // Notifications
    'notifications.title': 'सूचनाएं',
    'notifications.newPatient': 'नया मरीज़ पंजीकृत: राहुल शर्मा',
    'notifications.dietPlanReady': 'आहार योजना समीक्षा के लिए तैयार: प्रिया वर्मा',
    'notifications.appointment': '30 मिनट में अपॉइंटमेंट',
    
    // Food Database
    'food.title': 'भोजन और व्यंजन डेटाबेस',
    'food.subtitle': 'पोषण संबंधी जानकारी के साथ व्यापक आयुर्वेदिक भोजन डेटाबेस',
    
    // Diet Generator
    'diet.title': 'स्वचालित आहार योजना जेनरेटर',
    'diet.subtitle': 'अपने मरीज़ों के लिए व्यक्तिगत आयुर्वेदिक आहार योजना बनाएं',
    
    // Reports
    'reports.title': 'रिपोर्ट्स और विश्लेषण',
    'reports.subtitle': 'अपनी प्रैक्टिस के लिए विस्तृत रिपोर्ट्स बनाएं और निर्यात करें',
    
    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.subtitle': 'अपने खाते, प्राथमिकताओं और सुरक्षा सेटिंग्स का प्रबंधन करें',
    
    // Patient Details
    'patient.viewInfo': 'जानकारी देखें',
    'patient.editInfo': 'जानकारी संपादित करें',
    'patient.patientDetails': 'मरीज़ का विवरण',
    'patient.constitution': 'प्रकृति',
    'patient.contactInfo': 'संपर्क जानकारी',
    'patient.healthProfile': 'स्वास्थ्य प्रोफाइल',
    'patient.editPatient': 'मरीज़ संपादित करें',
    'patient.saveChanges': 'बदलाव सहेजें',
    'patient.cancel': 'रद्द करें',
    
    // Food Database Enhanced
    'food.addFoodItem': 'भोजन आइटम जोड़ें',
    'food.searchFood': 'भोजन खोजें...',
    'food.category': 'श्रेणी',
    'food.allCategories': 'सभी श्रेणियां',
    'food.grains': 'अनाज',
    'food.vegetables': 'सब्जियां',
    'food.fruits': 'फल',
    'food.spices': 'मसाले',
    'food.dairy': 'डेयरी',
    'food.nutritionalInfo': 'पोषण संबंधी जानकारी',
    'food.ayurvedicProperties': 'आयुर्वेदिक गुण',
    'food.calories': 'कैलोरी',
    'food.protein': 'प्रोटीन',
    'food.carbs': 'कार्बोहाइड्रेट',
    'food.fats': 'वसा',
    'food.fiber': 'फाइबर',
    'food.rasa': 'रस (स्वाद)',
    'food.virya': 'वीर्य (शक्ति)',
    'food.vipaka': 'विपाक (पाचन के बाद प्रभाव)',
    'food.doshaEffect': 'दोष प्रभाव',
    'food.addNewFood': 'नया भोजन आइटम जोड़ें',
    'food.foodName': 'भोजन का नाम',
    'food.description': 'विवरण',
    'food.save': 'सहेजें',
    
    // Diet Generator Enhanced
    'diet.selectPatient': 'मरीज़ चुनें',
    'diet.generatePlan': 'योजना बनाएं',
    'diet.generating': 'बना रहे हैं...',
    'diet.dailyMeals': 'दैनिक भोजन',
    'diet.guidelines': 'दिशा-निर्देश',
    'diet.herbs': 'जड़ी-बूटियां और पूरक',
    'diet.breakfast': 'नाश्ता',
    'diet.lunch': 'दोपहर का भोजन',
    'diet.evening': 'शाम का नाश्ता',
    'diet.dinner': 'रात का खाना',
    'diet.downloadPdf': 'PDF डाउनलोड करें',
    'diet.savePlan': 'योजना सहेजें',
    'diet.planFor': 'आहार योजना',
    'diet.constitution': 'प्रकृति',
    'diet.duration': 'अवधि',
    'diet.caloriesPerDay': 'कैल/दिन',
    
    // Reports Enhanced
    'reports.overview': 'सारांश',
    'reports.dietPlans': 'आहार योजनाएं',
    'reports.analytics': 'विश्लेषण',
    'reports.generateReport': 'रिपोर्ट तैयार करें',
    'reports.totalPatients': 'कुल मरीज़',
    'reports.activePlans': 'सक्रिय योजनाएं',
    'reports.completedPlans': 'पूर्ण योजनाएं',
    'reports.avgCompliance': 'औसत अनुपालन',
    'reports.doshaDistribution': 'मरीज़ों का दोष वितरण',
    'reports.monthlyProgress': 'मासिक प्रगति',
    'reports.successMetrics': 'सफलता मेट्रिक्स',
    'reports.planCompletion': 'योजना पूर्णता दर',
    'reports.patientSatisfaction': 'मरीज़ संतुष्टि',
    'reports.followupAdherence': 'फॉलो-अप अनुपालन',
    'reports.view': 'देखें',
    'reports.download': 'डाउनलोड करें',
    'reports.compliance': 'अनुपालन',
    
    // Settings
    'settings.profile': 'प्रोफाइल',
    'settings.preferences': 'प्राथमिकताएं',
    'settings.notifications': 'सूचनाएं',
    'settings.security': 'सुरक्षा',
    'settings.profileInfo': 'प्रोफाइल जानकारी',
    'settings.updateInfo': 'अपनी व्यक्तिगत और व्यावसायिक जानकारी अपडेट करें',
    'settings.fullName': 'पूरा नाम',
    'settings.emailAddress': 'ईमेल पता',
    'settings.phoneNumber': 'फोन नंबर',
    'settings.specialization': 'विशेषज्ञता',
    'settings.experience': 'अनुभव',
    'settings.clinic': 'क्लिनिक/संगठन',
    'settings.saveProfile': 'प्रोफाइल सहेजें',
    'settings.appPreferences': 'एप्लिकेशन प्राथमिकताएं',
    'settings.customizeExperience': 'अपने एप्लिकेशन अनुभव को अनुकूलित करें',
    'settings.language': 'भाषा',
    'settings.timezone': 'समय क्षेत्र',
    'settings.dateFormat': 'दिनांक प्रारूप',
    'settings.theme': 'थीम',
    'settings.savePreferences': 'प्राथमिकताएं सहेजें',
    'settings.notificationSettings': 'सूचना सेटिंग्स',
    'settings.configureNotifications': 'कॉन्फ़िगर करें कि आप कैसे और कब सूचनाएं प्राप्त करते हैं',
    'settings.emailNotifications': 'ईमेल सूचनाएं',
    'settings.emailNotificationsDesc': 'ईमेल के माध्यम से सामान्य सूचनाएं प्राप्त करें',
    'settings.appointmentReminders': 'अपॉइंटमेंट रिमाइंडर',
    'settings.appointmentRemindersDesc': 'आगामी अपॉइंटमेंट के बारे में याद दिलाया जाएं',
    'settings.dietPlanUpdates': 'आहार योजना अपडेट',
    'settings.dietPlanUpdatesDesc': 'जब मरीज़ अपनी आहार योजना अपडेट करते हैं तो सूचनाएं',
    'settings.systemUpdates': 'सिस्टम अपडेट',
    'settings.systemUpdatesDesc': 'महत्वपूर्ण सिस्टम अपडेट और रखरखाव सूचनाएं',
    'settings.marketingEmails': 'मार्केटिंग ईमेल',
    'settings.marketingEmailsDesc': 'प्रचार ईमेल और सुविधा घोषणाएं',
    'settings.saveNotifications': 'सूचनाएं सहेजें',
    'settings.securitySettings': 'सुरक्षा सेटिंग्स',
    'settings.manageSecuritySettings': 'अपने खाते की सुरक्षा और गोपनीयता सेटिंग्स का प्रबंधन करें',
    'settings.twoFactorAuth': 'दो-कारक प्रमाणीकरण',
    'settings.twoFactorAuthDesc': 'अपने खाते में सुरक्षा की एक अतिरिक्त परत जोड़ें',
    'settings.loginAlerts': 'लॉगिन अलर्ट',
    'settings.loginAlertsDesc': 'जब आपके खाते तक पहुंच हो तो सूचना प्राप्त करें',
    'settings.sessionTimeout': 'सत्र समय समाप्ति (मिनट)',
    'settings.passwordManagement': 'पासवर्ड प्रबंधन',
    'settings.changePassword': 'पासवर्ड बदलें',
    'settings.downloadData': 'डेटा डाउनलोड करें',
    'settings.deleteAccount': 'खाता हटाएं',
    'settings.saveSecuritySettings': 'सुरक्षा सेटिंग्स सहेजें',
    
    // Profile
    'profile.doctorProfile': 'डॉक्टर प्रोफाइल',
    'profile.manageProfessionalProfile': 'अपने व्यावसायिक प्रोफाइल और प्रमाण पत्रों का प्रबंधन करें',
    'profile.editProfile': 'प्रोफाइल संपादित करें',
    'profile.saveChanges': 'बदलाव सहेजें',
    'profile.professionalInfo': 'व्यावसायिक जानकारी',
    'profile.contactInfo': 'संपर्क जानकारी',
    'profile.achievements': 'उपलब्धियां और प्रमाणपत्र',
    'profile.addAchievement': '+ उपलब्धि जोड़ें',
    'profile.professionalBio': 'व्यावसायिक जीवनी',
    'profile.writeBio': 'एक संक्षिप्त व्यावसायिक जीवनी लिखें...',
    'profile.totalPatients': 'कुल मरीज़',
    'profile.dietPlansCreated': 'बनाई गई आहार योजनाएं',
    'profile.successRate': 'सफलता दर',
    'profile.experienceYears': 'अनुभव',
    'profile.years': 'वर्ष',
    'profile.licensed': 'लाइसेंसयाफ्ता',
    'profile.licenseNumber': 'लाइसेंस नंबर',
    'profile.education': 'शिक्षा',
    'profile.location': 'स्थान',
  },
  
  मराठी: {
    // Dashboard
    'dashboard.title': 'डॉक्टर डॅशबोर्ड',
    'dashboard.subtitle': 'आयुर्वेदिक आहार व्यवस्थापन',
    'dashboard.welcome': 'स्वागत आहे, डॉ. प्रिया!',
    'dashboard.appointments': 'आज तुमच्याकडे 5 अपॉइंटमेंट आहेत आणि 12 आहार योजना पुनरावलोकनाची प्रतीक्षा करत आहेत.',
    'dashboard.viewSchedule': 'वेळापत्रक पहा',
    'dashboard.quickActions': 'त्वरित कृती',
    
    // Navigation
    'nav.overview': 'डॅशबोर्ड',
    'nav.patients': 'रुग्ण',
    'nav.foodDatabase': 'अन्न डेटाबेस',
    'nav.dietGenerator': 'आहार योजना तयार करा',
    'nav.reports': 'अहवाल',
    'nav.settings': 'सेटिंग्ज',
    
    // Patient Management
    'patients.title': 'रुग्ण व्यवस्थापन',
    'patients.subtitle': 'तुमच्या रुग्णांचे आणि त्यांच्या आयुर्वेदिक प्रोफाइलचे व्यवस्थापन करा',
    'patients.addPatient': 'रुग्ण जोडा',
    'patients.searchPlaceholder': 'नाव किंवा दोषानुसार रुग्ण शोधा...',
    'patients.total': 'एकूण',
    'patients.active': 'सक्रिय',
    'patients.noPatients': 'कोणतेही रुग्ण सापडले नाहीत',
    
    // Quick Actions
    'actions.addNewPatient': 'नवा रुग्ण जोडा',
    'actions.generateDietPlan': 'आहार योजना तयार करा',
    'actions.viewReports': 'अहवाल पहा',
    'actions.foodDatabase': 'अन्न डेटाबेस',
    
    // Stats
    'stats.totalPatients': 'एकूण रुग्ण',
    'stats.dietPlansCreated': 'तयार केलेल्या आहार योजना',
    'stats.consultations': 'या महिन्यातील सल्लामसलत',
    'stats.successRate': 'यश दर',
    'stats.recentPatients': 'अलीकडील रुग्ण',
    'stats.monthlyProgress': 'मासिक प्रगती',
    
    // Notifications
    'notifications.title': 'सूचना',
    'notifications.newPatient': 'नवा रुग्ण नोंदणी: राहुल शर्मा',
    'notifications.dietPlanReady': 'पुनरावलोकनासाठी आहार योजना तयार: प्रिया वर्मा',
    'notifications.appointment': '30 मिनिटांत अपॉइंटमेंट',
    
    // Food Database
    'food.title': 'अन्न आणि पाककृती डेटाबेस',
    'food.subtitle': 'पोषण माहितीसह सर्वसमावेशक आयुर्वेदिक अन्न डेटाबेस',
    
    // Diet Generator
    'diet.title': 'स्वयंचलित आहार योजना जनरेटर',
    'diet.subtitle': 'तुमच्या रुग्णांसाठी वैयक्तिक आयुर्वेदिक आहार योजना तयार करा',
    
    // Reports
    'reports.title': 'अहवाल आणि विश्लेषण',
    'reports.subtitle': 'तुमच्या प्रॅक्टिससाठी तपशीलवार अहवाल तयार करा आणि निर्यात करा',
    
    // Settings
    'settings.title': 'सेटिंग्ज',
    'settings.subtitle': 'तुमचे खाते, प्राधान्ये आणि सुरक्षा सेटिंग्जचे व्यवस्थापन करा',
    
    // Patient Details
    'patient.viewInfo': 'माहिती पहा',
    'patient.editInfo': 'माहिती संपादित करा',
    'patient.patientDetails': 'रुग्णाचे तपशील',
    'patient.constitution': 'प्रकृती',
    'patient.contactInfo': 'संपर्क माहिती',
    'patient.healthProfile': 'आरोग्य प्रोफाइल',
    'patient.editPatient': 'रुग्ण संपादित करा',
    'patient.saveChanges': 'बदल जतन करा',
    'patient.cancel': 'रद्द करा',
    
    // Food Database Enhanced
    'food.addFoodItem': 'अन्न आयटम जोडा',
    'food.searchFood': 'अन्न शोधा...',
    'food.category': 'श्रेणी',
    'food.allCategories': 'सर्व श्रेणी',
    'food.grains': 'धान्य',
    'food.vegetables': 'भाज्या',
    'food.fruits': 'फळे',
    'food.spices': 'मसाले',
    'food.dairy': 'दुग्धजन्य पदार्थ',
    'food.nutritionalInfo': 'पोषणविषयक माहिती',
    'food.ayurvedicProperties': 'आयुर्वेदिक गुणधर्म',
    'food.calories': 'कॅलरीज',
    'food.protein': 'प्रथिने',
    'food.carbs': 'कार्बोहायड्रेट',
    'food.fats': 'चरबी',
    'food.fiber': 'फायबर',
    'food.rasa': 'रस (चव)',
    'food.virya': 'वीर्य (शक्ती)',
    'food.vipaka': 'विपाक (पचनानंतरचा परिणाम)',
    'food.doshaEffect': 'दोष परिणाम',
    'food.addNewFood': 'नवीन अन्न आयटम जोडा',
    'food.foodName': 'अन्नाचे नाव',
    'food.description': 'वर्णन',
    'food.save': 'जतन करा',
    
    // Diet Generator Enhanced
    'diet.selectPatient': 'रुग्ण निवडा',
    'diet.generatePlan': 'योजना तयार करा',
    'diet.generating': 'तयार करत आहे...',
    'diet.dailyMeals': 'दैनिक जेवण',
    'diet.guidelines': 'मार्गदर्शन तत्त्वे',
    'diet.herbs': 'औषधी वनस्पती आणि पूरक',
    'diet.breakfast': 'नाश्ता',
    'diet.lunch': 'दुपारचे जेवण',
    'diet.evening': 'संध्याकाळचा नाश्ता',
    'diet.dinner': 'रात्रीचे जेवण',
    'diet.downloadPdf': 'PDF डाउनलोड करा',
    'diet.savePlan': 'योजना जतन करा',
    'diet.planFor': 'आहार योजना',
    'diet.constitution': 'प्रकृती',
    'diet.duration': 'कालावधी',
    'diet.caloriesPerDay': 'कॅल/दिवस',
    
    // Reports Enhanced
    'reports.overview': 'सारांश',
    'reports.dietPlans': 'आहार योजना',
    'reports.analytics': 'विश्लेषण',
    'reports.generateReport': 'अहवाल तयार करा',
    'reports.totalPatients': 'एकूण रुग्ण',
    'reports.activePlans': 'सक्रिय योजना',
    'reports.completedPlans': 'पूर्ण झालेल्या योजना',
    'reports.avgCompliance': 'सरासरी अनुपालन',
    'reports.doshaDistribution': 'रुग्णांचे दोष वितरण',
    'reports.monthlyProgress': 'मासिक प्रगती',
    'reports.successMetrics': 'यश मेट्रिक्स',
    'reports.planCompletion': 'योजना पूर्णता दर',
    'reports.patientSatisfaction': 'रुग्ण समाधान',
    'reports.followupAdherence': 'फॉलो-अप पालन',
    'reports.view': 'पहा',
    'reports.download': 'डाउनलोड करा',
    'reports.compliance': 'अनुपालन',
    
    // Settings
    'settings.profile': 'प्रोफाइल',
    'settings.preferences': 'प्राधान्ये',
    'settings.notifications': 'सूचना',
    'settings.security': 'सुरक्षा',
    'settings.profileInfo': 'प्रोफाइल माहिती',
    'settings.updateInfo': 'तुमची वैयक्तिक आणि व्यावसायिक माहिती अपडेट करा',
    'settings.fullName': 'पूर्ण नाव',
    'settings.emailAddress': 'ईमेल पत्ता',
    'settings.phoneNumber': 'फोन नंबर',
    'settings.specialization': 'तज्ञता',
    'settings.experience': 'अनुभव',
    'settings.clinic': 'क्लिनिक/संस्था',
    'settings.saveProfile': 'प्रोफाइल जतन करा',
    'settings.appPreferences': 'अॅप्लिकेशन प्राधान्ये',
    'settings.customizeExperience': 'तुमचा अॅप्लिकेशन अनुभव सानुकूलित करा',
    'settings.language': 'भाषा',
    'settings.timezone': 'समय क्षेत्र',
    'settings.dateFormat': 'दिनांक स्वरूप',
    'settings.theme': 'थीम',
    'settings.savePreferences': 'प्राधान्ये जतन करा',
    'settings.notificationSettings': 'सूचना सेटिंग्ज',
    'settings.configureNotifications': 'तुम्ही कसे आणि केव्हा सूचना प्राप्त करता ते कॉन्फिगर करा',
    'settings.emailNotifications': 'ईमेल सूचना',
    'settings.emailNotificationsDesc': 'ईमेलद्वारे सामान्य सूचना प्राप्त करा',
    'settings.appointmentReminders': 'अपॉइंटमेंट स्मरणपत्र',
    'settings.appointmentRemindersDesc': 'आगामी अपॉइंटमेंट्सबद्दल आठवण करून देत राहा',
    'settings.dietPlanUpdates': 'आहार योजना अपडेट',
    'settings.dietPlanUpdatesDesc': 'जेव्हा रुग्ण त्यांची आहार योजना अपडेट करतात तेव्हा सूचना',
    'settings.systemUpdates': 'सिस्टम अपडेट',
    'settings.systemUpdatesDesc': 'महत्त्वाचे सिस्टम अपडेट आणि देखभाल सूचना',
    'settings.marketingEmails': 'मार्केटिंग ईमेल',
    'settings.marketingEmailsDesc': 'प्रचार ईमेल आणि वैशिष्ट्य घोषणा',
    'settings.saveNotifications': 'सूचना जतन करा',
    'settings.securitySettings': 'सुरक्षा सेटिंग्ज',
    'settings.manageSecuritySettings': 'तुमच्या खात्याची सुरक्षा आणि गोपनीयता सेटिंग्जचे व्यवस्थापन करा',
    'settings.twoFactorAuth': 'द्विघटक प्रमाणीकरण',
    'settings.twoFactorAuthDesc': 'तुमच्या खात्यात सुरक्षेचा अतिरिक्त स्तर जोडा',
    'settings.loginAlerts': 'लॉगिन अलर्ट',
    'settings.loginAlertsDesc': 'तुमच्या खात्यात प्रवेश झाल्यावर सूचना मिळवा',
    'settings.sessionTimeout': 'सत्र कालबाह्यता (मिनिटे)',
    'settings.passwordManagement': 'पासवर्ड व्यवस्थापन',
    'settings.changePassword': 'पासवर्ड बदला',
    'settings.downloadData': 'डेटा डाउनलोड करा',
    'settings.deleteAccount': 'खाते हटवा',
    'settings.saveSecuritySettings': 'सुरक्षा सेटिंग्ज जतन करा',
    
    // Profile
    'profile.doctorProfile': 'डॉक्टर प्रोफाइल',
    'profile.manageProfessionalProfile': 'तुमचे व्यावसायिक प्रोफाइल आणि प्रमाणपत्रांचे व्यवस्थापन करा',
    'profile.editProfile': 'प्रोफाइल संपादित करा',
    'profile.saveChanges': 'बदल जतन करा',
    'profile.professionalInfo': 'व्यावसायिक माहिती',
    'profile.contactInfo': 'संपर्क माहिती',
    'profile.achievements': 'उपलब्धी आणि प्रमाणपत्रे',
    'profile.addAchievement': '+ उपलब्धी जोडा',
    'profile.professionalBio': 'व्यावसायिक चरित्र',
    'profile.writeBio': 'एक संक्षिप्त व्यावसायिक चरित्र लिहा...',
    'profile.totalPatients': 'एकूण रुग्ण',
    'profile.dietPlansCreated': 'तयार केलेल्या आहार योजना',
    'profile.successRate': 'यश दर',
    'profile.experienceYears': 'अनुभव',
    'profile.years': 'वर्षे',
    'profile.licensed': 'परवानाधारक',
    'profile.licenseNumber': 'परवाना क्रमांक',
    'profile.education': 'शिक्षण',
    'profile.location': 'स्थान',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>('English');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};